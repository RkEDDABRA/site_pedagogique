import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Menu, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

import fig1 from "@/assets/cours-sf-s1/hematologie/fig1-lignee-hematopoietique.jpg";
import fig2 from "@/assets/cours-sf-s1/hematologie/fig2-anemie-falciforme.jpg";
import fig3 from "@/assets/cours-sf-s1/hematologie/fig3-hematopoiese-foetus.jpg";
import fig4 from "@/assets/cours-sf-s1/hematologie/fig4-hematopoiese.jpg";
import fig5 from "@/assets/cours-sf-s1/hematologie/fig5-hemostase.jpg";
import fig6 from "@/assets/cours-sf-s1/hematologie/fig6-groupes-sanguins.jpg";
import fig7 from "@/assets/cours-sf-s1/hematologie/fig7-marqueurs-abo.jpg";
import fig8 from "@/assets/cours-sf-s1/hematologie/fig8-agglutination.jpg";
import fig9 from "@/assets/cours-sf-s1/hematologie/fig9-maladie-hemolytique.png";
import fig10 from "@/assets/cours-sf-s1/hematologie/fig10-incompatibilite-rhesus.jpg";
import { dimsFor } from "@/lib/imageDims";
import { ZoomableImage } from "@/components/ZoomableImage";

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type TocEntry = { label: string; level: 1 | 2 };
const TOC_ENTRIES: TocEntry[] = [
  { label: "1. Composition et fonctions du sang", level: 1 },
  { label: "1.1 Composition du sang", level: 2 },
  { label: "1.2 Le plasma", level: 2 },
  { label: "1.3 Les éléments figurés du sang", level: 2 },
  { label: "1.3.1 Érythrocytes (globules rouges)", level: 2 },
  { label: "1.3.2 Leucocytes (globules blancs)", level: 2 },
  { label: "1.3.3 Plaquettes", level: 2 },
  { label: "2. Fonctions du sang", level: 1 },
  { label: "2.1 Transport", level: 2 },
  { label: "2.2 Régulation", level: 2 },
  { label: "2.3 Protection", level: 2 },
  { label: "3. Hématopoïèse", level: 1 },
  { label: "4. Hémostase", level: 1 },
  { label: "5. Immuno-hématologie", level: 1 },
  { label: "6. Les groupes sanguins", level: 1 },
  { label: "6.1 Le système ABO", level: 2 },
  { label: "6.2 Le système Rhésus (RHD)", level: 2 },
  { label: "6.3 Allo-immunisation fœto-maternelle", level: 2 },
  { label: "6.4 Détermination du groupe ABO", level: 2 },
  { label: "6.5 La transfusion", level: 2 },
  { label: "7. Les hémopathies", level: 1 },
];

