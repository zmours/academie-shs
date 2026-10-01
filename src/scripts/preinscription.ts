// Comportement de la page d'accueil : ajout des cours depuis le catalogue, filtres par pôle,
// barre de sélection, envoi du formulaire.
//
// Les cases « modules » du formulaire sont l'UNIQUE état de la sélection : les boutons des cartes
// et la barre ne font que les refléter. La sélection est gardée dans le navigateur pour survivre
// à un rechargement, jamais envoyée ailleurs que par le formulaire.

const CLE_SELECTION = 'academie-shs:selection';
const CLE_UTM = 'academie-shs:utm';
const PARAMETRES_UTM = ['utm_source', 'utm_medium', 'utm_campaign'] as const;

type LangueSite = 'fr' | 'ar' | 'en';

function lireStockage(stockage: () => Storage, cle: string): string | null {
  try {
    return stockage().getItem(cle);
  } catch {
    return null;
  }
}

function ecrireStockage(stockage: () => Storage, cle: string, valeur: string | null): void {
  try {
    if (valeur === null) stockage().removeItem(cle);
    else stockage().setItem(cle, valeur);
  } catch {
    // Navigation privée ou stockage bloqué : la page fonctionne sans.
  }
}

function libelleCompte(n: number, langue: LangueSite): string {
  if (langue === 'ar') {
    if (n === 1) return 'مادة واحدة مختارة';
    if (n === 2) return 'مادتان مختارتان';
    return n <= 10 ? `${n} مواد مختارة` : `${n} مادة مختارة`;
  }
  if (langue === 'en') return n === 1 ? '1 course selected' : `${n} courses selected`;
  return n === 1 ? '1 cours sélectionné' : `${n} cours sélectionnés`;
}

function memoriserUtm(): void {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const p of PARAMETRES_UTM) {
    const v = params.get(p);
    if (v) utm[p] = v.slice(0, 100);
  }
  if (Object.keys(utm).length > 0) ecrireStockage(() => sessionStorage, CLE_UTM, JSON.stringify(utm));
}

function lireUtm(): Record<string, string> {
  try {
    return JSON.parse(lireStockage(() => sessionStorage, CLE_UTM) ?? '{}');
  } catch {
    return {};
  }
}

