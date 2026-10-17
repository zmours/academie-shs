// Envoi du formulaire de préinscription au cursus, vers `/api/preinscription` (worker/).
//
// Depuis le 11/10/2026, on se préinscrit au cursus complet : plus de cours à cocher, la fonction
// serveur enregistre elle-même le cursus.
//
// Rien n'est écrit dans le navigateur (ni cookie, ni stockage) : c'est ce qui dispense le site de
// bandeau de consentement (17/10/2026). La provenance d'une campagne (paramètres utm_*) est lue
// dans l'adresse de la page au moment de l'envoi. Le contrôle anti-robot de Cloudflare (Turnstile)
// n'est chargé qu'à la première interaction avec le formulaire : une simple visite n'appelle aucun
// service tiers.

const PARAMETRES_UTM = ['utm_source', 'utm_medium', 'utm_campaign'] as const;
const SCRIPT_TURNSTILE = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

function lireUtm(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const p of PARAMETRES_UTM) {
    const v = params.get(p);
    if (v) utm[p] = v.slice(0, 100);
  }
  return utm;
}

/** Charge Turnstile une seule fois ; il affiche alors lui-même son contrôle dans `.cf-turnstile`. */
function chargerTurnstile(): void {
  if (document.querySelector(`script[src="${SCRIPT_TURNSTILE}"]`)) return;
  const script = document.createElement('script');
  script.src = SCRIPT_TURNSTILE;
  script.async = true;
  document.head.append(script);
}

/** Le jeton Turnstile, attendu jusqu'à 8 s si le contrôle n'a pas encore fini (envoi très rapide). */
async function jetonTurnstile(formulaire: HTMLFormElement): Promise<string> {
  const lire = () => formulaire.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]')?.value ?? '';
  for (let attente = 0; !lire() && attente < 8000; attente += 200) {
    await new Promise((fin) => setTimeout(fin, 200));
  }
  return lire();
}

export function demarrer(): void {
  const formulaire = document.querySelector<HTMLFormElement>('[data-formulaire]');
  if (!formulaire) return;
  const langue = formulaire.dataset.langue ?? 'fr';

  // Turnstile : chargé dès que le visiteur touche au formulaire, le temps qu'il le remplisse.
  const avecTurnstile = formulaire.querySelector('.cf-turnstile') !== null;
  if (avecTurnstile) {
    for (const evenement of ['focusin', 'pointerdown'] as const) {
      formulaire.addEventListener(evenement, chargerTurnstile, { once: true });
    }
  }

  function valeursCochees(nom: string): string[] {
    return Array.from(formulaire!.querySelectorAll<HTMLInputElement>(`input[name="${nom}"]:checked`)).map(
      (c) => c.value,
    );
  }

  function valider(): boolean {
    const valide = formulaire!.checkValidity();
    if (!valide) {
      formulaire!.reportValidity();
      formulaire!.querySelector<HTMLElement>(':invalid')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    return valide;
  }

  const boutonEnvoi = formulaire.querySelector<HTMLButtonElement>('[data-envoyer]')!;
  const messageErreur = formulaire.querySelector<HTMLElement>('[data-message-erreur]')!;
  const libelleEnvoyer = boutonEnvoi.textContent ?? '';

  formulaire.addEventListener('submit', async (evenement) => {
    evenement.preventDefault();
    messageErreur.hidden = true;
    if (!valider()) return;

    boutonEnvoi.disabled = true;
    boutonEnvoi.textContent = formulaire.dataset.libelleEnvoi ?? libelleEnvoyer;
    if (avecTurnstile) chargerTurnstile();
    const turnstile = avecTurnstile ? await jetonTurnstile(formulaire) : '';

    const donnees = new FormData(formulaire);
    const charge = {
      prenom: String(donnees.get('prenom') ?? ''),
      nom: String(donnees.get('nom') ?? ''),
      courriel: String(donnees.get('courriel') ?? ''),
      whatsapp: String(donnees.get('whatsapp') ?? ''),
      pays: String(donnees.get('pays') ?? ''),
      niveau: String(donnees.get('niveau') ?? ''),
      origine: String(donnees.get('origine') ?? ''),
      creneaux: valeursCochees('creneaux'),
      majeur: donnees.get('majeur') === 'on',
      consentement: donnees.get('consentement') === 'on',
      newsletter: donnees.get('newsletter') === 'on',
      langueSite: langue,
      siteWeb: String(donnees.get('site_web') ?? ''),
      turnstile,
      utm: lireUtm(),
    };

    try {
      const reponse = await fetch('/api/preinscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(charge),
      });
      if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);

      formulaire.hidden = true;
      document.querySelector<HTMLElement>('[data-bloc-formulaire]')?.setAttribute('hidden', '');
      const merci = document.querySelector<HTMLElement>('[data-merci]');
      if (merci) {
        merci.hidden = false;
        merci.focus();
        merci.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    } catch {
      messageErreur.hidden = false;
      messageErreur.scrollIntoView({ block: 'center', behavior: 'smooth' });
      (window as unknown as { turnstile?: { reset: () => void } }).turnstile?.reset();
    } finally {
      boutonEnvoi.disabled = false;
      boutonEnvoi.textContent = libelleEnvoyer;
    }
  });
}
