import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUp, ChevronDown, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ZoomableImage } from "@/components/ZoomableImage";
import { APH_COURSE_PATH, chapterPath } from "@/data/coursAPH";

import intro1 from "@/assets/cours-dn-s1/anatomie/intro-1.jpg";
import intro2 from "@/assets/cours-dn-s1/anatomie/intro-2.jpg";
import intro3 from "@/assets/cours-dn-s1/anatomie/intro-3.jpg";
import fig1a from "@/assets/cours-dn-s1/anatomie/fig1-a.jpg";
import fig1b from "@/assets/cours-dn-s1/anatomie/fig1-b.jpg";
import fig2 from "@/assets/cours-dn-s1/anatomie/fig2.jpg";
import fig3 from "@/assets/cours-dn-s1/anatomie/fig3.jpg";
import fig4 from "@/assets/cours-dn-s1/anatomie/fig4.jpg";
import fig5 from "@/assets/cours-dn-s1/anatomie/fig5.jpg";
import fig6 from "@/assets/cours-dn-s1/anatomie/fig6.jpg";
import fig7 from "@/assets/cours-dn-s1/anatomie/fig7.jpg";

const GREEN = "#1a7a4a";

/* ------------------------------------------------------------------ */
/* Table des matières                                                   */
/* ------------------------------------------------------------------ */
type TocEntry = { label: string; id: string; level: 1 | 2 };
const TOC: TocEntry[] = [
  { label: "1.1 Définition des concepts du chapitre", id: "s-1-1", level: 1 },
  { label: "1.1.1 Anatomie", id: "s-1-1-1", level: 2 },
  { label: "1.1.2 Physiologie", id: "s-1-1-2", level: 2 },
  { label: "1.1.3 Relation entre la fonction et la structure", id: "s-1-1-3", level: 2 },
  { label: "1.2 Niveaux d’organisation biologique de l’être humain", id: "s-1-2", level: 1 },
  { label: "1.3 Position anatomique et orientation", id: "s-1-3", level: 1 },
  { label: "1.3.1 La position anatomique", id: "s-1-3-1", level: 2 },
  { label: "1.3.2 Les plans et coupe", id: "s-1-3-2", level: 2 },
  { label: "1.3.3 Termes relatifs à l’orientation", id: "s-1-3-3", level: 2 },
  { label: "1.4 Les cavités corporelles", id: "s-1-4", level: 1 },
  { label: "1.5 Les régions et les quadrants abdominopelviens", id: "s-1-5", level: 1 },
  { label: "1.6 L’homéostasie : le respect des limites", id: "s-1-6", level: 1 },
  { label: "1.6.1 Définition", id: "s-1-6-1", level: 2 },
  { label: "1.6.2 Mécanisme de régulation de l’homéostasie", id: "s-1-6-2", level: 2 },
];

