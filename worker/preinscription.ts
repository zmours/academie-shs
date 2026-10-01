// Traitement de POST /api/preinscription, appelé par le Worker (worker/index.ts).
//
// Reçoit le formulaire, vérifie le jeton anti-robot Turnstile, contrôle les champs, puis crée ou
// met à jour le contact dans la liste Brevo. La clé Brevo ne quitte jamais le serveur.
//
// Pas de courriel de confirmation pour l'instant (décision du 01/10/2026). Conséquence : une
// adresse mal tapée passe inaperçue, et n'importe qui peut préinscrire l'adresse d'un autre. Pour
// ne rien écraser dans ce cas, les cours, langues et créneaux d'un contact existant sont FUSIONNÉS
// avec les nouveaux, jamais remplacés.
//
// Aucune donnée personnelle n'est écrite dans les journaux : seulement des codes d'erreur.

import { CODES_COURS } from '../src/data/cours';
import { VERSION_CONSENTEMENT } from '../src/i18n/textes';

interface Env {
  BREVO_API_KEY?: string;
  BREVO_LIST_ID?: string;
  TURNSTILE_SECRET?: string;
  BREVO_ATTR_PRENOM?: string;
  BREVO_ATTR_NOM?: string;
}

interface Contexte {
  request: Request;
  env: Env;
}

interface Charge {
  prenom?: unknown;
  nom?: unknown;
  courriel?: unknown;
  whatsapp?: unknown;
  pays?: unknown;
  niveau?: unknown;
  origine?: unknown;
  modules?: unknown;
  langues?: unknown;
  creneaux?: unknown;
  majeur?: unknown;
  consentement?: unknown;
  newsletter?: unknown;
  langueSite?: unknown;
  siteWeb?: unknown;
  turnstile?: unknown;
  utm?: unknown;
}

const BREVO = 'https://api.brevo.com/v3';
const TAILLE_MAX = 10_000;
const LANGUES = new Set(['fr', 'ar', 'en']);
const CRENEAUX = new Set(['soir-semaine', 'samedi', 'dimanche']);
const NIVEAUX = new Set(['debutant', 'intermediaire', 'avance', 'ne-sait-pas']);
const PAYS = new Set(['FR', 'BE', 'CH', 'CA', 'GB', 'MA', 'DZ', 'TN', 'AUTRE']);
const ORIGINES = new Set(['', 'whatsapp', 'instagram', 'facebook', 'bouche-a-oreille', 'mosquee-association', 'autre']);
const COURRIEL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Les listes sont enregistrées dans Brevo sous la forme « fiqh, sira » (attribut texte). */
const SEPARATEUR = ', ';

