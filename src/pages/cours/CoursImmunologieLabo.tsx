import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Menu, ArrowUp, Info, AlertTriangle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

import fig01 from "@/assets/cours-sf-s1/immunite/fig01-organisation-systeme.jpg";
import fig02 from "@/assets/cours-sf-s1/immunite/fig02-barrieres.jpg";
import fig03 from "@/assets/cours-sf-s1/immunite/fig03-hematopoiese.jpg";
import fig04 from "@/assets/cours-sf-s1/immunite/fig04-phagocytose.jpg";
import fig05 from "@/assets/cours-sf-s1/immunite/fig05-inflammation.jpg";
import fig06 from "@/assets/cours-sf-s1/immunite/fig06-serotherapie.jpg";
import fig07 from "@/assets/cours-sf-s1/immunite/fig07-reponse-primaire-secondaire.jpg";
import fig08 from "@/assets/cours-sf-s1/immunite/fig08-bcr-anticorps.jpg";
import fig09 from "@/assets/cours-sf-s1/immunite/fig09-organes-lymphoides.jpg";
import fig10 from "@/assets/cours-sf-s1/immunite/fig10-selection-clonale.jpg";
import fig11 from "@/assets/cours-sf-s1/immunite/fig11-complexe-immun.jpg";
import fig12 from "@/assets/cours-sf-s1/immunite/fig12-effets-ac.jpg";
import fig13 from "@/assets/cours-sf-s1/immunite/fig13-presentation-antigene.jpg";
import fig14 from "@/assets/cours-sf-s1/immunite/fig14-etapes-rimc.jpg";
import fig15 from "@/assets/cours-sf-s1/immunite/fig15-resume-rih-rimc.jpg";
import fig16 from "@/assets/cours-sf-s1/immunite/fig16-defense-organisme.jpg";

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type TocEntry = { label: string; level: 1 | 2 | 3 };
const TOC: TocEntry[] = [
  { label: "Introduction — L'immunologie", level: 1 },
  { label: "1. Immunité naturelle (innée)", level: 1 },
  { label: "1.1 Définition", level: 2 },
  { label: "1.2 Caractéristiques", level: 2 },
  { label: "1.3 Première ligne de défense", level: 2 },
  { label: "1.4 Les barrières cutanéomuqueuses", level: 2 },
  { label: "1.5 Les défenses cellulaires", level: 2 },
  { label: "1.6 Rôle de l'immunité naturelle", level: 2 },
  { label: "1.7 La phagocytose", level: 2 },
  { label: "1.8 L'inflammation", level: 2 },
  { label: "2. Immunité acquise (adaptative)", level: 1 },
  { label: "2.1 Caractéristiques de l'immunité acquise", level: 2 },
  { label: "2.2 Les facteurs humoraux : les anticorps", level: 2 },
  { label: "2.3 Sécrétion des anticorps : LB → plasmocytes", level: 2 },
  { label: "2.4 Structure et fonction des anticorps", level: 2 },
  { label: "2.5 Immunité passive et adoptive — Vaccination / Sérothérapie", level: 2 },
  { label: "2.6 Facteurs cellulaires : LT4 et LT8 (RIMC)", level: 2 },
  { label: "2.7 Synthèse : réponse humorale vs médiation cellulaire", level: 2 },
  { label: "3. Synthèse générale — La défense de l'organisme", level: 1 },
];

function TocList({ onClick }: { onClick?: () => void }) {
  return (
    <nav aria-label="Table des matières">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Table des matières</p>
      <ol className="space-y-1 text-sm">
        {TOC.map((t) => {
          const id = slug(t.label);
          return (
            <li key={id} className={t.level === 2 ? "pl-3" : t.level === 3 ? "pl-6" : ""}>
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

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 font-display text-2xl sm:text-3xl font-bold text-primary border-b-2 border-primary/30 pb-2 mt-14 mb-5">
      {children}
    </h2>
  );
}
function H3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="scroll-mt-24 font-display text-xl font-semibold text-foreground mt-8 mb-3">
      {children}
    </h3>
  );
}
function H4({ children }: { children: React.ReactNode }) {
  return <h4 className="font-display text-base font-semibold text-foreground/90 mt-5 mb-2">{children}</h4>;
}
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-foreground/80 leading-relaxed mb-4">{children}</p>
);
const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc pl-6 space-y-1.5 text-foreground/80 leading-relaxed mb-4">{children}</ul>
);

function Figure({ src, n, caption }: { src: string; n: number; caption: string }) {
  return (
    <figure className="my-6">
      <img src={src} alt={caption} className="w-full rounded-lg border border-border bg-white" loading="lazy" />
      <figcaption className="mt-2 text-sm italic text-muted-foreground text-center">
        <span className="font-semibold not-italic text-foreground">Fig.{n}</span> — {caption}
      </figcaption>
    </figure>
  );
}

function TableCap({ n, caption, children }: { n: number; caption: string; children: React.ReactNode }) {
  return (
    <div className="my-6">
      <p className="text-sm font-semibold text-foreground mb-2">
        <span className="text-primary">Tab.{n}</span> — <span className="italic font-normal text-muted-foreground">{caption}</span>
      </p>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">{children}</table>
      </div>
    </div>
  );
}
const TH = ({ children, ...rest }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th {...rest} className="bg-primary text-primary-foreground px-3 py-2 text-left font-semibold border-b border-primary">{children}</th>
);
const TD = ({ children, ...rest }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td {...rest} className="px-3 py-2 align-top border-t border-border text-foreground/85">{children}</td>
);