export function demarrer(): void {
  const formulaire = document.querySelector<HTMLFormElement>('[data-formulaire]');
  if (!formulaire) return;
  const langue = (formulaire.dataset.langue ?? 'fr') as LangueSite;
  const cases = Array.from(formulaire.querySelectorAll<HTMLInputElement>('input[name="modules"]'));
  const boutonsAjout = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-ajouter]'));
  const cartes = Array.from(document.querySelectorAll<HTMLElement>('[data-cours]'));
  const filtres = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-filtre]'));
  const barre = document.querySelector<HTMLElement>('[data-barre]');
  const zoneFormulaire = document.querySelector<HTMLElement>('#preinscription');
  let formulaireVisible = false;
  let envoye = false;

  memoriserUtm();

  const selection = (): HTMLInputElement[] => cases.filter((c) => c.checked);

  function rafraichir(): void {
    const choisis = selection();
    const ids = new Set(choisis.map((c) => c.value));

    for (const bouton of boutonsAjout) {
      bouton.setAttribute('aria-pressed', String(ids.has(bouton.dataset.ajouter ?? '')));
    }
    for (const carte of cartes) {
      carte.classList.toggle('est-choisie', ids.has(carte.dataset.cours ?? ''));
    }

    const compte = choisis.length > 0 ? `— ${libelleCompte(choisis.length, langue)}` : '';
    formulaire!.querySelectorAll('[data-compte]').forEach((el) => (el.textContent = compte));

    if (barre) {
      barre.querySelector('[data-barre-compte]')!.textContent = libelleCompte(choisis.length, langue);
      barre.querySelector('[data-barre-liste]')!.textContent = choisis.map((c) => c.dataset.court).join(' · ');
      barre.classList.toggle('est-visible', choisis.length > 0 && !formulaireVisible && !envoye);
    }

    if (!envoye) {
      ecrireStockage(() => localStorage, CLE_SELECTION, ids.size > 0 ? JSON.stringify([...ids]) : null);
    }
  }

  // Sélection retrouvée après un rechargement.
  try {
    const memo: unknown = JSON.parse(lireStockage(() => localStorage, CLE_SELECTION) ?? '[]');
    if (Array.isArray(memo)) for (const c of cases) c.checked = memo.includes(c.value);
  } catch {
    // Valeur illisible : on repart d'une sélection vide.
  }

  for (const bouton of boutonsAjout) {
    bouton.addEventListener('click', () => {
      const caseCours = cases.find((c) => c.value === bouton.dataset.ajouter);
      if (!caseCours) return;
      caseCours.checked = !caseCours.checked;
      masquerErreur('modules');
      rafraichir();
    });
  }

  for (const c of cases) {
    c.addEventListener('change', () => {
      masquerErreur('modules');
      rafraichir();
    });
  }

  for (const filtre of filtres) {
    filtre.addEventListener('click', () => {
      const pole = filtre.dataset.filtre;
      for (const f of filtres) f.setAttribute('aria-pressed', String(f === filtre));
      for (const carte of cartes) carte.hidden = pole !== 'tous' && carte.dataset.pole !== pole;
    });
  }

  // La barre s'efface quand le formulaire est à l'écran : elle ne sert qu'à y mener.
  if (zoneFormulaire && 'IntersectionObserver' in window) {
    new IntersectionObserver(
      (entrees) => {
        formulaireVisible = entrees.some((e) => e.isIntersecting);
        rafraichir();
      },
      { threshold: 0.15 },
    ).observe(zoneFormulaire);
  }

  formulaire
    .querySelectorAll<HTMLInputElement>('input[name="langues"]')
    .forEach((c) => c.addEventListener('change', () => masquerErreur('langues')));

  function afficherErreur(groupe: string, message: string): void {
    const el = formulaire!.querySelector<HTMLElement>(`[data-erreur-pour="${groupe}"]`);
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
  }

  function masquerErreur(groupe: string): void {
    const el = formulaire!.querySelector<HTMLElement>(`[data-erreur-pour="${groupe}"]`);
    if (el) el.hidden = true;
  }

  function valeursCochees(nom: string): string[] {
    return Array.from(formulaire!.querySelectorAll<HTMLInputElement>(`input[name="${nom}"]:checked`)).map(
      (c) => c.value,
    );
  }

  function valider(): boolean {
    let valide = formulaire!.checkValidity();
    if (selection().length === 0) {
      afficherErreur('modules', formulaire!.dataset.erreurCours ?? '');
      valide = false;
    }
    if (valeursCochees('langues').length === 0) {
      afficherErreur('langues', formulaire!.dataset.erreurLangues ?? '');
      valide = false;
    }
    if (!valide) {
      formulaire!.reportValidity();
      const premiereErreur =
        formulaire!.querySelector<HTMLElement>(':invalid') ??
        formulaire!.querySelector<HTMLElement>('.erreur-champ:not([hidden])');
      premiereErreur?.scrollIntoView({ block: 'center', behavior: 'smooth' });
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
      modules: valeursCochees('modules'),
      langues: valeursCochees('langues'),
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

      envoye = true;
      ecrireStockage(() => localStorage, CLE_SELECTION, null);
      formulaire.hidden = true;
      document.querySelector<HTMLElement>('[data-bloc-formulaire]')?.setAttribute('hidden', '');
      const merci = document.querySelector<HTMLElement>('[data-merci]');
      if (merci) {
        merci.hidden = false;
        merci.focus();
      }
      barre?.classList.remove('est-visible');
    } catch {
      messageErreur.hidden = false;
      messageErreur.scrollIntoView({ block: 'center', behavior: 'smooth' });
      (window as unknown as { turnstile?: { reset: () => void } }).turnstile?.reset();
    } finally {
      boutonEnvoi.disabled = false;
      boutonEnvoi.textContent = libelleEnvoyer;
    }
  });

  rafraichir();
}
