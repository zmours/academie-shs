// Envoi du formulaire de préinscription au cursus, vers `/api/preinscription` (worker/).
//
// Depuis le 11/10/2026, on se préinscrit au cursus complet : plus de cours à cocher, la fonction
// serveur enregistre elle-même le cursus. Rien n'est gardé dans le navigateur, sauf la provenance
// de la visite (paramètres utm_*), le temps de la session.

const CLE_UTM = 'academie-shs:utm';
const PARAMETRES_UTM = ['utm_source', 'utm_medium', 'utm_campaign'] as const;

function memoriserUtm(): void {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const p of PARAMETRES_UTM) {
    const v = params.get(p);
    if (v) utm[p] = v.slice(0, 100);
  }
  if (Object.keys(utm).length === 0) return;
  try {
    sessionStorage.setItem(CLE_UTM, JSON.stringify(utm));
  } catch {
    // Navigation privée ou stockage bloqué : la provenance n'est simplement pas transmise.
  }
}

function lireUtm(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(CLE_UTM) ?? '{}');
  } catch {
    return {};
  }
}

export function demarrer(): void {
  const formulaire = document.querySelector<HTMLFormElement>('[data-formulaire]');
  if (!formulaire) return;
  const langue = formulaire.dataset.langue ?? 'fr';

  memoriserUtm();

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
      turnstile: String(donnees.get('cf-turnstile-response') ?? ''),
      utm: lireUtm(),
    };

    boutonEnvoi.disabled = true;
    boutonEnvoi.textContent = formulaire.dataset.libelleEnvoi ?? libelleEnvoyer;

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
