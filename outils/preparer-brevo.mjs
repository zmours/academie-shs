#!/usr/bin/env node
// Prépare le compte Brevo pour le formulaire : le dossier, la liste « Préinscriptions 2026-2027 »
// et tous les attributs de contact qu'écrit worker/preinscription.ts.
//
//   npm run brevo                 → crée ce qui manque
//   npm run brevo -- --simulation → montre ce qui serait créé, sans rien écrire
//
// La clé d'API est lue dans la variable d'environnement BREVO_API_KEY, sinon dans `.dev.vars`
// (ignoré par git). Ne jamais la passer en argument : elle resterait dans l'historique du shell.
//
// Le script peut être relancé sans risque : il ne crée que ce qui n'existe pas encore, et ne
// modifie ni ne supprime jamais rien.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const BREVO = 'https://api.brevo.com/v3';
const NOM_DOSSIER = 'Académie SHS';
const NOM_LISTE = 'Préinscriptions 2026-2027';

// À garder aligné avec les attributs écrits par worker/preinscription.ts.
const ATTRIBUTS = [
  ['TELEPHONE_WHATSAPP', 'text'],
  ['PAYS', 'text'],
  ['NIVEAU', 'text'],
  ['MODULES', 'text'],
  ['LANGUE_COURS', 'text'],
  ['CRENEAUX', 'text'],
  ['ORIGINE', 'text'],
  ['LANGUE_SITE', 'text'],
  ['DATE_PREINSCRIPTION', 'date'],
  ['CONSENTEMENT_DATE', 'date'],
  ['CONSENTEMENT_VERSION', 'text'],
  ['MAJEUR', 'boolean'],
  ['OPTIN_NEWSLETTER', 'boolean'],
  ['UTM_SOURCE', 'text'],
  ['UTM_MEDIUM', 'text'],
  ['UTM_CAMPAIGN', 'text'],
];

const simulation = process.argv.includes('--simulation');

