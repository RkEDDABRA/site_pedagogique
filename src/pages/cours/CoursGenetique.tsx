import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Menu, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

import fig1 from "@/assets/cours-sf-s1/genetique/fig1-chromatine-chromosome.jpg";
import fig2 from "@/assets/cours-sf-s1/genetique/fig2-cycle-cellulaire.jpg";
import fig3 from "@/assets/cours-sf-s1/genetique/fig3-phases-mitose.jpg";
import fig4 from "@/assets/cours-sf-s1/genetique/fig4-meiose-mitose.jpg";
import fig5 from "@/assets/cours-sf-s1/genetique/fig5-enjambements.jpg";
import fig6 from "@/assets/cours-sf-s1/genetique/fig6-assortiments-independants.jpg";
import fig7 from "@/assets/cours-sf-s1/genetique/fig7-diversification-genomes.jpg";
import fig8 from "@/assets/cours-sf-s1/genetique/fig8-caryotype.jpg";
import fig9 from "@/assets/cours-sf-s1/genetique/fig9-chromosomes-homologues.jpg";
import fig10 from "@/assets/cours-sf-s1/genetique/fig10-chromatides-locus.jpg";
import fig11 from "@/assets/cours-sf-s1/genetique/fig11-croisement-mendel.jpg";
import { dimsFor } from "@/lib/imageDims";

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type TocEntry = { label: string; level: 1 | 2 };
const TOC: TocEntry[] = [
  { label: "1. Divisions cellulaires et diversité génétique", level: 1 },
  { label: "1.1 Introduction et définitions", level: 2 },
  { label: "1.2 Mitose : division cellulaire indirecte", level: 2 },
  { label: "1.3 Cycle cellulaire", level: 2 },
  { label: "1.4 Phases de la mitose", level: 2 },
  { label: "1.5 Méiose : généralités", level: 2 },
  { label: "1.6 Comparaison Mitose – Méiose", level: 2 },
  { label: "1.7 Conséquences génétiques de la méiose", level: 2 },
  { label: "1.8 Diversité génétique et méiose", level: 2 },
  { label: "1.9 Processus de diversification des génomes", level: 2 },
  { label: "2. Génétique humaine", level: 1 },
  { label: "2.1 Introduction", level: 2 },
  { label: "2.2 Le caryotype", level: 2 },
  { label: "2.3 Chromatides et locus", level: 2 },
  { label: "2.4 Autosomes et gonosomes", level: 2 },
  { label: "2.5 Quelques anomalies génétiques", level: 2 },
  { label: "2.6 Génétique mendélienne", level: 2 },
  { label: "2.7 Notation et vocabulaire de Mendel", level: 2 },
  { label: "2.8 Étude des lignages (arbres généalogiques)", level: 2 },
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

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 font-display text-2xl sm:text-3xl font-bold text-primary border-b border-primary/20 pb-2 mt-12 mb-5">
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
function Figure({ src, n, caption }: { src: string; n: number; caption: string }) {
  return (
    <figure className="my-6">
      <img src={src} {...dimsFor(src)} alt={caption} className="w-full rounded-lg border border-border bg-white" loading="lazy" />
      <figcaption className="mt-2 text-sm italic text-muted-foreground text-center">
        <span className="font-semibold not-italic text-foreground">Fig.{n}</span> — {caption}
      </figcaption>
    </figure>
  );
}
function TableCap({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <p className="mt-2 mb-6 text-sm italic text-muted-foreground text-center">
      <span className="font-semibold not-italic text-foreground">Tab.{n}</span> — {children}
    </p>
  );
}
function Def({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <p>
      <span className="underline decoration-primary/60 underline-offset-2 font-semibold text-foreground">{term}</span>{" "}
      : {children}
    </p>
  );
}

const thBase = "border border-border bg-primary/10 text-foreground font-semibold px-3 py-2 text-left text-sm";
const tdBase = "border border-border px-3 py-2 align-top text-sm text-foreground/90";

export default function CoursGenetique() {
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
          <Link
            to="/licence/sage-femme"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Retour à Licence Sage-Femme
          </Link>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            Licence · Option Sage-Femme · Semestre 1 · Génétique
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
            Chapitre 4 — Génétique
          </h1>
          <p className="text-muted-foreground mt-3 max-w-3xl">
            Divisions cellulaires (mitose et méiose), diversité génétique, caryotype humain,
            anomalies chromosomiques, génétique mendélienne et arbres généalogiques.
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
          <button
            onClick={() => setMobileToc((v) => !v)}
            className="w-full flex items-center justify-between border border-border bg-card rounded-lg px-4 py-3 text-sm font-semibold"
          >
            <span className="flex items-center gap-2"><Menu size={16} /> Table des matières</span>
            <span className="text-xs text-muted-foreground">{mobileToc ? "Masquer" : "Afficher"}</span>
          </button>
          {mobileToc && (
            <div className="mt-2 border border-border bg-card rounded-lg p-4">
              <TocList onClick={() => setMobileToc(false)} />
            </div>
          )}
        </div>

        <article className="min-w-0 prose-content space-y-4 leading-relaxed text-foreground/90">
          {/* ================= SOUS-CHAPITRE 1 ================= */}
          <section>
            <H2 id={slug("1. Divisions cellulaires et diversité génétique")}>
              1. Divisions cellulaires et diversité génétique
            </H2>

            <H3 id={slug("1.1 Introduction et définitions")}>1.1 Introduction et définitions</H3>
            <Def term="L'hérédité">
              transmission des caractères héréditaires (pathologiques ou normaux) des parents à leurs descendants.
            </Def>
            <Def term="La génétique">
              science qui étudie le fonctionnement et les modes de transmission du matériel héréditaire. Elle a pour but de :
            </Def>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Comprendre le mécanisme de transmission des caractères héréditaires.</li>
              <li>
                Appliquer les lois de l'hérédité pour modifier et améliorer les caractères des êtres vivants
                (ex. : obtenir de nouvelles races ou variétés animales ou végétales, diagnostic des anomalies
                génétiques et lutte contre les maladies héréditaires).
              </li>
            </ul>
            <Def term="La biologie cellulaire">
              (anciennement appelée cytologie) discipline scientifique qui étudie les cellules, du point de vue structural et fonctionnel.
            </Def>
            <Def term="L'ADN">
              acide désoxyribonucléique, substance essentielle des chromosomes, support de l'information génétique.
            </Def>
            <Def term="Un gène">
              segment d'ADN qui code pour un produit génique spécifique, comme une protéine ou une molécule d'ARN.
              Le gène de l'insuline est un exemple de gène codant pour une protéine : l'insuline.
            </Def>
            <Def term="Allèle">
              les allèles sont les différentes versions (séquences différentes) d'un même gène, situés sur le même chromosome, au même locus.
            </Def>
            <Def term="Mutations">
              ces allèles sont le résultat de mutations = modifications de la séquence de nucléotides d'un gène.
            </Def>
            <Def term="Le génotype">ensemble des gènes portés par les chromosomes.</Def>
            <Def term="Le phénotype">
              caractère effectivement exprimé par un individu. Il résulte de l'expression d'un génotype.
            </Def>
            <Def term="La méiose">
              ensemble de 2 divisions successives, qui produisent à partir des cellules germinales diploïdes
              (à 2n chromosomes) des cellules haploïdes (à n chromosomes). La méiose assure le brassage
              interchromosomique et un brassage intrachromosomique.
            </Def>
            <Def term="Homozygote">les individus homozygotes produisent un seul type de gamète.</Def>
            <Def term="Hétérozygote">les individus hétérozygotes produisent différents types de gamètes.</Def>
            <Def term="Dominance">
              il y a dominance lorsqu'un seul des deux allèles d'un caractère s'exprime et masque la présence
              de l'autre allèle. L'allèle qui ne s'exprime pas est dit{" "}
              <span className="underline decoration-primary/60 underline-offset-2 font-semibold">récessif</span>.
            </Def>

            <H3 id={slug("1.2 Mitose : division cellulaire indirecte")}>1.2 Mitose : division cellulaire indirecte</H3>
            <p>
              Chez l'être humain, des mitoses successives permettent de passer d'une cellule œuf unique à
              un organisme adulte formé de milliards de cellules. Des mitoses interviennent aussi dans le
              renouvellement permanent des cellules de tout individu et permettent de maintenir ses cellules
              toutes génétiquement identiques entre elles.
            </p>
            <p className="font-semibold">Définition</p>
            <p>
              <strong>Mitose</strong> : division d'une cellule somatique en <strong>2 cellules filles</strong>{" "}
              identiques à la cellule mère dont elles sont issues.
            </p>
            <p className="font-semibold mt-4">Quelques définitions</p>
            <Def term="Chromosomes">
              structures nucléaires en forme de bâtonnets, visibles durant la division cellulaire (mitose ou méiose),
              suites de gènes alignés (ADN).
            </Def>
            <Def term="Chromatine">
              substance nucléaire visible durant l'interphase (aucune division cellulaire) et qui se transforme
              en chromosome durant la division cellulaire.
            </Def>
            <Def term="Chromatide sœur">une des moitiés longitudinales d'un chromosome dupliqué.</Def>
            <Def term="Centromère">
              région amincie sur un chromosome où les deux chromatides sœurs sont liées ensemble.
            </Def>
            <Def term="Chromosomes homologues">
              paire de chromosomes, chacun porteur des mêmes loci de gènes. S'assemblent durant la prophase de méiose.
            </Def>
            <Figure src={fig1} n={1} caption="Passage de la chromatine au chromosome à deux chromatides sœurs." />

            <H3 id={slug("1.3 Cycle cellulaire")}>1.3 Cycle cellulaire</H3>
            <p>
              Le cycle cellulaire désigne l'ensemble des phénomènes qui ont lieu pendant la période de vie
              d'une cellule, depuis sa formation (par division d'une cellule mère) jusqu'au moment où cette
              cellule finit de se diviser en deux cellules filles.
            </p>
            <p>
              Il comprend <strong>la mitose</strong>, durant laquelle les chromosomes sont séparés et le
              cytoplasme est divisé, et <strong>l'interphase</strong> durant laquelle la majorité de la
              croissance cellulaire, des activités métaboliques et la réplication des chromosomes se font.
            </p>
            <p>La durée typique du cycle pour une cellule animale est de <strong>18 à 24 heures</strong>.</p>
            <Figure src={fig2} n={2} caption="Cycle cellulaire : interphase (G1, S, G2) et mitose (M)." />

            <H3 id={slug("1.4 Phases de la mitose")}>1.4 Phases de la mitose</H3>
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={thBase}>Phase</th>
                    <th className={thBase}>Événements caractéristiques</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={tdBase}>Phase G₂ de l'interphase</td>
                    <td className={tdBase}>
                      Centrosomes (chacun avec une paire de centrioles), aster, chromatine (répliquée),
                      nucléole, enveloppe nucléaire, membrane plasmique.
                    </td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Prophase</td>
                    <td className={tdBase}>
                      Fuseau de division en voie de formation, centromère, chromosome constitué de deux
                      chromatides sœurs.
                    </td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Prométaphase</td>
                    <td className={tdBase}>
                      Fragments de l'enveloppe nucléaire, kinétochore, microtubules polaires, pôle du fuseau
                      de division, microtubule kinétochorien.
                    </td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Métaphase</td>
                    <td className={tdBase}>Plaque équatoriale, fuseau de division.</td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Anaphase</td>
                    <td className={tdBase}>Chromosomes fils.</td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Télophase et cytocinèse</td>
                    <td className={tdBase}>
                      Sillon de division, nucléole en voie de formation, enveloppe nucléaire en voie de
                      constitution.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <TableCap n={1}>Les différentes phases de la mitose et leurs événements clés.</TableCap>
            <Figure src={fig3} n={3} caption="Schéma des différentes phases de la mitose." />

            <H3 id={slug("1.5 Méiose : généralités")}>1.5 Méiose : généralités</H3>
            <p>
              La méiose est un processus de division cellulaire aboutissant à la production de cellules
              haploïdes. La fécondation est l'aboutissement de la rencontre de deux cellules haploïdes,
              c'est-à-dire leur fusion. L'alternance de la méiose et de la fécondation dans un cycle de vie
              permet le maintien du caryotype de l'espèce au cours des générations successives.
            </p>
            <p>
              La méiose comporte deux divisions successives (la première réductionnelle et la seconde
              équationnelle) permettant de générer des cellules filles génétiquement différentes.
            </p>

            <H3 id={slug("1.6 Comparaison Mitose – Méiose")}>1.6 Comparaison Mitose – Méiose</H3>
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={thBase}></th>
                    <th className={thBase}>Mitose</th>
                    <th className={thBase}>Méiose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={tdBase}>Réplication de l'ADN</td>
                    <td className={tdBase}>Se déroule pendant l'interphase avant le début de la division nucléaire.</td>
                    <td className={tdBase}>Se déroule pendant l'interphase avant le début de la division nucléaire.</td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Nombre de divisions</td>
                    <td className={tdBase}><strong>Une seule division</strong></td>
                    <td className={tdBase}><strong>Deux divisions :</strong> réductionnelle puis équationnelle.</td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Nombre de cellules filles et composition génétique</td>
                    <td className={tdBase}>
                      <strong>2 cellules filles</strong>, chacune diploïde (2n) et génétiquement presque
                      identique à la cellule mère.
                    </td>
                    <td className={tdBase}>
                      <strong>4 cellules filles</strong>, chacune contenant la moitié du nombre de
                      chromosomes présent dans la cellule mère (<strong>haploïde ou n</strong>), non
                      génétiquement identiques à la cellule mère.
                    </td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Rôle dans l'organisme animal</td>
                    <td className={tdBase}>
                      <strong>Développement d'un adulte</strong> pluricellulaire à partir du zygote, production
                      de cellules pour la <strong>croissance et la régénération des tissus</strong>.
                    </td>
                    <td className={tdBase}>
                      <strong>Production des gamètes</strong>, réduction de moitié du nombre de chromosomes
                      et réalisation d'une diversité génétique dans les gamètes.
                    </td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Synapsis des chromosomes homologues</td>
                    <td className={tdBase}><strong>Absent</strong></td>
                    <td className={tdBase}><strong>Se produit pendant la prophase I</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <TableCap n={2}>Comparaison des principales caractéristiques de la mitose et de la méiose.</TableCap>
            <Figure src={fig4} n={4} caption="Schéma comparatif des processus de méiose et de mitose." />

            <H3 id={slug("1.7 Conséquences génétiques de la méiose")}>1.7 Conséquences génétiques de la méiose</H3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                La probabilité que deux individus soient génétiquement identiques est nulle, sauf chez les
                jumeaux monozygotes.
              </li>
              <li>
                Le brassage interchromosomique permet d'obtenir 2<sup>N</sup> possibilités.
              </li>
            </ul>

            <H3 id={slug("1.8 Diversité génétique et méiose")}>1.8 Diversité génétique et méiose</H3>
            <p>
              La source première de la diversité génétique est la <strong>mutation</strong>, car c'est elle
              qui produit de nouveaux gènes. Trois processus permettent de redistribuer les gènes selon des
              combinaisons propres à chaque individu de l'espèce :
            </p>
            <p className="font-semibold">• Les enjambements</p>
            <Figure src={fig5} n={5} caption="Enjambement (crossing-over) lors de la méiose : formation du chiasma, métaphase I, métaphase II et gamètes recombinés." />
            <p>Les chromosomes sont recombinés.</p>
            <p className="font-semibold">• Les assortiments indépendants</p>
            <Figure src={fig6} n={6} caption="Deux possibilités d'assortiment des chromosomes en méiose I et résultats en méiose II : quatre combinaisons génétiques possibles dans les gamètes." />
            <p className="font-semibold">• La fécondation aléatoire des gamètes</p>

            <H3 id={slug("1.9 Processus de diversification des génomes")}>1.9 Processus de diversification des génomes</H3>
            <p className="font-semibold">Une vue d'ensemble</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Mutations</strong>
                <ul className="list-[circle] pl-6 mt-1 space-y-1">
                  <li>
                    <em>Géniques</em> — substitution de bases (silencieuses, neutres, non-sens, faux-sens) ;
                    délétions ou additions de bases (décalage du cadre de lecture). Modifications de la
                    séquence de l'ADN : diversification qualitative des allèles.
                  </li>
                  <li>
                    <em>Chromosomiques</em> — sur un lot de chromosomes (haploïdie, diploïdie, triploïdie) ;
                    sur un nombre réduit de chromosomes / anomalies de la méiose (nullisomie, monosomie,
                    trisomie) : diversification quantitative des allèles ; sur un fragment de chromosomes
                    (délétion, inversion, translocation, duplication).
                  </li>
                </ul>
              </li>
              <li>
                <strong>Sexualité</strong>
                <ul className="list-[circle] pl-6 mt-1 space-y-1">
                  <li>
                    <em>Méiose</em> — brassage intrachromosomique, brassage interchromosomique
                    (recombinaison : génomes haploïdes originaux des gamètes ou des tétraspores).
                  </li>
                  <li>
                    <em>Fécondation</em> — réunion des génomes haploïdes de deux gamètes : génomes diploïdes
                    originaux des zygotes (allogamie → descendance hétérozygote ; autogamie/consanguinité →
                    descendance fortement homozygote).
                  </li>
                </ul>
              </li>
            </ul>
            <Figure src={fig7} n={7} caption="Vue d'ensemble des processus de diversification des génomes : mutations, méiose et fécondation." />
          </section>

          {/* ================= SOUS-CHAPITRE 2 ================= */}
          <section>
            <H2 id={slug("2. Génétique humaine")}>2. Génétique humaine</H2>

            <H3 id={slug("2.1 Introduction")}>2.1 Introduction</H3>
            <p>
              Longtemps centrée sur l'étude de la transmission de caractères morphologiques, la génétique
              humaine a aujourd'hui pour principal objet l'étude des maladies héréditaires et des anomalies
              chromosomiques. Ainsi <strong>6 678 maladies humaines d'origine génétique</strong> étaient
              recensées en 1994.
            </p>
            <p>
              La génétique humaine, essentiellement médicale aujourd'hui, ne se contente plus de décrire des
              maladies : elle cherche les raisons de leur apparition et veut pouvoir prédire les maladies et
              les prévenir.
            </p>
            <p>
              Depuis des dizaines d'années, diverses techniques relevant de la biologie moléculaire, de la
              cytogénétique, de la biochimie et de la médecine permettent le <strong>diagnostic prénatal</strong>{" "}
              d'un nombre important et croissant de maladies génétiques et de malformations congénitales.
            </p>
            <p>
              Le diagnostic prénatal est de nature à lever les angoisses des parents désireux d'avoir un
              enfant sain.
            </p>

            <H3 id={slug("2.2 Le caryotype")}>2.2 Le caryotype</H3>
            <p>
              Le caryotype est, en quelque sorte, la formule de chromosomes d'un organisme. Cette formule est
              déterminée à l'aide des chromosomes de la <strong>métaphase</strong> car c'est à cette étape
              qu'ils sont le plus condensés.
            </p>
            <p>Le caryotype est :</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Présentation ordonnée des chromosomes métaphasiques.</li>
              <li>Regroupement en « homologues ».</li>
            </ul>
            <Figure src={fig8} n={8} caption="Caryotype humain normal présenté sous forme ordonnée des chromosomes métaphasiques." />
            <p>
              Dans l'espèce humaine, le nombre <strong>diploïde</strong> de chromosomes est de{" "}
              <strong>46</strong>, qui se répartissent en <strong>23 paires</strong> :
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                Chaque <strong>paire</strong> réunit 2 chromosomes morphologiquement identiques, dont l'un
                est d'origine maternelle et l'autre d'origine paternelle.
              </li>
              <li>
                Au sein de ces 2 chromosomes, la nature des <strong>gènes</strong> présents, leur localisation
                et la disposition des uns vis-à-vis des autres (= l'ordre dans lequel ils s'enchaînent) sont
                strictement identiques.
              </li>
            </ul>
            <Figure src={fig9} n={9} caption="Chromosomes homologues : origine maternelle et paternelle, gènes disposés au même locus." />

            <H3 id={slug("2.3 Chromatides et locus")}>2.3 Chromatides et locus</H3>
            <p>
              <strong>Chromatides sœurs</strong> : chromatides d'un même chromosome, génétiquement identiques.
            </p>
            <p>
              <strong>Chromatides non sœurs ou homologues</strong> : elles portent, aux mêmes locus, des
              gènes qui déterminent les mêmes caractères.
            </p>
            <Figure src={fig10} n={10} caption="Deux chromosomes homologues, chromatides et locus (couleur des yeux, couleur des cheveux)." />
            <p>
              <strong>Locus</strong> : lieu occupé par le gène sur un chromosome.
            </p>
            <p>
              <strong>Utilité du caryotype :</strong> déceler des anomalies génétiques.
            </p>

            <H3 id={slug("2.4 Autosomes et gonosomes")}>2.4 Autosomes et gonosomes</H3>
            <p>Un caryotype humain « normal » possède <strong>23 paires</strong> de chromosomes dont :</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>22 paires de <strong>chromosomes homologues</strong> ou <strong>autosomes</strong>.</li>
              <li>
                Une paire de <strong>chromosomes sexuels</strong> ou <strong>hétérosomes (gonosomes)</strong>{" "}
                : l'un est le <strong>chromosome X</strong>, l'autre le <strong>chromosome Y</strong>.
                <ul className="list-[circle] pl-6 mt-1 space-y-1">
                  <li>Les femmes possèdent la paire <strong>XX</strong> : les gonosomes sont alors <strong>homologues</strong>.</li>
                  <li>Les hommes possèdent la paire <strong>XY</strong> : les gonosomes sont alors <strong>hétérologues</strong>.</li>
                </ul>
              </li>
            </ul>

            <H3 id={slug("2.5 Quelques anomalies génétiques")}>2.5 Quelques anomalies génétiques</H3>
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={thBase}>Anomalie autosomique et gonosomique</th>
                    <th className={thBase}>Conséquences</th>
                    <th className={thBase}>Fréq. moy.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={tdBase}>Trisomie 21</td>
                    <td className={tdBase}>Yeux en amandes, visage large, handicap mental plus ou moins important, santé fragile.</td>
                    <td className={tdBase}>1 / 700</td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Trisomie 18</td>
                    <td className={tdBase}>Affecte l'ensemble des organes ; décès avant 1 an.</td>
                    <td className={tdBase}>1 / 5 000</td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Trisomie 13</td>
                    <td className={tdBase}>Malformations du cerveau, des yeux, du système circulatoire… 130 jours d'espérance de vie.</td>
                    <td className={tdBase}>1 / 9 000</td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Maladie du cri du chat (délétion du bras court du chromosome 5)</td>
                    <td className={tdBase}>Cri évoquant le miaulement du chat (hypoplasie du larynx). Retard du développement psychomoteur. Ces enfants vivent.</td>
                    <td className={tdBase}>1 / 50 000 à 1 / 100 000</td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Super femelle 47 XXX</td>
                    <td className={tdBase}>Phénotype normal. Léger déficit intellectuel possible.</td>
                    <td className={tdBase}>1 / 1 000</td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Super mâle 47 XYY</td>
                    <td className={tdBase}>Phénotype normal. Léger déficit intellectuel possible.</td>
                    <td className={tdBase}>1 homme sur 1 000</td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Syndrome de Turner 45 X(0)</td>
                    <td className={tdBase}>Femme de petite taille, cou élargi, stérile. Léger déficit cognitif.</td>
                    <td className={tdBase}>1 / 5 000</td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Syndrome de Klinefelter 47 XXY</td>
                    <td className={tdBase}>Homme un peu plus grand, gynécomastie, stérile. Léger déficit cognitif.</td>
                    <td className={tdBase}>1 / 1 000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <TableCap n={3}>Principales anomalies chromosomiques autosomiques et gonosomiques.</TableCap>

            <H3 id={slug("2.6 Génétique mendélienne")}>2.6 Génétique mendélienne</H3>
            <p>
              La <strong>génétique mendélienne</strong> est la partie de la génétique dont la transmission
              des caractères, d'une génération à la suivante, chez les êtres sexués animaux ou végétaux,
              suit les lois de <strong>Gregor Mendel</strong>.
            </p>
            <p className="font-semibold mt-3">Les lois de Mendel</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>1ʳᵉ loi</strong> : loi de l'uniformité des hybrides de la première génération.</li>
              <li>
                <strong>2ᵉ loi</strong> : loi de la pureté des gamètes — chaque gamète reçoit un seul allèle
                du couple correspondant à un caractère.
              </li>
            </ul>
            <Figure src={fig11} n={11} caption="Croisement de Mendel : génération P (VV × vv), F1 (100 % Vv, fleurs violettes), F2 (rapport phénotypique 3 : 1 ; rapport génotypique 1 VV : 2 Vv : 1 vv)." />

            <H3 id={slug("2.7 Notation et vocabulaire de Mendel")}>2.7 Notation et vocabulaire de Mendel</H3>
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={thBase}>Notion</th>
                    <th className={thBase}>Définition et notation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={tdBase}><strong>Allèle dominant</strong></td>
                    <td className={tdBase}>
                      Notation par la première lettre désignant le caractère, en <strong>majuscule</strong>.
                      Violet domine blanc → allèle violet = <strong>V</strong> (grand V).
                    </td>
                  </tr>
                  <tr>
                    <td className={tdBase}><strong>Allèle récessif</strong></td>
                    <td className={tdBase}>
                      Notation par la même lettre que l'allèle dominant, en <strong>minuscule</strong>.
                      Blanc est récessif → allèle blanc = <strong>v</strong> (petit v).
                    </td>
                  </tr>
                  <tr>
                    <td className={tdBase}><strong>Homozygote (pur)</strong></td>
                    <td className={tdBase}>
                      Individu ayant deux allèles identiques pour un caractère donné. Homozygote dominant :{" "}
                      <strong>VV</strong> ; homozygote récessif : <strong>vv</strong>.
                    </td>
                  </tr>
                  <tr>
                    <td className={tdBase}><strong>Hétérozygote</strong></td>
                    <td className={tdBase}>Individu ayant deux allèles différents pour un caractère donné : <strong>Vv</strong>.</td>
                  </tr>
                  <tr>
                    <td className={tdBase}><strong>Phénotype</strong></td>
                    <td className={tdBase}>Apparence de l'individu (fleurs violettes ou blanches).</td>
                  </tr>
                  <tr>
                    <td className={tdBase}><strong>Génotype</strong></td>
                    <td className={tdBase}>Constitution génétique de l'individu (VV, Vv ou vv).</td>
                  </tr>
                  <tr>
                    <td className={tdBase}><strong>Rapport phénotypique</strong></td>
                    <td className={tdBase}>
                      Proportion de chaque phénotype (en % ou en chiffres) : 75 % violettes : 25 % blanches,
                      soit 3 violettes : 1 blanche.
                    </td>
                  </tr>
                  <tr>
                    <td className={tdBase}><strong>Rapport génotypique</strong></td>
                    <td className={tdBase}>
                      Proportion de chaque génotype : 50 % Vv : 25 % VV : 25 % vv, soit 2 Vv : 1 VV : 1 vv.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <TableCap n={4}>Notations et vocabulaire de la génétique mendélienne.</TableCap>

            <H3 id={slug("2.8 Étude des lignages (arbres généalogiques)")}>2.8 Étude des lignages (arbres généalogiques)</H3>
            <p>
              <strong>Lignage</strong> : regroupement, dans un arbre généalogique, de l'histoire d'un
              caractère particulier d'une famille.
            </p>
            <p className="font-semibold mt-3">Symboles utilisés pour l'établissement d'un arbre généalogique</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Homme : □</li>
              <li>Femme : ○</li>
              <li>Union : □—○</li>
              <li>Individus présentant le caractère étudié : ■ ● (avec hachures)</li>
              <li>Sexe non précisé : ◇</li>
              <li>Générations : I, II, III, IV, …</li>
              <li>Enfants d'une union, en ordre de naissance : 1, 2, 3, 4</li>
            </ul>
            <p className="font-semibold mt-4">Utilité de faire un arbre généalogique</p>
            <p>Il permet :</p>
            <ol className="list-[lower-alpha] pl-6 space-y-1.5">
              <li>
                d'étudier la génétique humaine sans faire les nombreux accouplements que l'on fait parfois
                pour d'autres espèces ;
              </li>
              <li>de déceler les porteurs d'une maladie dans une famille ;</li>
              <li>de prédire la probabilité d'apparition de cette maladie chez les futurs enfants ;</li>
              <li>
                de déduire si le caractère étudié est dominant ou récessif et s'il est lié aux autosomes
                (chromosomes ordinaires) ou aux hétérosomes (chromosomes sexuels).
              </li>
            </ol>
          </section>
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
