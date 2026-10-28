import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Lock, ChevronDown, ChevronUp, BookOpen, Info, AlertTriangle, Pin, ZoomIn, X, Menu, ArrowUp, Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Import de toutes les figures extraites du PDF
import fig01 from "@/assets/cours-anatomie/figures/fig-01-p1.jpg";
import fig02 from "@/assets/cours-anatomie/figures/fig-02-p2.jpg";
import fig03 from "@/assets/cours-anatomie/figures/fig-03-p2.jpg";
import fig04 from "@/assets/cours-anatomie/figures/fig-04-p3.jpg";
import fig05 from "@/assets/cours-anatomie/figures/fig-05-p4.jpg";
import fig06 from "@/assets/cours-anatomie/figures/fig-06-p4.jpg";
import fig07 from "@/assets/cours-anatomie/figures/fig-07-p4.jpg";
import fig08 from "@/assets/cours-anatomie/figures/fig-08-p5.jpg";
import fig09 from "@/assets/cours-anatomie/figures/fig-09-p5.jpg";
import fig10 from "@/assets/cours-anatomie/figures/fig-10-p6.jpg";
import fig11 from "@/assets/cours-anatomie/figures/fig-11-p7.jpg";
import fig12 from "@/assets/cours-anatomie/figures/fig-12-p7.jpg";
import fig13 from "@/assets/cours-anatomie/figures/fig-13-p8.jpg";
import fig14 from "@/assets/cours-anatomie/figures/fig-14-p10.jpg";
import fig15 from "@/assets/cours-anatomie/figures/fig-15-p10.jpg";
import fig16 from "@/assets/cours-anatomie/figures/fig-16-p11.jpg";
import fig17 from "@/assets/cours-anatomie/figures/fig-17-p12.jpg";
import fig18 from "@/assets/cours-anatomie/figures/fig-18-p12.jpg";
import fig19 from "@/assets/cours-anatomie/figures/fig-19-p13.jpg";
import fig22 from "@/assets/cours-anatomie/figures/fig-22-p15.jpg";
import fig23 from "@/assets/cours-anatomie/figures/fig-23-p16.jpg";
import fig24 from "@/assets/cours-anatomie/figures/fig-24-p17.jpg";
import fig25 from "@/assets/cours-anatomie/figures/fig-25-p18.jpg";
import fig26 from "@/assets/cours-anatomie/figures/fig-26-p19.jpg";
import fig27 from "@/assets/cours-anatomie/figures/fig-27-p19.jpg";
import fig28 from "@/assets/cours-anatomie/figures/fig-28-p20.jpg";
import fig29 from "@/assets/cours-anatomie/figures/fig-29-p21.jpg";
import fig30 from "@/assets/cours-anatomie/figures/fig-30-p21.jpg";
import fig31 from "@/assets/cours-anatomie/figures/fig-31-p22.jpg";
import fig33 from "@/assets/cours-anatomie/figures/fig-33-p23.jpg";
import fig36 from "@/assets/cours-anatomie/figures/fig-36-p25.jpg";
import fig44 from "@/assets/cours-anatomie/figures/fig-44-p27.jpg";
import fig47 from "@/assets/cours-anatomie/figures/fig-47-p29.jpg";
import { dimsFor } from "@/lib/imageDims";

const FIGURE_MAP: Record<number, { src: string; extras?: string[] }> = {
  1: { src: fig04, extras: [fig01, fig02, fig03] },
  2: { src: fig05, extras: [fig06] },
  3: { src: fig07, extras: [fig08, fig09] },
  4: { src: fig10 },
  5: { src: fig14, extras: [fig15] },
  6: { src: fig16 },
  7: { src: fig17 },
  8: { src: fig18 },
  9: { src: fig19 },
  10: { src: fig11, extras: [fig12, fig13] },
  11: { src: fig22, extras: [fig23] },
  12: { src: fig24 },
  13: { src: fig25 },
  14: { src: fig26, extras: [fig27] },
  15: { src: fig28 },
  16: { src: fig31, extras: [fig29, fig30] },
  17: { src: fig33 },
  18: { src: fig36, extras: [fig44] },
  19: { src: fig47 },
};

const COURSE_PASSWORD = "AGO2026";
const STORAGE_KEY = "course_unlocked_sf-s2";

/* --------------------------------------------------------------------------
 * Helpers
 * -------------------------------------------------------------------------- */
const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function AnchorLink({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  const onClick = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    history.replaceState(null, "", `#${id}`);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Copier le lien de cette section"
      className="ml-2 inline-flex items-center justify-center text-muted-foreground/50 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
    >
      {copied ? <Check size={14} /> : <Link2 size={14} />}
    </button>
  );
}

function H2({ children }: { children: string }) {
  const id = slug(children);
  return (
    <h2
      id={id}
      className="group scroll-mt-32 font-display text-2xl sm:text-3xl font-bold text-primary border-b border-primary/20 pb-2 mt-12 mb-5 flex items-center"
    >
      <span>{children}</span>
      <AnchorLink id={id} />
    </h2>
  );
}
function H3({ children }: { children: string }) {
  const id = slug(children);
  return (
    <h3
      id={id}
      className="group scroll-mt-32 font-display text-lg sm:text-xl font-semibold text-foreground/90 mt-8 mb-3 flex items-center"
    >
      <span>{children}</span>
      <AnchorLink id={id} />
    </h3>
  );
}
function H4({ children }: { children: string }) {
  const id = slug(children);
  return (
    <h4
      id={id}
      className="group scroll-mt-32 font-display text-base font-semibold text-foreground/80 mt-5 mb-2 flex items-center"
    >
      <span>{children}</span>
      <AnchorLink id={id} />
    </h4>
  );
}
function P({ children }: { children: ReactNode }) {
  return <p className="text-foreground/80 leading-relaxed mb-4">{children}</p>;
}
function UL({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-6 space-y-1.5 text-foreground/80 leading-relaxed mb-4">{children}</ul>;
}

function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "important" | "definition";
  title?: string;
  children: ReactNode;
}) {
  const styles = {
    info: { wrap: "bg-blue-50 border-blue-400 text-blue-900 dark:bg-blue-950/40 dark:text-blue-100", Icon: Info },
    warning: { wrap: "bg-amber-50 border-amber-400 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100", Icon: AlertTriangle },
    important: { wrap: "bg-rose-50 border-rose-400 text-rose-900 dark:bg-rose-950/40 dark:text-rose-100", Icon: Pin },
    definition: { wrap: "bg-emerald-50 border-emerald-400 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100", Icon: BookOpen },
  } as const;
  const { wrap, Icon } = styles[type];
  return (
    <div className={cn("border-l-4 rounded-md p-4 my-4 flex gap-3", wrap)}>
      <Icon size={20} className="shrink-0 mt-0.5" />
      <div className="text-sm leading-relaxed">
        {title && <p className="font-semibold mb-1">{title}</p>}
        {children}
      </div>
    </div>
  );
}