function TocList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Table des matières">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: GREEN }}>
        Table des matières
      </p>
      <ol className="space-y-1 text-sm">
        {TOC.map((t) => (
          <li key={t.id} className={t.level === 2 ? "pl-3" : ""}>
            <a
              href={`#${t.id}`}
              onClick={onNavigate}
              className={cn(
                "block rounded px-2 py-1 transition-colors hover:bg-emerald-500/10",
                t.level === 1 ? "font-semibold text-foreground/90" : "text-foreground/70",
              )}
              style={{ color: t.level === 1 ? undefined : undefined }}
            >
              {t.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Aides de mise en page                                                */
/* ------------------------------------------------------------------ */
function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-display mt-12 mb-5 border-b pb-2 text-2xl font-bold sm:text-3xl"
      style={{ color: GREEN, borderColor: `${GREEN}33`, scrollMarginTop: "6rem" }}
    >
      {children}
    </h2>
  );
}
function H3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="font-display mt-8 mb-3 text-xl font-semibold text-foreground" style={{ scrollMarginTop: "6rem" }}>
      {children}
    </h3>
  );
}
function Figure({ src, n, caption, small }: { src: string; n: number; caption: string; small?: boolean }) {
  return (
    <figure className="my-6">
      <div className={cn("rounded-lg border border-border bg-white p-2", small ? "mx-auto max-w-sm" : "mx-auto max-w-2xl")}>
        <ZoomableImage src={src} alt={caption} className="h-auto w-full rounded" />
      </div>
      <figcaption className="mt-2 text-center text-sm italic text-muted-foreground">
        <span className="font-semibold not-italic text-foreground">Fig. {n}</span> — {caption}
      </figcaption>
    </figure>
  );
}
function FigureStack({ parts, n, caption }: { parts: { src: string; alt: string }[]; n: number; caption: string }) {
  return (
    <figure className="my-6">
      <div className="mx-auto max-w-3xl rounded-lg border border-border bg-white p-2">
        <div className="flex flex-col gap-0">
          {parts.map((p, i) => (
            <ZoomableImage key={i} src={p.src} alt={p.alt} className="w-full" />
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm italic text-muted-foreground">
        <span className="font-semibold not-italic text-foreground">Fig. {n}</span> — {caption}
      </figcaption>
    </figure>
  );
}
function Def({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <p>
      <span className="font-semibold text-foreground underline decoration-emerald-600/60 underline-offset-2">{term}</span> : {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Composant principal — Chapitre 1                                     */
/* ------------------------------------------------------------------ */
export default function CoursAPHChapitre1() {
  const [mobileToc, setMobileToc] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-background">
      <header
        className="border-b border-border"
        style={{ background: "linear-gradient(135deg, #eaf7f0, #ffffff)" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <Link
            to={APH_COURSE_PATH}
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Retour aux chapitres du cours
          </Link>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: GREEN }}>
            Licence · Option Diététique &amp; Nutrition · Semestre 1 · Anatomie et physiologie humaine
          </p>
          <h1 className="font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Chapitre 1 — Organisation du corps humain
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Anatomie et physiologie, niveaux d’organisation biologique, position anatomique,
            plans et coupes, orientation, cavités corporelles, régions abdominopelviennes et homéostasie.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div
            className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-lg border border-border bg-card p-4"
          >
            <TocList />
          </div>
        </aside>

        <div className="lg:hidden">
          <button
            onClick={() => setMobileToc((v) => !v)}
            className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold"
            aria-expanded={mobileToc}
          >
            <span className="flex items-center gap-2">
              <Menu size={16} aria-hidden="true" />
              Table des matières
            </span>
            {mobileToc ? <ChevronDown size={16} /> : <ChevronDown size={16} className="rotate-180" />}
          </button>
          {mobileToc && (
            <div className="mt-2 rounded-lg border border-border bg-card p-4">
              <TocList onNavigate={() => setMobileToc(false)} />
            </div>
          )}
        </div>

        <article className="min-w-0 text-[16px] leading-relaxed text-foreground/85">
          {/* Figure d'introduction du document source (non numérotée) */}
          <figure className="my-6">
            <div className="mx-auto max-w-3xl rounded-lg border border-border bg-white p-2">
              <div className="flex flex-col gap-0">
                <ZoomableImage src={intro1} alt="Pendant la minute qu’il vous faudra pour lire cette page (partie 1)" className="w-full" />
                <ZoomableImage src={intro2} alt="Pendant la minute qu’il vous faudra pour lire cette page (partie 2)" className="w-full" />
                <ZoomableImage src={intro3} alt="Pendant la minute qu’il vous faudra pour lire cette page (partie 3)" className="w-full" />
              </div>
            </div>
            <figcaption className="mt-2 text-center text-sm italic text-muted-foreground">
              Pendant la minute qu’il vous faudra pour lire cette page.
            </figcaption>
          </figure>

          {/* ------------------------------ 1.1 ------------------------------ */}
          <H2 id="s-1-1">1.1 Définition des concepts du chapitre</H2>
          <p>
            L’étude du corps humain est possible grâce à deux disciplines scientifiques :
            l’anatomie et la physiologie.
          </p>

          <H3 id="s-1-1-1">1.1.1 Anatomie</H3>
          <p>
            L’anatomie est la branche de la biologie qui étudie la forme et la structure des
            parties du corps humain et leurs interrelations. L’anatomie comprend :
          </p>
          <ul className="mb-4 list-disc space-y-1.5 pl-6">
            <li>
              <strong>Anatomie macroscopique</strong> : consiste à étudier les structures visibles
              à l’œil nu, comme le cœur, les poumons, et les reins.
            </li>
            <li>
              <strong>Anatomie microscopique</strong>, s’intéresse aux structures invisibles à
              l’œil nu :
              <ul className="mt-1.5 list-[circle] space-y-1 pl-6">
                <li>La cytologie : étude de la cellule ;</li>
                <li>L’histologie : étude des tissus.</li>
              </ul>
            </li>
            <li>
              <strong>Anatomie régionale</strong>, qui étudie toutes les structures d’une certaine
              partie du corps, par exemple la région thoracique.
            </li>
            <li>
              <strong>L’anatomie du développement</strong> : suit la transformation structurale de
              l’organisme qui se déroule tout au long de la vie. L’embryologie est une des branches
              de cette discipline et traite du développement prénatal.
            </li>
          </ul>

          <H3 id="s-1-1-2">1.1.2 Physiologie</H3>
          <p>
            La physiologie, quant à elle, est la branche de la biologie qui étudie le
            fonctionnement de ces différentes parties du corps, ex :
          </p>
          <ul className="mb-4 list-disc space-y-1.5 pl-6">
            <li>
              <strong>Physiologie rénale</strong> : étude du fonctionnement des reins et la
              production d’urine ;
            </li>
            <li>
              <strong>Physiologie cardiovasculaire</strong> : examine le fonctionnement du cœur et
              des vaisseaux sanguins.
            </li>
          </ul>

          <H3 id="s-1-1-3">1.1.3 Relation entre la fonction et la structure</H3>
          <p>
            Les deux disciplines (anatomie-physiologie) sont interdépendantes. Il existe aussi une
            relation entre la structure du corps humain et sa fonction. En effet, la fonction d’un
            organe est toujours étroitement liée à sa structure particulière. Par exemple :
          </p>
          <ul className="mb-4 list-disc space-y-1.5 pl-6">
            <li>
              l’utérus peut expulser le fœtus à la naissance, grâce à sa paroi composée de trois
              couches de muscles ;
            </li>
            <li>
              les poumons, qui sont composés d’alvéoles pulmonaires (petits sacs aux parois
              extrêmement minces), permettent les échanges gazeux entre l’air qu’ils contiennent et
              le sang ;
            </li>
            <li>
              la forme de la bouche facilite la prise de nourriture et les dents assurent la
              mastication.
            </li>
          </ul>

          {/* ------------------------------ 1.2 ------------------------------ */}
          <H2 id="s-1-2">1.2 Niveaux d’organisation biologique de l’être humain</H2>
          <FigureStack
            n={1}
            caption="Niveaux d’organisation biologique de l’être humain."
            parts={[
              { src: fig1a, alt: "Niveaux d’organisation biologique de l’être humain (partie 1)" },
              { src: fig1b, alt: "Niveaux d’organisation biologique de l’être humain (partie 2)" },
            ]}
          />

          {/* ------------------------------ 1.3 ------------------------------ */}
          <H2 id="s-1-3">1.3 Position anatomique et orientation</H2>

          <H3 id="s-1-3-1">1.3.1 La position anatomique</H3>
          <p>
            Pour décrire avec précision une partie du corps et sa position, il faut une attitude de
            référence et une direction. L’attitude de référence est une position standard appelée
            <strong> position anatomique</strong> (c’est la position de référence pour toute
            description anatomique).
          </p>
          <p className="mb-2 font-semibold">La position anatomique de base :</p>
          <ul className="mb-4 list-disc space-y-1.5 pl-6">
            <li>Debout ;</li>
            <li>Pieds serrés et parallèles ;</li>
            <li>Paumes vers l’avant ;</li>
            <li>Regard droit à l’horizontal.</li>
          </ul>
          <p className="mb-2 font-semibold">Le corps humain présente quatre grandes parties :</p>
          <ul className="mb-4 list-disc space-y-1.5 pl-6">
            <li>tête ;</li>
            <li>cou ;</li>
            <li>
              tronc : se divise en deux sous-ensembles : thorax et abdomen ;
            </li>
            <li>membres.</li>
          </ul>
          <Figure
            n={2}
            caption="La position anatomique. Chaque région du corps est désignée par son nom courant, accompagné entre parenthèses du terme anatomique correspondant (Tortora, 2016)."
            src={fig2}
          />

          <H3 id="s-1-3-2">1.3.2 Les plans et coupe</H3>
          <p>
            Un organe est décrit par rapport à l’observateur (exemple : vue de face, vue de dessus)
            ou par rapport à un plan de coupe. Un schéma est systématiquement titré et orienté.
            Pour étudier la structure interne d’un organe, il est nécessaire d’effectuer une coupe
            le long d’un plan imaginaire défini par deux droites :
          </p>
          <ul className="mb-4 list-disc space-y-1.5 pl-6">
            <li>
              <strong>le plan sagittal</strong> : il est obtenu à partir d’une verticale et d’une
              horizontale d’avant en arrière. Il détermine les parties de droite et gauche. Il peut
              être médian ou para-médian ;
            </li>
            <li>
              <strong>le plan frontal ou coronal</strong> : est obtenu à partir d’une verticale et
              d’une horizontale droite et gauche. Il détermine les parties antérieures et
              postérieures ;
            </li>
            <li>
              <strong>le plan transverse</strong> : est obtenu à partir de deux horizontales, il
              détermine les parties supérieures et inférieures. Il est situé par rapport aux
              vertèbres ;
            </li>
            <li>
              <strong>les plans obliques</strong> : coupent un organe selon son plus grand axe ou
              perpendiculairement à celui-ci.
            </li>
          </ul>
          <Figure n={3} caption="Plans et coupes (couramment utilisés en anatomie)." src={fig3} small />

          <H3 id="s-1-3-3">1.3.3 Termes relatifs à l’orientation</H3>
          <ul className="mb-4 space-y-1.5">
            <li><Def term="Supérieur (céphalique)">vers la tête, ou vers le haut d’une structure ou du corps (au-dessus).</Def></li>
            <li><Def term="Inférieur (caudal)">à l’opposé de la tête, ou vers le bas d’une structure ou du corps (au-dessous).</Def></li>
            <li><Def term="Antérieur (ventral)">vers l’avant ou à l’avant du corps (devant).</Def></li>
            <li><Def term="Postérieur (dorsal)">vers le dos ou au dos du corps (derrière).</Def></li>
            <li><Def term="Médial (médian)">vers le plan médian du corps.</Def></li>
            <li><Def term="Intermédiaire (moyen)">entre une structure plus médiale et une structure plus latérale.</Def></li>
            <li><Def term="Latéral">plus éloigné du plan médian du corps.</Def></li>
            <li><Def term="Proximal">plus près de l’origine d’une structure ou d’un point d’attache d’un membre au tronc.</Def></li>
            <li><Def term="Distal">plus éloigné de l’origine d’une structure ou d’un point d’attache d’un membre au tronc.</Def></li>
            <li><Def term="Superficiel">près de la surface du corps.</Def></li>
            <li><Def term="Profond">loin de la surface du corps, plus interne.</Def></li>
          </ul>
          <Figure
            n={4}
            caption="Termes relatifs à l’orientation du corps : ces termes indiquent la position des différentes structures corporelles les unes par rapport aux autres, chez un sujet placé en position anatomique."
            src={fig4}
          />

          {/* ------------------------------ 1.4 ------------------------------ */}
          <H2 id="s-1-4">1.4 Les cavités corporelles</H2>
          <p>
            Les cavités corporelles représentent des espaces restreints du corps qui contient des
            organes internes.
          </p>
          <p className="mb-2">La cavité postérieure comprend deux subdivisions :</p>
          <ul className="mb-4 list-disc space-y-1.5 pl-6">
            <li>la <strong>cavité crânienne</strong> qui contient l’encéphale ;</li>
            <li>la <strong>cavité vertébrale</strong> qui contient la moelle épinière.</li>
          </ul>
          <p>
            La cavité dorsale = la cavité ventrale = cavité antérieure, elle comprend aussi des
            subdivisions :
          </p>
          <ul className="mb-4 list-disc space-y-1.5 pl-6">
            <li>une partie supérieure, la <strong>cavité thoracique</strong> ;</li>
            <li>
              une partie inférieure, la <strong>cavité abdomino-pelvienne</strong>, divisée elle
              aussi en : cavité abdominale et cavité pelvienne.
            </li>
          </ul>
          <Figure n={5} caption="Cavités du corps humain (Mader et Windelspecht, 2012)." src={fig5} />

          {/* ------------------------------ 1.5 ------------------------------ */}
          <H2 id="s-1-5">1.5 Les régions et les quadrants abdominopelviens</H2>
          <p>
            Afin de situer plus précisément les nombreux organes abdominaux et pelviens, on peut
            diviser la cavité abdominopelvienne en compartiments plus petits. Dans l’une des
            méthodes, on sépare la cavité en neuf régions abdominopelviennes au moyen de deux plans
            transversaux et de deux plans verticaux placés comme dans une grille.
          </p>
          <Figure
            n={6}
            caption="En raison de sa taille et de sa complexité, la cavité abdominopelvienne est souvent subdivisée de deux façons : (a) les quatre quadrants abdominaux. (b) les neuf régions de l’abdomen."
            src={fig6}
          />

          {/* ------------------------------ 1.6 ------------------------------ */}
          <H2 id="s-1-6">1.6 L’homéostasie : le respect des limites</H2>

          <H3 id="s-1-6-1">1.6.1 Définition</H3>
          <p>
            L’<strong>homéostasie</strong> (homoios : semblable ; stasis : position) est l’état
            d’équilibre du milieu intérieur qui résulte de l’interaction constante des nombreux
            mécanismes de régulation de l’organisme. Il ne s’agit pas d’un état statique, mais d’un
            état d’équilibre dynamique parce que le point d’équilibre du corps peut varier en
            réponse à diverses situations, mais toujours dans des limites étroites propres au
            maintien de la vie.
          </p>

          <div className="my-6 overflow-x-auto rounded-lg border border-border">
            <p className="border-b border-border bg-emerald-50 px-4 py-2.5 text-sm font-semibold" style={{ color: GREEN }}>
              Tableau 1 — Paramètres de l’homéostasie
            </p>
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr style={{ background: "#fde8d8" }}>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">Variables internes (Facteurs contrôlés)</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">Représentation schématique de l’homéostasie</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">Stimulus internes ou externes</th>
                  <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">Facteurs influant sur les valeurs normales</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-3 py-3 align-top text-foreground/90">
                    <p className="font-semibold text-foreground">Exemples</p>
                    <ul className="mt-1.5 list-disc space-y-1 pl-4">
                      <li>Température corporelle</li>
                      <li>Glycémie</li>
                      <li>Pression artérielle</li>
                      <li>Concentration sanguine de différents ions</li>
                      <li>Gaz sanguins artériels (rapport O₂/CO₂)</li>
                    </ul>
                  </td>
                  <td className="border border-border px-3 py-3 align-top text-foreground/90">
                    <p className="font-semibold text-foreground">Équilibre dans une fourchette de valeurs normales (minimales à maximales)</p>
                    <svg viewBox="0 0 220 120" className="mt-2 h-28 w-full max-w-[220px]" role="img" aria-label="Courbe d’une variable oscillant entre une valeur minimale et une valeur maximale autour de la moyenne">
                      <line x1="40" y1="30" x2="40" y2="105" stroke="#374151" strokeWidth="2" />
                      <polygon points="40,30 36,38 44,38" fill="#374151" />
                      <line x1="40" y1="45" x2="200" y2="45" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="5 4" />
                      <line x1="40" y1="75" x2="200" y2="75" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="5 4" />
                      <line x1="40" y1="105" x2="200" y2="105" stroke="#374151" strokeWidth="2" />
                      <path d="M45 75 Q 62 45 80 60 T 115 75 T 150 75 T 185 78" fill="none" stroke="#6faa3f" strokeWidth="3" />
                      <text x="34" y="49" textAnchor="end" fontSize="11" fill="#374151">Max.</text>
                      <text x="34" y="79" textAnchor="end" fontSize="11" fill="#374151">Moy.</text>
                      <text x="34" y="109" textAnchor="end" fontSize="11" fill="#374151">Min.</text>
                    </svg>
                  </td>
                  <td className="border border-border px-3 py-3 align-top text-foreground/90">
                    <p className="font-semibold text-foreground">Exemples</p>
                    <ul className="mt-1.5 list-disc space-y-1 pl-4">
                      <li>Manque d’O₂ (hypoxémie)</li>
                      <li>Hausse ou baisse de la température corporelle</li>
                      <li>Faim ou soif</li>
                      <li>Excès ou manque de sels minéraux</li>
                      <li>Blessure</li>
                      <li>Stress</li>
                    </ul>
                  </td>
                  <td className="border border-border px-3 py-3 align-top text-foreground/90">
                    <p className="font-semibold text-foreground">Exemples</p>
                    <ul className="mt-1.5 list-disc space-y-1 pl-4">
                      <li>Âge</li>
                      <li>Sexe</li>
                      <li>Hérédité</li>
                      <li>Sédentarité</li>
                      <li>Habitudes de vie</li>
                      <li>Problèmes de santé préexistants</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="bg-card px-4 py-2.5 text-center text-sm italic text-muted-foreground">
              Paramètres de l’homéostasie : variables internes dont les valeurs normales fluctuent
              selon les stimulus reçus par l’organisme (Marieb et Hoehn, 2019).
            </p>
          </div>

          <H3 id="s-1-6-2">1.6.2 Mécanisme de régulation de l’homéostasie</H3>
          <p>
            Les mécanismes de régulation de l’homéostasie sont indispensables à tous les organismes
            pour maintenir les conditions optimales de la vie. Aux limites acceptables des écarts
            par rapport à la norme, on parle de survie. En deçà ou au-delà de ces limites,
            l’organisme évolue soit vers un état pathologique, soit vers la mort.
          </p>
          <p>
            Quel que soit le facteur contrôlé (appelé <strong>variable</strong>), tous les
            mécanismes de régulation comportent au moins 3 éléments interdépendants : le
            <strong> récepteur</strong>, le <strong>centre de régulation</strong> et
            l’<strong>effecteur</strong>.
          </p>
          <Figure
            n={7}
            caption="La communication entre les éléments d’un mécanisme de régulation permet de maintenir la stabilité d’une variable interne dont la valeur a été modifiée (Marieb et Hoehn, 2019)."
            src={fig7}
          />

          {/* Navigation entre chapitres */}
          <nav className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="pointer-events-none inline-flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-4 py-2.5 text-sm font-semibold text-muted-foreground opacity-60">
              <ChevronLeft size={16} aria-hidden="true" />
              Chapitre précédent
            </span>
            <Link
              to={chapterPath(2)}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: GREEN }}
            >
              Chapitre suivant — Structure cellulaire
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </nav>
        </article>
      </div>

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 rounded-full p-3 text-white shadow-lg transition-transform hover:scale-110"
          style={{ background: GREEN }}
          aria-label="Retour en haut"
        >
          <ArrowUp size={18} aria-hidden="true" />
        </button>
      )}

      {/* Drawer mobile (fermeture) */}
      {mobileToc && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-transparent lg:hidden"
          onClick={() => setMobileToc(false)}
          aria-label="Fermer la table des matières"
          tabIndex={-1}
        >
          <X size={0} className="hidden" />
        </button>
      )}
    </div>
  );
}
