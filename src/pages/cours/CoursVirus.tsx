import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Menu, ArrowUp, ZoomIn, X, Info } from "lucide-react";
import { cn } from "@/lib/utils";

import fig01 from "@/assets/cours-sf-s1/virus/fig01-structure-virion.jpg";
import fig02a from "@/assets/cours-sf-s1/virus/fig02a-tabac.jpg";
import fig02b from "@/assets/cours-sf-s1/virus/fig02b-adenovirus.jpg";
import fig02c from "@/assets/cours-sf-s1/virus/fig02c-grippe.jpg";
import fig02d from "@/assets/cours-sf-s1/virus/fig02d-t4.jpg";
import fig03 from "@/assets/cours-sf-s1/virus/fig03-fusion.jpg";
import fig04 from "@/assets/cours-sf-s1/virus/fig04-endocytose.jpg";
import fig05 from "@/assets/cours-sf-s1/virus/fig05-translocation.jpg";
import fig06 from "@/assets/cours-sf-s1/virus/fig06-cycle-simplifie.jpg";
import fig07 from "@/assets/cours-sf-s1/virus/fig07-bacteriophage-injection.jpg";
import fig08 from "@/assets/cours-sf-s1/virus/fig08-cycle-lytique.jpg";
import fig09 from "@/assets/cours-sf-s1/virus/fig09-virus-arn-enveloppe.jpg";
import fig10 from "@/assets/cours-sf-s1/virus/fig10-sras-cov.jpg";
import figBaltimore from "@/assets/cours-sf-s1/virus/classification-baltimore.png";
import { dimsFor } from "@/lib/imageDims";

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const H2 = ({ children }: { children: string }) => (
  <h2 id={slug(children)} className="scroll-mt-32 font-display text-2xl sm:text-3xl font-bold text-primary border-b border-primary/20 pb-2 mt-12 mb-5">
    {children}
  </h2>
);
const H3 = ({ children }: { children: string }) => (
  <h3 id={slug(children)} className="scroll-mt-32 font-display text-lg sm:text-xl font-semibold text-foreground/90 mt-8 mb-3">
    {children}
  </h3>
);
const H4 = ({ children }: { children: string }) => (
  <h4 id={slug(children)} className="scroll-mt-32 font-display text-base font-semibold text-foreground/80 mt-5 mb-2">
    {children}
  </h4>
);
const P = ({ children }: { children: ReactNode }) => <p className="text-foreground/80 leading-relaxed mb-4">{children}</p>;
const UL = ({ children }: { children: ReactNode }) => <ul className="list-disc pl-6 space-y-1.5 text-foreground/80 leading-relaxed mb-4">{children}</ul>;
const OL = ({ children }: { children: ReactNode }) => <ol className="list-decimal pl-6 space-y-1.5 text-foreground/80 leading-relaxed mb-4">{children}</ol>;

function Definition({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-l-4 border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 rounded-md p-4 my-4 flex gap-3">
      <Info size={18} className="shrink-0 mt-0.5 text-emerald-600" />
      <div className="text-sm leading-relaxed text-emerald-900 dark:text-emerald-100">
        <p className="font-semibold mb-1">{title}</p>
        {children}
      </div>
    </div>
  );
}

