// Interactions communes à toutes les pages : en-tête qui se resserre au défilement, apparitions,
// compteurs, classe en direct qui s'anime, barre d'inscription sur téléphone, vidéo de présentation.
//
// Le mouvement accompagne la lecture (choix du 16/10/2026 : « quelque chose de dynamique »), sans
// jamais retenir le contenu : la page est complète sans JavaScript, et rien ne bouge quand le
// visiteur a demandé moins d'animations. Les règles CSS du mouvement ne s'appliquent que sous la
// classe `anime`, posée ici sur <html>.

const calme = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function entete(): void {
  const entete = document.querySelector<HTMLElement>('[data-entete]');
  if (!entete) return;
  const maj = () => entete.classList.toggle('defile', window.scrollY > 8);
  window.addEventListener('scroll', maj, { passive: true });
  maj();
}

/** Compte de 0 jusqu'à la valeur écrite dans la page (celle qui reste affichée sans script). */
function compter(el: HTMLElement): void {
  const fin = Number.parseInt(el.dataset.compte ?? '', 10);
  if (!Number.isFinite(fin)) return;
  let debut: number | null = null;
  const pas = (instant: number) => {
    debut ??= instant;
    const p = Math.min(1, (instant - debut) / 1200);
    el.textContent = Math.round(fin * (1 - (1 - p) ** 3)).toLocaleString('fr-FR');
    if (p < 1) requestAnimationFrame(pas);
  };
  requestAnimationFrame(pas);
}

/** Le chronomètre de la classe dessinée tourne tant qu'elle est à l'écran. */
function chronometre(classe: HTMLElement): void {
  const chrono = classe.querySelector<HTMLElement>('[data-chrono]');
  if (!chrono) return;
  const [m, s] = (chrono.textContent ?? '0:0').split(':').map(Number);
  let secondes = m * 60 + s;
  let minuterie: number | undefined;
  const tic = () => {
    secondes += 1;
    const mm = String(Math.floor(secondes / 60)).padStart(2, '0');
    const ss = String(secondes % 60).padStart(2, '0');
    chrono.textContent = `${mm}:${ss}`;
  };
  new IntersectionObserver((entrees) => {
    for (const e of entrees) {
      if (e.isIntersecting && minuterie === undefined) minuterie = window.setInterval(tic, 1000);
      if (!e.isIntersecting && minuterie !== undefined) {
        window.clearInterval(minuterie);
        minuterie = undefined;
      }
    }
  }).observe(classe);
}

/** Apparitions, compteurs et classe animée : une seule fois, à l'arrivée à l'écran. */
function mouvement(): void {
  if (calme() || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('anime');
  document.documentElement.dataset.mouvement = 'pret';

  const observateur = new IntersectionObserver(
    (entrees) => {
      for (const e of entrees) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('vu');
        e.target.querySelectorAll<HTMLElement>('[data-compte]').forEach(compter);
        observateur.unobserve(e.target);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );
  document
    .querySelectorAll<HTMLElement>('[data-revele], .parcours, .repartition, [data-classe]')
    .forEach((el) => observateur.observe(el));

  const classe = document.querySelector<HTMLElement>('[data-classe]');
  if (classe) chronometre(classe);
}

/** Sur téléphone, « Se préinscrire » reste en bas de l'écran entre l'ouverture et le formulaire. */
function barreMobile(): void {
  const barre = document.querySelector<HTMLElement>('[data-barre-mobile]');
  const actions = document.querySelector<HTMLElement>('[data-actions]');
  const formulaire = document.getElementById('preinscription');
  if (!barre || !actions || !formulaire) return;
  const maj = () => {
    const passe = actions.getBoundingClientRect().bottom < 0;
    const auFormulaire = formulaire.getBoundingClientRect().top < window.innerHeight * 0.85;
    barre.classList.toggle('visible', passe && !auFormulaire);
  };
  window.addEventListener('scroll', maj, { passive: true });
  maj();
}

/**
 * Vidéo de présentation : rien ne se charge depuis YouTube avant le clic (pas de cookie, pas de
 * requête). Au clic, le lecteur youtube-nocookie remplace l'affiche.
 */
function video(): void {
  const figure = document.querySelector<HTMLElement>('[data-video]');
  const id = figure?.dataset.video;
  if (!figure || !id) return;
  const cadre = figure.querySelector<HTMLElement>('.video__cadre');
  const lancer = () => {
    if (!cadre || !cadre.isConnected) return;
    const lecteur = document.createElement('iframe');
    lecteur.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
    lecteur.title = cadre.getAttribute('aria-label') ?? '';
    lecteur.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    lecteur.allowFullscreen = true;
    // L'affiche est un bouton : le lecteur prend sa place (pas d'iframe dans un bouton).
    const conteneur = document.createElement('div');
    conteneur.className = 'video__cadre';
    conteneur.append(lecteur);
    cadre.replaceWith(conteneur);
    figure.scrollIntoView({ behavior: calme() ? 'auto' : 'smooth', block: 'center' });
  };
  document.querySelectorAll('[data-lancer-video]').forEach((b) => b.addEventListener('click', lancer));
}

export function demarrerPage(): void {
  entete();
  mouvement();
  barreMobile();
  video();
}
