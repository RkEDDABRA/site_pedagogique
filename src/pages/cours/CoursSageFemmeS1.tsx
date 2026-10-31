import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Lock, BookOpen, Info, AlertTriangle, Pin, ZoomIn, X, Menu, ArrowUp, Link2, Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

import fig01 from "@/assets/cours-sf-s1/microbio/fig01-branches.png";
import fig02 from "@/assets/cours-sf-s1/microbio/fig02-organisation.jpg";
import fig03 from "@/assets/cours-sf-s1/microbio/fig03-eucaryote.jpg";
import fig04 from "@/assets/cours-sf-s1/microbio/fig04-procaryote.jpg";
import fig05 from "@/assets/cours-sf-s1/microbio/fig05-classification.jpg";
import fig06 from "@/assets/cours-sf-s1/microbio/fig06-coloration-gram.jpg";
import fig07 from "@/assets/cours-sf-s1/microbio/fig07-structure-bacterie.jpg";
import fig08 from "@/assets/cours-sf-s1/microbio/fig08-formes-arrangements.jpg";
import fig09 from "@/assets/cours-sf-s1/microbio/fig09-paroi-gram-positif.jpg";
import fig10 from "@/assets/cours-sf-s1/microbio/fig10-paroi-gram-negatif.jpg";
import fig11 from "@/assets/cours-sf-s1/microbio/fig11-paroi-gram-neg-2.jpg";
import fig19 from "@/assets/cours-sf-s1/microbio/fig17-oxygene.jpg";
import fig20 from "@/assets/cours-sf-s1/microbio/fig18-scissiparite.jpg";
import fig7p1 from "@/assets/cours-sf-s1/microbio/figure7_partie1_formes.png";
import fig7p2 from "@/assets/cours-sf-s1/microbio/figure7_partie2_arrangements.png";
import figFlagelles from "@/assets/cours-sf-s1/microbio/figure10_flagelles.jpeg";
import figCapsule from "@/assets/cours-sf-s1/microbio/figure11_capsule_structure.png";
import figPili from "@/assets/cours-sf-s1/microbio/figure12_pili_fimbriae.png";
import figSpore from "@/assets/cours-sf-s1/microbio/figure13_structure_spore.jpeg";
import figCycleSporal from "@/assets/cours-sf-s1/microbio/figure14_cycle_sporal.png";
import figFormesSpore from "@/assets/cours-sf-s1/microbio/figure15_forme_position_deformation_spore.png";
import figCourbeCroissance from "@/assets/cours-sf-s1/microbio/figure18_courbe_croissance_bacterienne.png";
import { dimsFor } from "@/lib/imageDims";

const FIGURE_MAP: Record<number, { src: string; extras?: string[] }> = {
  1: { src: fig01 },
  2: { src: fig02 },
  3: { src: fig03, extras: [fig04] },
  4: { src: fig05 },
  5: { src: fig06 },
  6: { src: fig07 },
  7: { src: fig08 },
  8: { src: fig09 },
  9: { src: fig10, extras: [fig11] },
  10: { src: figFlagelles },
  11: { src: figCapsule },
  12: { src: figPili },
  13: { src: figSpore },
  14: { src: figCycleSporal },
  15: { src: figFormesSpore },
  16: { src: fig19 },
  17: { src: fig20 },
  18: { src: figCourbeCroissance },
};

/** Largeur maximale (px) recommandée par figure, pour éviter les images surdimensionnées. */
const FIGURE_MAX_WIDTH: Record<number, number> = {
  10: 480,
  11: 560,
  12: 460,
  13: 520,
  14: 560,
  15: 620,
  18: 520,
};

const COURSE_PASSWORD = "SB2026";
const STORAGE_KEY = "course_unlocked_sf-s1";

/* ----------------------------- helpers ----------------------------- */
const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function AnchorLink({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(`${window.location.origin}${window.location.pathname}#${id}`);
        setCopied(true);
        history.replaceState(null, "", `#${id}`);
        setTimeout(() => setCopied(false), 1500);
      }}
      aria-label="Copier le lien"
      className="ml-2 inline-flex items-center justify-center text-muted-foreground/50 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
    >
      {copied ? <Check size={14} /> : <Link2 size={14} />}
    </button>
  );
}

function H2({ children }: { children: string }) {
  const id = slug(children);
  return (
    <h2 id={id} className="group scroll-mt-32 font-display text-2xl sm:text-3xl font-bold text-primary border-b border-primary/20 pb-2 mt-12 mb-5 flex items-center">
      <span>{children}</span><AnchorLink id={id} />
    </h2>
  );
}
function H3({ children }: { children: string }) {
  const id = slug(children);
  return (
    <h3 id={id} className="group scroll-mt-32 font-display text-lg sm:text-xl font-semibold text-foreground/90 mt-8 mb-3 flex items-center">
      <span>{children}</span><AnchorLink id={id} />
    </h3>
  );
}
function H4({ children }: { children: string }) {
  const id = slug(children);
  return (
    <h4 id={id} className="group scroll-mt-32 font-display text-base font-semibold text-foreground/80 mt-5 mb-2 flex items-center">
      <span>{children}</span><AnchorLink id={id} />
    </h4>
  );
}
const P = ({ children }: { children: ReactNode }) => <p className="text-foreground/80 leading-relaxed mb-4">{children}</p>;
const UL = ({ children }: { children: ReactNode }) => <ul className="list-disc pl-6 space-y-1.5 text-foreground/80 leading-relaxed mb-4">{children}</ul>;

