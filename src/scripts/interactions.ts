// Interactions communes à toutes les pages : en-tête qui se fond au défilement, onglets (années du
// cursus, atouts des cours en ligne), apparition discrète des sections.
//
// Peu d'animation, et jamais au détriment du contenu : sans JavaScript, ou avec « réduire les
// animations », tout est visible d'emblée.

const calme = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function entete(): void {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;
  const maj = () => nav.classList.toggle('est-compacte', window.scrollY > 12);
  window.addEventListener('scroll', maj, { passive: true });
  maj();
}

/**
 * Onglets accessibles : clic, flèches, Début et Fin. Chaque onglet désigne son panneau par
 * `aria-controls` ; quand plusieurs onglets partagent un panneau (cours en ligne), c'est
 * `data-scene` qui choisit la scène affichée dedans.
 */
function onglets(): void {
  document.querySelectorAll<HTMLElement>('[data-onglets]').forEach((liste) => {
    const boutons = Array.from(liste.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const vertical = liste.getAttribute('aria-orientation') === 'vertical';

    function choisir(bouton: HTMLButtonElement, focaliser: boolean): void {
      for (const b of boutons) {
        const actif = b === bouton;
        b.setAttribute('aria-selected', String(actif));
        b.tabIndex = actif ? 0 : -1;
        const panneau = document.getElementById(b.getAttribute('aria-controls') ?? '');
        if (!panneau) continue;
        if (b.dataset.scene) {
          if (actif) {
            panneau.setAttribute('aria-labelledby', b.id);
            panneau.querySelectorAll<HTMLElement>('[data-scene-vue]').forEach((s) => {
              s.classList.toggle('est-visible', s.dataset.sceneVue === b.dataset.scene);
            });
          }
        } else {
          panneau.hidden = !actif;
        }
      }
      if (focaliser) bouton.focus();
    }

    for (const b of boutons) {
      b.addEventListener('click', () => choisir(b, false));
      b.addEventListener('keydown', (e) => {
        const i = boutons.indexOf(b);
        const rtl = document.documentElement.dir === 'rtl';
        const suivant = vertical ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight';
        const precedent = vertical ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft';
        let cible: HTMLButtonElement | undefined;
        if (e.key === suivant) cible = boutons[(i + 1) % boutons.length];
        else if (e.key === precedent) cible = boutons[(i - 1 + boutons.length) % boutons.length];
        else if (e.key === 'Home') cible = boutons[0];
        else if (e.key === 'End') cible = boutons[boutons.length - 1];
        if (!cible) return;
        e.preventDefault();
        choisir(cible, true);
      });
    }
  });
}

/** Les sections `.apparait` montent légèrement en entrant à l'écran, une seule fois. */
function apparitions(): void {
  if (calme() || !('IntersectionObserver' in window)) return;
  const sections = Array.from(document.querySelectorAll<HTMLElement>('.apparait'));
  const observateur = new IntersectionObserver(
    (entrees) => {
      for (const e of entrees) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('est-apparue');
        observateur.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  for (const s of sections) {
    // Une section déjà à l'écran au chargement reste telle quelle : rien ne clignote.
    if (s.getBoundingClientRect().top < window.innerHeight) continue;
    s.classList.add('en-attente');
    observateur.observe(s);
  }
}

export function demarrerPage(): void {
  entete();
  onglets();
  apparitions();
}