function TocList({ onClick }: { onClick?: () => void }) {
  return (
    <nav aria-label="Table des matières">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Table des matières</p>
      <ol className="space-y-1 text-sm">
        {TOC_ENTRIES.map((t) => {
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
      <ZoomableImage src={src} alt={caption} className="w-full rounded-lg border border-border bg-white"/>
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

const thBase =
  "border border-border bg-primary/10 text-foreground font-semibold px-3 py-2 text-left text-sm";
const tdBase = "border border-border px-3 py-2 align-top text-sm text-foreground/90";

export default function CoursHematologie() {
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
            Licence · Option Sage-Femme · Semestre 1 · Hématologie
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
            Chapitre 2 — Hématologie
          </h1>
          <p className="text-muted-foreground mt-3 max-w-3xl">
            Composition et fonctions du sang, hématopoïèse, hémostase, immuno-hématologie,
            groupes sanguins (ABO, Rhésus), transfusion et hémopathies.
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
          {/* 1. Composition et fonctions du sang */}
          <section>
            <H2 id={slug("1. Composition et fonctions du sang")}>1. Composition et fonctions du sang</H2>

            <H3 id={slug("1.1 Composition du sang")}>1.1 Composition du sang</H3>
            <p>
              Le sang des Vertébrés est un <strong>tissu conjonctif</strong> composé de diverses sortes
              de cellules en suspension dans une matrice liquide appelée <strong>plasma</strong>. Les
              ions, les protéines et les cellules sanguines qu'il renferme participent à la régulation
              osmotique et interviennent dans le transport et l'immunité.
            </p>
            <p>
              Lorsqu'on sépare les composantes du sang en le centrifugeant, on constate que les
              éléments figurés (cellules et fragments cellulaires) occupent environ <strong>45 %</strong>{" "}
              du volume sanguin. Le reste (55 %) est le <strong>plasma</strong>.
            </p>

            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={thBase} colSpan={2}>Plasma — 55 %</th>
                  </tr>
                  <tr>
                    <th className={thBase}>Composants</th>
                    <th className={thBase}>Principales fonctions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={tdBase}>Eau</td>
                    <td className={tdBase}>Solvant pour le transport d'autres substances</td>
                  </tr>
                  <tr>
                    <td className={tdBase}>
                      Ions (électrolytes) : sodium, potassium, calcium, magnésium, chlorure,
                      hydrogénocarbonate
                    </td>
                    <td className={tdBase}>
                      Équilibre osmotique, effet tampon sur le pH, régulation de la perméabilité
                      membranaire
                    </td>
                  </tr>
                  <tr>
                    <td className={tdBase}>
                      Protéines plasmatiques : albumine, fibrinogène, immunoglobulines
                    </td>
                    <td className={tdBase}>
                      Équilibre osmotique et pH, coagulation, défense de l'organisme (anticorps)
                    </td>
                  </tr>
                  <tr>
                    <td className={tdBase}>
                      Autres substances transportées : nutriments (glucose, acides gras, vitamines),
                      déchets métaboliques, gaz respiratoires (O₂ et CO₂), hormones
                    </td>
                    <td className={tdBase}>Transport</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <TableCap n={1}>Composition et fonctions du plasma sanguin.</TableCap>

            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={thBase} colSpan={3}>Éléments figurés — 45 %</th>
                  </tr>
                  <tr>
                    <th className={thBase}>Type de cellule</th>
                    <th className={thBase}>Nombre par litre de sang</th>
                    <th className={thBase}>Fonctions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={tdBase}>
                      Leucocytes (globules blancs) : granulocytes basophiles, lymphocytes,
                      granulocytes éosinophiles, neutrophiles, monocytes
                    </td>
                    <td className={tdBase}>5 – 10 × 10⁹</td>
                    <td className={tdBase}>Défense et immunité</td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Plaquettes</td>
                    <td className={tdBase}>250 – 400 × 10⁹</td>
                    <td className={tdBase}>Coagulation</td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Érythrocytes (globules rouges)</td>
                    <td className={tdBase}>5 – 6 × 10¹²</td>
                    <td className={tdBase}>Transport de l'O₂ et contribution au transport du CO₂</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <TableCap n={2}>Éléments figurés du sang : types cellulaires, concentration et fonctions.</TableCap>

            <Figure src={fig1} n={1} caption="Diagramme de la lignée hématopoïétique montrant la différenciation des cellules souches en divers éléments figurés du sang." />

            <H3 id={slug("1.2 Le plasma")}>1.2 Le plasma</H3>
            <p>
              Le plasma est un liquide visqueux de couleur jaunâtre. Composé de <strong>90 % d'eau</strong>,
              le plasma contient une grande diversité de solutés.
            </p>
            <p>
              <strong>Sels inorganiques (électrolytes) :</strong> même si le plasma est composé d'eau
              à 90 %, les sels dissous constituent un élément essentiel du sang. Plusieurs ions
              participent à l'effet tampon qui maintient le pH sanguin normal aux environs de{" "}
              <strong>7,4</strong>. Les sels jouent également un rôle important dans le maintien
              de l'équilibre osmotique et interviennent dans l'activité musculaire et nerveuse.
              Leur concentration doit demeurer très stable.
            </p>
            <p>
              <strong>Protéines plasmatiques :</strong> elles représentent 8 % (au poids) du volume
              plasmatique et sont les plus abondants solutés du plasma. La plupart sont{" "}
              <strong>produites par le foie</strong> (à l'exception des hormones et des gammaglobulines).
            </p>
            <ul className="list-disc pl-6 space-y-2 my-3">
              <li>
                L'<strong>albumine</strong> constitue 60 % des protéines plasmatiques : elle exerce
                un effet tampon et contribue majoritairement à l'équilibre de la pression osmotique
                du plasma.
              </li>
              <li>
                Les <strong>immunoglobulines</strong> (anticorps) représentent 36 % des protéines
                plasmatiques et aident à lutter contre les virus et autres agents pathogènes.
              </li>
              <li>
                Certaines protéines sont des <strong>facteurs de coagulation</strong>. Le plasma dont
                les facteurs de coagulation ont été retirés porte le nom de <em>sérum</em>.
              </li>
            </ul>
            <p>
              Le plasma contient également une vaste gamme de <strong>substances en transit</strong>{" "}
              (nutriments, gaz, hormones, produits et déchets du métabolisme) qui utilisent le sang
              pour se déplacer d'une partie du corps à l'autre.
            </p>

            <H3 id={slug("1.3 Les éléments figurés du sang")}>1.3 Les éléments figurés du sang</H3>
            <p>
              Le plasma sanguin renferme deux types de cellules en suspension : les{" "}
              <strong>globules rouges</strong>, qui transportent l'O₂ et une partie du CO₂ ; les{" "}
              <strong>globules blancs</strong>, une composante du système immunitaire. Un troisième
              élément y est également contenu : les <strong>plaquettes</strong>, fragments de cellules
              contribuant à la coagulation.
            </p>

            <H3 id={slug("1.3.1 Érythrocytes (globules rouges)")}>1.3.1 Les érythrocytes (globules rouges)</H3>
            <p>
              <strong>Structure.</strong> Avec un diamètre d'environ 7,5 µm, les érythrocytes (globules
              rouges ou hématies) sont de petites cellules en forme de disques biconcaves, dont le
              centre mince paraît plus pâle que la périphérie. Chaque litre de sang humain en contient
              5 à 6 × 10¹² (le volume sanguin du corps est d'environ 5 L, soit environ 25 000 milliards
              de cellules).
            </p>
            <p>
              Les érythrocytes des Mammifères sont <strong>dépourvus de noyau</strong>. Cette
              caractéristique cellulaire leur permet de contenir davantage de molécules d'
              <strong>hémoglobine</strong>, une protéine contenant quatre ions ferreux (Fe²⁺)
              transportant chacun une molécule de O₂. Ils sont également{" "}
              <strong>dépourvus de mitochondries</strong> et produisent leur ATP exclusivement par
              métabolisme anaérobie.
            </p>
            <p>
              <strong>Fonction.</strong> La fonction principale des érythrocytes est le transport
              des gaz respiratoires (oxygène et gaz carbonique).
            </p>

            <div className="border-l-4 border-rose-400 bg-rose-50/60 dark:bg-rose-950/30 p-4 rounded-md my-4">
              <p className="font-semibold text-rose-900 dark:text-rose-100 mb-2">
                Exemple de maladie génétique : l'anémie falciforme
              </p>
              <p className="text-sm text-rose-900/90 dark:text-rose-100/90 leading-relaxed">
                L'hémoglobine (Hb) est formée de 4 chaînes polypeptidiques : 2 alpha et 2 bêta.
                Il arrive que le sixième acide aminé de la chaîne bêta, la glutamine, soit
                remplacé par la valine. Ce changement modifie la conformation native de la chaîne bêta.
                L'hémoglobine a alors tendance à cristalliser, ce qui déforme les globules « en
                faucille ». La capacité de transport de l'oxygène est réduite et les globules
                déformés bouchent les petits vaisseaux, entraînant la mort.
              </p>
            </div>
            <Figure src={fig2} n={2} caption="Globule rouge contenant une Hb normale (à gauche) et globule rouge déformé par une Hb anormale — anémie falciforme (à droite)." />

            <H3 id={slug("1.3.2 Leucocytes (globules blancs)")}>1.3.2 Les leucocytes (globules blancs)</H3>
            <p>
              Les leucocytes ou globules blancs sont les seuls éléments figurés du sang à posséder
              un noyau et les organites habituels. Ils sont beaucoup moins nombreux que les globules
              rouges.
            </p>
            <p>
              Leur rôle est de combattre les infections. Certains sont des <strong>phagocytes</strong>{" "}
              qui absorbent et digèrent les microorganismes ainsi que les débris de cellules mortes.
              D'autres, appelés <strong>lymphocytes</strong>, se transforment en lymphocytes B et T,
              qui participent à la réaction immunitaire.
            </p>
            <p>
              En temps normal, un litre de sang humain contient 5 à 10 × 10⁹ leucocytes, mais leur
              nombre augmente provisoirement chaque fois que le corps combat une infection.
            </p>

            <H3 id={slug("1.3.3 Plaquettes")}>1.3.3 Les plaquettes</H3>
            <p>
              Les plaquettes, parfois appelées <strong>thrombocytes</strong>, représentent la
              troisième catégorie d'éléments figurés du sang. Ce sont des fragments de cellules
              mesurant 2 à 3 µm de diamètre. Elles sont dépourvues de noyau.
            </p>
            <p>
              Les plaquettes jouent un rôle essentiel dans la coagulation qui prend place dans le
              plasma à la suite d'une rupture des vaisseaux sanguins ou d'une lésion de leur
              endothélium. En adhérant à l'endroit endommagé, elles forment un bouchon temporaire
              qui contribue à colmater la brèche.
            </p>
          </section>

          {/* 2. Fonctions du sang */}
          <section>
            <H2 id={slug("2. Fonctions du sang")}>2. Fonctions du sang</H2>
            <p>Le sang assume de nombreuses fonctions.</p>

            <H3 id={slug("2.1 Transport")}>2.1 Transport</H3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                Apport à toutes les cellules d'oxygène et de nutriments provenant respectivement des
                poumons et du système digestif.
              </li>
              <li>
                Transport des déchets du métabolisme cellulaire vers les sites d'élimination (les
                poumons pour le CO₂ et les reins pour les déchets azotés).
              </li>
              <li>Transport des hormones des glandes endocrines vers leurs organes cibles.</li>
            </ul>

            <H3 id={slug("2.2 Régulation")}>2.2 Régulation</H3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Maintien de la température corporelle appropriée.</li>
              <li>Maintien d'un pH normal dans les tissus.</li>
              <li>Maintien d'un volume adéquat de liquide dans le système circulatoire.</li>
            </ul>

            <H3 id={slug("2.3 Protection")}>2.3 Protection</H3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Prévention de l'hémorragie</strong> : lorsqu'un vaisseau sanguin se rompt,
                les plaquettes et les protéines plasmatiques forment un caillot et arrêtent
                l'écoulement du sang.
              </li>
              <li>
                <strong>Prévention de l'infection</strong> : le sang contient des anticorps, les
                protéines du complément et les leucocytes qui défendent l'organisme contre les
                corps étrangers (bactéries, virus…).
              </li>
            </ul>
          </section>

          {/* 3. Hématopoïèse */}
          <section>
            <H2 id={slug("3. Hématopoïèse")}>3. Hématopoïèse</H2>
            <p>
              L'hématopoïèse est l'ensemble des phénomènes qui concourent à la{" "}
              <strong>fabrication et au remplacement continu et régulé</strong> des cellules
              sanguines.
            </p>
            <p>
              Après la naissance, l'hématopoïèse normale est localisée exclusivement dans la{" "}
              <strong>moelle osseuse</strong>. Jusqu'à l'âge de 5 ans, tous les os ont une activité
              hématopoïétique. Ensuite, cette activité se limite progressivement aux os plats
              (sternum, vertèbres, os iliaque, sacrum, os du crâne) et aux extrémités supérieures
              des os longs (fémur, humérus).
            </p>
            <Figure src={fig3} n={3} caption="Localisation de l'hématopoïèse chez le fœtus au cours du temps." />
            <p>Les cellules appartiennent à deux tissus physiologiquement distincts :</p>
            <blockquote className="border-l-4 border-primary/40 bg-primary/5 pl-4 py-2 my-3">
              Le <strong>tissu myéloïde</strong> donne naissance à des cellules aux fonctions très
              variées : globules rouges, polynucléaires (neutrophiles, éosinophiles, basophiles),
              monocytes, plaquettes.
            </blockquote>
            <p>
              Les cellules myéloïdes sont produites par la rate et le foie durant la phase
              embryonnaire (2 – 4 mois). Vers le 4ᵉ mois de la vie embryonnaire, c'est la moelle
              osseuse qui devient le site exclusif de l'hématopoïèse, à la naissance et pour toute
              la vie.
            </p>
            <blockquote className="border-l-4 border-primary/40 bg-primary/5 pl-4 py-2 my-3">
              Le <strong>tissu lymphoïde</strong> est constitué de lymphocytes et de plasmocytes qui
              interviennent dans les réactions immunitaires spécifiques.
            </blockquote>
            <p>
              Le tissu lymphoïde se trouve dans la moelle osseuse mais aussi dans les organes
              lymphoïdes : ganglions lymphatiques, rate, amygdales, thymus…
            </p>
            <Figure src={fig4} n={4} caption="Diagramme général de l'hématopoïèse : différenciation des cellules souches en lignées myéloïde et lymphoïde." />
          </section>

          {/* 4. Hémostase */}
          <section>
            <H2 id={slug("4. Hémostase")}>4. Hémostase</H2>
            <p>
              En cas de rupture d'un vaisseau sanguin, une série de réactions s'établit pour arrêter
              le saignement : c'est l'<strong>hémostase</strong> (<em>stasis</em> = arrêt). Sans
              cette réaction défensive, nous perdrions rapidement tout notre sang, même après une
              minuscule coupure.
            </p>
            <p>
              Cette réponse rapide, localisée et précise fait intervenir de nombreux facteurs de
              coagulation normalement présents dans le plasma, ainsi que des substances libérées
              par les plaquettes et les cellules des tissus endommagés.
            </p>
            <p>
              L'hémostase comprend <strong>3 étapes inter-dépendantes</strong> qui se déroulent de
              façon concomitante :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Hémostase primaire :</strong> aboutit à la formation d'un agrégat plaquettaire
                (<em>clou plaquettaire</em>). Elle permet seule l'arrêt des saignements dans les
                capillaires les plus fins.
              </li>
              <li>
                <strong>Coagulation plasmatique :</strong> aboutit à la formation d'un réseau de
                fibrine (<em>caillot de fibrine</em>), qui consolide l'agrégat plaquettaire.
              </li>
              <li>
                <strong>Fibrinolyse :</strong> permet la lyse du caillot fibrino-érythro-plaquettaire
                et le maintien de la perméabilité vasculaire, une fois la cicatrisation du vaisseau
                achevée.
              </li>
            </ul>
            <Figure src={fig5} n={5} caption="Étapes de l'hémostase : lésion vasculaire → hémostase primaire (clou plaquettaire) → coagulation (caillot de fibrine) → fibrinolyse (reperméation du vaisseau)." />
          </section>

          {/* 5. Immuno-hématologie */}
          <section>
            <H2 id={slug("5. Immuno-hématologie")}>5. Immuno-hématologie</H2>
            <p>
              L'immuno-hématologie est la science consacrée à l'étude des propriétés antigéniques
              du sang, des réactions immunologiques correspondantes et des pathologies qui y sont
              associées.
            </p>
            <p>L'immuno-hématologie correspond à l'étude :</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>des antigènes portés par les éléments figurés du sang ;</li>
              <li>de l'immunisation qu'ils peuvent induire ;</li>
              <li>
                des conflits qui en résultent (pathologies auto-immunes, incompatibilités
                fœto-maternelles, réactions immuno-allergiques touchant les éléments figurés du sang).
              </li>
            </ul>
            <Figure src={fig6} n={6} caption="Vue d'ensemble des systèmes de groupes sanguins." />
          </section>

          {/* 6. Les groupes sanguins */}
          <section>
            <H2 id={slug("6. Les groupes sanguins")}>6. Les groupes sanguins</H2>
            <p>
              Même si la composition du sang est la même pour tous les êtres humains, les différents
              éléments qui le composent <strong>portent à leur surface des marques d'identité
              individuelle</strong>. Il s'agit d'<strong>antigènes</strong> présents sur les cellules
              du sang — érythrocytes, leucocytes, thrombocytes — et sur certaines protéines
              plasmatiques comme les immunoglobulines. Ils varient d'une personne à l'autre et
              définissent notamment les <strong>groupes sanguins</strong>.
            </p>
            <p>
              <strong>Système de groupe sanguin</strong> = ensemble des variations antigéniques
              portées par les globules rouges, issues des formes alternatives d'un même gène
              (allèles).
            </p>
            <p>
              Il existe plusieurs dizaines de systèmes antigéniques (Kell, Duffy, Kidd, etc.),
              dont plus de vingt pour les seuls globules rouges. Les plus importants pour la
              transfusion sont les systèmes <strong>ABO</strong> et <strong>Rhésus</strong>, qui
              déterminent la compatibilité sanguine entre deux individus.
            </p>
            <div className="border-l-4 border-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30 p-4 rounded-md my-4">
              <p className="font-semibold text-emerald-900 dark:text-emerald-100 mb-1">Définition</p>
              <p className="text-sm text-emerald-900/90 dark:text-emerald-100/90 leading-relaxed">
                On appelle <strong>antigène (Ag)</strong> toute substance à la surface des cellules
                ou circulante, capable de déclencher une <strong>réponse immunitaire</strong> visant
                à l'éliminer. Les <strong>anticorps (Ac)</strong> sont des protéines
                (<strong>immunoglobulines</strong>) dont la production, assurée par les lymphocytes,
                est provoquée par l'introduction d'un antigène auquel ils se lient spécifiquement.
              </p>
            </div>

            <H3 id={slug("6.1 Le système ABO")}>6.1 Le système ABO</H3>
            <p>
              <strong>Les antigènes du système ABO.</strong> Le système ABO permet de déterminer{" "}
              <strong>quatre groupes sanguins</strong> selon la présence ou non de deux antigènes,
              A et B, à la surface des globules rouges. Selon qu'un individu possède l'antigène A,
              l'antigène B, les deux ou aucun, il est classé respectivement dans le groupe sanguin{" "}
              <strong>A, B, AB ou O</strong>.
            </p>
            <Figure src={fig7} n={7} caption="Marqueurs sur un globule rouge visualisés par autoradiographie et schéma d'interprétation : les agglutinogènes A et B sont représentés en rouge et en bleu." />
            <p>
              <strong>Les anticorps.</strong> Les anticorps anti-A et anti-B sont des anticorps
              naturels de type IgM, acquis dès les premiers jours de vie. Lorsque les globules
              rouges n'expriment pas les antigènes A ou B, des anticorps contre ces antigènes sont
              produits par l'individu.
            </p>
            <Figure src={fig8} n={8} caption="Expérience de mélange de sang de différents sujets permettant d'observer l'agglutination." />
            <p className="font-semibold">En conclusion :</p>
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={thBase}>Groupe ABO</th>
                    <th className={thBase}>Antigène présent</th>
                    <th className={thBase}>Antigène absent</th>
                    <th className={thBase}>Anticorps présent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={tdBase}>A</td><td className={tdBase}>A</td><td className={tdBase}>B</td><td className={tdBase}>anti-B</td></tr>
                  <tr><td className={tdBase}>B</td><td className={tdBase}>B</td><td className={tdBase}>A</td><td className={tdBase}>anti-A</td></tr>
                  <tr><td className={tdBase}>AB</td><td className={tdBase}>A et B</td><td className={tdBase}>aucun</td><td className={tdBase}>aucun</td></tr>
                  <tr><td className={tdBase}>O</td><td className={tdBase}>aucun</td><td className={tdBase}>A et B</td><td className={tdBase}>anti-A et anti-B</td></tr>
                </tbody>
              </table>
            </div>
            <TableCap n={3}>Antigènes et anticorps des groupes sanguins du système ABO.</TableCap>

            <H3 id={slug("6.2 Le système Rhésus (RHD)")}>6.2 Le système Rhésus (RHD)</H3>
            <p>
              Le système RHD détermine la <strong>présence ou l'absence de l'antigène D sur les
              globules rouges</strong>. S'il est présent, l'individu est Rhésus D <strong>positif (+)</strong> ;
              s'il est absent, l'individu est Rhésus D <strong>négatif (−)</strong>.
            </p>
            <p>
              Les anticorps anti-RHD sont des <strong>anticorps irréguliers de type IgG</strong>,
              acquis à l'occasion d'un épisode transfusionnel ou d'une grossesse. Lorsque les
              globules rouges n'expriment pas l'antigène D, des anticorps contre cet antigène peuvent
              être produits par l'individu en cas d'exposition.
            </p>
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={thBase}>Groupe RHD</th>
                    <th className={thBase}>Antigène présent</th>
                    <th className={thBase}>Anticorps produits en cas d'exposition à l'antigène D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={tdBase}>Rhésus positif (+)</td><td className={tdBase}>D</td><td className={tdBase}>aucun</td></tr>
                  <tr><td className={tdBase}>Rhésus négatif (−)</td><td className={tdBase}>aucun</td><td className={tdBase}>anti-D</td></tr>
                </tbody>
              </table>
            </div>
            <TableCap n={4}>Antigènes et anticorps du système Rhésus (RHD).</TableCap>

            <H3 id={slug("6.3 Allo-immunisation fœto-maternelle")}>
              6.3 Allo-immunisation sanguine fœto-maternelle
            </H3>
            <p>
              <strong>Définition.</strong> C'est la <strong>synthèse par la mère d'allo-anticorps
              dirigés</strong> contre les éléments sanguins du fœtus : hématies fœtales (anticorps
              anti-D, anti-c, anti-Kell) et plaquettes. Ces allo-anticorps peuvent être responsables
              d'une hémolyse ou d'une thrombopénie.
            </p>
            <p>
              Le but de la prise en charge obstétricale est, dans un premier temps, d'assurer une
              prévention efficace de ce type d'affection. Si l'incompatibilité existe, la
              compréhension de la physiopathologie permet une prise en charge adaptée de ces
              grossesses.
            </p>
            <p>
              On voit ainsi l'importance d'une bonne surveillance des patientes enceintes pour
              dépister les grossesses à risque, identifier l'allo-immunisation et repérer les
              enfants les plus atteints, afin qu'ils puissent bénéficier des thérapeutiques les
              mieux adaptées (transfusion fœtale in utero, photothérapie intensive post-natale).
            </p>

            <p className="font-semibold mt-4">Cas de la maladie hémolytique du nouveau-né</p>
            <p>
              Dans le cas où la mère est Rh− et l'enfant à naître est Rh+ (le père étant Rh+), au
              cours du 1ᵉʳ accouchement, des hématies fœtales se mélangent au sang maternel, ce qui
              déclenche dans le corps de la mère la formation d'anticorps anti-Rh+. Lors de la
              seconde grossesse, si le nouveau-né est Rh+, il sera atteint d'une anémie due à la
              lyse de ses hématies par les anticorps anti-D : c'est la <strong>maladie
              hémolytique</strong>, qui peut être mortelle pour le fœtus.
            </p>
            <p>
              On prévient cette maladie en injectant des anticorps anti-D à la mère dans les{" "}
              <strong>72 h qui suivent l'accouchement</strong> d'un enfant Rh+.
            </p>
            <Figure src={fig9} n={9} caption="Maladie hémolytique du nouveau-né : (1) passage d'hématies fœtales Rh+ vers la mère Rh− lors de la 1ʳᵉ grossesse ; (2) formation d'anticorps anti-D chez la mère ; (3) passage des anticorps anti-D vers le fœtus lors de la 2ᵉ grossesse ; (4) attaque des hématies fœtales ; (5) lyse des hématies fœtales." />

            <div className="border-l-4 border-blue-400 bg-blue-50/70 dark:bg-blue-950/30 p-4 rounded-md my-6">
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Intégration — Application clinique : l'incompatibilité Rhésus et la grossesse
              </p>
              <p className="text-sm text-blue-900/90 dark:text-blue-100/90 leading-relaxed mb-2">
                Le fait de savoir si des anticorps anti-D sont présents est particulièrement
                important pour la femme enceinte de groupe Rh− dont le fœtus est de groupe Rh+.
                L'incompatibilité Rhésus risque de survenir durant la grossesse si la mère a déjà
                été exposée à du sang Rh+, au moment de la naissance d'un bébé Rh+, au cours d'une
                fausse couche, d'un avortement ou pendant la première grossesse en cas de trouble
                placentaire, notamment. Une certaine quantité de sang du bébé peut alors entrer en
                contact avec le sang maternel. La mère forme des anticorps anti-D qui pourront
                traverser le placenta lors de la deuxième grossesse et détruire les érythrocytes du
                fœtus, causant la <strong>maladie hémolytique du nouveau-né</strong> (ou
                érythroblastose du nouveau-né), voire la mort. Le nouveau-né présentera des signes
                d'anémie et d'hyperbilirubinémie ; dans les cas graves, il risque l'insuffisance
                cardiaque et devra recevoir une transfusion sanguine pour survivre.
              </p>
              <p className="text-sm text-blue-900/90 dark:text-blue-100/90 leading-relaxed">
                Il est possible d'empêcher la formation d'anticorps anti-D en administrant à la
                femme enceinte Rh− des immunoglobulines particulières (p. ex. RhoGAM) de la 28ᵉ à la
                32ᵉ semaine de grossesse et à l'accouchement. Ces immunoglobulines se lient aux
                antigènes de surface des érythrocytes fœtaux, de sorte que le système immunitaire
                maternel, incapable de détecter l'antigène D, ne produit pas d'anticorps anti-D.
                Seuls les anticorps anti-D traversent la barrière placentaire, contrairement aux
                anti-A et anti-B.
              </p>
            </div>
            <Figure src={fig10} n={10} caption="Schéma de l'incompatibilité Rhésus : 1ʳᵉ grossesse (passage de l'Ag D dans la circulation maternelle), intervalle inter-grossesse (formation d'anticorps anti-D), 2ᵉ grossesse (fixation des anti-D maternels aux érythrocytes fœtaux)." />

            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={thBase}></th>
                    <th className={thBase} colSpan={2}>Mère</th>
                    <th className={thBase} colSpan={2}>Fœtus</th>
                  </tr>
                  <tr>
                    <th className={thBase}></th>
                    <th className={thBase}>1ʳᵉ grossesse</th>
                    <th className={thBase}>2ᵉ grossesse</th>
                    <th className={thBase}>1ʳᵉ grossesse</th>
                    <th className={thBase}>2ᵉ grossesse</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={tdBase}>Groupe sanguin</td>
                    <td className={tdBase}>Rh−</td>
                    <td className={tdBase}>Rh−</td>
                    <td className={tdBase}>Rh+</td>
                    <td className={tdBase}>Rh+</td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Érythrocytes</td>
                    <td className={tdBase}>Pas d'antigènes D</td>
                    <td className={tdBase}>Pas d'antigènes D</td>
                    <td className={tdBase}>Antigènes D</td>
                    <td className={tdBase}>Antigènes D</td>
                  </tr>
                  <tr>
                    <td className={tdBase}>Plasma</td>
                    <td className={tdBase}>Pas d'anticorps anti-D</td>
                    <td className={tdBase}>Anticorps anti-D (formés après la 1ʳᵉ grossesse)</td>
                    <td className={tdBase}>Pas d'anticorps anti-D</td>
                    <td className={tdBase}>Les anti-D maternels traversent le placenta et détruisent les érythrocytes fœtaux : maladie hémolytique du nouveau-né.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <TableCap n={5}>Synthèse de l'incompatibilité Rhésus au cours des grossesses successives.</TableCap>

            <H3 id={slug("6.4 Détermination du groupe ABO")}>6.4 Détermination du groupe ABO</H3>
            <p>Le groupage ABO repose sur <strong>deux épreuves</strong> qui doivent être concordantes :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Épreuve globulaire de Beth-Vincent :</strong> consiste à rechercher, par une
                technique d'agglutination, les antigènes présents sur les hématies. L'agglutination
                est franche, immédiate (moins d'une minute) et complète (tous les globules rouges
                sont agglutinés).
              </li>
              <li>
                <strong>Contre-épreuve (épreuve sérique) ou réaction de Simonin :</strong> confirme
                la technique précédente en révélant la présence d'anticorps dans le sérum,
                correspondant à l'antigène absent des globules rouges du sujet.
              </li>
            </ul>

            <p className="font-semibold mt-4">Détermination des groupes sanguins A, B, O et AB sur plaque d'opaline</p>
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr><th className={thBase} colSpan={4}>Beth-Vincent (recherche d'antigènes)</th></tr>
                  <tr>
                    <th className={thBase}>Sérum-test anti-A</th>
                    <th className={thBase}>Sérum-test anti-B</th>
                    <th className={thBase}>Sérum-test anti-AB</th>
                    <th className={thBase}>Résultat — groupe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={tdBase}>Agglutination</td><td className={tdBase}>—</td><td className={tdBase}>Agglutination</td><td className={tdBase}><strong>A</strong></td></tr>
                  <tr><td className={tdBase}>—</td><td className={tdBase}>Agglutination</td><td className={tdBase}>Agglutination</td><td className={tdBase}><strong>B</strong></td></tr>
                  <tr><td className={tdBase}>—</td><td className={tdBase}>—</td><td className={tdBase}>—</td><td className={tdBase}><strong>O</strong></td></tr>
                  <tr><td className={tdBase}>Agglutination</td><td className={tdBase}>Agglutination</td><td className={tdBase}>Agglutination</td><td className={tdBase}><strong>AB</strong></td></tr>
                </tbody>
              </table>
            </div>
            <TableCap n={6}>Épreuve de Beth-Vincent : détermination des antigènes portés par les hématies.</TableCap>

            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr><th className={thBase} colSpan={4}>Simonin (recherche d'anticorps)</th></tr>
                  <tr>
                    <th className={thBase}>Hématies-test A</th>
                    <th className={thBase}>Hématies-test B</th>
                    <th className={thBase}>Hématies-test O</th>
                    <th className={thBase}>Résultat — groupe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={tdBase}>—</td><td className={tdBase}>Agglutination</td><td className={tdBase}>—</td><td className={tdBase}><strong>A</strong></td></tr>
                  <tr><td className={tdBase}>Agglutination</td><td className={tdBase}>—</td><td className={tdBase}>—</td><td className={tdBase}><strong>B</strong></td></tr>
                  <tr><td className={tdBase}>Agglutination</td><td className={tdBase}>Agglutination</td><td className={tdBase}>—</td><td className={tdBase}><strong>O</strong></td></tr>
                  <tr><td className={tdBase}>—</td><td className={tdBase}>—</td><td className={tdBase}>—</td><td className={tdBase}><strong>AB</strong></td></tr>
                </tbody>
              </table>
            </div>
            <TableCap n={7}>Épreuve sérique de Simonin : détermination des anticorps présents dans le sérum.</TableCap>

            <H3 id={slug("6.5 La transfusion")}>6.5 La transfusion</H3>
            <p>
              La combinaison des systèmes ABO et RHD permet le classement en <strong>8 groupes
              sanguins</strong> : O+, O−, B+, B−, A+, A−, AB+ et AB−. Les deux systèmes sont donc
              associés.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Pour la transfusion de globules rouges, les individus de groupe <strong>O−</strong>{" "}
                peuvent faire un don à n'importe quel receveur car ils ne possèdent aucun des
                antigènes A, B et D. Ils sont appelés <strong>« donneurs universels »</strong>.
              </li>
              <li>
                À l'inverse, les individus de groupe <strong>AB+</strong> peuvent recevoir les
                globules de tous les groupes sanguins car ils ne produisent aucun des anticorps
                anti-A, anti-B et anti-D. Ils sont appelés <strong>« receveurs universels »</strong>.
              </li>
            </ul>

            <p className="font-semibold mt-4">Tableau de compatibilité transfusionnelle (globules rouges)</p>
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse text-center">
                <thead>
                  <tr>
                    <th className={thBase} rowSpan={2}>Receveur ↓ / Donneur →</th>
                    <th className={thBase} colSpan={8}>Donneurs</th>
                  </tr>
                  <tr>
                    {["O−","O+","B−","B+","A−","A+","AB−","AB+"].map((g) => (
                      <th key={g} className={thBase}>{g}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["AB+", [true,true,true,true,true,true,true,true]],
                    ["AB−", [true,false,true,false,true,false,true,false]],
                    ["A+",  [true,true,false,false,true,true,false,false]],
                    ["A−",  [true,false,false,false,true,false,false,false]],
                    ["B+",  [true,true,true,true,false,false,false,false]],
                    ["B−",  [true,false,true,false,false,false,false,false]],
                    ["O+",  [true,true,false,false,false,false,false,false]],
                    ["O−",  [true,false,false,false,false,false,false,false]],
                  ].map(([label, cells]) => (
                    <tr key={label as string}>
                      <th className={thBase + " text-center"}>{label as string}</th>
                      {(cells as boolean[]).map((ok, i) => (
                        <td key={i} className={tdBase + " text-center"}>
                          {ok ? <span className="text-rose-600 font-bold">●</span> : <span className="text-muted-foreground">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <TableCap n={8}>Compatibilité transfusionnelle des globules rouges selon les systèmes ABO et Rhésus D.</TableCap>
          </section>

          {/* 7. Les hémopathies */}
          <section>
            <H2 id={slug("7. Les hémopathies")}>7. Les hémopathies</H2>
            <p>
              Les hémopathies sont des pathologies qui affectent les cellules et les protéines
              sanguines. Elles peuvent être d'origine <strong>génétique</strong> ou, plus fréquemment,{" "}
              <strong>acquises</strong>.
            </p>
            <p>Les anomalies peuvent être :</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>quantitatives</strong> (défaut ou excès de production) ;</li>
              <li><strong>qualitatives</strong> ou fonctionnelles ;</li>
              <li>
                dues à une <strong>durée de vie raccourcie</strong> (destruction ou consommation
                rapide/excessive).
              </li>
            </ul>
            <p className="font-semibold mt-4">Deux grands types d'hémopathies :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Hémopathies bénignes</strong> — par exemple : troubles de l'hémostase,
                anémie carentielle, hémoglobinopathies.
              </li>
              <li>
                <strong>Hémopathies malignes</strong> — ensemble des proliférations tumorales des
                cellules (progéniteurs, précurseurs, cellules matures) d'une lignée à partir d'une
                cellule souche mutée : maladies clonales, par exemple lymphomes, myélomes, leucémies.
              </li>
            </ul>
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