function Callout({ type = "info", title, children }: { type?: "info" | "warning" | "important" | "definition"; title?: string; children: ReactNode }) {
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

function Figure({
  n,
  legend,
  label,
  images: imagesProp,
  stacked,
  maxWidth,
}: {
  n: number;
  legend: string;
  label?: string;
  images?: string[];
  stacked?: boolean;
  maxWidth?: number;
}) {
  const [zoomed, setZoomed] = useState<string | null>(null);
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomed(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed]);

  const mapping = FIGURE_MAP[n];
  const images = imagesProp ?? (mapping ? [mapping.src, ...(mapping.extras ?? [])] : []);
  const caption = label ?? `Figure ${n}`;
  const width = maxWidth ?? FIGURE_MAX_WIDTH[n];

  if (images.length === 0) {
    return (
      <figure className="my-6">
        <div className="border-2 border-dashed border-border bg-muted/30 rounded-lg px-6 py-10 text-center">
          <BookOpen className="mx-auto text-muted-foreground mb-2" size={28} />
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{caption}</p>
          <p className="text-sm text-foreground/70 italic mt-1">{legend}</p>
        </div>
      </figure>
    );
  }
  return (
    <>
      <figure className="my-8 mx-auto w-full" style={width ? { maxWidth: `${width}px` } : undefined}>
        <div className={cn("grid gap-3", images.length === 1 || stacked ? "grid-cols-1" : "sm:grid-cols-2")}>
          {images.map((src, i) => (
            <button key={i} type="button" onClick={() => setZoomed(src)} className="group relative bg-card rounded-lg overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-all">
              <img src={src} {...dimsFor(src)} alt={`${legend} (${i + 1}/${images.length})`} loading="lazy" className="w-full h-auto object-contain bg-card" />
              <span className="absolute top-2 right-2 bg-foreground/70 text-background rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"><ZoomIn size={14} /></span>
            </button>
          ))}
        </div>
        <figcaption className="mt-3 text-center">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">{caption}</span>
          <p className="text-sm text-muted-foreground italic mt-1">{legend}</p>
        </figcaption>
      </figure>
      {zoomed && (
        <div onClick={() => setZoomed(null)} className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in">
          <button type="button" onClick={() => setZoomed(null)} className="absolute top-4 right-4 bg-card text-foreground rounded-full p-2 shadow-lg hover:scale-110 transition-transform" aria-label="Fermer"><X size={20} /></button>
          <img src={zoomed} alt={legend} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}

function DataTable({ headers, rows, caption }: { headers: string[]; rows: ReactNode[][]; caption?: string }) {
  return (
    <div className="my-5">
      {caption && <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">{caption}</p>}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-primary text-primary-foreground">
            <tr>{headers.map((h, i) => <th key={i} className="px-4 py-2.5 text-left font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/40"}>
                {r.map((c, j) => <td key={j} className="px-4 py-2.5 align-top text-foreground/80 border-t border-border">{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="my-6 rounded-xl border-2 border-dashed border-border bg-muted/20 p-8 text-center">
      <Clock className="mx-auto mb-3 text-muted-foreground" size={32} />
      <p className="font-display font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground mt-1">Le contenu de cette section sera ajouté prochainement.</p>
    </div>
  );
}

/* ----------------------------- Sections ----------------------------- */
type Section = { id: string; title: string; render: () => ReactNode };
type ChapterDef = { id: string; number: number; title: string; accent: string; sections: Section[] };

/* === CH1 — Microbiologie — 1.1 Bactéries (contenu complet, réutilisable) === */
export const SEC_BACT_FULL: Section = {
  id: "bacteries",
  title: "1.1 Bactéries",
  render: () => (
    <>
      <H2>1.1 Introduction aux microorganismes & Bactéries</H2>

      <H3>1.1.1 Définition de la microbiologie</H3>
      <P>
        La microbiologie est l'étude des organismes trop petits pour être vus à l'œil nu : les <strong>micro-organismes</strong>. Leur taille est généralement
        inférieure à un millimètre ; ils doivent être observés au microscope (photonique ou électronique) et cultivés dans des milieux permettant leur croissance
        et leur isolement. La microbiologie est divisée en plusieurs branches, en fonction du type de « microbe » étudié : <em>Virologie, Mycologie,
        Bactériologie, Phycologie, Parasitologie</em>.
      </P>
      <Figure n={1} legend="Les branches de la Microbiologie" />

      <H4>Quelques repères historiques</H4>
      <UL>
        <li><strong>Antonie van Leeuwenhoek</strong> (1632–1723) observe en 1676 des micro-organismes (« animalcules ») grâce à un microscope qu'il a construit.</li>
        <li><strong>Louis Pasteur</strong> (1822–1895), 1857 : démontre que la fermentation du sucre en acide lactique est due à un micro-organisme, contribuant à la remise en cause de la théorie de la génération spontanée.</li>
        <li><strong>Robert Koch</strong> (1843–1910), 1876 : démontre que le charbon est dû à <em>Bacillus anthracis</em> ; découvre <em>Mycobacterium tuberculosis</em> ; publie ses postulats en 1884.</li>
        <li><strong>Hans Christian Gram</strong> (1853–1928), 1884 : développe la coloration de Gram.</li>
        <li>1923 : première édition du manuel de Bergey.</li>
        <li>1928 : Griffith découvre la conjugaison bactérienne ; 1929 : Fleming découvre la pénicilline.</li>
        <li>1952 : Zinder &amp; Lederberg, transduction généralisée ; 1961 : Jacob &amp; Monod, modèle de l'opéron.</li>
      </UL>

      <H3>1.1.2 Comparaison cellule eucaryote / cellule procaryote</H3>
      <P>Les êtres vivants peuvent être divisés en deux grands groupes :</P>
      <UL>
        <li><strong>Organismes procaryotes</strong> : organisation cellulaire simple, sans noyau ; l'ADN est directement au contact du cytoplasme. Ils regroupent les <em>eubactéries</em> et les <em>archébactéries</em>.</li>
        <li><strong>Organismes eucaryotes</strong> : cellule à noyau contenant l'ADN sur des chromosomes. Pluricellulaires (champignons, plantes, animaux) ou unicellulaires (« protistes » : algues unicellulaires, protozoaires, levures).</li>
      </UL>
      <Callout type="info" title="Remarque — Les virus">
        L'absence de structure cellulaire, de métabolisme et de croissance fait que les virus ne peuvent pas être considérés véritablement comme des êtres vivants.
      </Callout>
      <Figure n={2} legend="Organisation des grands groupes de micro-organismes selon leurs caractéristiques générales" />
      <Figure n={3} legend="Cellule eucaryote et cellule procaryote — comparaison structurale" />

      <DataTable
        caption="Tableau 1 — Principales différences eucaryote / procaryote"
        headers={["Caractère", "Cellule eucaryote", "Cellule procaryote"]}
        rows={[
          ["Noyau", "Présent, limité par une enveloppe nucléaire", "Absent — région nucléaire diffuse (nucléoïde)"],
          ["Chromosome(s)", "Plusieurs chromosomes linéaires", "Chromosome circulaire, en général unique"],
          ["ADN associé à", "Histones", "Protéines basiques (non histones)"],
          ["Organites", "Mitochondries, REG, Golgi, chloroplastes (végétaux)", "Aucun"],
          ["Ribosomes", "80S", "70S"],
          ["Peptidoglycane (paroi)", "Absent", "Présent (chez les eubactéries seulement)"],
        ]}
      />

      <H3>1.1.3 Classification des bactéries</H3>
      <H4>a. Classification phénotypique</H4>
      <UL>
        <li><strong>Aspects tinctoriaux</strong> : coloration de Gram (Gram positif / Gram négatif).</li>
        <li><strong>Aspects morphologiques</strong> : sphérique ou ovale (<em>coques, cocci</em>), cylindrique (<em>bacilles</em>), virgule (<em>vibrions</em>), spiralée (<em>spirochètes</em>).</li>
        <li>Mobilité.</li>
        <li>Besoins nutritionnels.</li>
      </UL>
      <H4>b. Classification génotypique</H4>
      <P>
        La connaissance des séquences nucléiques (notamment des ARN ribosomiques) permet de dresser des schémas phylogénétiques. Le pourcentage en nucléotides
        G + C du génome est une donnée importante : deux espèces proches auront des % G + C voisins.
      </P>
      <H4>c. Classification analytique (nomenclature binomiale)</H4>
      <P>Règles de Linné (1753). Le nom est formé de deux fragments :</P>
      <UL>
        <li>le premier = nom de <strong>genre</strong>, première lettre en majuscule ;</li>
        <li>le second = qualificatif (descriptif), première lettre en minuscule ;</li>
        <li>l'ensemble est noté en <em>italique</em>.</li>
      </UL>
      <Callout type="definition" title="Exemple — Escherichia coli">
        Règne : <em>Bacteria</em> · Embranchement : <em>Proteobacteria</em> · Classe : <em>Gamma Proteobacteria</em> · Ordre : <em>Enterobacteriales</em> ·
        Famille : <em>Enterobacteriaceae</em> · Genre : <em>Escherichia</em> · Espèce : <em>Escherichia coli</em>.
      </Callout>
      <Figure n={4} legend="Hiérarchie taxonomique : Règne → Embranchement → Classe → Ordre → Famille → Genre → Espèce" />

      <H2>1.2 Structure de la bactérie</H2>
      <H3>1.2.1 Définition</H3>
      <Callout type="definition">
        <strong>Bactérie</strong> : être unicellulaire de petite taille (micron) présentant les caractéristiques propres des procaryotes — un seul chromosome
        accompagné d'un ou plusieurs plasmide(s), division par scissiparité, absence d'organite.
      </Callout>
      <P>
        <strong>Taille :</strong> variable, 1 µm × 2–5 µm en général.
      </P>
      <UL>
        <li>Les plus petites : 0,3–0,8 µm (<em>Chlamydia</em>, <em>Rickettsia</em>).</li>
        <li>La plus grande : 60 × 800 µm (<em>Epulopiscium fishelsoni</em>).</li>
      </UL>

      <H3>1.2.2 Méthodes d'étude</H3>
      <H4>a. Séparation des constituants cellulaires</H4>
      <P>Pour libérer les constituants, on rompt les enveloppes protectrices (paroi et membrane plasmique) :</P>
      <UL>
        <li>Ultrasons,</li>
        <li>Enzymes (ex. lysozyme) détruisant la paroi,</li>
        <li>Pression osmotique,</li>
        <li>Cryolyse (congélation/décongélation successives).</li>
      </UL>
      <P>Puis fractionnement (ex. ultracentrifugation).</P>

      <H4>b. Observation : la coloration de Gram</H4>
      <P>
        Fondée sur l'action successive du <strong>cristal violet</strong>, de l'<strong>iode</strong> (Lugol), d'un mélange <strong>alcool-acétone</strong>,
        puis de la <strong>safranine</strong>. Elle permet de distinguer la paroi des bactéries selon leur richesse en peptidoglycane et de les classer en
        <strong> Gram positif</strong> (violettes) et <strong>Gram négatif</strong> (roses).
      </P>
      <DataTable
        caption="Tableau 2 — Étapes de la coloration de Gram"
        headers={["Étape", "Effet sur E. coli (Gram −)", "Effet sur S. epidermidis (Gram +)", "Explication"]}
        rows={[
          ["Coloration au violet de gentiane", "Violette", "Violette", "Toutes les bactéries prennent la couleur violette."],
          ["Ajout de Lugol", "Violette", "Violette", "Un complexe se forme entre Lugol et le violet de gentiane ; les bactéries restent violettes."],
          ["Rinçage à l'alcool", "Incolore", "Violette", "La paroi Gram − ne retient pas le complexe et se décolore ; la paroi Gram + le retient."],
          ["Coloration à la safranine", "Rose", "Violette", "Contre-coloration des bactéries Gram −."],
          ["Résultat", "Bactéries Gram négatives", "Bactéries Gram positives", "Les Gram − sont roses, les Gram + sont violettes."],
        ]}
      />
      <Figure n={5} legend="Aspect microscopique des bactéries après coloration de Gram" />

      <H3>1.2.3 Structure générale d'une bactérie</H3>
      <P>Dans une cellule bactérienne on distingue :</P>
      <UL>
        <li><strong>Structures obligatoires (constantes)</strong> : paroi (sauf chez <em>Mycoplasma</em>), membrane cytoplasmique, cytoplasme (ribosomes), appareil nucléaire.</li>
        <li><strong>Structures facultatives</strong> : capsule, plasmides, flagelles, pili et fimbriae.</li>
      </UL>
      <Figure n={6} legend="Structure générale d'une bactérie" />

      <H3>1.2.4 Structures obligatoires</H3>

      <H4>a. La paroi</H4>
      <P>
        Enveloppe rigide assurant l'intégrité de la bactérie et responsable de sa <strong>forme</strong>. Absente chez les Mollicutes (Mycoplasmes). Sa
        structure diffère selon Gram (+) ou Gram (−), mais elle a un élément commun : le <strong>peptidoglycane</strong>, enveloppe la plus interne.
      </P>
      <H4>Rôles de la paroi</H4>
      <UL>
        <li>Maintien de la <strong>forme bactérienne</strong> et de l'arrangement (cf. Figure 7).</li>
        <li>Protection contre les variations de <strong>pression osmotique</strong>.</li>
        <li><strong>Antigénicité</strong> : antigènes O des bacilles Gram −.</li>
        <li><strong>Récepteurs de bactériophages</strong> (lysotypie).</li>
        <li>Participation à la <strong>mobilité</strong> : ancrage des flagelles (immobilité des protoplastes).</li>
        <li><strong>Toxicité</strong> : chez les Gram −, le LPS est une endotoxine (lipide A).</li>
        <li><strong>Perméabilité</strong> sélective aux petites molécules.</li>
      </UL>
      <Figure n={7} legend="Formes et arrangements fréquents chez les bactéries (diplo-, strepto-, staphylo-)" />
      <Figure
        n={7}
        label="Figure 7 (suite)"
        legend="Formes et arrangements fréquents chez les bactéries"
        images={[fig7p1, fig7p2]}
        stacked
        maxWidth={780}
      />

      <H4>Le peptidoglycane</H4>
      <P>
        (= muréine = mucocomplexe = mucopeptide) Polymère composé de :
      </P>
      <UL>
        <li>Une <strong>partie glucidique</strong> : chaînes linéaires de N-acétyl-D-glucosamine (NAG) et d'acide N-acétylmuramique (NAM).</li>
        <li>Un <strong>tétrapeptide</strong> lié à l'acide muramique par la fonction COOH.</li>
        <li>Des <strong>ponts interpeptidiques</strong>.</li>
      </UL>

      <H4>Paroi des bactéries Gram positif</H4>
      <UL>
        <li>Épaisse (20–80 nm) et homogène.</li>
        <li>Constituée en grande partie de peptidoglycane uni à des acides téichoïques et lipotéichoïques.</li>
        <li>Perméable aux antibiotiques.</li>
      </UL>
      <Figure n={8} legend="Structure de la paroi des bactéries Gram positif" />

      <H4>Paroi des bactéries Gram négatif</H4>
      <UL>
        <li>Moins épaisse (6–15 nm) mais beaucoup plus complexe. En plus du peptidoglycane on y trouve :</li>
        <li>Une <strong>membrane externe</strong>, riche en lipopolysaccharides (LPS) : lipide A toxique + partie polysaccharidique externe (antigène O).</li>
        <li>Une <strong>lipoprotéine de Braun</strong> reliant peptidoglycane et membrane externe.</li>
        <li>Un <strong>espace périplasmique</strong> pouvant contenir des enzymes inactivant certains antibiotiques.</li>
      </UL>
      <Figure n={9} legend="Structure de la paroi des bactéries Gram négatif (membrane externe, LPS, périplasme)" />

      <H4>Composition chimique comparée</H4>
      <DataTable
        caption="Tableau 3 — Constituants des parois Gram (+) et Gram (−)"
        headers={["Constituants", "Paroi Gram (+)", "Paroi Gram (−)"]}
        rows={[
          ["Osamines", "NAG et acide N-acétyl-muramique (NAM)", "NAG et acide N-acétyl-muramique (NAM)"],
          ["Acides téichoïques et lipotéichoïques", "Présents", "Absents"],
          ["Acides aminés majeurs", "Ala (D et L), D-Glu, L-Lys, acide diaminopimélique (DAP)", "Mêmes acides aminés (moins de L-Lys et de DAP)"],
          ["Lipides", "Peu (1 à 2 %)", "Grande quantité (10 à 20 % — membrane externe)"],
        ]}
      />

      <H4>b. La membrane cytoplasmique</H4>
      <UL>
        <li>Située sous la paroi, elle limite le cytoplasme.</li>
        <li>Bicouche lipidique + protéines (perméases, enzymes respiratoires, PLP — Protéines de Liaison aux Pénicillines, impliquées dans la synthèse du peptidoglycane).</li>
      </UL>
      <P><strong>Rôles :</strong></P>
      <UL>
        <li>Barrière semi-perméable (transport passif et actif).</li>
        <li>Site de fixation des flagelles.</li>
        <li>Excrétion d'enzymes hydrolytiques.</li>
      </UL>

      <H4>c. Le cytoplasme</H4>
      <P>Gel à pH ~ 7 – 7,2 contenant de l'eau et :</P>
      <UL>
        <li><strong>Ribosomes</strong> 70S — synthèse protéique.</li>
        <li><strong>Inclusions cytoplasmiques</strong> : substances de réserve (glucides — surtout glycogène, lipides, parfois minéraux : fer, soufre).</li>
        <li><strong>Organites spécialisés</strong> : chromatophores (photosynthèse), vacuoles à gaz (flottabilité).</li>
        <li><strong>Pigments</strong> : bactériochlorophylles (verts), caroténoïdes (jaune chez <em>Staphylococcus aureus</em>).</li>
      </UL>

      <H4>d. L'appareil nucléaire</H4>
      <P>
        Le chromosome bactérien est une <strong>unique molécule d'ADN circulaire fermée</strong> très longue (≈ 1000 fois plus que la bactérie : 1360 µm chez
        <em> E. coli</em>), libre et pelotonnée dans le cytoplasme. L'absence de membrane nucléaire conduit à parler d'<strong>appareil nucléaire</strong> ou
        de <strong>nucléoïde</strong>. L'ADN est associé à des topoisomérases (repliement), sans histones. Composition : 60 % ADN, 20 % ARN, 10 % protéines.
      </P>
      <Callout type="info" title="Rôles du chromosome bactérien">
        Support des caractères héréditaires ; il se réplique à l'identique afin que chaque cellule fille hérite du même potentiel génétique que la cellule mère.
      </Callout>

      <H3>1.2.5 Éléments facultatifs</H3>

      <H4>a. ADN extrachromosomique — les plasmides</H4>
      <P>
        ADN de petite taille (0,5 à 5 % du chromosome bactérien), extra-chromosomique, capable d'<strong>autoréplication</strong>. Les plasmides apportent du
        matériel génétique supplémentaire codant pour des caractères additionnels <em>non indispensables</em>. Les plus connus :
      </P>
      <UL>
        <li><strong>Facteur de fertilité (F)</strong> : transfert de fragments chromosomiques par conjugaison.</li>
        <li><strong>Plasmides de résistance aux antibiotiques (facteurs R)</strong>.</li>
        <li>Plasmides de <strong>virulence</strong> (toxines) ou de dégradation de certaines substances.</li>
      </UL>

      <H4>b. Les flagelles</H4>
      <P>
        De nature protéique, organes locomoteurs spécialisés, très rares chez les coques. Mesurent en moyenne 16–20 µm (bien plus que la bactérie) et sont
        très fins. Différents modes d'insertion selon le nombre et la position.
      </P>
      <Figure n={10} legend="Différents modes d'insertion des flagelles bactériens" />
      <P>
        Synthèse nécessitant 20 à 30 gènes. Les flagelles comportent trois parties : le <strong>filament</strong>, le <strong>crochet</strong> et le
        <strong> corpuscule basal</strong>.
      </P>
      
      <P><strong>Rôles :</strong></P>
      <UL>
        <li>Mobilité de la bactérie.</li>
        <li>Antigénique (sérodiagnostic) — différenciation des espèces.</li>
        <li>Chimiotactisme.</li>
      </UL>

      <H4>c. La capsule</H4>
      <P>
        Couche visqueuse ou gélatino-muqueuse entourant complètement la paroi. Existence conditionnée par :
      </P>
      <UL>
        <li>la possession des gènes codant pour sa fabrication ;</li>
        <li>la disponibilité dans le milieu des éléments nécessaires (principalement glucides).</li>
      </UL>
      <Figure n={11} legend="Capsule bactérienne et structure générale de la cellule" />
      <P><strong>Rôles et propriétés :</strong></P>
      <UL>
        <li><strong>Protection</strong> contre les UV, la dessiccation, les agents physiques et chimiques.</li>
        <li><strong>Pouvoir pathogène</strong> : oppose la phagocytose, chimiotactisme négatif sur les leucocytes, empêche la pénétration des antibiotiques (la perte de capsule = perte de virulence chez le pneumocoque).</li>
        <li><strong>Antigénique</strong> : les Ag capsulaires (Ag K) sont responsables de la spécificité sérologique — ex. 70 sérotypes chez <em>Streptococcus pneumoniae</em>.</li>
      </UL>

      <H4>d. Les pili et fimbriae</H4>
      <UL>
        <li><strong>Fimbriae</strong> : fines structures protéiques de surface ; rôle dans l'<strong>adhésion</strong> des pathogènes — facteur de virulence.</li>
        <li><strong>Pili sexuels</strong> : transfert du matériel génétique d'une bactérie « mâle » vers une bactérie « femelle » lors de la <strong>conjugaison</strong>.</li>
      </UL>
      <Figure n={12} legend="Pili et fimbriae à la surface d'une bactérie" />

      <H3>1.2.6 La spore bactérienne (endospore)</H3>
      <H4>a. Définition</H4>
      <P>
        Structures de <strong>résistance</strong> formées par certaines bactéries lorsque les conditions deviennent défavorables (carence nutritive, T° élevée,
        salinité, accumulation de toxines…). L'endospore est une cellule très différenciée, très résistante à la chaleur (détruite à 120 °C, certaines
        survivent jusqu'à 150 °C) et à divers agents chimiques.
      </P>
      <Figure n={13} legend="Structure d'une spore bactérienne (exosporium, tuniques, cortex, paroi sporale, nucléoïde)" />

      <H4>b. Le cycle sporal</H4>
      <P>Passage de la forme végétative à la forme sporulée et inversement :</P>
      <UL>
        <li><strong>Sporulation</strong> : forme végétative → spore. 6 à 8 h à 37 °C chez <em>Bacillus subtilis</em>. Déclenchée par modification de l'environnement (épuisement nutritif). Étapes : déshydratation du cytoplasme, densification du nucléoïde, synthèse d'une paroi sporale épaisse et imperméable.</li>
        <li><strong>Germination</strong> : spore → forme végétative, lorsque les conditions redeviennent favorables (nutritionnelles, thermiques, chimiques).</li>
      </UL>
      <Figure n={14} legend="Cycle sporal : passage forme végétative ↔ spore" />

      <H4>c. Morphologie et structure</H4>
      <P>
        Les spores sont de petites unités <strong>ovales</strong> ou <strong>sphériques</strong>. Elles peuvent <strong>déformer</strong> ou non le corps
        bactérien ; leur <strong>position</strong> est variable : centrale, terminale ou subterminale.
      </P>
      <Figure n={15} legend="Forme, position et déformation éventuelle de la spore au sein de la bactérie" />

      <H4>d. Composition chimique</H4>
      <P>La spore se différencie de la cellule végétative par :</P>
      <UL>
        <li>une faible teneur en eau (résistance à la dessiccation),</li>
        <li>une faible teneur en enzymes (activité métabolique réduite),</li>
        <li>la présence de <strong>dipicolinate de calcium</strong> dans le cortex,</li>
        <li>une diminution du nombre de liaisons entre NAM et NAG,</li>
        <li>la présence de protéines de type kératine dans les tuniques.</li>
      </UL>

      {/* ============================================================ */}
      {/* === 1.3 PHYSIOLOGIE ET CROISSANCE BACTÉRIENNE === */}
      {/* ============================================================ */}
      <H2>1.3 Physiologie et croissance bactérienne</H2>
      <Callout type="definition" title="Notions clés">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Physiologie bactérienne</strong> : étudie la nutrition, le métabolisme et la croissance des bactéries en fonction des variations (naturelles ou contrôlées) du milieu dans lequel elles vivent.</li>
          <li><strong>Nutrition</strong> : besoins élémentaires et énergétiques nécessaires à la croissance de la bactérie, ainsi que des facteurs physico-chimiques susceptibles d'influencer cette croissance.</li>
          <li><strong>Métabolisme</strong> : ensemble des réactions biochimiques mises en jeu par une bactérie pour permettre sa croissance.</li>
          <li><strong>Croissance bactérienne</strong> : accroissement de la population par unité de temps (à distinguer de la croissance des organismes supérieurs).</li>
        </ul>
      </Callout>

      <H3>1.3.1 Introduction</H3>
      <P>
        Pour étudier les bactéries, il faut être capable de les faire croître en culture pure. Pour cela, il faut connaître les types de nutriments dont elles ont besoin,
        ainsi que les différentes conditions physiques qui permettent une croissance optimale.
      </P>
      <P>
        En dehors de l'eau, les micro-organismes sont principalement constitués de molécules de taille importante (<strong>protéines</strong>, <strong>acides nucléiques</strong>,
        <strong> polysaccharides</strong> et <strong>lipides</strong>) : les polymères représentent plus de 95 % du poids sec de la cellule. Ces macromolécules résultent de
        l'assemblage de petites molécules solubles disponibles dans le cytoplasme (acides aminés, bases azotées, oses…). Les <strong>ions minéraux</strong> ne représentent
        que 1 % du poids sec de la cellule. Pour réaliser ces biosynthèses, un micro-organisme doit disposer des <strong>nutriments</strong> nécessaires et d'une
        <strong> source d'énergie</strong> utilisable.
      </P>

      <H3>1.3.2 Métabolisme bactérien</H3>
      <P>Les réactions métaboliques peuvent être classées en deux catégories :</P>
      <UL>
        <li>celles qui <strong>produisent</strong> de l'énergie : <em>catabolisme</em>,</li>
        <li>celles qui <strong>consomment</strong> de l'énergie : <em>anabolisme</em> (ou biosynthèse).</li>
      </UL>
      <DataTable
        caption="Tableau 4 — Catabolisme vs Anabolisme"
        headers={["Catabolisme", "Anabolisme"]}
        rows={[
          ["Dégradation de molécules organiques (rupture des liens chimiques)", "Synthèse de molécules organiques (création de liens chimiques)"],
          ["Réactions libérant de l'énergie", "Réactions nécessitant de l'énergie"],
          ["Couplée à la synthèse d'ATP : ADP + Pi + Énergie → ATP", "Couplée à l'hydrolyse d'ATP : ATP → ADP + Pi + Énergie"],
        ]}
      />

      <H3>1.3.3 Besoins nutritifs</H3>
      <H4>a. Les besoins élémentaires</H4>
      <P>
        Ce sont les éléments nécessaires à la bactérie pour fabriquer ses constituants. Ils diffèrent d'une espèce à l'autre, notamment en fonction du milieu de vie :
      </P>
      <UL>
        <li><strong>C, H, O, N, P, S</strong> en quantité importante,</li>
        <li><strong>Fe, Ca, Mg, K</strong> en quantité moindre,</li>
        <li>d'autres métaux à l'état de trace (<em>oligo-éléments</em>) : Co, Cu, Zn, Mn.</li>
      </UL>
      <P>Selon la source de carbone (la moitié du poids d'une bactérie est due à l'atome de carbone) :</P>
      <UL>
        <li>source de carbone <strong>atmosphérique</strong> (CO<sub>2</sub>) → bactérie <strong>autotrophe</strong>,</li>
        <li>source de carbone <strong>organique</strong> (ex. glucose) → bactérie <strong>hétérotrophe</strong>.</li>
      </UL>

      <H4>b. Les besoins énergétiques</H4>
      <P>Couvrent les dépenses engagées dans les processus de biosynthèse. Il existe seulement deux sources d'énergie disponibles pour les êtres vivants :</P>
      <UL>
        <li>l'<strong>énergie lumineuse</strong>, transformée en ATP par les bactéries <em>phototrophes</em>, grâce à des pigments (chlorophylles, bactériochlorophylles, carotènes…) ;</li>
        <li>l'<strong>énergie chimique</strong>, provenant de l'oxydation de molécules minérales ou organiques : bactéries <em>chimiotrophes</em>.</li>
      </UL>

      <H4>c. Les besoins spécifiques</H4>
      <UL>
        <li><strong>Bactéries auxotrophes</strong> : nécessitent l'apport de composés spécifiques appelés <em>facteurs de croissance</em> dans le milieu de culture.</li>
        <li><strong>Bactéries prototrophes</strong> : capables de synthétiser tous leurs constituants sans apport extérieur en facteurs de croissance.</li>
      </UL>
      <P>Les facteurs de croissance varient selon les espèces : acides aminés, bases puriques ou pyrimidiques, vitamines.</P>
      <Callout type="info" title="Exemples">
        <ul className="list-disc pl-5 space-y-1">
          <li><em>Escherichia coli</em> : bactérie <strong>prototrophe</strong>, n'exigeant aucun facteur de croissance — se multiplie sur milieu minimum.</li>
          <li><em>Haemophilus influenzae</em> : bactérie <strong>auxotrophe</strong> — il lui manque les enzymes nécessaires à la synthèse de certains facteurs, qu'il faut donc lui fournir dans le milieu de culture.</li>
        </ul>
      </Callout>

      <DataTable
        caption="Tableau 5 — Types nutritionnels (trophiques) des bactéries"
        headers={["Besoin", "Source", "Type nutritionnel ou trophique"]}
        rows={[
          [<strong key="e1">Énergie</strong>, "Lumineuse", <strong key="e2">Phototrophe</strong>],
          [<strong key="e1b">Énergie</strong>, "Chimique", <strong key="e3">Chimiotrophe</strong>],
          [<strong key="c1">Carbone</strong>, "Minérale (CO₂)", <strong key="c2">Autotrophe</strong>],
          [<strong key="c1b">Carbone</strong>, "Organique", <strong key="c3">Hétérotrophe</strong>],
          [<strong key="f1">Facteurs de croissance</strong>, "Non nécessaires", <strong key="f2">Prototrophe</strong>],
          [<strong key="f1b">Facteurs de croissance</strong>, "Nécessaires", <strong key="f3">Auxotrophe</strong>],
        ]}
      />

      <H3>1.3.4 Conditions physico-chimiques de la croissance</H3>

      <H4>a. La température</H4>
      <UL>
        <li><strong>Bactéries mésophiles</strong> : T° optimale entre 20 °C et 40 °C (optimum 30–37 °C). Majorité des bactéries de l'environnement et d'intérêt médical (ex. <em>Entérobactéries</em>).</li>
        <li><strong>Bactéries thermophiles</strong> : T° optimale 40 °C (40–70 °C). Bactéries des sources thermales (ex. <em>Pseudomonas</em>).</li>
        <li><strong>Bactéries psychrophiles</strong> : T° optimale 4–20 °C. Peuvent contaminer les produits alimentaires conservés au réfrigérateur (ex. <em>Listeria</em>).</li>
        <li><strong>Bactéries cryophiles</strong> : vivent à moins de 4 °C. Bactéries des eaux de mer et des glaces.</li>
      </UL>

      <H4>b. Le pH</H4>
      <P>La plupart des bactéries se développent de préférence dans des milieux neutres ou légèrement alcalins.</P>
      <UL>
        <li><strong>Neutrophiles</strong> (pH 6–8) : <em>Escherichia coli</em>.</li>
        <li><strong>Alcalinophiles</strong> (pH &gt; 8) : <em>Pseudomonas</em>, <em>Vibrio</em>.</li>
        <li><strong>Acidophiles</strong> (pH &lt; 6) : <em>Lactobacillus</em>.</li>
      </UL>

      <H4>c. La pression osmotique</H4>
      <P>
        De façon générale, les bactéries sont assez tolérantes vis-à-vis des variations de concentrations ioniques. La protection contre les chocs osmotiques est assurée
        par la <strong>paroi</strong>, qui constitue un véritable « mur bactérien ».
      </P>
      <Callout type="info" title="Exemple — bactéries halophiles">
        Certaines espèces tolèrent de fortes concentrations salines. Le <em>Staphylocoque</em> tolère une forte concentration de NaCl ; ce caractère est utilisé pour le
        sélectionner sur un milieu sélectif (milieu de <strong>Chapman</strong>).
      </Callout>

      <H4>d. L'oxygène moléculaire : mode respiratoire des bactéries</H4>
      <P>Selon leur comportement à l'égard de l'oxygène, les bactéries sont classées en 4 catégories :</P>
      <UL>
        <li><strong>Aérobies strictes</strong> : ne vivent qu'en présence d'O<sub>2</sub> et tolèrent des P<sub>O₂</sub> élevées. Sur un milieu, elles se multiplient uniquement à la surface (ex. <em>Pseudomonas</em>, <em>Neisseria</em>).</li>
        <li><strong>Micro-aérophiles</strong> : ont besoin d'oxygène mais ne tolèrent pas de fortes concentrations (ex. <em>Campylobacter</em>).</li>
        <li><strong>Anaérobies strictes</strong> : ne se développent qu'en absence d'oxygène — l'O<sub>2</sub> est toxique pour elles (ex. <em>Clostridium</em>).</li>
        <li><strong>Aéro-anaérobies facultatives</strong> : se développent aussi bien en présence qu'en absence d'oxygène (ex. <em>Entérobactéries</em>).</li>
      </UL>
      <Figure n={16} legend="Comportement respiratoire des bactéries en tubes de culture — 1. Aérobie stricte, 2. Microaérophile, 3. Aéro-anaérobie facultative (AAF), 4. Anaérobie stricte" />

      <H4>e. Facteurs inhibant la croissance</H4>
      <UL>
        <li><strong>Radiations</strong> : les bactéries sont sensibles aux rayons X, UV (soleil) et rayons γ.</li>
        <li><strong>Substances antibactériennes</strong> : antiseptiques (ATS) et antibiotiques (ATB) s'opposent à la croissance des bactéries et sont utilisés pour leur destruction.</li>
        <li><strong>Inhibiteurs sélectifs</strong> : certaines substances inhibent sélectivement certaines bactéries ; ajoutées dans les milieux pour favoriser la multiplication des bactéries résistantes — c'est le principe des <em>milieux sélectifs</em>.</li>
      </UL>

      <H3>1.3.5 Croissance bactérienne</H3>
      <H4>a. Définition</H4>
      <P>
        La croissance est définie comme une augmentation des constituants cellulaires. Chez les organismes pluricellulaires, elle correspond à une augmentation de taille
        ou de masse ; chez les micro-organismes unicellulaires, elle se traduit par une <strong>augmentation du nombre d'individus</strong>. Une population microbienne
        augmente donc au rythme des divisions cellulaires :
      </P>
      <UL>
        <li>⇒ augmentation du nombre de bactéries,</li>
        <li>⇒ appauvrissement du milieu de culture en nutriments,</li>
        <li>⇒ enrichissement du milieu en sous-produits du métabolisme.</li>
      </UL>

      <H4>b. Division bactérienne</H4>
      <P>Les bactéries (organismes asexués) se multiplient par <strong>fission binaire</strong> (= scissiparité) :</P>
      <UL>
        <li>allongement de la bactérie,</li>
        <li>duplication des constituants,</li>
        <li>séparation.</li>
      </UL>
      <Figure n={17} legend="Division cellulaire par scissiparité — élongation et réplication du chromosome, étranglement, formation du septum, séparation en deux cellules-filles identiques" />

      <H4>c. Paramètres cinétiques de la croissance</H4>
      <p className="text-foreground/80 leading-relaxed mb-2"><strong>Temps de génération (G)</strong> — temps requis pour un dédoublement, en admettant que toutes les bactéries d'une population se divisent de façon synchrone :</p>
      <div className="my-3 p-3 rounded-md bg-muted/50 border border-border text-center font-mono text-sm">G = t / n</div>
      <P>Avec <strong>t</strong> : la durée pendant laquelle la bactérie se divise <strong>n</strong> fois.</P>
      <P><u>Facteurs influençant G</u> :</P>
      <UL>
        <li><strong>Nature de la bactérie</strong> : ex. 20 min pour <em>Escherichia coli</em>, 20 h pour <em>Mycobacterium tuberculosis</em>.</li>
        <li><strong>Milieu de culture</strong> : pour beaucoup de bactéries, un milieu glucosé permet une croissance optimale.</li>
        <li><strong>Température</strong> de la culture.</li>
      </UL>
      <p className="text-foreground/80 leading-relaxed mb-2 mt-4"><strong>Taux de croissance (μ)</strong> — nombre de divisions par unité de temps (heure) :</p>
      <div className="my-3 p-3 rounded-md bg-muted/50 border border-border text-center font-mono text-sm">μ = n / t&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;μ = 1 / G</div>
      <P>Les facteurs influençant μ sont les mêmes que ceux influençant G.</P>

      <H4>d. Cinétique de la croissance — courbe en milieu non renouvelé</H4>
      <P>
        La croissance dans un tube de bouillon nutritif est <strong>limitée</strong> : elle s'arrête lorsque les nutriments sont épuisés. On dit que la croissance est
        <strong> discontinue</strong>, en système <strong>fermé</strong>. La courbe est obtenue en traçant l'évolution du logarithme de la biomasse en fonction du temps.
        Pour <em>E. coli</em>, on distingue plusieurs phases :
      </P>
      <UL>
        <li><strong>Phase 1 — Latence</strong> : adaptation des bactéries au milieu, mise en route des systèmes enzymatiques ; pas de multiplication.</li>
        <li><strong>Phase 2 — Croissance exponentielle</strong> : taux de croissance maximal ; dédoublement à intervalles réguliers (toutes les 20 min chez <em>E. coli</em>).</li>
        <li><strong>Phase 3 — Stationnaire</strong> : masse bactérienne maximale ; les nouvelles générations équilibrent les vieilles bactéries qui se lysent.</li>
        <li><strong>Phase 4 — Déclin</strong> : la masse bactérienne décroît du fait de la lyse accélérée, liée à l'épuisement des nutriments, la réduction de l'oxygène et l'accumulation des déchets.</li>
      </UL>
      <Figure n={18} legend="Courbe de croissance bactérienne typique — log du nombre de bactéries en fonction du temps : latence, exponentielle, stationnaire, déclin" />

      <H3>1.3.6 Principales bactérioses humaines</H3>
      <DataTable
        caption="Tableau 6 — Principales bactérioses humaines : agents, symptômes, transmission"
        headers={["Bactériose", "Agent pathogène", "Principaux symptômes", "Mode de transmission", "Période d'incubation", "Remarques"]}
        rows={[
          [<strong key="d" className="text-primary">Bactérioses digestives</strong>, "", "", "", "", ""],
          ["Choléra", <em key="vc">Vibrio cholerae</em>, "Diarrhées liquides, vomissements, fièvre ; asymptomatique chez la plupart des sujets infectés", "Véhicule (eau, aliment)", "Quelques heures à 5 jours", "Faiblement contagieux"],
          ["Colite hémorragique", <em key="ec">E. coli O157:H7</em>, "Diarrhée hémorragique sans fièvre", "Véhicule (aliments)", "2 à 8 jours", "« Maladie du hamburger » ; se complique parfois en syndrome hémolytique et urémique, surtout chez l'enfant"],
          [<strong key="c" className="text-primary">Bactérioses circulatoires</strong>, "", "", "", "", ""],
          ["Maladie de Lyme", <em key="bb">Borrelia burgdorferi</em>, "Lésion cutanée circulaire en expansion, puis anomalies neurologiques, inflammation cardiaque, arthrite", "Vecteur (tique)", "10 à 23 jours", "Zoonose (mulots, cerfs)"],
          ["Peste", <em key="yp">Yersinia pestis</em>, "Fièvre et bubons (aines, aisselles), choc septique ; toux sanguinolente et délire (forme pulmonaire)", "Vecteur (puces du rat), contact direct, gouttelettes (formes pulmonaires)", "2 à 6 j (2 à 4 j forme pulmonaire)", "Zoonose (rats) ; fort taux de mortalité si non traitée"],
          [<strong key="p" className="text-primary">Bactérioses de la peau</strong>, "", "", "", "", ""],
          ["Furoncle", <em key="sa">Staphylococcus aureus</em>, "Abcès purulent entouré d'une zone d'inflammation", "Contact direct ou indirect, gouttelettes", "Variable", "Infection souvent endogène ; peut mener à un anthrax"],
          ["Maladie du charbon (cutanée)", <em key="ba1">Bacillus anthracis</em>, "Pustule cutanée qui s'ulcère", "Aérosols ou contact direct", "1 à 60 jours", "Zoonose (moutons)"],
          [<strong key="r" className="text-primary">Bactérioses respiratoires</strong>, "", "", "", "", ""],
          ["Maladie du charbon (pulmonaire)", <em key="ba2">Bacillus anthracis</em>, "Syndrome grippal", "Aérosols ou contact direct", "1 à 60 jours", "Forme pulmonaire potentiellement mortelle si les bactéries gagnent le sang"],
          ["Tuberculose", <em key="mt">Mycobacterium tuberculosis</em>, "Fièvre, fatigue, perte de poids, toux avec expectorations sanguinolentes", "Aérosols et gouttelettes", "4 à 12 semaines", "Infection en résurgence, faiblement contagieuse"],
          [<strong key="u" className="text-primary">Bactérioses uro-génitales</strong>, "", "", "", "", ""],
          ["Chlamydiose", <em key="ct">Chlamydia trachomatis</em>, "Plaie ou enflure génitale", "Contact sexuel", "Quelques semaines à quelques années", "Aussi appelée lymphogranulomatose vénérienne"],
          ["Syphilis", <em key="tp">Treponema pallidum</em>, "Chancre", "Contact direct (sexuel)", "10 jours à 10 semaines", "Entraîne parfois des complications neurologiques graves"],
        ]}
      />
    </>
  ),
};

const SEC_BACT: Section = {
  id: "bacteries",
  title: "1.1 Bactéries",
  render: () => (
    <>
      <H2>1.1 Bactéries</H2>
      <p className="mb-4 text-muted-foreground">
        Ce sous-chapitre couvre l'introduction à la microbiologie, la classification des micro-organismes, la structure bactérienne (paroi, Gram, flagelles, capsule, pili, spore) ainsi que la croissance et les principales bactérioses.
      </p>
      <a
        href="/licence/sage-femme/s1/microbio/bacteries"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
      >
        Ouvrir le cours complet →
      </a>
    </>
  ),
};

const SEC_VIRUS: Section = {
  id: "virus",
  title: "1.2 Virus",
  render: () => (
    <>
      <H2>1.2 Virus</H2>
      <p className="mb-4 text-muted-foreground">
        Ce sous-chapitre couvre la définition des virus, leur anatomie (génome, capside, enveloppe), leur classification, les étapes de la multiplication virale et les principales viroses humaines.
      </p>
      <a
        href="/licence/sage-femme/s1/microbio/virus"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
      >
        Ouvrir le cours complet →
      </a>
    </>
  ),
};
const SEC_MYCETES: Section = {
  id: "mycetes",
  title: "1.3 Mycètes",
  render: () => (
    <>
      <H2>1.3 Mycètes</H2>
      <p className="mb-4 text-muted-foreground">
        Introduction à la mycologie : définition des mycètes, morphologie (levures, moisissures),
        reproduction, classification, modes de vie, voies de pénétration, transmission et importance médicale.
      </p>
      <a
        href="/licence/sage-femme/s1/microbio/mycetes"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
      >
        Ouvrir le cours complet →
      </a>
    </>
  ),
};
const SEC_PARASITES: Section = {
  id: "parasites",
  title: "1.4 Parasites",
  render: () => (
    <>
      <H2>1.4 Parasites</H2>
      <p className="mb-4 text-muted-foreground">
        Ce sous-chapitre couvre les définitions du parasitisme, les relations hôte-parasite, les formes de parasites (protozoaires, helminthes), les voies de contamination, les cycles parasitaires et les principales parasitoses humaines.
      </p>
      <a
        href="/licence/sage-femme/s1/microbio/parasites"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
      >
        Ouvrir le cours complet →
      </a>
    </>
  ),
};
const SEC_MODES: Section = {
  id: "modes-action",
  title: "1.5 Modes d'action des microorganismes",
  render: () => (
    <>
      <H2>1.5 Modes d'action des microorganismes</H2>
      <p className="mb-4 text-muted-foreground">
        Ce sous-chapitre traite la chaîne d'infection, les facteurs de pathogénicité, les toxines (endo/exo) et les mécanismes de virulence.
      </p>
      <a
        href="/licence/sage-femme/s1/microbio/modes-action"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
      >
        Ouvrir le cours complet →
      </a>
    </>
  ),
};
const SEC_ANTI: Section = { id: "antimicrobiens", title: "1.6 Agents antimicrobiens", render: () => (<><H2>1.6 Agents antimicrobiens</H2><ComingSoon title="Sous-chapitre — Agents antimicrobiens" /></>) };

const SEC_HEMATO: Section = {
  id: "hematologie",
  title: "Hématologie",
  render: () => (
    <>
      <H2>Hématologie</H2>
      <p className="mb-4 text-muted-foreground">
        Composition et fonctions du sang, hématopoïèse, hémostase, immuno-hématologie, groupes sanguins
        (ABO, Rhésus), transfusion et hémopathies.
      </p>
      <a
        href="/licence/sage-femme/s1/hematologie"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
      >
        Ouvrir le cours complet →
      </a>
    </>
  ),
};
const SEC_IMMUNO: Section = {
  id: "immunologie",
  title: "Immunologie",
  render: () => (
    <>
      <H2>Immunologie</H2>
      <p className="mb-4 text-muted-foreground">
        Notions de soi / non-soi, immunité naturelle (innée) et immunité acquise (adaptative), réponse humorale
        (anticorps, LB, plasmocytes) et cellulaire (LT4, LT8), vaccination et sérothérapie.
      </p>
      <a
        href="/licence/sage-femme/s1/immunologie"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
      >
        Ouvrir le cours complet →
      </a>
    </>
  ),
};
const SEC_GENETIQUE: Section = {
  id: "genetique",
  title: "Génétique",
  render: () => (
    <>
      <H2>Génétique</H2>
      <p className="mb-4 text-muted-foreground">
        Divisions cellulaires (mitose, méiose), diversité génétique, caryotype humain, anomalies
        chromosomiques, génétique mendélienne et arbres généalogiques.
      </p>
      <a
        href="/licence/sage-femme/s1/genetique"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
      >
        Ouvrir le cours complet →
      </a>
    </>
  ),
};

const CHAPTERS: ChapterDef[] = [
  {
    id: "ch1",
    number: 1,
    title: "Microbiologie",
    accent: "from-emerald-500/15 via-emerald-500/5 to-transparent border-emerald-500",
    sections: [SEC_BACT, SEC_VIRUS, SEC_MYCETES, SEC_PARASITES, SEC_MODES, SEC_ANTI],
  },
  {
    id: "ch2",
    number: 2,
    title: "Hématologie",
    accent: "from-rose-500/15 via-rose-500/5 to-transparent border-rose-500",
    sections: [SEC_HEMATO],
  },
  {
    id: "ch3",
    number: 3,
    title: "Immunologie",
    accent: "from-sky-500/15 via-sky-500/5 to-transparent border-sky-500",
    sections: [SEC_IMMUNO],
  },
  {
    id: "ch4",
    number: 4,
    title: "Génétique",
    accent: "from-amber-500/15 via-amber-500/5 to-transparent border-amber-500",
    sections: [SEC_GENETIQUE],
  },
];

/* ----------------------------- Password ----------------------------- */
function PasswordScreen({ password, setPassword, error, onSubmit }: { password: string; setPassword: (v: string) => void; error: boolean; onSubmit: (e: React.FormEvent) => void }) {
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <Lock className="text-primary" size={24} />
          </div>
          <h1 className="font-display text-xl font-bold text-foreground mb-1">Sciences Biologiques</h1>
          <p className="text-sm text-muted-foreground">Licence · Sage-Femme · Semestre 1</p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe du cours"
            className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring transition-shadow"
          />
          {error && <p className="text-center text-xs text-destructive">Mot de passe incorrect. Veuillez réessayer.</p>}
          <button type="submit" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            Accéder au cours
          </button>
        </form>
      </div>
    </div>
  );
}

/* ----------------------------- Main ----------------------------- */
export default function CoursSageFemmeS1() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const [navOpen, setNavOpen] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState(CHAPTERS[0].id);
  const [activeSectionId, setActiveSectionId] = useState(CHAPTERS[0].sections[0].id);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => { setUnlocked(sessionStorage.getItem(STORAGE_KEY) === "true"); }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === COURSE_PASSWORD) { sessionStorage.setItem(STORAGE_KEY, "true"); setUnlocked(true); setError(false); }
    else setError(true);
  };

  useEffect(() => {
    if (!unlocked) return;
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 400);
      const offset = 160;
      let currentSection = CHAPTERS[0].sections[0].id;
      let currentChapter = CHAPTERS[0].id;
      for (const ch of CHAPTERS) {
        for (const sec of ch.sections) {
          const el = document.getElementById(`section-${sec.id}`);
          if (el && el.getBoundingClientRect().top <= offset) { currentSection = sec.id; currentChapter = ch.id; }
        }
      }
      setActiveSectionId(currentSection);
      setActiveChapterId(currentChapter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [unlocked]);

  useEffect(() => {
    if (!unlocked) return;
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }, 100);
    }
  }, [unlocked]);

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

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

  if (unlocked === null) return <div className="flex min-h-[60vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>;
  if (!unlocked) return <PasswordScreen password={password} setPassword={(v) => { setPassword(v); setError(false); }} error={error} onSubmit={handleUnlock} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <header className="mb-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {["Licence", "Sage-Femme", "Semestre 1", "Sciences Biologiques"].map((b) => (
            <span key={b} className="inline-block text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{b}</span>
          ))}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">Sciences Biologiques</h1>
        <p className="mt-2 text-sm text-muted-foreground">Cours structuré en 4 chapitres : Microbiologie, Hématologie, Immunologie, Génétique.</p>
      </header>

      <div className="sticky top-0 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-background/95 backdrop-blur border-b border-border mb-4">
        <div className="flex items-center justify-between gap-3 py-2.5">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
              Chapitre {progress.chapterIdx}/{progress.chapterTotal} — Section {progress.sectionIdx}/{progress.sectionTotal}
            </p>
            <p className="text-sm font-display font-semibold text-foreground truncate">{progress.chapterTitle}</p>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {CHAPTERS.map((c) => (
              <a key={c.id} href={`#chapter-${c.id}`} onClick={(e) => { e.preventDefault(); scrollToId(`chapter-${c.id}`); }}
                className={cn("px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap",
                  activeChapterId === c.id ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80")}>
                Ch. {c.number}
              </a>
            ))}
          </nav>
          <button type="button" onClick={() => setNavOpen((v) => !v)} aria-label="Ouvrir le sommaire" className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors">
            {navOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <div className="h-1 -mx-px bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${((progress.chapterIdx - 1) / progress.chapterTotal) * 100 + (progress.sectionIdx / progress.sectionTotal) * (100 / progress.chapterTotal)}%` }} />
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-8">
        <aside className="hidden lg:block">
          <nav className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3">Sommaire</p>
            <ol className="space-y-4">
              {CHAPTERS.map((c) => (
                <li key={c.id}>
                  <a href={`#chapter-${c.id}`} onClick={(e) => { e.preventDefault(); scrollToId(`chapter-${c.id}`); }}
                    className={cn("block font-display font-bold text-sm leading-tight transition-colors", activeChapterId === c.id ? "text-primary" : "text-foreground hover:text-primary")}>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground block">Chapitre {c.number}</span>
                    {c.title}
                  </a>
                  <ul className="mt-2 ml-3 space-y-1.5 border-l-2 border-border pl-3">
                    {c.sections.map((s) => (
                      <li key={s.id}>
                        <a href={`#section-${s.id}`} onClick={(e) => { e.preventDefault(); scrollToId(`section-${s.id}`); }}
                          className={cn("block text-xs leading-snug py-1 -ml-[14px] pl-[11px] border-l-2 transition-colors",
                            activeSectionId === s.id ? "border-primary text-primary font-semibold" : "border-transparent text-muted-foreground hover:text-foreground")}>
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        {navOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm" onClick={() => setNavOpen(false)}>
            <aside onClick={(e) => e.stopPropagation()} className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-card border-l border-border p-5 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-foreground">Sommaire</h2>
                <button type="button" onClick={() => setNavOpen(false)} className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-muted text-foreground"><X size={16} /></button>
              </div>
              <ol className="space-y-4">
                {CHAPTERS.map((c) => (
                  <li key={c.id}>
                    <a href={`#chapter-${c.id}`} onClick={(e) => { e.preventDefault(); scrollToId(`chapter-${c.id}`); }} className="block font-display font-bold text-sm text-foreground">
                      <span className="text-xs uppercase tracking-widest text-muted-foreground block">Chapitre {c.number}</span>
                      {c.title}
                    </a>
                    <ul className="mt-2 ml-3 space-y-1.5 border-l-2 border-border pl-3">
                      {c.sections.map((s) => (
                        <li key={s.id}>
                          <a href={`#section-${s.id}`} onClick={(e) => { e.preventDefault(); scrollToId(`section-${s.id}`); }}
                            className={cn("block text-xs py-1", activeSectionId === s.id ? "text-primary font-semibold" : "text-muted-foreground")}>
                            {s.title}
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

        <article ref={articleRef} className="min-w-0">
          {CHAPTERS.map((c) => (
            <section key={c.id} id={`chapter-${c.id}`} className="scroll-mt-32 mb-16">
              <div className={cn("rounded-xl border-l-4 bg-gradient-to-r p-5 sm:p-6 mb-2", c.accent)}>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Chapitre {c.number} sur {CHAPTERS.length}</p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-1">{c.title}</h2>
                {c.sections.length > 1 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {c.sections.map((s, i) => (
                      <li key={s.id}>
                        <a href={`#section-${s.id}`} onClick={(e) => { e.preventDefault(); scrollToId(`section-${s.id}`); }}
                          className="text-xs px-2.5 py-1 rounded-full bg-card border border-border text-foreground/80 hover:text-primary hover:border-primary transition-colors">
                          {i + 1}. {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {c.sections.map((s) => (
                <section key={s.id} id={`section-${s.id}`} className="scroll-mt-32">{s.render()}</section>
              ))}
            </section>
          ))}
        </article>
      </div>

      {showBackToTop && (
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Revenir en haut"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