function Figure({ n, legend }: { n: number | string; legend: string }) {
  const [zoomed, setZoomed] = useState<string | null>(null);
  const mapping = typeof n === "number" ? FIGURE_MAP[n] : undefined;
  const images = mapping ? [mapping.src, ...(mapping.extras ?? [])] : [];

  if (images.length === 0) {
    return (
      <figure className="my-6">
        <div className="border-2 border-dashed border-border bg-muted/30 rounded-lg px-6 py-10 text-center">
          <BookOpen className="mx-auto text-muted-foreground mb-2" size={28} />
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Figure {n}</p>
          <p className="text-sm text-foreground/70 italic mt-1">{legend}</p>
        </div>
      </figure>
    );
  }

  return (
    <>
      <figure className="my-8">
        <div className={cn("grid gap-3", images.length === 1 ? "grid-cols-1" : "sm:grid-cols-2")}>
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setZoomed(src)}
              className="group relative bg-card rounded-lg overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-all"
            >
              <img
                src={src} {...dimsFor(src)}
                alt={`${legend} (${i + 1}/${images.length})`}
                loading="lazy"
                className="w-full h-auto object-contain bg-card"
              />
              <span className="absolute top-2 right-2 bg-foreground/70 text-background rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={14} />
              </span>
            </button>
          ))}
        </div>
        <figcaption className="mt-3 text-center">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">Figure {n}</span>
          <p className="text-sm text-muted-foreground italic mt-1">{legend}</p>
        </figcaption>
      </figure>

      {zoomed && (
        <div
          onClick={() => setZoomed(null)}
          className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in"
        >
          <button
            type="button"
            onClick={() => setZoomed(null)}
            className="absolute top-4 right-4 bg-card text-foreground rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
          <img
            src={zoomed}
            alt={legend}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto my-5 rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-primary text-primary-foreground">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/40"}>
              {r.map((c, j) => (
                <td key={j} className="px-4 py-2.5 align-top text-foreground/80 border-t border-border">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Sections (sous-parties d'un chapitre)
 * -------------------------------------------------------------------------- */
type Section = { id: string; title: string; render: () => ReactNode };
type ChapterDef = {
  id: string;
  number: number;
  title: string;
  accent: string; // classe tailwind pour l'accent (gradient header)
  sections: Section[];
};

/* === CHAPITRE 1 — Différenciation du sexe === */
const SEC_DIFF: Section = {
  id: "differenciation-sexe",
  title: "Différenciation du sexe",
  render: () => (
    <>
      <H2>La différenciation du sexe chez l'embryon</H2>

      <H3>Du sexe génétique au sexe indifférencié</H3>
      <P>
        La fécondation chez les mammifères réunit au hasard un gamète femme portant un chromosome X et un gamète mâle portant un chromosome X ou Y.
        Elle aboutit ainsi à un caryotype XX qui donnera naissance à un individu de sexe féminin ou à un caryotype XY à l'origine d'un homme.
      </P>
      <P>
        Si le sexe de l'embryon est dès ce moment déterminé génétiquement, la formation des gonades ne débute, dans l'espèce humaine, qu'à la 5ᵉ semaine
        de développement. Les gonades embryonnaires renferment des cellules germinales (spermatogonies ou ovogonies), futurs gamètes, et des cellules
        somatiques. À ce stade, rien ne distingue l'ébauche de gonade mâle et femelle : la gonade est à un <strong>stade indifférencié</strong>.
      </P>
      <P>
        Dès la 7ᵉ semaine de développement, chez les embryons humains de sexe génétique masculin (46, XY), la gonade indifférenciée commence à se transformer
        en testicule, alors que chez les embryons de sexe génétique féminin (46, XX), la transformation ne commence qu'à partir de la 8ᵉ semaine et les
        ovaires ne sont reconnaissables qu'à la 10ᵉ semaine grâce à la prophase méiotique de leurs cellules germinales.
      </P>

      <H3>Le gène SRY responsable de la mise en place des testicules</H3>
      <P>
        Chez la plupart des mammifères, le chromosome Y est l'un des plus petits. Il ne contient que 2 à 3 % du génome. L'évolution de la gonade différenciée
        vers l'un ou l'autre sexe est déterminée par la présence d'un gène, existant sur la partie spécifique du chromosome Y, le <strong>gène SRY</strong>{" "}
        (Sex - determining Region of Y chromosome).
      </P>
      <Figure n={1} legend="Schéma de différenciation du sexe chez un embryon XY" />
      <P>
        L'<strong>AMH</strong> est synthétisée dans les gonades (cellules de Sertoli) de l'embryon de sexe masculin et sa fonction consiste à éviter le
        développement des canaux de Müller, qui sont les structures à l'origine de l'utérus et des trompes de l'appareil reproducteur féminin.
      </P>
      <Figure n={2} legend="Évolution du taux d'hormone AMH chez un homme et chez une femme au cours de la vie" />
      <P>
        Les <strong>canaux de Wolff</strong> se développent avec la présence d'androgènes (testostérone), donnant lieu à l'épididyme, aux canaux déférents
        et aux vésicules séminales de l'appareil reproducteur masculin. Chez les embryons de sexe féminin, l'absence d'AMH permet le développement des
        canaux de Müller qui vont finalement se transformer en utérus et trompes de Fallope.
      </P>

      <Callout type="info" title="Remarque">
        <UL>
          <li>L'AMH à fortes concentrations a un effet inhibiteur sur la stéroïdogenèse donc la synthèse de testostérone.</li>
          <li>La testostérone a un effet inhibiteur sur la synthèse de l'AMH, ce qui explique la chute à la puberté du taux d'AMH.</li>
        </UL>
      </Callout>

      <Figure n={3} legend="Bilan des rôles de l'AMH et de la testostérone" />

      <H3>Du sexe génétique au sexe gonadique</H3>
      <Callout type="definition">
        <UL>
          <li><strong>TDF</strong> : Testis Determining Factor.</li>
          <li>L'<strong>AMH</strong> est l'hormone anti-müllérienne responsable de la régression des canaux de Müller chez l'homme.</li>
        </UL>
      </Callout>
    </>
  ),
};

/* === CHAPITRE 2 — Appareil génital masculin === */
const SEC_APP_MASC: Section = {
  id: "appareil-genital-masculin",
  title: "Appareil génital masculin",
  render: () => (
    <>
      <H2>Appareil génital masculin</H2>
      <P>
        Chez l'homme, les organes génitaux sont formés avant la naissance, sous l'action de la testostérone sécrétée par les gonades (testicules). Au cours
        de la puberté, les organes sexuels secondaires subissent une maturation et deviennent fonctionnels.
      </P>
      <P>L'appareil reproducteur masculin est composé :</P>
      <UL>
        <li>Des testicules</li>
        <li>Des voies excrétrices : canaux efférents, épididyme, canal déférent, urètre</li>
        <li>Des glandes annexes : vésicules séminales, prostate, glande de Cowper</li>
      </UL>

      <Figure n={4} legend="L'anatomie du système reproducteur masculin" />

      <H3>Testicules</H3>
      <P>
        Au nombre de 2, ce sont de véritables usines à production de spermatozoïdes. Les testicules, de formes ovoïdes, sont enveloppés dans un sac de peau,
        le <strong>scrotum</strong>. Chaque testicule est recouvert de deux couches de tissu, la tunique vaginale externe (enveloppe fine dérivée du
        péritoine) et la tunique albuginée interne (membrane fibreuse résistante formant une capsule autour des testicules).
      </P>
      <P><strong>Fonctions :</strong></P>
      <UL>
        <li>Glandes exocrines puisqu'elles produisent les spermatozoïdes</li>
        <li>Glandes endocrines puisqu'elles sécrètent l'hormone testostérone</li>
      </UL>
      <Callout type="info" title="Remarque">
        Le scrotum est un endroit vulnérable qui joue un rôle capital dans la reproduction humaine. La situation extra-abdominale des testicules leur permet
        de rester à une température inférieure à celle du corps (33 à 34 °C), condition indispensable à la formation de spermatozoïdes viables.
      </Callout>

      <H3>Épididyme</H3>
      <P>
        L'épididyme est un organe allongé d'environ 5 cm de long, appliqué contre le testicule à la manière d'un « cimier de casque ». Il est composé de trois
        parties : la <strong>tête</strong>, le <strong>corps</strong> et la <strong>queue</strong> (qui se continue avec le canal déférent).
      </P>
      <P><strong>Fonctions :</strong></P>
      <UL>
        <li>Constitue l'un des canaux que parcourent les spermatozoïdes des testicules vers l'extérieur</li>
        <li>Permet aux spermatozoïdes d'achever leur maturation</li>
        <li>Élabore une faible portion du sperme (liquide séminal)</li>
      </UL>

      <H3>Canal déférent</H3>
      <P>
        Le canal déférent est un canal long de 45 cm, qui s'étend de la queue de l'épididyme au canal éjaculateur. Il se termine par une ampoule
        différentielle qui sert de réservoir aux spermatozoïdes dans l'intervalle des éjaculations.
      </P>
      <P><strong>Fonctions :</strong></P>
      <UL>
        <li>Transfert des spermatozoïdes</li>
        <li>Maturation des spermatozoïdes</li>
        <li>Élaboration du liquide séminal</li>
      </UL>

      <H3>Canaux éjaculateurs</H3>
      <P>
        Les canaux éjaculateurs traversent la prostate. Ils sont formés par l'union du canal déférent et de sa vésicule séminale puis débouchent dans
        l'urètre.
      </P>

      <H3>Urètre</H3>
      <P>L'urètre est un canal excréteur à double fonction : urinaire (urine) et génitale (liquide spermatique). Il se divise en 3 parties :</P>
      <UL>
        <li>La partie prostatique de l'urètre, enveloppée par la prostate</li>
        <li>La partie membranacée (intermédiaire) qui se trouve dans le diaphragme uro-génital</li>
        <li>La partie spongieuse de l'urètre qui s'ouvre sur l'extérieur par le méat urétral</li>
      </UL>

      <H3>Vésicules séminales</H3>
      <P>
        Les vésicules séminales sont des réservoirs musculo-membraneux situés en arrière de la prostate et reliés chacun sur la terminaison du canal déférent
        correspondant.
      </P>
      <P><strong>Fonction :</strong> elles sécrètent et contiennent un liquide destiné à diluer la bouillie épaisse des spermatozoïdes se trouvant dans l'ampoule différentielle, c'est le <em>liquide séminal</em>.</P>
      <Callout type="info" title="Remarque">
        Les spermatozoïdes et le plasma séminal se mélangent dans le canal éjaculateur et pénètrent ensemble dans la partie prostatique de l'urètre au moment
        de l'éjaculation.
      </Callout>

      <H3>Prostate</H3>
      <P>
        La prostate est une glande annexée à la partie initiale de l'urètre masculin. Elle est située sous la vessie, en avant du rectum.
      </P>
      <P><strong>Fonction :</strong> elle sécrète un liquide de dilution (alcalin) pour les spermatozoïdes, le <em>liquide prostatique</em>. Ces sécrétions réduisent l'acidité des sécrétions vaginales.</P>

      <H3>Verge</H3>
      <P>
        Le pénis ou verge est l'organe de la copulation chez l'homme. À l'état de flaccidité, elle a la forme d'un cylindre aplati d'avant en arrière et pend
        en avant des bourses. À l'état d'érection, la verge se relève au devant de l'abdomen, augmente de volume et devient rigide. Elle se termine à son
        extrémité par un renflement, le <strong>gland</strong>, sur lequel s'ouvre le méat urétral. Le gland est entouré par un repli cutané, le{" "}
        <strong>prépuce</strong>.
      </P>

      <H3>Glandes de Cowper</H3>
      <P>
        Glandes bulbo-urétrales : 2 lobes de la taille d'un petit pois abouchant à l'urètre à la sortie de la prostate.
      </P>
      <P><strong>Fonction :</strong> sécrètent un lubrifiant pour faciliter le transport du sperme.</P>
    </>
  ),
};

const SEC_SPERMATO: Section = {
  id: "spermatogenese",
  title: "Spermatogenèse",
  render: () => (
    <>
      <H2>La spermatogenèse</H2>

      <H3>Rappel : Mitose / Méiose</H3>
      <DataTable
        headers={["", "Mitose", "Méiose"]}
        rows={[
          ["Réplication de l'ADN", "Pendant l'interphase avant le début de la division nucléaire", "Pendant l'interphase avant le début de la division nucléaire"],
          ["Nombre de divisions", "Une seule division", "Deux divisions : équationnelle et réductionnelle"],
          ["Cellules filles", "2 cellules diploïdes (2n) génétiquement presque identiques à la cellule mère", "4 cellules à n chromosomes, non identiques génétiquement à la cellule mère"],
          ["Rôle", "Développement, croissance et régénération des tissus", "Production des gamètes, réduction du nombre de chromosomes, diversité génétique"],
          ["Synapsis des chromosomes homologues", "Absent", "Se produit pendant la prophase I"],
        ]}
      />
      <Callout type="important" title="Conséquences génétiques de la méiose">
        <UL>
          <li>La probabilité que deux individus soient génétiquement identiques est nulle, sauf chez les jumeaux monozygotes.</li>
          <li>Le brassage interchromosomique permet d'obtenir 2<sup>N</sup> possibilités.</li>
        </UL>
      </Callout>

      <H3>Déroulement de la méiose chez l'homme</H3>
      <P>
        La spermatogenèse se passe entièrement dans les tubes séminifères. C'est un mécanisme <strong>centripète</strong> : il démarre au bord de la membrane
        du tube séminifère et se termine à la lumière de ce tube.
      </P>
      <P><strong>Rôle des différentes cellules :</strong></P>
      <UL>
        <li><strong>Cellules de Sertoli</strong> (cellules de soutien) : rôle protecteur et nutritif envers les cellules germinales.</li>
        <li><strong>Cellules germinales</strong> : cellules souches = spermatogonies = futurs spermatozoïdes.</li>
        <li><strong>Cellules de Leydig</strong> : produisent la majeure partie de la testostérone et contrôlent les caractères sexuels.</li>
      </UL>
      <P>La spermatogenèse comporte 4 phases :</P>
      <H4>La phase de multiplication</H4>
      <P>
        Les spermatogonies se multiplient activement par mitose dès la puberté fournissant ainsi de nombreuses cellules. Certaines spermatogonies restent au
        bord du tubule et continuent de se multiplier, alors que d'autres croissent et migrent en profondeur en devenant des spermatocytes I.
      </P>
      <H4>La phase d'accroissement</H4>
      <P>Les spermatogonies subissent un léger accroissement et deviennent des spermatocytes I (toujours à 2n chromosomes).</P>
      <H4>La phase de maturation</H4>
      <P>
        Les spermatocytes I sont des cellules à 2n chromosomes, alors que les spermatocytes II et les spermatides sont des cellules à n chromosomes ; il y a
        donc une réduction du nombre de chromosomes. Cette réduction est due à l'intervention de la méiose qui comprend deux divisions : une division
        réductionnelle puis une division équationnelle.
      </P>
      <H4>La phase de différenciation ou spermiogenèse</H4>
      <P>
        Les spermatides subissent de profonds remaniements et deviennent des spermatozoïdes : réduction du cytoplasme, formation de l'acrosome, apparition
        de la pièce intermédiaire et du flagelle.
      </P>
      <Callout type="info" title="Remarques">
        <UL>
          <li>Dans la spermatogenèse la méiose est continue (chez l'homme la spermatogenèse dure 74 jours), et la spermiogenèse représente 1/3 de la spermatogenèse en termes de durée.</li>
          <li>La différenciation commence à la puberté et se termine très tardivement.</li>
          <li>La maturation des spermatozoïdes n'est pourtant pas encore terminée et c'est au cours de leur transit à travers l'épididyme que les structures construites au cours de la spermiogenèse acquièrent leur fonctionnalité : mobilité et fécondance.</li>
        </UL>
      </Callout>

      <H3>La spermiogenèse</H3>
      <P>C'est le processus de formation des structures qui confèreront aux spermatozoïdes la mobilité et la capacité de pénétration dans l'ovule. Il regroupe plusieurs étapes :</P>
      <UL>
        <li>Réorganisation nucléaire : condensation, on passe à un noyau ovale, élimination des nucléoles…</li>
        <li>Formation de l'acrosome : migration de l'appareil de Golgi, fusion des vésicules golgiennes en une vésicule acrosomiale formant l'acrosome.</li>
        <li>Élongation du flagelle.</li>
        <li>Élimination du cytoplasme en excès (corps résiduel) qui sera phagocyté par la cellule de Sertoli et obtention de la forme allongée du spermatozoïde.</li>
      </UL>
      <Figure n={5} legend="Les étapes de la spermiogenèse" />

      <H3>Structure d'un spermatozoïde mature</H3>
      <P>Le spermatozoïde est composé de trois parties :</P>
      <UL>
        <li><strong>La tête</strong> : contient le noyau avec le patrimoine génétique paternel et l'acrosome — un sac d'enzymes qui seront libérées lors de la fécondation et permettront la pénétration du spermatozoïde dans l'ovule.</li>
        <li><strong>La pièce intermédiaire</strong> : plus étroite avec le centriole qui donne naissance au flagelle et des mitochondries disposées en hélice autour du flagelle, fournissant l'énergie nécessaire aux mouvements du flagelle.</li>
        <li><strong>Le flagelle</strong> ou queue : confère au spermatozoïde sa mobilité pour gagner le site de la fécondation.</li>
      </UL>

      <Callout type="definition" title="Le spermocytogramme">
        On étudie au microscope optique la morphologie des spermatozoïdes étalés sur lame de verre et colorés. Il nécessite 3 à 4 jours d'abstinence avant. Il étudie :
        <UL>
          <li><strong>Quantité</strong> : 1,5 à 6 ml</li>
          <li><strong>pH</strong> : 7,4 à 7,6</li>
          <li><strong>Nombre</strong> : 60 à 120 millions
            <UL>
              <li>&lt; 20 M : oligozoospermie</li>
              <li>&gt; 200 M : polyzoospermie</li>
              <li>0 : azoospermie</li>
            </UL>
          </li>
          <li><strong>Mobilité</strong> &gt; 50 % — sinon : asthénozoospermie</li>
          <li><strong>Vitalité</strong> &gt; 50 % — si &gt; 50 % morts : nécrozoospermie</li>
          <li><strong>Forme</strong> — si &gt; 50 % anormaux : tératozoospermie</li>
        </UL>
      </Callout>

      <H3>Facteurs pathologiques diminuant la spermatogenèse</H3>
      <UL>
        <li><strong>Facteurs nutritionnels</strong> : carence en vitamine A</li>
        <li><strong>Facteurs vasculaires</strong> : torsion du cordon spermatique</li>
        <li><strong>Hyperthermie</strong> : température intra-scrotale ~ 34 °C, fièvre prolongée, port de pantalons serrés</li>
        <li><strong>Radiations ionisantes</strong> (X, gamma)</li>
        <li><strong>Facteurs pharmacologiques</strong> : les antimitotiques et antimétabolites utilisés comme anti-cancéreux</li>
        <li><strong>Toxiques</strong> : herbicides, insecticides</li>
        <li><strong>Métaux lourds</strong> : dioxine</li>
        <li><strong>Facteurs infectieux</strong> : oreillons, en cas d'orchite</li>
        <li><strong>Facteurs génétiques</strong> : délétions partielles du chromosome Y, syndrome de Klinefelter (47, XXY)</li>
      </UL>
    </>
  ),
};

const SEC_REG_MASC: Section = {
  id: "regulation-hormonale-masculine",
  title: "Régulation hormonale (masculine)",
  render: () => (
    <>
      <H2>Régulation hormonale chez l'homme</H2>
      <P>
        L'hypothalamus et l'hypophyse sont deux organes de l'encéphale étroitement associés et situés à la base du cerveau. Le fonctionnement des testicules
        est sous le contrôle de l'hypophyse, glande endocrine elle-même sous le contrôle de l'hypothalamus.
      </P>

      <H3>L'hypothalamus contrôle l'hypophyse</H3>
      <UL>
        <li>L'hypothalamus sécrète une neurohormone de manière pulsatile : la <strong>GnRH</strong> (gonadotropin-releasing hormone ou gonadolibérine), une neurohormone hypothalamique.</li>
        <li>La GnRH stimule la sécrétion des hormones hypophysaires : <strong>LH</strong> (Luteinizing Hormone) et <strong>FSH</strong> (Follicle-Stimulating Hormone).</li>
      </UL>

      <H3>L'hypophyse contrôle le testicule</H3>
      <P>L'hypophyse contrôle l'activité du testicule grâce à deux hormones :</P>
      <UL>
        <li>La <strong>FSH</strong> stimule la spermatogenèse (formation des spermatozoïdes).</li>
        <li>La <strong>LH</strong> stimule la sécrétion de testostérone par les cellules de Leydig.</li>
      </UL>
      <P>La LH et FSH sont sécrétées de façon pulsatile. Ces pulses suivent de très près ceux de la GnRH (une sécrétion continue de GnRH inhibe la sécrétion de LH/FSH).</P>

      <H3>Le testicule sécrète la testostérone</H3>
      <P>
        Les tubes séminifères produisent les spermatozoïdes et les cellules de Leydig sécrètent la testostérone. L'action conjointe de la testostérone et de
        la FSH stimule la spermatogenèse.
      </P>

      <H3>Rétrocontrôle négatif</H3>
      <P>
        Le taux de testostérone est maintenu à un niveau sensiblement constant grâce à la rétroaction négative que cette hormone exerce sur l'axe
        hypothalamo-hypophysaire. Il en résulte un freinage de l'activité de ce complexe et, par conséquent, une baisse de la production des gonadostimulines
        puis de celle de la testostérone. À l'inverse, si la concentration de testostérone diminue, il y a production accrue de gonadostimulines. Le taux de
        testostérone ne varie ainsi que dans des limites étroites.
      </P>
      <P>
        De plus, par son action sur les cibles périphériques, l'hormone mâle est indispensable au bon fonctionnement du tractus génital, au maintien des
        caractères sexuels secondaires ainsi qu'à la spermatogenèse.
      </P>
      <Figure n={8} legend="La régulation hormonale de la spermatogenèse" />
      <P>Les cellules de Sertoli synthétisent environ 200 protéines différentes associées à la fonction de la reproduction dont :</P>
      <UL>
        <li>L'<strong>inhibine</strong>, une hormone peptidique de nature glycoprotéique qui exerce un rétrocontrôle négatif de la production de FSH.</li>
        <li>L'<strong>androgen-binding protein (ABP)</strong>, impliquée dans le transport des androgènes.</li>
      </UL>
      <Callout type="info" title="Remarques">
        <P>
          La FSH agit indirectement sur la spermatogenèse en stimulant la production d'ABP par les cellules de Sertoli. Cette protéine de liaison libérée
          dans la lumière des tubes séminifères présente une grande affinité pour la testostérone et la dihydrotestostérone, ce qui leur permet d'augmenter
          leurs concentrations intratesticulaires et d'agir sur les cellules de la lignée germinale, celles-ci étant dépourvues de récepteurs à la FSH et
          incapables de fixer la testostérone libre.
        </P>
        <P>La LH agit directement sur les cellules de Leydig en stimulant la production de testostérone.</P>
      </Callout>
      <Figure n={9} legend="Tableau : Les effets de la testostérone chez l'homme" />
      <Figure n={10} legend="Quelques relations entre le système reproducteur masculin et d'autres systèmes" />
    </>
  ),
};

const SEC_PUB_MASC: Section = {
  id: "puberte-masculine",
  title: "Puberté (masculine)",
  render: () => (
    <>
      <H2>La puberté</H2>
      <P>
        La puberté (du latin <em>pubescere</em>, « se couvrir de poils ») constitue la dernière étape dans la mise en place du sexe phénotypique. Elle débute
        entre 8 et 13 ans chez la fille et entre 10 et 14 ans chez le garçon. Les cellules de Leydig fœtales (chez le mâle) retrouvent une brève activité
        postnatale (pic de testostérone juste après la naissance) avant leur retour au repos jusqu'à la puberté (étape nécessaire à la masculinisation du
        cerveau).
      </P>
      <Figure n={6} legend="Évolution du taux de testostérone au cours de la vie chez un homme" />
      <P>
        La puberté est la période de la vie où l'individu acquiert la faculté de procréer. Elle est marquée par un ensemble de transformations
        morphologiques, physiologiques et psychologiques. Les transformations morphologiques constituent les <strong>caractères sexuels secondaires</strong>{" "}
        (ce sont les caractères qui permettent de différencier visuellement les hommes des femmes).
      </P>
      <P>
        Les transformations pubertaires sont induites par une augmentation importante de la sécrétion des hormones sexuelles au début et tout au long de la
        puberté : la <strong>testostérone</strong> chez le garçon, les <strong>œstrogènes</strong> chez la fille.
      </P>
      <P>
        En l'absence d'une sécrétion hormonale normale, la puberté est grandement perturbée. En effet, si la mise en place du sexe phénotypique féminin au
        cours du développement embryonnaire ne nécessite pas l'intervention des hormones femelles, les hormones femelles sont indispensables à l'acquisition
        de la fonctionnalité de l'appareil génital féminin au moment de la puberté.
      </P>
      <Figure n={7} legend="Tableau : Les transformations pubertaires chez le garçon et chez la fille" />
    </>
  ),
};

/* === CHAPITRE 3 — Appareil génital féminin === */
const SEC_APP_FEM: Section = {
  id: "appareil-genital-feminin",
  title: "Appareil génital féminin",
  render: () => (
    <>
      <H2>Appareil génital féminin</H2>
      <P>
        La femme joue un rôle beaucoup plus complexe que l'homme dans la reproduction. Non seulement son organisme doit-il produire des gamètes, mais il
        doit aussi se préparer à soutenir un embryon en voie de développement pendant une période d'environ neuf mois. Les ovaires sont les gonades femelles.
        Comme les testicules, les ovaires ont deux fonctions : ils produisent les gamètes femelles (ovules) et sécrètent les hormones sexuelles, les
        œstrogènes et la progestérone.
      </P>
      <UL>
        <li>Les ovaires et les voies génitales de la femme, qui constituent les <strong>organes génitaux internes</strong>, sont situés à l'intérieur de la cavité pelvienne.</li>
        <li>Les voies annexes, depuis les ovaires jusqu'à l'extérieur du corps, sont les trompes utérines (de Fallope), l'utérus et le vagin. Ces voies assurent le transport ou répondent à d'autres besoins des cellules reproductrices et du fœtus en développement.</li>
        <li>Les autres organes génitaux de la femme sont les <strong>organes génitaux externes</strong>.</li>
      </UL>
      <Figure n={11} legend="Vue d'ensemble de l'appareil génital féminin" />

      <H3>Les ovaires</H3>
      <P>
        L'ovaire représente la glande sexuelle (ou gonade) féminine. Il en existe 2 (un de chaque côté) situés dans la cavité pelvienne. Aux pôles supérieur
        et inférieur, il y a des prolongements qui permettent la fixité de l'ovaire : ce sont les ligaments.
      </P>
      <P>Une coupe de l'ovaire offre à décrire de l'extérieur vers l'intérieur :</P>
      <UL>
        <li><strong>L'albuginée</strong> : tissu conjonctif qui enveloppe l'ovaire.</li>
        <li><strong>L'épithélium germinatif</strong> : c'est à partir de cet épithélium que dérivent les cellules folliculaires qui entourent les follicules primordiaux.</li>
        <li><strong>Le cortex ovarien</strong> : il occupe la partie périphérique de l'ovaire, on y trouve les différents stades de la folliculogenèse.</li>
        <li><strong>La medulla</strong> : elle constitue la partie centrale de l'ovaire.</li>
      </UL>
      <P>L'ovaire a deux fonctions :</P>
      <UL>
        <li><strong>Exocrine</strong> : formation des cellules reproductrices de la femme — il fabrique un ovocyte par cycle (environ tous les 28 jours) qui se développe dans un petit sac nourricier appelé follicule.</li>
        <li><strong>Endocrine</strong> : synthèse des hormones sexuelles féminines (œstrogènes et progestérone).</li>
      </UL>

      <H3>Les voies génitales</H3>
      <H4>Les trompes utérines (trompes de Fallope)</H4>
      <P>
        La trompe de Fallope est un long conduit d'environ 12 cm qui relie chaque ovaire à l'utérus (il y en a donc 2, une de chaque côté). Elle commence par
        une zone dilatée : le <strong>pavillon</strong> situé juste au-dessus de l'ovaire.
      </P>
      <P>
        Elle a pour fonction la captation de l'ovocyte au moment de l'ovulation grâce au pavillon. L'ovocyte est ensuite conduit par le mouvement des cils
        de la paroi de la trompe, en direction de l'utérus. Il peut être fécondé par un spermatozoïde au niveau du tiers externe de la trompe (partie
        élargie) appelé l'<strong>ampoule</strong> : siège de la fécondation. La trompe de Fallope permet aussi le transport des spermatozoïdes de l'utérus
        vers l'ovaire, et ensuite de l'œuf fécondé en sens inverse.
      </P>

      <H4>L'utérus</H4>
      <P>
        L'utérus est situé dans le bassin, entre le rectum et la base de la vessie. Il s'agit d'un organe creux et musculeux, aux parois épaisses, destiné
        à accueillir, à héberger et à nourrir l'ovule fécondé. Il comporte 3 parties distinctes :
      </P>
      <P><strong>Le corps</strong> dans lequel débouchent les trompes et qui comporte 2 couches dans son épaisseur :</P>
      <UL>
        <li>Une couche externe de muscles (le <strong>myomètre</strong>)</li>
        <li>Une couche interne muqueuse (l'<strong>endomètre</strong>) qui présente des variations d'épaisseur et de composition cycliques en réponse aux variations des taux des hormones sexuelles sécrétées par l'ovaire.</li>
      </UL>
      <P><strong>Le col</strong> assure la communication entre le corps de l'utérus et le vagin. C'est par cette petite porte d'entrée que passeront les spermatozoïdes déposés dans le vagin au moment du rapport sexuel, si la période est propice à la fécondation. Le col utérin comprend deux parties :</P>
      <UL>
        <li>L'<strong>endocol</strong> (partie interne du col qui tapisse le canal menant à l'utérus)</li>
        <li>L'<strong>exocol</strong> (partie externe du col qui est ronde et semblable à une lèvre et qui avance dans le vagin)</li>
      </UL>
      <P>Les glandes exocrines du col sécrètent :</P>
      <UL>
        <li>La <strong>glaire cervicale</strong> qui facilite l'ascension des spermatozoïdes.</li>
        <li>Des sécrétions (pertes) translucides ou laiteuses, indispensables pour le nettoyage de la cavité utérine.</li>
      </UL>
      <P><strong>Le fundus de l'utérus</strong> : partie arrondie située au-dessus du point d'insertion des trompes.</P>

      <P><strong>Les fonctions de l'utérus sont multiples :</strong></P>
      <UL>
        <li>Il assure le transport des spermatozoïdes du vagin vers les trompes.</li>
        <li>Il est le siège de la nidation, l'embryon s'implantant dans l'épaisseur de son endomètre.</li>
        <li>Pendant toute la durée de la grossesse, il protège l'embryon et lui fournit le matériel nécessaire à son développement. Son volume s'adapte au fur et à mesure à la croissance continue du fœtus.</li>
        <li>En fin de grossesse, ses contractions assurent l'expulsion du fœtus et du placenta.</li>
      </UL>
      <P>
        À la fin du cycle ovarien, s'il n'y a pas eu fécondation et nidation, sa paroi interne (l'endomètre) va être éliminée sous l'effet de la chute brutale
        des hormones sexuelles. Cela occasionne des saignements (les règles).
      </P>

      <H4>Le vagin</H4>
      <P>
        Mesurant de 8 à 10 cm, le vagin s'étend du col utérin à la vulve. La paroi vaginale est constituée de l'intérieur vers l'extérieur par :
      </P>
      <UL>
        <li><strong>Muqueuse</strong> : épithélium de revêtement, dont la morphologie est fonction du cycle menstruel.</li>
        <li><strong>Musculeuse</strong> : 2 couches de muscles lisses (externe épaisse, interne mince).</li>
      </UL>
      <P>
        Les cellules de la paroi du vagin libèrent de grandes quantités de glycogène que les bactéries résidantes transforment en acide lactique. C'est
        pourquoi le pH du vagin est assez acide (cette acidité protège le vagin contre les infections, mais elle est également nocive pour les
        spermatozoïdes).
      </P>
      <P>
        Le vagin est l'organe de la copulation, assurant le recueil du sperme. Au niveau de l'orifice vaginal, une cloison incomplète, l'<strong>hymen</strong>,
        très vascularisée, se rompt généralement au premier rapport, causant des saignements. Le vagin représente également la filière que le bébé devra
        franchir lors de l'accouchement.
      </P>

      <H3>Les organes génitaux externes</H3>
      <P>La <strong>vulve</strong> désigne l'ensemble des organes génitaux externes :</P>
      <UL>
        <li><strong>Mont de Vénus</strong> (mont pubien) : région adipeuse arrondie, recouvrant la symphyse pubienne.</li>
        <li><strong>Petites lèvres</strong> : composées de tissu graisseux et entourant l'orifice du vagin.</li>
        <li><strong>Grandes lèvres</strong> : contiennent des follicules pileux et des glandes sudoripares et sébacées ; la surface interne des grandes lèvres est modifiée au contact des petites lèvres, humides et dénuées de follicules pileux.</li>
        <li>
          <strong>Clitoris</strong> : petite structure saillante située juste à l'avant du vestibule (entrée du vagin), richement innervé par des terminaisons
          sensitives. Il entre alors en érection et contribue à l'excitation sexuelle de la femme. Anatomiquement, le clitoris comprend en fait aussi le
          vestibule, le méat urinaire, l'orifice vaginal, l'hymen et les glandes de Bartholin.
        </li>
      </UL>
      <P>Les <strong>glandes de Bartholin</strong> sécrètent un mucus humidifiant et lubrifiant lors du coït (rapport sexuel).</P>
      <Callout type="info" title="Remarque">
        L'orifice urinaire de la femme est différent de l'orifice génital (contrairement à l'homme).
      </Callout>
    </>
  ),
};

const SEC_GLANDES: Section = {
  id: "glandes-mammaires",
  title: "Glandes mammaires",
  render: () => (
    <>
      <H2>Glandes mammaires</H2>

      <H3>Situation du sein</H3>
      <P>
        Les seins occupent la partie antéro-supérieure du thorax, de part et d'autre du sternum, en avant des muscles pectoraux, en regard de l'espace
        compris entre la 3ᵉ et la 7ᵉ côte, le mamelon se situant au niveau de la 9ᵉ vertèbre dorsale. En position debout, sous l'influence de son propre
        poids, le sein tombe légèrement.
      </P>
      <Figure n={12} legend="Situation du sein" />

      <H3>Variations au cours de la vie génitale</H3>
      <P>La mammogenèse est sous dépendance hormonale :</P>
      <UL>
        <li><strong>À la naissance</strong> : les seins ne mesurent que 8 à 10 mm de diamètre et ne pèsent chacun 30 à 60 cg.</li>
        <li><strong>Entre 9 et 10 ans</strong> : surélévation du mamelon suivie de l'élargissement de l'aréole.</li>
        <li><strong>Vers 13 ans</strong> : bombement de l'aire mammaire et pigmentation de l'aréole.</li>
        <li><strong>Vers 18 ans</strong> : le sein prend la forme sphérique, celle de l'adulte.</li>
      </UL>
      <DataTable
        headers={["Stade S1", "Stade S2", "Stade S3", "Stade S4", "Stade S5"]}
        rows={[["Enfant", "Prépuberté", "Puberté", "Adolescente", "Adulte"]]}
      />

      <H3>Le poids</H3>
      <P>
        Le poids du sein varie selon la morphologie de la femme et la grossesse et lactation : de 200 g chez la jeune fille, il peut atteindre 500 g chez la
        femme allaitante et 900 g dans certains cas.
      </P>

      <H3>Structure du sein</H3>
      <P>Le sein est formé de :</P>
      <UL>
        <li>Peau</li>
        <li>Mamelon</li>
        <li>Aréole et muscle aréolaire</li>
        <li>Glande mammaire</li>
        <li>Tissu adipeux et conjonctif</li>
      </UL>
      <Figure n={13} legend="Structure du sein" />

      <H4>Le tissu adipeux et conjonctif et la plaque aréolo-mamelonnaire</H4>
      <UL>
        <li><strong>Aréole mammaire</strong> : cercle de peau pigmentée (rosée ou brunâtre) qui entoure le mamelon et qui contient les petites glandes sébacées (les tubercules de Morgagni), qui sécrètent le sébum comme lubrifiant lors de l'allaitement (pour prévenir l'apparition des gerçures sur l'aréole et le mamelon lors de l'allaitement).</li>
        <li><strong>Mamelon</strong> : saillie cylindro-conique avec une surface irrégulière. Il contient des fibres musculaires lisses à disposition circulaire (région située au centre de l'aréole d'où le lait est expulsé). Le système nerveux autonome régit les fibres musculaires lisses de l'aréole et du mamelon lorsque celui-ci reçoit des stimuli tactiles ou sexuels, ou lorsqu'il est exposé au froid.</li>
        <li><strong>Tissu adipeux et conjonctif</strong> : étroitement lié au tissu glandulaire ; la quantité de tissu adipeux est en grande partie responsable du volume des seins, lequel n'a aucun effet sur la production et la qualité du lait.</li>
        <li><strong>Peau péri-aréolaire</strong> : peau mince, lisse, souple et glabre. Chez la gestante et la lactante, elle laisse apparaître les veines sous-cutanées.</li>
      </UL>
      <Callout type="info">
        Le mamelon et l'aréole forment une unité, la <strong>plaque aréolo-mamelonnaire</strong>.
      </Callout>

      <H4>La glande mammaire</H4>
      <P>
        Les glandes mammaires sont présentes chez les deux sexes mais elles sont fonctionnelles seulement chez les femmes. Comme le rôle biologique des
        glandes mammaires est de produire du lait pour nourrir le bébé, leur rôle commence quand la reproduction a déjà été accomplie. Les glandes mammaires
        sont des glandes exocrines lactifères et sexuelles, et elles font en réalité partie de la peau (système tégumentaire).
      </P>
      <P>
        Chaque glande mammaire est localisée dans l'hypoderme d'un sein (structure arrondie recouverte de peau située devant les muscles pectoraux du thorax).
      </P>
      <UL>
        <li>Chaque glande mammaire se compose de <strong>15 à 25 lobes</strong> disposés en rayons autour de l'aréole et débouchant dans le mamelon.</li>
        <li>Le lobe est subdivisé en <strong>lobules</strong> qui renferment des alvéoles de tissu glandulaire produisant le lait chez la femme qui allaite. Ces alvéoles sécrètent le lait dans un canal galactophore (ou conduit lactifère) qui converge vers le mamelon. Juste avant d'arriver à l'aréole, chaque conduit se dilate pour former un <strong>sinus lactifère</strong>. Le lait s'accumule dans ces sinus entre les tétées.</li>
      </UL>
      <Callout type="info" title="Remarque">
        Cette description des glandes mammaires ne s'applique qu'aux femmes qui allaitent ou qui sont au dernier trimestre de la grossesse. Chez la femme non
        enceinte, les structures glandulaires ne sont pas développées et le réseau des conduits est rudimentaire ; dans ce cas le volume des seins ne dépend
        que de la quantité de tissus adipeux qu'ils contiennent.
      </Callout>
      <Figure n={14} legend="La glande mammaire" />

      <H3>Physiologie de la lactation</H3>
      <P>
        La stimulation du sein par la succion du bébé va activer les récepteurs aréolaires (qui se trouvent sur les bords de l'aréole mammaire) et envoyer
        l'information directement au cerveau, qui va alors sécréter 2 hormones de l'allaitement :
      </P>
      <UL>
        <li><strong>Prolactine</strong> (anté-hypophyse) : production du lait dans les acini (permet la synthèse du lait).</li>
        <li><strong>Ocytocine</strong> (post-hypophyse) : éjection du lait dans les canaux galactophores.</li>
      </UL>
      <Figure n={15} legend="Quelques relations entre le système reproducteur féminin et d'autres systèmes" />
    </>
  ),
};

const SEC_OVO: Section = {
  id: "ovogenese",
  title: "Ovogenèse",
  render: () => (
    <>
      <H2>L'ovogenèse</H2>
      <P>
        L'ovogenèse est le processus permettant la production des gamètes femelles, les ovocytes, ainsi que leur maturation en ovules. L'ovogenèse est
        beaucoup plus complexe et la méiose est <strong>discontinue</strong>.
      </P>
      <P>Elle se compose de deux phases se déroulant simultanément :</P>
      <UL>
        <li><strong>La gamétogenèse</strong> : partie exocrine correspondant à la production de cellules reproductrices.</li>
        <li><strong>La folliculogenèse</strong> : partie endocrine correspondant à la production des hormones sexuelles.</li>
      </UL>

      <H3>Les étapes de l'ovogenèse</H3>
      <P>L'évolution des cellules de la lignée germinale qui s'effectue à l'intérieur des follicules ovariens comporte trois phases :</P>
      <UL>
        <li>Phase de multiplication</li>
        <li>Phase d'accroissement (croissance)</li>
        <li>Phase de maturation</li>
      </UL>
      <P>
        À partir des ovogonies, des clones cellulaires reliés par des ponts cytoplasmiques sont formés par mitoses successives rapides dans la zone corticale
        de l'ovaire ; du 2ᵉ au 7ᵉ mois de la vie fœtale.
      </P>
      <P>
        Dès la 12ᵉ semaine, les ovogonies amorcent la prophase I de la méiose et se bloquent à ce stade. Elles prennent le nom d'<strong>ovocyte I</strong>.
        Au moment de leur blocage en prophase I, les ovocytes I sont isolés et entourés chacun d'une couche de cellules épithéliales folliculaires aplaties
        formant ainsi le <strong>follicule primordial</strong> (ovocyte I + cellules folliculaires).
      </P>
      <P>
        La méiose reprendra au cours d'un cycle de l'ovaire. Chaque mois, quelques follicules primordiaux (une douzaine par ovaire) amorcent leur
        développement. Les ovocytes I de ces follicules reprennent leur méiose tandis que leurs cellules folliculaires se multiplient (accroissement de
        taille de chaque follicule). L'un d'entre eux se développe plus que les autres et devient le <strong>follicule de De Graaf</strong>. Son ovocyte se
        divise en un <strong>ovocyte II</strong> associé à un minuscule globule polaire (ovocyte sans cytoplasme). L'ovulation libère l'ovocyte II et son
        globule associé.
      </P>
      <P>
        Si l'ovocyte II est fécondé, il termine sa deuxième division méiotique et devient un ovule associé à un minuscule globule polaire. Le premier globule
        se divise également et produit deux globules plus petits que lui.
      </P>

      <H3>Rendement de l'ovogenèse</H3>
      <P>Le rendement de l'ovogenèse est faible comparé à celui de la spermatogenèse pour trois raisons :</P>
      <H4>Inégalité des divisions méiotiques</H4>
      <P>À partir d'un ovocyte I il y a production d'un seul gamète et non de 4.</P>
      <H4>Absence du pool d'ovogonies souches</H4>
      <P>
        La lignée germinale n'est pas alimentée en permanence. La phase de multiplication épuise depuis la vie fœtale tout le stock d'ovogonies et produit un
        capital définitif d'ovocytes I<sub>aires</sub>.
      </P>
      <H4>Atrésie folliculaire</H4>
      <P>
        L'immense majorité des follicules contenant les ovocytes subit l'<strong>atrésie</strong> (ou dégénérescence) : pendant la vie fœtale, pendant
        l'enfance et pendant toute l'activité génitale.
      </P>
      <Figure n={16} legend="Évolution de la population des différents ovocytes et follicules au cours de la gestation et de la vie chez la femme" />
    </>
  ),
};

const SEC_CYCLES: Section = {
  id: "cycles-sexuels",
  title: "Cycles sexuels",
  render: () => (
    <>
      <H2>Les cycles sexuels</H2>

      <H3>Notion de cycle sexuel</H3>
      <P>
        On appelle cycle sexuel l'ensemble de toutes les modifications ou événements qui se répètent à intervalle de temps régulier au niveau de l'appareil
        reproducteur femelle. Les événements évidents et visibles à l'extérieur sont l'apparition des règles ou menstruation. Ces événements périodiques se
        reproduisent de façon cyclique à partir de l'âge de puberté jusqu'à la ménopause.
      </P>

      <H3>Les différents cycles</H3>
      <P>Le cycle sexuel affecte :</P>
      <UL>
        <li>Les ovaires : <strong>cycle ovarien</strong></li>
        <li>L'utérus : <strong>cycle utérin</strong></li>
        <li>La glaire cervicale</li>
        <li>La température corporelle</li>
        <li>L'hypophyse : <strong>cycle hypophysaire</strong></li>
      </UL>

      <H2>Le cycle ovarien</H2>
      <Callout type="definition">
        Le cycle ovarien : la série de phénomènes mensuels (cycliques) se déroulant dans l'ovaire et associés à la maturation d'un ovule.
      </Callout>
      <P>
        Le cycle ovarien commence le premier jour des règles. Il comporte deux phases : la <strong>phase folliculaire</strong> et la{" "}
        <strong>phase lutéinique</strong>, séparées par l'<strong>ovulation</strong>.
      </P>

      <H3>Phase folliculaire</H3>
      <P><strong>Les stades — des follicules primordiaux aux follicules tertiaires :</strong></P>
      <H4>Follicules primordiaux</H4>
      <P>
        Au moment de la naissance, tous les ovocytes primaires sont entourés par une mince couche unistratifiée de cellules épithéliales folliculaires
        aplaties. Les follicules primordiaux représentent en permanence la majorité des follicules dans l'ovaire.
      </P>
      <H4>Follicules primaires</H4>
      <P>Lors du passage du follicule primordial au follicule primaire, l'épithélium folliculaire qui entoure l'ovocyte devient cubique ou prismatique.</P>
      <H4>Follicules secondaires</H4>
      <P>
        Lorsque les follicules primaires persistent, ils se transforment en follicules secondaires au moment où l'épithélium folliculaire devient
        pluristratifié. Ce dernier va alors former la <strong>couche granuleuse</strong>. En outre, une couche de glycoprotéines, la <strong>zone pellucide</strong>,
        apparaît à ce stade entre l'ovocyte et l'épithélium du follicule secondaire. Des prolongements cytoplasmiques issus des cellules adjacentes de la
        couche granuleuse traversent la zone pellucide pour assurer l'approvisionnement de l'ovocyte. Au-delà de la membrane basale, le stroma ovarien se
        transforme en <strong>thèque du follicule</strong>.
      </P>
      <H4>Follicules tertiaires (antral ou cavitaire)</H4>
      <P>
        Lorsque les follicules secondaires persistent, ils se transforment en follicules tertiaires. Ils se caractérisent par l'apparition de petites lacunes
        remplies de liquide formant la <strong>cavité folliculaire (antrum)</strong> dans la granulosa. Autour de l'ovocyte, la granulosa fait saillie dans
        l'antrum constituant le <strong>cumulus oophorus</strong> ou disque proligère.
      </P>
      <H4>Follicule de Graaf</H4>
      <P>
        Il correspond à un follicule tertiaire particulièrement grand. Caractérisé par un volumineux antrum bordé par la granulosa et par un ovocyte entouré
        d'une seule assise de cellules folliculeuses = <strong>corona radiata</strong>.
      </P>
      <Callout type="info" title="Remarque">
        Les ovaires d'une femme adulte contiennent toujours plusieurs follicules à différents stades de maturation. En général, un des follicules surpasse
        les autres et devient le <strong>follicule dominant</strong>.
      </Callout>
      <Figure n={17} legend="Les différentes étapes de la folliculogenèse chez la femme pubère" />

      <H3>L'ovulation</H3>
      <P>
        L'ovulation est l'émission d'un ovocyte, par rupture de la paroi du follicule. L'ovocyte est récupéré par les trompes où il peut être fécondé par un
        spermatozoïde.
      </P>
      <Callout type="info" title="Remarque">
        Dans 1-2 % de toutes les ovulations, plus d'un ovocyte est expulsé ; puisque dans certains cas des ovocytes différents sont fécondés par des
        spermatozoïdes différents, les bébés dans ce cas sont des faux jumeaux.
      </Callout>

      <H3>Phase lutéinique</H3>
      <P>
        La phase lutéinique est la phase de croissance puis de régression du <strong>corps jaune</strong> qui se forme à partir du follicule qui a participé
        à l'ovulation. Les cellules de la thèque interne composent une nouvelle glande endocrine particulière : le corps jaune. Dès sa formation, le corps
        jaune se met à sécréter de la progestérone et un peu d'œstrogènes.
      </P>
      <P>
        S'il n'y a pas fécondation, le corps jaune commence à dégénérer par apoptose au bout de 10 jours environ et cesse alors de produire des hormones.
      </P>
      <P>
        Si la fécondation a lieu, le corps jaune sera maintenu pendant les six premiers mois de grossesse grâce à l'<strong>hormone chorionique gonadotrope (hCG)</strong>{" "}
        (analogue de la LH).
      </P>

      <H2>Le cycle de l'utérus</H2>
      <P>
        Le cycle de l'utérus est marqué par la survenue périodique des règles ou menstruations (on parle aussi de <em>cycle menstruel</em>). Le premier jour
        des règles est, par définition, le premier jour du cycle. Le cycle de l'utérus comprend la phase proliférative et la phase sécrétoire.
      </P>

      <H3>Phase proliférative</H3>
      <P>(Phase folliculaire = phase pré-ovulatoire). On observe les faits suivants :</P>
      <UL>
        <li>Au niveau de l'<strong>ovaire</strong> : un accroissement d'un follicule ovarien qui mûrit pour libérer l'ovule qu'il contient (c'est l'ovulation).</li>
        <li>Au niveau de l'<strong>utérus</strong> : durant cette phase il y a prolifération et épaississement de l'endomètre. On constate également la formation des tubes glandulaires en doigt de gant et le développement des vaisseaux sanguins.</li>
      </UL>

      <H3>Phase sécrétoire</H3>
      <P>(Phase lutéinique = phase post-ovulatoire). Elle commence après l'ovulation et montre :</P>
      <UL>
        <li>Au niveau de l'<strong>ovaire</strong> : le follicule qui a émis son ovule s'est modifié en corps jaune.</li>
        <li>Au niveau de l'<strong>utérus</strong> :
          <UL>
            <li>L'augmentation de l'épaississement de l'endomètre toujours par multiplication cellulaire.</li>
            <li>L'apparition d'une structure en dentelle de l'endomètre.</li>
            <li>Les tubes glandulaires sécrètent du mucus et du glycogène pour servir de nourriture à l'embryon s'il y a fécondation.</li>
          </UL>
        </li>
      </UL>
      <P>
        À la fin du cycle, s'il n'y a pas fécondation, le corps jaune dégénère et la sécrétion de progestérone diminue. Cette diminution de la sécrétion
        entraîne la régression de la dentelle utérine. Il y a rupture des artérioles spiralées, puis hémorragie avec évacuation des débris de la dentelle
        utérine : ce sont les <strong>règles</strong> ou <strong>menstruations</strong>.
      </P>
      <Figure n={18} legend="Tableau : Cycles ovarien et utérin (sans grossesse)" />

      <H2>Cycle de la glaire cervicale</H2>
      <P>
        Pendant la phase folliculaire et lutéinique, la sécrétion de la glaire cervicale est peu abondante, épaisse, visqueuse et imperméable aux
        spermatozoïdes.
      </P>
      <P>
        Pendant la phase ovulatoire ou ovulation, la sécrétion est abondante, transparente et élastique ; elle devient perméable aux spermatozoïdes — les
        mailles de la glaire deviennent larges permettant aux spermatozoïdes de passer.
      </P>

      <H2>Cycle de la température corporelle</H2>
      <P>Au cours d'un cycle sexuel, il y a une variation cyclique de la température.</P>
      <UL>
        <li>Pendant la <strong>phase folliculaire</strong>, la température est inférieure à 37 °C (température rectale avant la levée matinale).</li>
        <li>Pendant l'<strong>ovulation</strong>, il y a augmentation brusque de la température qui devient supérieure à 37 °C (augmentation de quelques 10ᵉ de degré). Cette augmentation correspond à la sécrétion de la progestérone.</li>
        <li>Pendant la <strong>phase lutéale</strong>, cette température à l'ovulation est maintenue jusqu'à la fin du cycle.</li>
      </UL>
      <Callout type="info" title="Remarque">
        À chaque cycle sexuel, sans fécondation, les mêmes phénomènes se reproduisent simultanément au niveau des deux organes. Il y a donc un{" "}
        <strong>synchronisme</strong> entre le cycle de l'ovaire et celui de l'utérus, comme le montre l'ablation des ovaires chez un animal. Cette ablation
        supprime, en effet, le fonctionnement utérin qui est commandé par les ovaires, probablement par voie sanguine. De plus, lors de la ménopause, alors
        que les ovaires ne fonctionnent plus, il n'y a plus ni ovulation, ni règles : le cycle est totalement arrêté.
      </Callout>
    </>
  ),
};

const SEC_REG_FEM: Section = {
  id: "regulation-hormonale-feminine",
  title: "Régulation hormonale (féminine)",
  render: () => (
    <>
      <H2>La régulation des hormones sexuelles chez la femme</H2>

      <H3>Contrôle hormonal</H3>
      <P>L'activité sexuelle est contrôlée par des facteurs hormonaux qui s'effectuent sur 3 niveaux :</P>

      <H4>Au niveau de l'hypothalamus</H4>
      <P>
        L'hypothalamus contrôle la sécrétion hormonale hypophysaire grâce à des neuro-hormones hypothalamiques : la <strong>GnRH</strong> = Gonado-Releasing
        Hormone ou Gonadolibérine.
      </P>

      <H4>Au niveau de l'hypophyse</H4>
      <P>
        L'antéhypophyse (hypophyse antérieure) intervient dans le contrôle de l'ovaire. La GnRH stimule la sécrétion des hormones hypophysaires qui seront
        déversées dans le sang et agiront sur l'ovaire. Ces hormones sont appelées <strong>gonadostimulines</strong> ou <strong>gonadotropines</strong> ;
        on cite : l'hormone folliculo-stimulante (<strong>FSH</strong>) et l'hormone lutéinisante (<strong>LH</strong>).
      </P>
      <P><strong>a. Pendant la phase pré-ovulatoire</strong> : la FSH et la LH stimulent le développement des follicules ovariens.</P>
      <P>
        <strong>b. Pendant l'ovulation</strong> : les gonadostimulines provoquent la dissolution des cellules du cumulus oophorus, la reprise de la première
        division de la méiose qui s'achève en quelques heures. 36 heures après le pic, l'ovocyte II est libéré.
      </P>
      <P>
        <strong>c. Lors de la phase post-ovulatoire</strong> : après l'ovulation, les restes du follicule se modifient sous l'influence de LH (qui continue à
        être sécrétée par l'hypophyse) en une structure endocrine : le corps jaune qui commence à sécréter surtout de la progestérone et peu d'œstrogènes.
        Les taux élevés d'œstrogènes et de progestérone freinent la sécrétion de LH et de FSH.
      </P>
      <P><strong>d. En fin de cycle</strong> : les sécrétions ovariennes chutent, ce qui déclenche les règles.</P>

      <H4>Au niveau de l'ovaire</H4>
      <UL>
        <li>Le follicule ovarien mature sécrète des œstrogènes qui provoquent l'épaississement de l'endomètre (phase proliférative du cycle menstruel, du 5ᵉ jour à l'ovulation).</li>
        <li>Après l'ovulation, le corps jaune sécrète des œstrogènes et de la progestérone, qui préparent l'endomètre à l'implantation de l'œuf (phase sécrétoire du cycle menstruel, de l'ovulation au 28ᵉ jour).</li>
        <li>Le corps jaune qui dégénère forme (en absence de fécondation) le <strong>corpus albicans</strong> (qui finira par disparaître au cours des cycles suivants). Les taux d'œstrogènes et de progestérone chutent brutalement, l'endomètre est dégradé et un nouveau cycle menstruel commence (phase menstruelle).</li>
      </UL>
      <P>
        Ainsi, de la puberté à la ménopause (qui survient vers l'âge de 50 ans) et hors périodes de gestation, alternent phases folliculaires et phases
        lutéales pendant lesquelles œstrogènes et progestérone rythment la physiologie féminine. Leurs actions sont en effet innombrables.
      </P>

      <H3>Variations cycliques</H3>
      <H4>Hormones hypophysaires</H4>
      <P>FSH et LH présentent un taux variable au cours du cycle :</P>
      <UL>
        <li>FSH est élevée au début du cycle et présente un pic pré-ovulatoire au milieu du cycle.</li>
        <li>LH a un taux bas tout au long du cycle et également un pic pré-ovulatoire très important au milieu du cycle.</li>
      </UL>
      <H4>Hormones ovariennes</H4>
      <UL>
        <li>Les <strong>œstrogènes</strong>, faibles au début du cycle, leur taux s'élève et on note un pic important 12 à 24 heures avant l'ovulation. En phase lutéale, on note une augmentation des œstrogènes suivie d'une diminution au moment des menstrues.</li>
        <li>Le taux de <strong>progestérone</strong> est variable au cours du cycle menstruel : il est très faible pendant toute la phase pré-ovulatoire, s'élève après l'ovulation jusqu'au 8ᵉ jour de la phase lutéale, puis décline jusqu'à la menstruation.</li>
      </UL>
      <Figure n={19} legend="La régulation hormonale du cycle ovarien" />

      <H3>Rôles des hormones ovariennes</H3>
      <H4>Les œstrogènes</H4>
      <UL>
        <li>Ils sont responsables de l'apparition des caractères sexuels secondaires à la puberté (modification de la morphologie et de la stature, développement des seins).</li>
        <li>Ils assurent le fonctionnement cyclique de l'ensemble de la sphère génitale (utérus, vagin, vulve, glandes mammaires).</li>
        <li>Ils favorisent la prolifération de l'endomètre (muqueuse utérine) en phase folliculaire et le préparent à l'action de la progestérone.</li>
        <li>Ils augmentent la sécrétion de glaire cervicale (mucus produit par le col utérin) et la rendent perméable aux spermatozoïdes en période préovulatoire.</li>
        <li>Ils stimulent l'hydratation des parois du vagin et acidifient son milieu (rôle antiseptique).</li>
        <li>Ils possèdent un effet hypothermiant.</li>
        <li>Enfin, d'une manière générale, ils agissent sur de nombreux tissus (adipeux, cutané, endocrinien, musculaire, nerveux, osseux) et participent à la régulation du métabolisme hydrominéral.</li>
      </UL>
      <H4>La progestérone</H4>
      <UL>
        <li>Elle renforce les effets des œstrogènes sur l'endomètre et assure sa transformation en « dentelle utérine » (structure tubulaire richement vascularisée) de manière à permettre la nidation.</li>
        <li>Elle inhibe la contractilité du myomètre (muscle utérin) ce qui contribue à faciliter l'implantation de l'œuf dans l'endomètre.</li>
        <li>Elle modifie la structure de la glaire cervicale élaborée en phase folliculaire en la rendant imperméable aux spermatozoïdes.</li>
        <li>Elle favorise le développement des acini mammaires.</li>
        <li>Elle possède un effet hyperthermiant, ce qui explique la montée thermique en période d'ovulation, la température centrale passant d'une moyenne de 36,8 °C en phase folliculaire à 37,2 °C en phase lutéale.</li>
        <li>Enfin, d'une manière générale, elle place l'organisme féminin en situation d'accueillir et de soutenir une grossesse.</li>
      </UL>

      <H3>Le rétrocontrôle</H3>
      <P>
        Comme chez le mâle, le complexe hypothalamo-hypophysaire détecte les variations du taux des hormones produites par les ovaires : les hormones
        ovariennes exercent donc un rétrocontrôle sur le système de commande.
      </P>
      <H4>Au début du cycle</H4>
      <P>
        Juste avant l'ovulation, la FSH déclenche la maturation du follicule et la sécrétion d'œstrogènes. Quand le taux d'œstrogènes arrive à un niveau
        élevé il freine la production de FSH : <strong>rétroaction négative</strong>.
      </P>
      <H4>À l'ovulation</H4>
      <P>
        Un pic d'œstrogènes déclenche une brusque montée de LH et FSH entraînant l'ovulation : <strong>rétroaction positive</strong>.
      </P>
      <H4>Après l'ovulation</H4>
      <P>
        On a la formation du corps jaune et la sécrétion de quantités croissantes de progestérone et d'œstrogènes. Quand le taux des œstro-progestatifs
        augmente, il déclenche la deuxième <strong>rétroaction négative</strong> sur FSH et LH.
      </P>
      <P>
        Le freinage de la sécrétion de FSH et LH cause la régression du corps jaune ce qui entraîne le fait que le taux des hormones ovariennes atteint sa
        valeur la plus basse : c'est la période de menstruation.
      </P>

      <H3>Ménopause</H3>
      <P>
        On désigne par <strong>ménopause</strong> le moment où les règles s'arrêtent définitivement. Cependant, il n'est pas toujours aisé de déterminer cet
        instant puisqu'une ou plusieurs menstruations sporadiques peuvent encore survenir après une période d'aménorrhée de quelques mois.
      </P>
    </>
  ),
};

const CHAPTERS: ChapterDef[] = [
  {
    id: "ch1",
    number: 1,
    title: "Différenciation du sexe",
    accent: "from-indigo-500/15 via-indigo-500/5 to-transparent border-indigo-500",
    sections: [SEC_DIFF],
  },
  {
    id: "ch2",
    number: 2,
    title: "Appareil génital masculin",
    accent: "from-sky-500/15 via-sky-500/5 to-transparent border-sky-500",
    sections: [SEC_APP_MASC, SEC_SPERMATO, SEC_REG_MASC, SEC_PUB_MASC],
  },
  {
    id: "ch3",
    number: 3,
    title: "Appareil génital féminin",
    accent: "from-rose-500/15 via-rose-500/5 to-transparent border-rose-500",
    sections: [SEC_APP_FEM, SEC_GLANDES, SEC_OVO, SEC_CYCLES, SEC_REG_FEM],
  },
];

/* --------------------------------------------------------------------------
 * Password screen
 * -------------------------------------------------------------------------- */
function PasswordScreen({
  password,
  setPassword,
  error,
  onSubmit,
}: {
  password: string;
  setPassword: (v: string) => void;
  error: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <Lock className="text-primary" size={24} />
          </div>
          <h1 className="font-display text-xl font-bold text-foreground mb-1">
            Anatomie Gynéco-Obstétricale
          </h1>
          <p className="text-sm text-muted-foreground">
            Licence · Sage-Femme · Semestre 2
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe du cours"
            autoFocus
            className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring transition-shadow"
          />
          {error && (
            <p className="text-center text-xs text-destructive">
              Mot de passe incorrect. Veuillez réessayer.
            </p>
          )}
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Accéder au cours
          </button>
        </form>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Composant principal
 * -------------------------------------------------------------------------- */
export default function CoursAnatomieGynecoObstetricale() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // Navigation state
  const [navOpen, setNavOpen] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState(CHAPTERS[0].id);
  const [activeSectionId, setActiveSectionId] = useState(CHAPTERS[0].sections[0].id);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === COURSE_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  // Scroll spy : suit le chapitre + section actifs + bouton back-to-top
  useEffect(() => {
    if (!unlocked) return;
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Trouver la section visible la plus proche du haut (offset 140 px pour la sticky bar)
      const offset = 160;
      let currentSection = CHAPTERS[0].sections[0].id;
      let currentChapter = CHAPTERS[0].id;
      for (const ch of CHAPTERS) {
        for (const sec of ch.sections) {
          const el = document.getElementById(`section-${sec.id}`);
          if (el && el.getBoundingClientRect().top <= offset) {
            currentSection = sec.id;
            currentChapter = ch.id;
          }
        }
      }
      setActiveSectionId(currentSection);
      setActiveChapterId(currentChapter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [unlocked]);

  // Gestion ancre initiale (#hash) après déverrouillage
  useEffect(() => {
    if (!unlocked) return;
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [unlocked]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setNavOpen(false);
    }
  };

  // Indicateur de progression
  const progress = useMemo(() => {
    const ch = CHAPTERS.find((c) => c.id === activeChapterId) ?? CHAPTERS[0];
    const secIdx = ch.sections.findIndex((s) => s.id === activeSectionId);
    return {
      chapterIdx: CHAPTERS.findIndex((c) => c.id === ch.id) + 1,
      chapterTotal: CHAPTERS.length,
      chapterTitle: ch.title,
      sectionIdx: Math.max(secIdx, 0) + 1,
      sectionTotal: ch.sections.length,
    };
  }, [activeChapterId, activeSectionId]);

  if (unlocked === null) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!unlocked) {
    return (
      <PasswordScreen
        password={password}
        setPassword={(v) => {
          setPassword(v);
          setError(false);
        }}
        error={error}
        onSubmit={handleUnlock}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      {/* En-tête */}
      <header className="mb-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {["Licence", "Sage-Femme", "Semestre 2", "Anatomie Gynéco-Obstétricale"].map((b) => (
            <span
              key={b}
              className="inline-block text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              {b}
            </span>
          ))}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">
          Anatomie Gynéco-Obstétricale
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Cours structuré en 3 chapitres — utilisez la navigation latérale ou le menu pour naviguer.
        </p>
      </header>

      {/* Barre sticky : indicateur de progression + menu mobile */}
      <div className="sticky top-0 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-background/95 backdrop-blur border-b border-border mb-4">
        <div className="flex items-center justify-between gap-3 py-2.5">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
              Chapitre {progress.chapterIdx}/{progress.chapterTotal} — Section {progress.sectionIdx}/{progress.sectionTotal}
            </p>
            <p className="text-sm font-display font-semibold text-foreground truncate">
              {progress.chapterTitle}
            </p>
          </div>
          {/* Liens de chapitres horizontaux (desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {CHAPTERS.map((c) => (
              <a
                key={c.id}
                href={`#chapter-${c.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(`chapter-${c.id}`);
                }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap",
                  activeChapterId === c.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                )}
              >
                Ch. {c.number}
              </a>
            ))}
          </nav>
          {/* Toggle menu mobile / lg:hidden */}
          <button
            type="button"
            onClick={() => setNavOpen((v) => !v)}
            aria-label="Ouvrir le sommaire"
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
          >
            {navOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {/* Barre de progression visuelle */}
        <div className="h-1 -mx-px bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${((progress.chapterIdx - 1) / progress.chapterTotal) * 100 + (progress.sectionIdx / progress.sectionTotal) * (100 / progress.chapterTotal)}%`,
            }}
          />
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-8">
        {/* Sidebar navigation desktop */}
        <aside className="hidden lg:block">
          <nav className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            <ol className="space-y-4">
              {CHAPTERS.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#chapter-${c.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(`chapter-${c.id}`);
                    }}
                    className={cn(
                      "block font-display font-bold text-sm leading-tight transition-colors",
                      activeChapterId === c.id ? "text-primary" : "text-foreground hover:text-primary"
                    )}
                  >
                    <span className="text-xs uppercase tracking-widest text-muted-foreground block">Chapitre {c.number}</span>
                    <span className="text-primary/70 mr-1.5 tabular-nums">{c.number}.</span>{c.title}
                  </a>
                  <ul className="mt-2 ml-3 space-y-1.5 border-l-2 border-border pl-3">
                    {c.sections.map((s, i) => (
                      <li key={s.id}>
                        <a
                          href={`#section-${s.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToId(`section-${s.id}`);
                          }}
                          className={cn(
                            "block text-xs leading-snug py-1 -ml-[14px] pl-[11px] border-l-2 transition-colors",
                            activeSectionId === s.id
                              ? "border-primary text-primary font-semibold"
                              : "border-transparent text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <span className="text-muted-foreground/70 mr-1.5 tabular-nums">{c.number}.{i + 1}</span>{s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        {/* Drawer navigation mobile */}
        {navOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setNavOpen(false)}
          >
            <aside
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-card border-l border-border p-5 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-foreground">Sommaire</h2>
                <button
                  type="button"
                  onClick={() => setNavOpen(false)}
                  className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-muted text-foreground"
                >
                  <X size={16} />
                </button>
              </div>
              <ol className="space-y-4">
                {CHAPTERS.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#chapter-${c.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(`chapter-${c.id}`);
                      }}
                      className="block font-display font-bold text-sm text-foreground"
                    >
                      <span className="text-xs uppercase tracking-widest text-muted-foreground block">Chapitre {c.number}</span>
                      <span className="text-primary/70 mr-1.5 tabular-nums">{c.number}.</span>{c.title}
                    </a>
                    <ul className="mt-2 ml-3 space-y-1.5 border-l-2 border-border pl-3">
                      {c.sections.map((s, i) => (
                        <li key={s.id}>
                          <a
                            href={`#section-${s.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToId(`section-${s.id}`);
                            }}
                            className={cn(
                              "block text-xs py-1",
                              activeSectionId === s.id
                                ? "text-primary font-semibold"
                                : "text-muted-foreground"
                            )}
                          >
                            <span className="text-muted-foreground/70 mr-1.5 tabular-nums">{c.number}.{i + 1}</span>{s.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        )}

        {/* Contenu */}
        <article ref={articleRef} className="min-w-0">
          {CHAPTERS.map((c) => (
            <section key={c.id} id={`chapter-${c.id}`} className="scroll-mt-32 mb-16">
              {/* En-tête de chapitre distinctif */}
              <div
                className={cn(
                  "rounded-xl border-l-4 bg-gradient-to-r p-5 sm:p-6 mb-2",
                  c.accent
                )}
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                  Chapitre {c.number} sur {CHAPTERS.length}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-1">
                  {c.title}
                </h2>
                {c.sections.length > 1 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {c.sections.map((s, i) => (
                      <li key={s.id}>
                        <a
                          href={`#section-${s.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToId(`section-${s.id}`);
                          }}
                          className="text-xs px-2.5 py-1 rounded-full bg-card border border-border text-foreground/80 hover:text-primary hover:border-primary transition-colors"
                        >
                          {i + 1}. {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Sections du chapitre */}
              {c.sections.map((s) => (
                <section key={s.id} id={`section-${s.id}`} className="scroll-mt-32">
                  {s.render()}
                </section>
              ))}
            </section>
          ))}
        </article>
      </div>

      {/* Back to top */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Revenir en haut"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