function reponse(statut: number, corps: Record<string, unknown>): Response {
  return new Response(JSON.stringify(corps), {
    status: statut,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

function texte(valeur: unknown, max: number): string {
  return typeof valeur === 'string' ? valeur.trim().replace(/\s+/g, ' ').slice(0, max) : '';
}

function liste(valeur: unknown, autorisees: ReadonlySet<string>): string[] {
  if (!Array.isArray(valeur)) return [];
  return [...new Set(valeur.filter((v): v is string => typeof v === 'string' && autorisees.has(v)))];
}

function choix(valeur: unknown, autorisees: ReadonlySet<string>): string {
  return typeof valeur === 'string' && autorisees.has(valeur) ? valeur : '';
}

/** Garde les chiffres et un « + » initial : « +33 6 12 34 56 78 » → « +33612345678 ». */
function telephone(valeur: unknown): string {
  const brut = texte(valeur, 30);
  const chiffres = brut.replace(/[^\d]/g, '');
  return brut.startsWith('+') ? `+${chiffres}` : chiffres;
}

function fusionner(existant: unknown, nouveaux: string[]): string {
  const anciens = typeof existant === 'string' ? existant.split(',').map((v) => v.trim()).filter(Boolean) : [];
  return [...new Set([...anciens, ...nouveaux])].join(SEPARATEUR);
}

async function verifierTurnstile(jeton: string, secret: string, ip: string | null): Promise<boolean> {
  if (!jeton) return false;
  const corps = new FormData();
  corps.append('secret', secret);
  corps.append('response', jeton);
  if (ip) corps.append('remoteip', ip);
  const rep = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: corps });
  if (!rep.ok) return false;
  const resultat = (await rep.json()) as { success?: boolean };
  return resultat.success === true;
}

async function contactExistant(courriel: string, cle: string): Promise<Record<string, unknown> | null> {
  const rep = await fetch(`${BREVO}/contacts/${encodeURIComponent(courriel)}`, {
    headers: { 'api-key': cle, accept: 'application/json' },
  });
  if (rep.status !== 200) return null;
  const contact = (await rep.json()) as { attributes?: Record<string, unknown> };
  return contact.attributes ?? {};
}

export async function onRequestPost({ request, env }: Contexte): Promise<Response> {
  const manquantes = (['BREVO_API_KEY', 'BREVO_LIST_ID'] as const).filter((nom) => !env[nom]);
  if (manquantes.length > 0 || !env.BREVO_API_KEY || !env.BREVO_LIST_ID) {
    console.error(`preinscription: variable(s) absente(s) : ${manquantes.join(', ')}`);
    return reponse(500, { ok: false, erreur: 'configuration' });
  }

  const longueur = Number(request.headers.get('content-length') ?? 0);
  if (longueur > TAILLE_MAX) return reponse(413, { ok: false, erreur: 'trop-gros' });

  let charge: Charge;
  try {
    charge = (await request.json()) as Charge;
  } catch {
    return reponse(400, { ok: false, erreur: 'json' });
  }

  // Champ piège invisible : un robot le remplit, un humain non. On répond « ok » sans rien faire.
  if (texte(charge.siteWeb, 200) !== '') return reponse(200, { ok: true });

  if (env.TURNSTILE_SECRET) {
    const humain = await verifierTurnstile(
      texte(charge.turnstile, 2048),
      env.TURNSTILE_SECRET,
      request.headers.get('CF-Connecting-IP'),
    );
    if (!humain) return reponse(403, { ok: false, erreur: 'turnstile' });
  } else {
    console.warn('preinscription: TURNSTILE_SECRET absent, vérification anti-robot désactivée');
  }

  const prenom = texte(charge.prenom, 80);
  const nom = texte(charge.nom, 80);
  const courriel = texte(charge.courriel, 160).toLowerCase();
  const whatsapp = telephone(charge.whatsapp);
  const modules = liste(charge.modules, CODES_COURS);
  const langues = liste(charge.langues, LANGUES);
  const creneaux = liste(charge.creneaux, CRENEAUX);

  const champsManquants = [
    !prenom && 'prenom',
    !nom && 'nom',
    !COURRIEL.test(courriel) && 'courriel',
    whatsapp.replace('+', '').length < 8 && 'whatsapp',
    modules.length === 0 && 'modules',
    langues.length === 0 && 'langues',
    charge.majeur !== true && 'majeur',
    charge.consentement !== true && 'consentement',
  ].filter(Boolean);
  if (champsManquants.length > 0) return reponse(422, { ok: false, erreur: 'champs', champs: champsManquants });

  const utm = (typeof charge.utm === 'object' && charge.utm !== null ? charge.utm : {}) as Record<string, unknown>;
  const aujourdhui = new Date().toISOString().slice(0, 10);

  let existant: Record<string, unknown> | null;
  try {
    existant = await contactExistant(courriel, env.BREVO_API_KEY);
  } catch {
    existant = null;
  }

  const attributs: Record<string, string | boolean> = {
    [env.BREVO_ATTR_PRENOM || 'PRENOM']: prenom,
    [env.BREVO_ATTR_NOM || 'NOM']: nom,
    TELEPHONE_WHATSAPP: whatsapp,
    PAYS: choix(charge.pays, PAYS),
    NIVEAU: choix(charge.niveau, NIVEAUX),
    MODULES: fusionner(existant?.MODULES, modules),
    LANGUE_COURS: fusionner(existant?.LANGUE_COURS, langues),
    CRENEAUX: fusionner(existant?.CRENEAUX, creneaux),
    ORIGINE: choix(charge.origine, ORIGINES),
    LANGUE_SITE: choix(charge.langueSite, LANGUES),
    MAJEUR: true,
    CONSENTEMENT_DATE: aujourdhui,
    CONSENTEMENT_VERSION: VERSION_CONSENTEMENT,
    // Une newsletter acceptée une fois le reste tant que la personne ne s'est pas désabonnée.
    OPTIN_NEWSLETTER: charge.newsletter === true || existant?.OPTIN_NEWSLETTER === true,
  };
  if (!existant?.DATE_PREINSCRIPTION) attributs.DATE_PREINSCRIPTION = aujourdhui;
  for (const [cle, attribut] of [
    ['utm_source', 'UTM_SOURCE'],
    ['utm_medium', 'UTM_MEDIUM'],
    ['utm_campaign', 'UTM_CAMPAIGN'],
  ] as const) {
    const valeur = texte(utm[cle], 100);
    if (valeur && !existant?.[attribut]) attributs[attribut] = valeur;
  }

  const rep = await fetch(`${BREVO}/contacts`, {
    method: 'POST',
    headers: { 'api-key': env.BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      email: courriel,
      attributes: attributs,
      listIds: [Number(env.BREVO_LIST_ID)],
      updateEnabled: true,
    }),
  });

  // 201 : contact créé ; 204 : contact existant mis à jour.
  if (rep.status === 201 || rep.status === 204) return reponse(200, { ok: true });

  const detail = (await rep.json().catch(() => ({}))) as { code?: string };
  console.error(`preinscription: Brevo a répondu ${rep.status} (${detail.code ?? 'sans code'})`);
  return reponse(502, { ok: false, erreur: 'brevo' });
}

export async function onRequest(): Promise<Response> {
  return reponse(405, { ok: false, erreur: 'methode' });
}