function lireCle() {
  if (process.env.BREVO_API_KEY) return process.env.BREVO_API_KEY.trim();
  // `.dev.vars` sert aussi à `wrangler pages dev` ; `.env` est accepté par commodité. Les deux
  // sont ignorés par git, et Astro n'expose au navigateur que les variables préfixées PUBLIC_.
  for (const nom of ['.dev.vars', '.env']) {
    try {
      const fichier = readFileSync(fileURLToPath(new URL(`../${nom}`, import.meta.url)), 'utf8');
      const ligne = fichier.split('\n').find((l) => /^\s*BREVO_API_KEY\s*=/.test(l));
      if (ligne) return ligne.split('=').slice(1).join('=').trim().replace(/^["']|["']$/g, '');
    } catch {
      // Fichier absent : on essaie le suivant.
    }
  }
  return '';
}

const cle = lireCle();
if (!cle) {
  console.error('Clé Brevo introuvable. Ajouter dans .dev.vars la ligne :\n  BREVO_API_KEY=xkeysib-...');
  process.exit(1);
}

async function brevo(methode, chemin, corps) {
  const rep = await fetch(`${BREVO}${chemin}`, {
    method: methode,
    headers: { 'api-key': cle, accept: 'application/json', 'content-type': 'application/json' },
    body: corps ? JSON.stringify(corps) : undefined,
  });
  const texte = await rep.text();
  const donnees = texte ? JSON.parse(texte) : {};
  if (!rep.ok) {
    const erreur = new Error(`${methode} ${chemin} → ${rep.status} ${donnees.message ?? ''}`.trim());
    erreur.statut = rep.status;
    throw erreur;
  }
  return donnees;
}

/** Parcourt une liste paginée de Brevo (dossiers, listes). */
async function tout(chemin, cleTableau) {
  const resultats = [];
  for (let offset = 0; ; offset += 50) {
    const page = await brevo('GET', `${chemin}?limit=50&offset=${offset}`);
    const elements = page[cleTableau] ?? [];
    resultats.push(...elements);
    if (elements.length < 50) return resultats;
  }
}

function action(texte) {
  console.log(`${simulation ? '  [simulation] ' : '  + '}${texte}`);
}

try {
  const compte = await brevo('GET', '/account');
  console.log(`Compte Brevo : ${compte.companyName ?? compte.email}${simulation ? ' — simulation, rien ne sera créé' : ''}\n`);

  // ── Dossier et liste ──
  console.log('Liste');
  const listes = await tout('/contacts/lists', 'lists');
  let liste = listes.find((l) => l.name === NOM_LISTE);
  if (liste) {
    console.log(`  = « ${NOM_LISTE} » existe déjà`);
  } else {
    const dossiers = await tout('/contacts/folders', 'folders');
    let dossier = dossiers.find((d) => d.name === NOM_DOSSIER);
    if (!dossier) {
      action(`dossier « ${NOM_DOSSIER} »`);
      dossier = simulation ? { id: 0 } : await brevo('POST', '/contacts/folders', { name: NOM_DOSSIER });
    }
    action(`liste « ${NOM_LISTE} »`);
    liste = simulation ? { id: '(à créer)' } : await brevo('POST', '/contacts/lists', { name: NOM_LISTE, folderId: dossier.id });
  }

  // ── Attributs ──
  console.log('\nAttributs');
  const { attributes: existants = [] } = await brevo('GET', '/contacts/attributes');
  const noms = new Set(existants.map((a) => a.name));

  // Prénom et nom : natifs dans Brevo, mais nommés selon la langue du compte.
  let variablesNom = '';
  if (noms.has('PRENOM') && noms.has('NOM')) {
    console.log('  = PRENOM et NOM existent déjà');
  } else if (noms.has('FIRSTNAME') && noms.has('LASTNAME')) {
    console.log('  = compte en anglais : FIRSTNAME et LASTNAME seront utilisés');
    variablesNom = '\n  BREVO_ATTR_PRENOM = FIRSTNAME\n  BREVO_ATTR_NOM = LASTNAME';
  } else {
    for (const nom of ['PRENOM', 'NOM']) {
      if (noms.has(nom)) continue;
      action(`${nom} (text)`);
      if (!simulation) await brevo('POST', `/contacts/attributes/normal/${nom}`, { type: 'text' });
    }
  }

  for (const [nom, type] of ATTRIBUTS) {
    const present = existants.find((a) => a.name === nom);
    if (present) {
      const typeOk = !present.type || present.type === type;
      console.log(`  = ${nom}${typeOk ? '' : `  ⚠️ existe en type « ${present.type} », attendu « ${type} » : à corriger à la main`}`);
      continue;
    }
    action(`${nom} (${type})`);
    if (!simulation) await brevo('POST', `/contacts/attributes/normal/${nom}`, { type });
  }

  console.log(`\nÀ reporter dans Cloudflare → Workers & Pages → academie-shs → Settings → Variables and Secrets :`);
  console.log(`  BREVO_LIST_ID = ${liste.id}${variablesNom}`);
  console.log('\nReste à faire à la main : les segments par cours (voir docs/BREVO.md, § 3).');
} catch (erreur) {
  if (erreur.statut === 401 && /unrecognised IP/i.test(erreur.message)) {
    console.error(
      'Brevo bloque l’adresse IP de cet ordinateur (401).\n' +
        'Sécurité → IP autorisées (https://app.brevo.com/security/authorised_ips) : désactiver le blocage.\n' +
        'C’est de toute façon nécessaire en production — voir docs/BREVO.md, § 4.',
    );
  } else if (erreur.statut === 401) {
    console.error('Brevo refuse la clé (401) : vérifier qu’elle est complète et active.');
  } else {
    console.error(`Échec : ${erreur.message}`);
  }
  process.exit(1);
}