function Figure({ n, legend, images }: { n: number; legend: string; images: string[] }) {
  const [zoomed, setZoomed] = useState<string | null>(null);
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomed(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed]);

  return (
    <>
      <figure className="my-8">
        <div className={cn("grid gap-3", images.length === 1 ? "grid-cols-1" : images.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4")}>
          {images.map((src, i) => (
            <button key={i} type="button" onClick={() => setZoomed(src)} className="group relative bg-card rounded-lg overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-all">
              <img src={src} {...dimsFor(src)} alt={`${legend} (${i + 1}/${images.length})`} loading="lazy" className="w-full h-auto object-contain bg-card" />
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
        <div onClick={() => setZoomed(null)} className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-4 cursor-zoom-out">
          <button type="button" onClick={() => setZoomed(null)} className="absolute top-4 right-4 bg-card text-foreground rounded-full p-2 shadow-lg" aria-label="Fermer">
            <X size={20} />
          </button>
          <img src={zoomed} alt={legend} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}

function DataTable({ caption, headers, rows }: { caption?: string; headers: string[]; rows: ReactNode[][] }) {
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

type TocEntry = { label: string; level: 1 | 2 };
const TOC: TocEntry[] = [
  { label: "1. Introduction", level: 1 },
  { label: "2. Définition des virus", level: 1 },
  { label: "3. Anatomie générale des particules virales", level: 1 },
  { label: "3.1 Le génome", level: 2 },
  { label: "3.2 La capside", level: 2 },
  { label: "3.3 Éléments inconstants — Enveloppe", level: 2 },
  { label: "4. Classification des virus", level: 1 },
  { label: "5. La multiplication des virus", level: 1 },
  { label: "5.1 L'attachement", level: 2 },
  { label: "5.2 La pénétration", level: 2 },
  { label: "5.3 La décapsidation", level: 2 },
  { label: "5.4 La réplication", level: 2 },
  { label: "5.5 Exemples de cycles viraux", level: 2 },
  { label: "6. Principales viroses humaines", level: 1 },
];

function TocList({ onClick }: { onClick?: () => void }) {
  return (
    <nav aria-label="Table des matières">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Table des matières</p>
      <ol className="space-y-1 text-sm">
        {TOC.map((t) => {
          const id = slug(t.label);
          return (
            <li key={id} className={t.level === 2 ? "pl-3" : ""}>
              <a
                href={`#${id}`}
                onClick={onClick}
                className={cn(
                  "block py-1 px-2 rounded hover:bg-primary/10 hover:text-primary transition-colors",
                  t.level === 1 ? "font-semibold text-foreground/90" : "text-foreground/70",
                )}
              >
                {t.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function CoursVirus() {
  const [mobileToc, setMobileToc] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-background">
      <header className="border-b border-border bg-gradient-to-br from-primary/5 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <Link to="/licence/sage-femme" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft size={16} />
            Retour à Licence Sage-Femme
          </Link>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            Licence · Option Sage-Femme · Semestre 1 · Microbiologie
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">1.2 Virus</h1>
          <p className="text-muted-foreground mt-3 max-w-3xl">
            Définition, structure, classification, multiplication virale et principales viroses humaines.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24 border border-border rounded-lg bg-card p-4 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <TocList />
          </div>
        </aside>

        <div className="lg:hidden">
          <button onClick={() => setMobileToc((v) => !v)} className="w-full flex items-center justify-between border border-border bg-card rounded-lg px-4 py-3 text-sm font-semibold">
            <span className="flex items-center gap-2"><Menu size={16} /> Table des matières</span>
            <span className="text-xs text-muted-foreground">{mobileToc ? "Masquer" : "Afficher"}</span>
          </button>
          {mobileToc && (
            <div className="mt-2 border border-border bg-card rounded-lg p-4">
              <TocList onClick={() => setMobileToc(false)} />
            </div>
          )}
        </div>

        <article className="min-w-0">
          <H2>1. Introduction</H2>
          <P>
            Le premier virus découvert est celui de la mosaïque du tabac. <strong>Ivanovski</strong> démontre en 1892 qu'un extrait de feuille malade reste infectieux après filtration à travers un filtre retenant les bactéries : un nouveau monde est découvert, celui des <em>agents pathogènes filtrants</em>. <strong>Beijerinck</strong>, en 1898, sera le premier à appeler « virus » l'agent causal de la mosaïque du tabac. C'est en 1953 que <strong>Lwoff</strong> a défini le concept de <em>virion</em>. À partir de 1971, l'existence d'agents infectieux limités à un ARN de très petite taille, appelés <em>viroïdes</em>, a été mise en évidence (surtout chez les végétaux). On propose ainsi de diviser les virus en deux sous-groupes : les <strong>virus conventionnels (euvirus)</strong> et les <strong>virus et agents non conventionnels (viroïdes)</strong>.
          </P>
          <Definition title="Notion de virus et de virion">
            <UL>
              <li><strong>Virus</strong> : agent à tous ses stades.</li>
              <li><strong>Virion</strong> : particule virale libre, extracellulaire (n'ayant pas parasité une cellule hôte), visible au microscope électronique.</li>
              <li><strong>Viroïdes</strong> : composés uniquement d'un acide nucléique de type ARN qui se réplique mais ne code aucune protéine.</li>
            </UL>
          </Definition>

          <H2>2. Définition des virus</H2>
          <P>Un virus possède 4 caractères essentiels :</P>
          <OL>
            <li><strong>Un seul type d'acide nucléique</strong> (ADN ou ARN). Les deux molécules ne coexistent jamais dans la particule virale — ce qui oppose les virus aux autres formes vivantes. L'acide nucléique viral porte l'intégralité de l'information génétique et constitue le <em>génome viral</em>.</li>
            <li><strong>Reproduction uniquement par réplication du génome.</strong> Pas de scissiparité (bactéries) ni de mitose (cellules eucaryotes).</li>
            <li><strong>Parasitisme intracellulaire obligatoire.</strong> Les virus ne se reproduisent qu'au sein d'une cellule hôte vivante. Ils ne possèdent aucun système enzymatique ni énergétique propre et détournent la machinerie cellulaire (ribosomes, ARNt, enzymes, régulation). Deux issues possibles :
              <UL>
                <li><em>Lyse cellulaire</em> — la multiplication virale aboutit à la mort de la cellule.</li>
                <li><em>Persistance virale</em> — interaction avec lésions cellulaires non létales.</li>
              </UL>
            </li>
            <li><strong>Structure particulaire</strong> opposée aux structures cellulaires procaryote (bactéries) ou eucaryote.</li>
          </OL>
          <Definition title="En résumé">
            <UL>
              <li>Un seul type d'acide nucléique (ADN ou ARN) — le génome viral.</li>
              <li>Reproduction par réplication du génome.</li>
              <li>Parasitisme intracellulaire absolu.</li>
              <li>Structure particulaire.</li>
            </UL>
          </Definition>

          <H2>3. Anatomie générale des particules virales</H2>
          <P>
            La taille des virus varie de <strong>20 nm</strong> (poliovirus) à <strong>1000 nm</strong> (virus Ebola). Toute particule virale est constituée de <em>deux éléments constants et obligatoires</em> : le génome et la capside.
          </P>

          <H3>3.1 Le génome</H3>
          <P>
            De nature nucléotidique, composé d'acide nucléique (ADN ou ARN, bicaténaire ou monocaténaire). On parle de virus à ADN ou à ARN selon le type d'acide nucléique du génome.
          </P>
          <P>Les principaux paramètres à étudier dans chaque famille virale sont :</P>
          <UL>
            <li><strong>La nature</strong> de l'acide nucléique : ARN ou ADN.</li>
            <li>La <strong>taille</strong> — longueur en nanomètre, masse moléculaire en mégadalton, nombre de paires de bases, capacité de codage.</li>
            <li>La <strong>composition en bases</strong> — %GC, séquences répétitives, segment polyadénylé (polyA) en 3′, bases ou sucres anormaux.</li>
            <li>La <strong>structure</strong> — monocaténaire, bicaténaire, ou fragments subgénomiques.</li>
            <li>La <strong>topologie</strong> — linéaire ou circulaire.</li>
          </UL>
          <Figure n={1} legend="Éléments typiques de la structure virale" images={[fig01]} />

          <H3>3.2 La capside</H3>
          <P>
            Coque de nature protéique entourant le génome, assurant sa protection et sa survie dans le milieu extérieur. L'ensemble acide nucléique + capside constitue la <em>nucléocapside</em>. Selon le virus, la capside peut être <strong>hélicoïdale</strong> (bâtonnet), <strong>polyédrique (icosaédrique)</strong> ou de structure plus complexe (ex : phage T4). Les capsides se composent de sous-unités protéiques appelées <em>capsomères</em>.
          </P>
          <Figure
            n={2}
            legend="Exemples de morphologies virales : virus de la mosaïque du tabac (capside hélicoïdale), adénovirus (icosaédrique), virus de la grippe (enveloppé), bactériophage T4 (capside complexe)"
            images={[fig02a, fig02b, fig02c, fig02d]}
          />

          <H3>3.3 Éléments inconstants — Enveloppe</H3>
          <P>
            Entourant la capside, l'<strong>enveloppe</strong> est hérissée de <strong>spicules</strong> qui jouent un rôle majeur dans la fixation à la cellule hôte et sont très antigéniques.
          </P>
          <P>
            Les virus limités à leur nucléocapside sont dits <strong>virus nus</strong> ; ceux entourés d'une enveloppe sont dits <strong>virus enveloppés</strong>.
          </P>
          <P>
            Les enveloppes virales sont de composition macromoléculaire complexe (lipido-glucido-protéique). Cette structure lipido-protéique les rend <strong>très sensibles</strong> :
          </P>
          <UL>
            <li>aux actions physico-chimiques,</li>
            <li>aux solvants des lipides, en particulier à l'éther,</li>
            <li>aux détergents,</li>
            <li>aux sels biliaires,</li>
            <li>aux variations de pH.</li>
          </UL>
          <P>
            L'enveloppe confère également une <strong>thermosensibilité</strong> au virion. Loin d'être une protection supplémentaire, elle confère aux virus enveloppés une <em>certaine fragilité</em> dans le milieu extérieur (survie brève) et dans les milieux hostiles de l'organisme (matières fécales). Conséquences en épidémiologie (faible persistance, transmission directe) et en diagnostic (transport rapide, au froid, dans des milieux spéciaux).
          </P>
          <P>La plupart des enveloppes virales proviennent des systèmes membranaires de la cellule hôte (<em>peplos</em>). Trois origines sont possibles :</P>
          <UL>
            <li>Membrane nucléaire (feuillet interne) — <em>herpès virus</em>.</li>
            <li>Systèmes membranaires intracytoplasmiques — réticulum endoplasmique, appareil de Golgi.</li>
            <li>Membrane plasmique — <em>myxovirus</em>.</li>
          </UL>

          <H2>4. Classification des virus</H2>
          <P>La classification des virus est difficile et peut reposer sur différents critères :</P>
          <UL>
            <li><strong>La nature de l'hôte.</strong></li>
            <li><strong>Le tropisme tissulaire</strong> — virus dermotrope, neurotrope, viscérotrope…</li>
            <li><strong>Le pouvoir pathogène</strong> — virus morbilleux (rougeole), virus ourlien (oreillons), etc. Limite : un virus donné a souvent un domaine pathologique étendu.</li>
            <li><strong>Le mode de transmission</strong> — respiratoire, entérique, transmis par arthropodes…</li>
          </UL>
          <P>
            Une classification plus objective, proposée en 1962 par <strong>Lwoff, Horne et Tournier</strong> (système <em>L.H.T.</em>), retient 4 critères :
          </P>
          <UL>
            <li>Nature de l'acide nucléique : ADN (D) ou ARN (R).</li>
            <li>Symétrie de la nucléocapside : hélicoïdale (H), cubique (C) ou mixte.</li>
            <li>Présence (E) ou absence (N) d'une enveloppe.</li>
            <li>Nombre de capsomères (virus icosaédriques) ou diamètre (A) de la nucléocapside (virus hélicoïdaux).</li>
          </UL>
          <P>
            Un virus peut ainsi être représenté par un <strong>sigle à 4 éléments</strong>. Inconvénient : la coexistence sous un même sigle de virus différents (paramyxovirus, herpèsvirus). Depuis 1966, un <em>Comité international de taxonomie des virus</em> définit une nomenclature à vocation universelle, en intégrant les caractéristiques moléculaires du génome et le cycle de réplication.
          </P>

          <H3>La classification de Baltimore</H3>
          <P>
            Cette classification, utilisée aujourd'hui comme base par l'<strong>ICTV</strong>, a été proposée initialement par <strong>David Baltimore</strong> (lauréat du prix Nobel de médecine en 1975) :
          </P>
          <figure className="my-6">
            <img
              src={figBaltimore} {...dimsFor(figBaltimore)}
              alt="Classification de Baltimore : groupes I à VII des virus selon la nature de leur génome"
              className="w-full max-w-2xl mx-auto rounded-lg border border-border bg-white"
              loading="lazy"
            />
            <figcaption className="mt-2 text-sm italic text-muted-foreground text-center">
              Classification de Baltimore — les 7 groupes de virus selon la nature du génome et le mode de réplication.
            </figcaption>
          </figure>


          <H2>5. La multiplication des virus</H2>
          <P>
            La multiplication virale est un phénomène complexe au cours duquel <strong>le virus détourne la machinerie cellulaire à son profit</strong>. Du fait de leur simplicité extrême, les virus ne peuvent pas se multiplier par eux-mêmes : l'introduction du génome viral dans une cellule provoque la fabrication de nouveaux virus par <em>réplication</em>. Le temps du cycle viral varie selon la taille du génome et la complexité du cycle (4 à 8 h pour le poliovirus, plus de 40 h pour les <em>Herpesviridae</em>).
          </P>
          <DataTable
            caption="Tableau 1 — Étapes de la multiplication virale"
            headers={["Étapes", "Descriptions"]}
            rows={[
              ["Précoces", "Attachement — Pénétration — Décapsidation"],
              ["Synthèse de macromolécules", "Fabrication des ARNm — Synthèse des protéines — Réplication des génomes"],
              ["Tardives", "Assemblage et relargage (construction des nucléocapsides et libération des virus infectieux)"],
            ]}
          />

          <H3>5.1 L'attachement</H3>
          <P>
            Première étape : entrée en contact du virus et de la cellule. L'attachement se fait par une structure de la capside (virus nus) ou par des glycoprotéines d'enveloppe (virus enveloppés). Ces protéines s'attachent à des <em>récepteurs</em> situés sur la membrane cytoplasmique de la cellule hôte.
          </P>

          <H3>5.2 La pénétration</H3>
          <P>Plusieurs mécanismes permettent l'entrée du virus dans la cellule :</P>

          <H4>5.2.1 Par fusion</H4>
          <P>Fusion de l'enveloppe virale et de la membrane cytoplasmique en une membrane unique.</P>
          <Figure n={3} legend="Pénétration par fusion des membranes virale et cellulaire" images={[fig03]} />

          <H4>5.2.2 Par endocytose et fusion</H4>
          <P>Après attachement sur son récepteur, le virus est internalisé au sein d'une vésicule (endosome).</P>
          <Figure n={4} legend="Pénétration par endocytose / phagocytose" images={[fig04]} />

          <H4>5.2.3 Pénétration directe du génome</H4>
          <P>Par un pore membranaire qui s'élargit et laisse passer la capside dans le cytoplasme (ex : VIH, poliovirus).</P>
          <Figure n={5} legend="Translocation directe à travers la membrane" images={[fig05]} />

          <H3>5.3 La décapsidation</H3>
          <P>
            Les structures virales sont dégradées, à l'exception du génome qui, débarrassé de la capside, est libéré. La destruction de la capside est nécessaire pour que le génome « décortiqué » puisse livrer son information à la machinerie cellulaire.
          </P>

          <H3>5.4 La réplication</H3>
          <P>
            Le génome viral doit être transcrit, traduit et répliqué. Une fois libéré, il prend la direction des synthèses et se substitue, totalement ou partiellement, au génome cellulaire. La cellule fabrique alors des copies du génome viral, des protéines de capside et des glycoprotéines d'enveloppe. Les virus formés quittent la cellule :
          </P>
          <UL>
            <li>en <strong>bourgeonnant</strong> par exocytose,</li>
            <li>ou par <strong>lyse</strong> membranaire sous l'action d'enzymes virales.</li>
          </UL>

          <H3>5.5 Exemples de cycles viraux</H3>
          <Figure n={6} legend="Représentation simplifiée du cycle de réplication d'un virus à ADN — entrée par endocytose, réplication et transcription par les enzymes de l'hôte, autoassemblage et libération" images={[fig06]} />
          <P>
            <strong>① </strong>Le virus pénètre dans la cellule par endocytose, ce qui libère l'ADN viral et les protéines de capside.<br />
            <strong>② </strong>Les enzymes de l'hôte effectuent la réplication du génome viral.<br />
            <strong>③ </strong>Les enzymes de l'hôte effectuent la transcription du génome viral en ARNm, traduit en protéines virales.<br />
            <strong>④ </strong>Génomes et protéines de capside s'autoassemblent en nouvelles particules virales qui quittent la cellule.
          </P>

          <Figure n={7} legend="Injection de l'acide nucléique d'un bactériophage dans une bactérie — la capside reste à l'extérieur, le canal central perfore la paroi et libère l'ADN viral dans le cytoplasme" images={[fig07]} />
          <Figure n={8} legend="Cycle lytique d'un bactériophage (15–60 min à 37 °C) : attachement, pénétration du chromosome viral, multiplication, encapsidation et libération par lyse de la paroi cellulaire" images={[fig08]} />

          <Figure n={9} legend="Cycle de réplication d'un virus enveloppé à ARN — fixation par les glycoprotéines, libération du génome, synthèse d'ARN complémentaire, traduction, assemblage et bourgeonnement avec acquisition de l'enveloppe" images={[fig09]} />
          <P>
            <strong>1. </strong>Les glycoprotéines d'enveloppe se lient aux récepteurs spécifiques de la cellule hôte.<br />
            <strong>2. </strong>La capside et le génome pénètrent dans la cellule ; la digestion de la capside libère le génome viral.<br />
            <strong>3. </strong>Le génome viral (ARN) sert de matrice pour la synthèse de brins d'ARN complémentaires par une ARN polymérase virale.<br />
            <strong>4. </strong>De nouvelles copies du génome sont fabriquées à partir des brins complémentaires.<br />
            <strong>5. </strong>Les brins complémentaires servent aussi d'ARNm, traduits en protéines de capside (cytosol) et en glycoprotéines d'enveloppe (RE et Golgi).<br />
            <strong>6. </strong>Des vésicules transportent les glycoprotéines vers la membrane plasmique.<br />
            <strong>7. </strong>Une capside s'assemble autour de chaque molécule d'ARN du génome.<br />
            <strong>8. </strong>Chaque nouveau virus sort de la cellule par bourgeonnement, son enveloppe contenant les glycoprotéines virales enchâssées dans la membrane d'origine cellulaire.
          </P>

          <Figure n={10} legend="Cycle viral du SRAS-CoV : adsorption, pénétration par endocytose et décapsidation, traduction et réplication de l'ARN sb+, assemblage dans le cytoplasme, libération par bourgeonnement" images={[fig10]} />
          <P>
            <strong>1. Adsorption</strong> — les virions s'adsorbent à une cellule possédant le bon récepteur.<br />
            <strong>2. Pénétration et décapsidation</strong> — entrée par endocytose, fusion avec la vésicule, libération de l'ARN sb+ dans le cytoplasme.<br />
            <strong>3. Traduction et réplication</strong> — l'ARN sb+ est utilisé pour fabriquer les protéines virales et répliquer l'ARN viral.<br />
            <strong>4. Assemblage</strong> — les composantes virales s'assemblent dans le cytoplasme puis sont incorporées dans des vésicules d'exocytose.<br />
            <strong>5. Libération</strong> — les nouveaux virions acquièrent leur enveloppe à la membrane plasmique et bourgeonnent hors de la cellule.
          </P>

          <H2>6. Principales viroses humaines</H2>
          <DataTable
            caption="Tableau 2 — Principales viroses humaines"
            headers={["Virose", "Agent pathogène", "Principaux symptômes", "Mode de transmission", "Incubation", "Remarques"]}
            rows={[
              [<strong key="d" className="text-primary">Viroses digestives</strong>, "", "", "", "", ""],
              ["Gastroentérite virale", "Rotavirus, virus de Norwalk (norovirus)", "Diarrhées et douleurs abdominales, vomissements, nausées", "Voie fécale-orale", "1–2 j (Norwalk), 2–3 j (autres)", "Très contagieux"],
              ["Hépatite B", "Virus de l'hépatite B (hépadnavirus)", "Souvent asymptomatique, sinon fièvre, perte d'appétit, ictère…", "Véhicule (sang), contact sexuel", "3–26 semaines", "Mène souvent au cancer du foie"],
              [<strong key="c" className="text-primary">Viroses circulatoires</strong>, "", "", "", "", ""],
              ["Fièvre hémorragique (Ebola)", "Virus Ebola (filovirus)", "Fièvre foudroyante, asthénie, myalgie, céphalées, hémorragies internes et externes", "Contact avec sang ou liquides corporels", "2–21 jours", "Très contagieuse et mortelle"],
              ["Fièvre jaune (vomi noir)", "Virus amaril (flavivirus)", "Fièvre, céphalées violentes, ictère purpurique, hémorragies digestives, vomissements noirs", "Vecteur (moustiques Aedes)", "5 jours", "Vaccin disponible ; aucun traitement curatif"],
              [<strong key="p" className="text-primary">Viroses de la peau</strong>, "", "", "", "", ""],
              ["Herpès labial", "Virus Herpes simplex type 1", "Lésions vésiculaires sur les lèvres (« feux sauvages »)", "Contact (sécrétions)", "7–10 jours (type I)", "Contagieux"],
              ["Rougeole", "Virus de la rougeole (paramyxovirus)", "Sécrétions nasales, toux, fièvre, céphalées, conjonctivite", "Aérosols, contact", "8–13 jours", "Très contagieuse"],
              [<strong key="r" className="text-primary">Viroses respiratoires</strong>, "", "", "", "", ""],
              ["Rhume", "Jusqu'à 200 sérotypes, surtout des rhinovirus", "Toux, congestion nasale", "Contact (et peut-être aérosols)", "2–4 jours", "Très contagieux"],
              ["SARS (syndrome respiratoire aigu sévère)", "Coronavirus SARS-CoV", "Fièvre, toux, dyspnée, détresse respiratoire parfois accompagnée d'œdème", "Contact direct étroit, inhalation de gouttelettes", "2–10 jours", "Contagieux et parfois mortel"],
              [<strong key="u" className="text-primary">Viroses urogénitales</strong>, "", "", "", "", ""],
              ["Sida", "VIH", "Immunodéficience acquise", "Contact direct (sexuel), véhicule (sang)", "Environ 10 ans", "ITSS (Infections transmissibles sexuellement et par le sang)"],
              ["Herpès génital", "Virus Herpes", "Lésions vésiculaires sur les organes génitaux", "Contact (sécrétions)", "2–12 jours", "Contagieux"],
            ]}
          />
        </article>
      </div>

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
          aria-label="Retour en haut"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