function Callout({ type = "info", title, children }: { type?: "info" | "warning" | "def"; title?: string; children: React.ReactNode }) {
  const styles = {
    info: { c: "bg-blue-50 border-blue-500 text-blue-900", Icon: Info },
    warning: { c: "bg-amber-50 border-amber-500 text-amber-900", Icon: AlertTriangle },
    def: { c: "bg-emerald-50 border-emerald-500 text-emerald-900", Icon: BookOpen },
  } as const;
  const { c, Icon } = styles[type];
  return (
    <div className={cn("border-l-4 rounded-md p-4 my-4 flex gap-3", c)}>
      <Icon size={20} className="shrink-0 mt-0.5" />
      <div className="text-sm leading-relaxed">
        {title && <p className="font-semibold mb-1">{title}</p>}
        {children}
      </div>
    </div>
  );
}

export default function CoursImmunologieLabo() {
  const [tocOpen, setTocOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link
            to="/laboratoire"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft size={16} /> Retour à l'Option Laboratoire
          </Link>
          <button
            type="button"
            onClick={() => setTocOpen((v) => !v)}
            className="lg:hidden inline-flex items-center gap-2 text-sm rounded-md border border-border px-3 py-1.5"
          >
            <Menu size={16} /> Sommaire
          </button>
        </div>
      </header>

      {/* Title */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold">Techniques de Santé · Semestre 1 · Option Laboratoire</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">Immunologie</h1>
          <p className="mt-2 text-muted-foreground max-w-3xl">
            Système immunitaire : notions de soi / non-soi, immunité naturelle (innée) et immunité acquise (adaptative),
            réponse humorale et cellulaire, vaccination et sérothérapie.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Desktop TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <TocList />
          </div>
        </aside>

        {/* Mobile TOC drawer */}
        {tocOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setTocOpen(false)}>
            <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white p-5 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <TocList onClick={() => setTocOpen(false)} />
            </div>
          </div>
        )}

        <article className="min-w-0 max-w-3xl">
          {/* Intro */}
          <H2 id={slug("Introduction — L'immunologie")}>Introduction — L'immunologie</H2>
          <P>
            L'immunologie est une science biomédicale qui étudie les caractéristiques et les composantes du système
            immunitaire. Les immunologistes-allergologues et les chercheurs en analysent le fonctionnement et les
            défaillances, et poursuivent leurs recherches sur le traitement des troubles de l'immunité. Les
            hypersensibilités, notamment les allergies, constituent l'une des principales anomalies du système immunitaire.
          </P>
          <P>
            Les êtres vivants évoluent dans un environnement où les agents infectieux représentent une menace permanente à
            leur vie. Ils peuvent provoquer des maladies voire même entraîner la mort (en se multipliant de façon
            incontrôlée). Chez les individus normaux la plupart des infections guérissent rapidement grâce au{" "}
            <strong>système immunitaire</strong> qui combat l'agent infectieux mis en cause.
          </P>

          <Callout type="def" title="Définition de l'immunité">
            L'immunité est l'ensemble des mécanismes biologiques permettant à un organisme pluricellulaire d'assurer son
            intégrité en reconnaissant et tolérant ce qui lui appartient (<strong>le soi</strong>), et d'éliminer les
            substances étrangères (<strong>non-soi</strong>) auxquelles il est exposé, mais aussi ses propres constituants
            altérés (vieillissement, transformation maligne).
          </Callout>

          <H4>Notions de « soi » et « non-soi »</H4>
          <UL>
            <li><strong>Le soi</strong> = toutes les molécules de l'organisme (ex. protéines de structure, protéines circulantes, récepteurs cellulaires…).</li>
            <li><strong>Le non-soi</strong> = molécules extérieures à l'individu (ex. protéines bactériennes, virales, parasitaires, médicaments, greffes…).</li>
          </UL>

          <TableCap n={1} caption="Importance du système immunitaire chez un sujet sain ou malade">
            <thead>
              <tr><TH>Rôle du système immunitaire</TH><TH>Implications</TH></tr>
            </thead>
            <tbody>
              <tr><TD>Défense contre les infections</TD><TD>Un déficit immunitaire entraîne une aggravation de la sensibilité aux infections (ex. SIDA). La vaccination stimule les défenses et protège contre les infections.</TD></tr>
              <tr><TD>Reconnaissance des greffons tissulaires et protéines nouvellement introduites</TD><TD>Les réponses immunitaires constituent une barrière importante à la transplantation.</TD></tr>
              <tr><TD>Défense contre les tumeurs</TD><TD>Possibilité d'une immunothérapie du cancer.</TD></tr>
            </tbody>
          </TableCap>

          <P>L'immunité met en jeu deux processus :</P>
          <UL>
            <li>l'immunité <strong>non spécifique</strong>, innée, naturelle ;</li>
            <li>l'immunité <strong>spécifique</strong>, adaptative, acquise ou en mémoire.</li>
          </UL>
          <Figure src={fig01} n={1} caption="Organisation générale du système immunitaire : acteurs de l'ante-immunité, de l'immunité innée et adaptative (moléculaires, microbiens, cellulaires)." />

          {/* ========== PART 1 ========== */}
          <H2 id={slug("1. Immunité naturelle (innée)")}>1. Immunité naturelle (innée)</H2>

          <H3 id={slug("1.1 Définition")}>1.1 Définition</H3>
          <P>
            L'immunité naturelle correspond à tous les mécanismes naturels (innés) de défense de l'organisme contre toute
            agression interne ou externe. Elle implique des structures tissulaires, des cellules ou des molécules.
          </P>

          <H3 id={slug("1.2 Caractéristiques")}>1.2 Caractéristiques de l'immunité naturelle</H3>
          <UL>
            <li>Première ligne de défense (réponse immédiate : minutes, heures).</li>
            <li>Identique quel que soit l'agresseur.</li>
            <li>Cellules nombreuses et prêtes à agir (mécaniques, chimiques et cellulaires).</li>
            <li>N'augmente pas avec une seconde exposition.</li>
            <li>Activation des cellules <em>in situ</em> dans le tissu.</li>
            <li>Absence de mémoire.</li>
            <li>Stimule la réponse adaptative.</li>
          </UL>

          <H3 id={slug("1.3 Première ligne de défense")}>1.3 Première ligne de défense</H3>
          <P>Les barrières anatomiques et physiologiques bloquent l'entrée des agents infectieux :</P>
          <UL>
            <li>La <strong>salive</strong> et les <strong>glandes lacrymales</strong> contiennent le lysozyme et des IgA.</li>
            <li>La <strong>peau et les muqueuses</strong> constituent des barrières physiques, chimiques et biologiques.</li>
            <li>L'<strong>épiderme</strong> remplit une fonction exfoliante ; le <strong>derme</strong> contient de l'acide hyaluronique gélatineux limitant la propagation des micro-organismes.</li>
            <li>Les <strong>sécrétions sébacées</strong> ont un pH acide et contiennent des substances antifongiques et antibactériennes.</li>
            <li>Les <strong>sécrétions sudorales</strong> contiennent lysozyme, défensines, dermicidine et NaCl (pression osmotique).</li>
            <li>Les <strong>sécrétions nasales</strong> contiennent lysozyme, défensines et IgA ; la toux et les éternuements éliminent les micro-organismes.</li>
            <li>Le <strong>HCl gastrique</strong> (pH acide) détruit la plupart des micro-organismes ; le vomissement les élimine.</li>
            <li>Les <strong>muqueuses</strong> (digestives, respiratoires, uro-génitales) sont protégées par le mucus (lysozyme, défensines, IgA), les cils, la flore normale, l'acide hyaluronique du tissu conjonctif.</li>
            <li>La <strong>défécation</strong> et l'<strong>urine</strong> éliminent ou nettoient les agents pathogènes.</li>
          </UL>
          <Figure src={fig02} n={2} caption="Barrières anatomiques et physiologiques du corps humain." />

          <H3 id={slug("1.4 Les barrières cutanéomuqueuses")}>1.4 Les barrières cutanéomuqueuses</H3>
          <P>Elles constituent la 1<sup>re</sup> ligne de défense et sont capables d'arrêter la plupart des agents pathogènes avant l'installation d'une infection.</P>

          <H4>1.4.1 La peau</H4>
          <P>
            La plupart des bactéries ne peuvent survivre longtemps à la surface de la peau en raison de l'action inhibitrice
            de l'<strong>acide lactique</strong> et des <strong>acides gras</strong> présents dans la sueur et la sécrétion sébacée.
          </P>
          <H4>1.4.2 Les muqueuses</H4>
          <P>
            Les muqueuses tapissent tous les orifices naturels et comportent des tissus lymphoïdes qui protègent le corps
            humain contre une grande variété de micro-organismes. Plusieurs moyens y sont utilisés — de manière isolée ou
            associée — pour lutter contre l'adhérence et la multiplication des germes.
          </P>

          <TableCap n={2} caption="Moyens de défense au niveau des muqueuses">
            <thead>
              <tr><TH>Moyens mécaniques</TH><TH>Moyens chimiques</TH><TH>Moyens biologiques</TH></tr>
            </thead>
            <tbody>
              <tr>
                <TD><strong>BALT</strong> (tissus lymphoïdes associés aux bronches) — mouvements des cils vibratoires.</TD>
                <TD><strong>Nez et BALT :</strong> mucus nasal et bronchique (riche en mucoprotéines et mucopolysaccharides).</TD>
                <TD rowSpan={3}>Chaque muqueuse comporte une <strong>flore saprophyte</strong> (commensalisme) qui s'oppose à l'implantation et à la multiplication des germes par :<br />– production de dérivés toxiques ;<br />– compétition spatiale, enzymatique et métabolique.</TD>
              </tr>
              <tr>
                <TD><strong>GALT</strong> (tissus lymphoïdes associés au colon) — péristaltisme intestinal.</TD>
                <TD><strong>GALT et pancréas :</strong> sucs acides riches en enzymes protéolytiques.</TD>
              </tr>
              <tr>
                <TD><strong>Nez :</strong> turbulence de l'air.</TD>
                <TD><strong>Autres muqueuses :</strong> sécrétions acides à effet bactéricide — larmes (lysozyme), salive (amylase, lysozyme), suc gastrique (pepsine, cathepsine, lipase), bile (estérases, phospholipases), suc pancréatique (amylase, peptidases, trypsinogène, chymotrypsinogène, carboxypeptidase).</TD>
              </tr>
            </tbody>
          </TableCap>

          <P>
            La plupart des agents infectieux ne pénètrent pas à travers la peau ou les muqueuses, protégées par des
            barrières biochimiques et physiques. L'organisme tolère un grand nombre de micro-organismes saprophytes qui,
            par concurrence, inhibent la multiplication des pathogènes.
          </P>

          <H3 id={slug("1.5 Les défenses cellulaires")}>1.5 Les défenses cellulaires</H3>
          <P>
            Les globules blancs sont des cellules nucléées, capables de se déplacer à contre-courant, de franchir la paroi
            des vaisseaux sanguins (<strong>diapédèse</strong>) et de pénétrer dans les tissus. Environ 7 000 leucocytes /
            mm³ de sang. On distingue deux lignées cellulaires :
          </P>
          <UL>
            <li><strong>Cellules myéloïdes :</strong> polynucléaires ou granulocytes (neutrophiles, basophiles, éosinophiles), mastocytes, monocytes et macrophages.</li>
            <li><strong>Cellules lymphoïdes :</strong> lymphocytes B et T.</li>
          </UL>
          <Figure src={fig03} n={3} caption="Différenciation des cellules souches hématopoïétiques en lignées myéloïde et lymphoïde." />

          <TableCap n={3} caption="Principales cellules de l'immunité naturelle — caractéristiques et fonctions">
            <thead>
              <tr><TH>Cellule</TH><TH>Caractéristiques</TH><TH>Fonction principale</TH></tr>
            </thead>
            <tbody>
              <tr>
                <TD><strong>Polynucléaires neutrophiles (PN)</strong></TD>
                <TD>70 % des leucocytes ; 10–12 µm ; noyau plurilobé ; courte durée de vie (2–3 j) au niveau tissulaire. Granules I<sup>aire</sup> (lysozyme), II<sup>aire</sup> (collagénase), III<sup>aire</sup> (phosphatase alcaline).</TD>
                <TD>Migration orientée (<strong>chimiotactisme</strong>) vers le site infectieux ; <strong>fixation et phagocytose</strong> des germes.</TD>
              </tr>
              <tr>
                <TD><strong>Polynucléaires éosinophiles (PE)</strong></TD>
                <TD>Peu nombreux (2–5 %) ; 9–12 µm ; noyau bilobé ; cytoplasme abondant avec granulations enzymatiques. Sécrètent IL-3, IL-5, leucotriènes, prostaglandines.</TD>
                <TD><strong>Destruction des parasites.</strong></TD>
              </tr>
              <tr>
                <TD><strong>Polynucléaires basophiles (PB)</strong></TD>
                <TD>Très rares (&lt; 0,2 %) ; 8–10 µm ; noyau arrondi ; granulations ovoïdes ; taux élevé de récepteurs Fc de haute affinité pour les IgE.</TD>
                <TD>Réactions d'<strong>hypersensibilité immédiate</strong> (allergies) et lutte anti-parasitaire.</TD>
              </tr>
              <tr>
                <TD><strong>Monocytes-macrophages</strong></TD>
                <TD>Noyau en fer à cheval ; mobiles ; grand pouvoir phagocytaire ; longue durée de vie (1–3 mois).</TD>
                <TD><strong>Cellules présentatrices de l'antigène</strong> aux lymphocytes T.</TD>
              </tr>
              <tr>
                <TD><strong>Cellules NK (Natural Killer)</strong></TD>
                <TD>5 % des lymphocytes circulants ; présentes dans le sang et les organes lymphoïdes.</TD>
                <TD>Cytolyse non spécifique des cellules allogéniques et tumorales.</TD>
              </tr>
            </tbody>
          </TableCap>

          <H3 id={slug("1.6 Rôle de l'immunité naturelle")}>1.6 Rôle de l'immunité naturelle</H3>
          <P>On décrit <strong>trois grandes fonctions</strong> aux macrophages :</P>
          <UL>
            <li><strong>La phagocytose</strong> — rôle d'éboueur suivi de la digestion : particules inertes, agents pathogènes ou cellules.</li>
            <li><strong>La modulation de la réponse immunitaire</strong> — sécrétion de médiateurs solubles (cytokines, chimiokines, prostaglandines).</li>
            <li><strong>La présentation de peptides</strong> — dérivés des antigènes ingérés au lymphocyte T, pour initier la réponse immunitaire.</li>
          </UL>

          <H3 id={slug("1.7 La phagocytose")}>1.7 Les mécanismes de l'immunité innée — la phagocytose</H3>
          <P>La phagocytose correspond à la capture et à la digestion des micro-organismes. Elle comprend 3 phases :</P>
          <UL>
            <li>Phase d'<strong>adhésion</strong> ;</li>
            <li>Phase d'<strong>ingestion</strong> (englobement) ;</li>
            <li>Phase de <strong>digestion</strong>.</li>
          </UL>
          <Figure src={fig04} n={4} caption="Les étapes de la phagocytose : attraction, adhérence, ingestion, digestion." />

          <H4>a. Phase d'adhésion</H4>
          <UL>
            <li>Adhésion des micro-organismes à la surface du PN ou du macrophage — étape préliminaire essentielle.</li>
            <li>Cette phase fait appel à des mécanismes de reconnaissance.</li>
            <li>Une fois l'organisme attaché à la surface membranaire, la phase d'ingestion débute.</li>
          </UL>
          <H4>b. Phase d'ingestion</H4>
          <P>
            La cellule phagocytaire émet des <strong>pseudopodes</strong> (invagination de la membrane plasmique) qui
            conduisent à la formation d'une vésicule d'endocytose englobant l'élément étranger.
          </P>
          <H4>c. Phase de digestion</H4>
          <UL>
            <li>Activation du métabolisme de l'O₂ (anion superoxyde O₂⁻ puis peroxyde H₂O₂ avec production de radicaux libres) dès contact avec la bactérie.</li>
            <li>Formation du <strong>phagosome</strong>, puis fusion avec les lysosomes → <strong>phagolysosome</strong>.</li>
            <li>Les enzymes lysosomiales et les dérivés toxiques de l'O₂ dégradent le germe ; les débris sont éliminés par exocytose.</li>
          </UL>
          <Callout type="info" title="Équations">
            2 O₂ + NADPH → 2 O₂⁻ + NADP⁺ + H⁺ (ion superoxyde)<br />
            2 O₂⁻ + NADP⁺ + H⁺ → O₂ + H₂O₂ (eau oxygénée)
          </Callout>
          <Callout type="warning" title="Remarque — Résistance bactérienne à la phagocytose">
            Certaines bactéries résistent à la phagocytose : sécrétion de toxines bloquant le chimiotactisme ; encapsulation
            empêchant l'adhérence ; sécrétion de molécules inhibitrices de la fusion phagosome-lysosome ; digestion des
            radicaux libres toxiques.
          </Callout>

          <H3 id={slug("1.8 L'inflammation")}>1.8 Les mécanismes de l'immunité innée — l'inflammation</H3>
          <P>
            Dès qu'un agent microbien franchit la barrière cutanéomuqueuse, les cellules phagocytaires et les facteurs
            solubles déclenchent une réaction inflammatoire, rapide et localisée, afin de piéger et détruire l'agent par
            phagocytose. Elle se déroule en 3 étapes :
          </P>
          <ol className="list-decimal pl-6 space-y-1.5 text-foreground/80 leading-relaxed mb-4">
            <li>Augmentation du flux sanguin vers la zone infectée ;</li>
            <li>Augmentation de la perméabilité capillaire locale ;</li>
            <li>Migration (par chimiotactisme) des PN, monocytes et facteurs solubles vers le site infecté.</li>
          </ol>

          <TableCap n={4} caption="Étapes de la réponse inflammatoire">
            <thead>
              <tr><TH>Étape</TH><TH>Médiateur / mécanisme</TH><TH>Effet</TH><TH>Signe clinique</TH></tr>
            </thead>
            <tbody>
              <tr><TD colSpan={4}><strong>1.</strong> Franchissement des barrières naturelles — pénétration de l'agent pathogène.</TD></tr>
              <tr><TD colSpan={2}><strong>2.</strong> Reconnaissance par les cellules sentinelles (fixées dans les tissus)</TD><TD colSpan={2}>Récepteurs PRR / marqueurs.</TD></tr>
              <tr>
                <TD rowSpan={3}><strong>3.</strong> Sécrétion de molécules par les cellules sentinelles</TD>
                <TD>Prostaglandines (tissus enflammés)</TD>
                <TD>Stimulation des fibres nerveuses C</TD>
                <TD>Douleur</TD>
              </tr>
              <tr><TD>Histamine (mastocytes)</TD><TD>Vasodilatation</TD><TD>Rougeur / chaleur</TD></tr>
              <tr><TD>Cytokines</TD><TD>↑ Perméabilité, attraction des cellules circulantes</TD><TD>Gonflement, amplification de la réponse</TD></tr>
              <tr><TD><strong>4.</strong> Phagocytose</TD><TD colSpan={3}>Élimination des agresseurs ; préparation à la réponse immunitaire adaptative.</TD></tr>
            </tbody>
          </TableCap>
          <Figure src={fig05} n={5} caption="Réponse immunitaire innée lors d'une lésion cutanée : bactéries, mastocytes, macrophages, neutrophiles, monocytes et diapédèse au niveau du capillaire." />

          {/* ========== PART 2 ========== */}
          <H2 id={slug("2. Immunité acquise (adaptative)")}>2. Immunité acquise (adaptative)</H2>

          <Callout type="def" title="Vue d'ensemble">
            Le système immunitaire regroupe deux composantes complémentaires : l'<strong>immunité innée</strong>, déclenchée
            dès le contact avec un large éventail de substances, et l'<strong>immunité adaptative</strong>, qui désigne une
            réponse différée à un <strong>antigène spécifique</strong>.
          </Callout>

          <H3 id={slug("2.1 Caractéristiques de l'immunité acquise")}>2.1 Caractéristiques de l'immunité acquise</H3>

          <H4>Exercice — Interprétation d'expériences</H4>
          <UL>
            <li><strong>Expérience 1 :</strong> Lapin + injection de bactéries responsables du tétanos → mort dans 95 % des cas.<br /><em>Interprétation :</em> le tétanos est une maladie infectieuse mortelle.</li>
            <li><strong>Expérience 2 :</strong> Lapin + bactéries du tétanos + plasma de lapin ayant guéri du tétanos → survie.<br /><em>Interprétation :</em> le plasma protège les lapins ; il contient des <strong>anticorps anti-tétanos</strong>.</li>
            <li><strong>Expérience 3 :</strong> Lapin + bactéries de la diphtérie + plasma de lapin ayant guéri du tétanos → mort par diphtérie.<br /><em>Interprétation :</em> les anticorps anti-tétanos sont sans effet sur les bactéries de la diphtérie.</li>
          </UL>
          <Figure src={fig06} n={6} caption="Expérience de sérothérapie : les anticorps sont spécifiques d'un antigène." />

          <P>En résumé, l'immunité acquise se caractérise par :</P>
          <UL>
            <li>2<sup>e</sup> ligne de défense (réponse lente : jours, semaines) ;</li>
            <li><strong>Spécificité :</strong> les effecteurs produits après stimulation antigénique n'ont aucun effet sur d'autres agents infectieux ;</li>
            <li><strong>Mémoire :</strong> après infection par un agent X, le système immunitaire garde en mémoire cet agent (principe de la vaccination) ;</li>
            <li><strong>Distinction soi / non-soi :</strong> le système immunitaire n'attaque que les éléments étrangers (bactéries, virus…) ou les cellules du soi vieilles, infectées ou tumorales ;</li>
            <li>Nécessité d'<strong>amplifier</strong> au préalable les lymphocytes spécifiques de l'antigène.</li>
          </UL>
          <Figure src={fig07} n={7} caption="Concentration en anticorps au cours du temps : réponses primaire et secondaire aux antigènes A et B — illustration de la mémoire immunitaire." />

          <H3 id={slug("2.2 Les facteurs humoraux : les anticorps")}>2.2 Les facteurs humoraux — les anticorps</H3>
          <P>
            Les <strong>anticorps (Ac)</strong> ou <strong>immunoglobulines (Ig)</strong> constituent le support de la
            réponse immunitaire humorale. Les Ac sont des structures moléculaires <strong>complémentaires aux antigènes</strong>.
            Les Ig sont des <strong>protéines globulaires</strong> synthétisées par les cellules du système immunitaire
            (lymphocytes B et plasmocytes).
          </P>
          <P>L'anticorps correspond donc à une Ig fonctionnelle et peut se présenter sous deux formes :</P>
          <UL>
            <li><strong>Membranaire :</strong> à la surface des lymphocytes B (appelé <strong>BCR</strong>) ;</li>
            <li><strong>Soluble :</strong> après excrétion par les plasmocytes.</li>
          </UL>
          <Figure src={fig08} n={8} caption="Antigènes, BCR et anticorps : un antigène viral se lie au BCR d'un lymphocyte B qui s'active et se différencie en plasmocyte producteur d'anticorps spécifiques." />
          <Callout type="info">
            NB : les <strong>BCR</strong> et les <strong>Ac solubles</strong> ont la <strong>même spécificité</strong>.
          </Callout>

          <H3 id={slug("2.3 Sécrétion des anticorps : LB → plasmocytes")}>2.3 La sécrétion des anticorps — des lymphocytes B aux plasmocytes</H3>
          <P>
            Les lymphocytes B sont fabriqués et maturés dans la <strong>moelle osseuse rouge</strong>. Les futurs LB y
            terminent leur maturation (production d'anticorps), tandis que les LT achèvent la leur dans le <strong>thymus</strong>.
            Moelle osseuse et thymus constituent les <strong>tissus lymphoïdes centraux (primaires)</strong>.
          </P>
          <Figure src={fig09} n={9} caption="Organes lymphoïdes primaires (thymus, moelle osseuse) et secondaires (ganglions lymphatiques, amygdales, végétations, rate, plaques de Peyer)." />

          <H4>Exercice d'application</H4>
          <P>
            On injecte à un lapin un antigène. On observe alors, au niveau des ganglions proches du point d'inoculation, un
            grand nombre de lymphocytes B et de plasmocytes. Comparer les deux cellules.
          </P>
          <Callout type="info" title="Réponse">
            – Le plasmocyte est beaucoup plus gros que le lymphocyte B.<br />
            – La présence de réticulum endoplasmique avec ribosomes implique une forte synthèse protéique chez les plasmocytes.<br />
            – La présence de mitochondries implique une très grande activité cellulaire.
          </Callout>

          <P>La séquence de la réponse humorale :</P>
          <UL>
            <li>La reconnaissance d'un antigène par un LB porteur d'un récepteur spécifique entraîne sa <strong>sélection clonale</strong> (dans les organes lymphoïdes secondaires).</li>
            <li>La fixation Ac membranaire-antigène provoque la <strong>multiplication</strong> du LB — phase d'<strong>amplification</strong>.</li>
            <li>Il se forme un <strong>clone</strong> de LB de même spécificité.</li>
            <li>Les LB se <strong>différencient</strong> en plasmocytes sécréteurs d'anticorps spécifiques et en <strong>lymphocytes B mémoire</strong>.</li>
          </UL>
          <Figure src={fig10} n={10} caption="Sélection clonale des lymphocytes B : antigène → sélection d'un clone → amplification clonale par mitoses → différenciation en plasmocytes et LB mémoire." />

          <Callout type="def" title="Remarque">
            Les plasmocytes n'existent pas avant la première pénétration de l'antigène : ce sont des éléments de l'immunité
            acquise. Un plasmocyte donné ne sécrète <strong>qu'un seul type d'anticorps</strong>, spécifique d'un antigène.
            Les anticorps se fixent sur les antigènes et les immobilisent en un véritable « filet » : on parle de
            <strong> complexe antigène-anticorps</strong> ou <strong>complexe immun</strong>.
          </Callout>
          <Figure src={fig11} n={11} caption="Bactéries (antigènes) liées par des anticorps spécifiques formant un complexe immun." />

          <H3 id={slug("2.4 Structure et fonction des anticorps")}>2.4 Structure des anticorps</H3>
          <P>Les anticorps présentent une <strong>double structure</strong> et une <strong>double fonction</strong> :</P>
          <UL>
            <li>Les <strong>fragments Fab (fragment antigen binding)</strong> — de nature variable, ils assurent par complémentarité spatiale la reconnaissance spécifique des déterminants antigéniques.</li>
            <li>Le <strong>fragment Fc (fraction cristallisable)</strong> — assure soit l'activation du complément par la voie classique, soit l'activation des cellules phagocytaires.</li>
          </UL>
          <Figure src={fig12} n={12} caption="Formation des complexes antigène-anticorps et leurs effets : neutralisation, agglutination, précipitation, activation du complément → phagocytose, inflammation, cytolyse." />

          <H3 id={slug("2.5 Immunité passive et adoptive — Vaccination / Sérothérapie")}>2.5 Immunité passive et immunité adoptive</H3>
          <P>
            <strong>L'immunité passive</strong> se base sur l'utilisation de produits synthétisés par un sujet actif sur le
            plan immunitaire :
          </P>
          <UL>
            <li><em>Ex1 :</em> au cours de la grossesse et de l'allaitement, le fœtus est protégé par les Ig maternelles.</li>
            <li><em>Ex2 :</em> les sujets ayant subi une morsure de serpent sont traités par un sérum antivenimeux.</li>
          </UL>
          <P>
            <strong>L'immunité adoptive</strong> consiste à administrer aux patients (sujets immunodéficients) des clones
            plasmocytaires spécifiques de l'agent infectieux incriminé.
          </P>

          <TableCap n={5} caption="Comparaison Vaccination / Sérothérapie">
            <thead>
              <tr><TH></TH><TH>Vaccination</TH><TH>Sérothérapie</TH></tr>
            </thead>
            <tbody>
              <tr><TD>Produit injecté</TD><TD>Antigène atténué (non pathogène)</TD><TD>Anticorps spécifiques d'un antigène</TD></tr>
              <tr><TD>Délai de protection</TD><TD>Plusieurs années</TD><TD>Immédiate mais de courte durée (quelques semaines)</TD></tr>
              <tr><TD>Type de traitement</TD><TD>Pratique préventive</TD><TD>Pratique curative</TD></tr>
              <tr><TD>Production de lymphocytes mémoires</TD><TD>Oui (constitution d'une mémoire immunitaire)</TD><TD>Non (les Ac neutralisent l'antigène)</TD></tr>
              <tr><TD>Type d'immunisation</TD><TD>Active</TD><TD>Passive</TD></tr>
            </tbody>
          </TableCap>

          <H3 id={slug("2.6 Facteurs cellulaires : LT4 et LT8 (RIMC)")}>2.6 Les facteurs cellulaires — les lymphocytes T4 et T8</H3>
          <P>
            En présence de virus, levures, mycobactéries, parasites intracellulaires ou de cellules tumorales, la réponse
            humorale est peu efficace. Dans ces cas, une <strong>réponse immunitaire à médiation cellulaire (RIMC)</strong>
            est mise en jeu par l'activation et la prolifération de clones T spécifiques.
          </P>
          <P>
            Au cours de la réaction de l'organisme face à un agent pathogène, les effecteurs de la réponse humorale et ceux
            de la RIMC <strong>coopèrent</strong> avec prédominance des uns ou des autres. La RIMC nécessite :
          </P>
          <UL>
            <li>la transformation de l'Ag en petits peptides associés aux molécules du <strong>CMH</strong> ;</li>
            <li>la présence de <strong>cellules présentatrices de l'antigène (CPAg)</strong>.</li>
          </UL>
          <Figure src={fig13} n={13} caption="Présentation de l'antigène au LT4 par un phagocyte (macrophage) : phagocytose, liaison au CMH II, incorporation à la membrane, double reconnaissance par le récepteur T, sélection et stimulation du LT4." />
          <P>
            L'<strong>interleukine 1</strong> active les lymphocytes T auxiliaires. L'<strong>interleukine 2</strong> et
            d'autres cytokines produites par les LT4 activent les LT auxiliaires, les lymphocytes B (immunité humorale) et
            les <strong>lymphocytes T cytotoxiques (LT8)</strong> qui attaquent les cellules infectées.
          </P>
          <Figure src={fig14} n={14} caption="Étapes de la RIMC : sélection clonale, prolifération clonale et différenciation des LT4 spécifiques puis des LT8 spécifiques." />

          <H3 id={slug("2.7 Synthèse : réponse humorale vs médiation cellulaire")}>2.7 Synthèse — réponse humorale vs réponse à médiation cellulaire</H3>
          <Figure src={fig15} n={15} caption="Résumé : réaction immunitaire humorale et réaction immunitaire à médiation cellulaire." />

          <TableCap n={6} caption="Tableau comparatif des lignées LB, LT4 et LT8">
            <thead>
              <tr><TH></TH><TH>Lymphocytes B</TH><TH>Lymphocytes T4</TH><TH>Lymphocytes T8</TH></tr>
            </thead>
            <tbody>
              <tr><TD>Organe producteur originel</TD><TD>Moelle osseuse</TD><TD>Moelle osseuse puis thymus (maturation)</TD><TD>Moelle osseuse puis thymus (maturation)</TD></tr>
              <tr><TD>Organes lymphoïdes secondaires</TD><TD>Rate, ganglions lymphatiques</TD><TD>Rate, ganglions lymphatiques</TD><TD>Rate, ganglions lymphatiques</TD></tr>
              <tr><TD>Récepteurs de surface</TD><TD>Anticorps membranaires (BCR)</TD><TD>Récepteurs T, CD4</TD><TD>Récepteurs T, CD8</TD></tr>
              <tr><TD>Effet d'une stimulation antigénique</TD><TD>Activation, prolifération, différenciation d'une partie d'entre eux</TD><TD>Activation, prolifération, différenciation d'une partie d'entre eux</TD><TD>Activation, prolifération, différenciation d'une partie d'entre eux</TD></tr>
              <tr><TD>Types cellulaires dérivés</TD><TD>Plasmocytes, LB mémoire</TD><TD>LT4 sécrétant des interleukines, LT4 mémoire</TD><TD>LT cytotoxiques (LTc), LT8 mémoire</TD></tr>
              <tr><TD>Capacité à produire des anticorps</TD><TD>Oui</TD><TD>Non</TD><TD>Non</TD></tr>
              <tr><TD>Rôle dans la réponse immunitaire</TD><TD>Les plasmocytes produisent des Ac circulants qui neutralisent l'Ag en dehors des cellules (sang, lymphe).</TD><TD>Produisent des interleukines stimulant LT8 et LB préalablement activés.</TD><TD>Les LTc détruisent les cellules infectées ou cancéreuses.</TD></tr>
            </tbody>
          </TableCap>

          {/* ========== PART 3 ========== */}
          <H2 id={slug("3. Synthèse générale — La défense de l'organisme")}>3. Synthèse générale — La défense de l'organisme</H2>
          <Figure src={fig16} n={16} caption="La défense de l'organisme : défense innée (immédiate, extracellulaire) et défense adaptative (avec mémoire, humorale par LB / cellulaire par LT8 et LT4)." />

          <TableCap n={7} caption="Défense innée vs défense adaptative — vue d'ensemble">
            <thead>
              <tr><TH></TH><TH>Défense innée</TH><TH>Défense adaptative — humorale</TH><TH>Défense adaptative — cellulaire</TH></tr>
            </thead>
            <tbody>
              <tr><TD>Caractère</TD><TD>Innée, immédiate</TD><TD>Acquise, mémoire</TD><TD>Acquise, mémoire</TD></tr>
              <tr><TD>Où ?</TD><TD>Milieu extracellulaire</TD><TD>Milieu extracellulaire</TD><TD>Milieu intracellulaire</TD></tr>
              <tr><TD>Qui ?</TD><TD>Macrophages, granulocytes</TD><TD>LB, LT4</TD><TD>LT8, LT4</TD></tr>
              <tr><TD>Quoi ?</TD><TD>Virus, bactéries</TD><TD>Virus, bactéries, toxines</TD><TD>Cellules infectées par virus</TD></tr>
              <tr><TD>Comment ?</TD><TD>Reconnaissance, phagocytose</TD><TD>Reconnaissance, multiplication, différenciation → anticorps, complexes immuns, LB mémoire</TD><TD>Reconnaissance, multiplication, différenciation → LT cytotoxiques, LTc mémoire, lyse, débris cellulaires</TD></tr>
            </tbody>
          </TableCap>

          <div className="mt-16 pt-6 border-t border-border">
            <Link
              to="/laboratoire"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft size={16} /> Retour à l'Option Laboratoire
            </Link>
          </div>
        </article>
      </div>

      {/* Back to top */}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Retour en haut"
          className="fixed bottom-6 right-6 z-40 rounded-full bg-primary text-primary-foreground p-3 shadow-lg hover:scale-110 transition-transform"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
