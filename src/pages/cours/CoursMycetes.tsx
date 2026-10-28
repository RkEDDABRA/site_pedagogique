import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Menu, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

import fig1 from "@/assets/cours-sf-s1/mycetes/fig1-levures.jpg";
import fig2 from "@/assets/cours-sf-s1/mycetes/fig2-paroi-levure.jpg";
import fig3 from "@/assets/cours-sf-s1/mycetes/fig3-hyphes.jpg";
import fig4 from "@/assets/cours-sf-s1/mycetes/fig4-interactions-fungi.png";
import { dimsFor } from "@/lib/imageDims";

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type TocEntry = { label: string; level: 1 | 2 };
const TOC_ENTRIES: TocEntry[] = [
  { label: "Introduction", level: 1 },
  { label: "1. Définition des mycètes", level: 1 },
  { label: "2. Morphologie et structure cellulaire", level: 1 },
  { label: "2.1 Levure", level: 2 },
  { label: "2.2 Moisissures", level: 2 },
  { label: "3. Reproduction", level: 1 },
  { label: "3.1 Reproduction asexuée", level: 2 },
  { label: "3.2 Reproduction sexuée", level: 2 },
  { label: "4. Classification", level: 1 },
  { label: "5. Mode de vie, pénétration, transmission", level: 1 },
  { label: "5.1 Mode de vie", level: 2 },
  { label: "5.2 Pénétration dans l'organisme", level: 2 },
  { label: "5.3 Transmission", level: 2 },
  { label: "6. Importance des mycètes", level: 1 },
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
      <img src={src} {...dimsFor(src)} alt={caption} className="w-full rounded-lg border border-border bg-white" loading="lazy" />
      <figcaption className="mt-2 text-sm italic text-muted-foreground text-center">
        <span className="font-semibold not-italic text-foreground">Fig.{n}</span> — {caption}
      </figcaption>
    </figure>
  );
}
function TableCap({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <p className="mt-2 mb-2 text-sm italic text-muted-foreground text-center">
      <span className="font-semibold not-italic text-foreground">Tab.{n}</span> — {children}
    </p>
  );
}

export default function CoursMycetes() {
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
            Licence · Option Sage-Femme · Semestre 1 · Microbiologie
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
            1.3 Mycètes — Introduction à la mycologie
          </h1>
          <p className="text-muted-foreground mt-3 max-w-3xl">
            Définition, morphologie, structure cellulaire, reproduction, classification, mode de vie,
            transmission et importance médicale des champignons.
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
          <section id={slug("Introduction")}>
            <H2 id={slug("Introduction")}>Introduction</H2>
            <p>
              La <strong>mycologie</strong> est l'étude des champignons. Les mycètes ou champignons
              constituent un groupe extrêmement vaste, composé de plus de <strong>100 000 espèces</strong>.
              Plus de 500 espèces ont été décrites comme susceptibles d'être pathogènes pour l'Homme,
              mais seule une cinquantaine d'espèces sont régulièrement isolées de prélèvements
              d'origine humaine.
            </p>
          </section>

          <section>
            <H2 id={slug("1. Définition des mycètes")}>1. Définition des mycètes</H2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Organismes <strong>eucaryotes</strong> dépourvus de chlorophylle, unicellulaires
                (levures) mais la plupart pluricellulaires (moisissures), hétérotrophes, aérobies,
                immobiles ;
              </li>
              <li>
                dont les cellules sont pourvues d'une paroi souvent constituée de <strong>chitine</strong>{" "}
                sans cellulose ;
              </li>
              <li>produisant des spores non flagellés ;</li>
              <li>capables de reproduction sexuée et asexuée.</li>
            </ul>
          </section>

          <section>
            <H2 id={slug("2. Morphologie et structure cellulaire")}>
              2. Morphologie et structure cellulaire des champignons microscopiques
            </H2>
            <p>
              L'organisation cellulaire des champignons est appelée le <strong>thalle</strong>. Chez
              les champignons microscopiques, le thalle peut être unicellulaire (levures) ou
              filamenteux (moisissures). Certaines levures sont toutefois capables de former des
              structures filamenteuses (<em>pseudomycélium</em>) dans certaines conditions.
            </p>

            <H3 id={slug("2.1 Levure")}>2.1 Levure</H3>
            <p>
              Les levures ont une taille généralement comprise entre <strong>10 et 50 µm</strong>.
              Leur forme peut être sphérique, ovoïde, allongée, cylindrique… Leur thalle est dit
              <em> lévuriforme</em>.
            </p>
            <Figure
              src={fig1}
              n={1}
              caption="Schémas de différentes levures : S. cerevisiae, C. tropicalis, C. mogii, Schizosaccharomyces, C. tropicalis, C. rugosa."
            />

            <h4 className="font-semibold text-foreground mt-6 mb-2">Paroi</h4>
            <p>
              La paroi, riche en <strong>ergostérol</strong>, est protégée par une paroi rigide et
              épaisse (<strong>150 à 230 nm</strong>) constituée principalement de{" "}
              <u>polysaccharides antigéniques</u> (80 %) — dont la <strong>chitine</strong>{" "}
              (polymère de N-acétyl glucosamine), la <strong>cellulose</strong> et parfois la{" "}
              <strong>mélanine</strong> — et de 10 à 20 % de <u>protéines</u>.
            </p>
            <Figure
              src={fig2}
              n={2}
              caption="Structure membranaire des levures : oligosaccharides, chitine, mannoprotéines, enzymes périplasmiques et glucane."
            />

            <h4 className="font-semibold text-foreground mt-6 mb-2">L'espace périplasmique</h4>
            <p>Contient de nombreuses enzymes (glucosidase…).</p>

            <h4 className="font-semibold text-foreground mt-6 mb-2">La membrane plasmique</h4>
            <p>
              Délimite le cytoplasme. Elle est constituée d'une double couche de phospholipides, de
              protéines (intrinsèques et périphériques), de glucides et de stérols (<strong>ergostérol</strong>).
              Elle joue un rôle essentiel dans les transports.
            </p>

            <h4 className="font-semibold text-foreground mt-6 mb-2">Le cytoplasme</h4>
            <p>
              Le cytoplasme, de pH égal à 5, contient de nombreuses enzymes, des réserves
              (glycogène) et des organites : réticulum endoplasmique (ER), appareil de Golgi (G),
              mitochondries (M), vacuoles (Va) et ribosomes.
            </p>

            <h4 className="font-semibold text-foreground mt-6 mb-2">Le noyau</h4>
            <p>
              Délimité par une enveloppe nucléaire, il contient plusieurs chromosomes qui sont le
              support de l'information génétique (ex. : <em>Saccharomyces cerevisiae</em>).
            </p>

            <H3 id={slug("2.2 Moisissures")}>2.2 Moisissures</H3>
            <p>
              Les moisissures sont pluricellulaires : les filaments, plus ou moins ramifiés, sont
              appelés <strong>hyphes</strong>. L'ensemble des hyphes constitue le{" "}
              <strong>mycélium</strong>. Chez les <em>Phycomycètes</em>, les cellules ne sont pas
              séparées par des cloisons transversales : le thalle est dit{" "}
              <u>cœnocytique</u> (ou « siphonné »). Chez les <em>Septomycètes</em>, le thalle est{" "}
              <u>cloisonné</u> (ou « septé ») ; des perforations assurent alors la communication
              entre les cellules.
            </p>
            <Figure
              src={fig3}
              n={3}
              caption="Hyphes : (a) cœnocytiques, (b) divisés en cellules par des septums, (c) coupe au microscope électronique (×40 000) de Drechslera sorokiniana, (d) septum multiperforé."
            />
          </section>

          <section>
            <H2 id={slug("3. Reproduction")}>3. Reproduction</H2>
            <p>
              Les champignons se multiplient et se disséminent sous forme de <strong>spore</strong>.
              On distingue la reproduction asexuée et la reproduction sexuée.
            </p>

            <H3 id={slug("3.1 Reproduction asexuée")}>3.1 Reproduction asexuée</H3>
            <p>
              La multiplication asexuée (par opposition à la reproduction sexuée) correspond à la
              capacité des organismes vivants de se multiplier seuls (sans partenaire),
              c'est-à-dire sans faire intervenir la fusion de deux gamètes de sexes opposés.
            </p>

            <H3 id={slug("3.2 Reproduction sexuée")}>3.2 Reproduction sexuée</H3>
            <p>
              Elle résulte de la fusion de deux cellules haploïdes (à n chromosomes) pour former une
              cellule diploïde (à 2n chromosomes) pouvant se multiplier par reproduction asexuée ou
              subir une nouvelle méiose. Les cellules haploïdes issues de la méiose sont appelées{" "}
              <strong>spores sexuées</strong>.
            </p>
          </section>

          <section>
            <H2 id={slug("4. Classification")}>4. Classification</H2>
            <p>
              Les champignons ont longtemps fait partie du règne des plantes. Ils sont actuellement
              classés dans un règne (phylum) propre : <strong>Fungus</strong>.
            </p>
            <p>
              Parmi les nombreuses classifications existantes (taille — macro ou micromycètes —,
              critères morphologiques tels que le genre et l'espèce), le classement des mycologies
              médicales en trois groupes distincts reste le plus simple et le plus adopté.
            </p>

            <TableCap n={1}>Classification des champignons d'intérêt médical.</TableCap>
            <div className="overflow-x-auto border border-border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-primary/10 text-foreground">
                  <tr>
                    <th className="text-left px-4 py-2 border-b border-border">Groupe</th>
                    <th className="text-left px-4 py-2 border-b border-border">Principaux représentants</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border align-top">
                    <td className="px-4 py-2 font-semibold">1) Champignons filamenteux (moisissures)</td>
                    <td className="px-4 py-2">Aspergillose ; Aspergillose broncho-pulmonaire ; <em>Fusarium</em> ; <em>Scopulariopsis</em></td>
                  </tr>
                  <tr className="border-b border-border align-top">
                    <td className="px-4 py-2 font-semibold">2) Champignons levuriformes (levures)</td>
                    <td className="px-4 py-2">Candidose ; <em>Cryptococcus</em> ; <em>Saccharomyces</em> ; Pityriasis / <em>Malassezia</em></td>
                  </tr>
                  <tr className="border-b border-border align-top">
                    <td className="px-4 py-2 font-semibold">3) Champignons dimorphiques</td>
                    <td className="px-4 py-2"><em>Histoplasma</em></td>
                  </tr>
                  <tr className="align-top">
                    <td className="px-4 py-2 font-semibold">4) Champignons divers</td>
                    <td className="px-4 py-2"><em>Pneumocystis</em></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <H2 id={slug("5. Mode de vie, pénétration, transmission")}>
              5. Mode de vie, pénétration dans l'organisme, transmission
            </H2>

            <H3 id={slug("5.1 Mode de vie")}>5.1 Mode de vie</H3>
            <p>
              Il existe trois principaux modes de vie : les <u>saprophytes</u>, les{" "}
              <u>symbiontes</u> et les <u>parasites</u>.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Les moisissures sont les premières formes de vie de mycètes apparues. Les mycètes
                ont une croissance rapide et se multiplient souvent de façon asexuée (surtout chez
                les saprophytes et les parasites).
              </li>
              <li>Les levures : elles se trouvent dans les milieux aquatiques.</li>
              <li>
                Les <strong>lichens</strong> sont des symbioses à bénéfices réciproques entre un
                mycète et une algue.
              </li>
              <li>
                Les <strong>mycorhizes</strong> : associations de racines de cormophytes et de
                mycélium.
              </li>
            </ul>
            <p>
              C'est le passage de la forme saprophyte à la forme parasite (<strong>opportunisme</strong>)
              qui génère la pathogénicité d'un champignon.
            </p>
            <p>
              Les champignons établissent avec les espèces animales ou végétales des interactions
              qui vont du saprophytisme au parasitisme, en passant parfois par le commensalisme ou
              le symbiotisme.
            </p>
            <Figure
              src={fig4}
              n={4}
              caption="Diagramme des interactions des Fungi. Exemple du lichen (champignon + algue ou cyanobactérie) : l'algue fournit l'énergie par photosynthèse et assure au champignon les besoins en carbone ; le champignon, grâce à son thalle, assure une protection physique."
            />

            <H3 id={slug("5.2 Pénétration dans l'organisme")}>5.2 Pénétration dans l'organisme</H3>
            <p>Trois voies principales :</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Voie <strong>cutanée</strong> pour les dermatophytes (teigne) ;</li>
              <li>Voie des <strong>muqueuses</strong> pour les candidoses ;</li>
              <li>Voie <strong>pulmonaire</strong> pour les aspergilloses.</li>
            </ul>

            <H3 id={slug("5.3 Transmission")}>5.3 Transmission</H3>
            <p>
              Elle se fait surtout par l'intermédiaire des spores libres dans l'environnement, par :
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>L'air (inhalation) ;</li>
              <li>Le sol (contact) ;</li>
              <li>L'eau (piscines, alimentaire) ;</li>
              <li>Les animaux (surtout par contact) ;</li>
              <li>Les végétaux (alimentaire, piqûres) ;</li>
              <li>L'homme (contact).</li>
            </ul>
            <p>
              Après pénétration dans l'organisme, un champignon peut rester quiescent chez le
              porteur ; on parle alors de :
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Partage ;</li>
              <li>Commensalisme ;</li>
              <li>Colonisation.</li>
            </ul>
          </section>

          <section>
            <H2 id={slug("6. Importance des mycètes")}>6. Importance des mycètes</H2>
            <p>
              Les mycètes sont importants tant par leurs effets bénéfiques que nuisibles. Ce sont
              des agents de décomposition majeurs, qui dégradent les matières organiques complexes
              en substances simples. Les mycètes sont la cause principale des maladies des végétaux
              (oïdium, rouille, ergot…).
            </p>
            <p>Les champignons interviennent dans la pathologie humaine de deux façons :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                des <strong>intoxications alimentaires</strong> liées à certains champignons
                toxiques, essentiellement les Amanites, mais également les <em>Aspergillus</em>{" "}
                capables de produire des aflatoxines cancérigènes ;
              </li>
              <li>
                des infections appelées <strong>mycoses</strong>. La plupart sont opportunistes.
                Les mycoses peuvent être superficielles et locales (ex. : teignes), ou au contraire
                systémiques (ex. : cryptococcoses).
              </li>
            </ul>
            <p>Les mycètes ont également de très nombreuses applications positives :</p>

            <h4 className="font-semibold text-foreground mt-4 mb-2 underline">
              Dans la fabrication des médicaments
            </h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Le premier antibiotique, la <strong>pénicilline</strong>, est le fruit d'un
                champignon <em>Penicillium notatum</em> (industriellement :{" "}
                <em>Penicillium chrysogenum</em> pour le noyau bêtalactamine,{" "}
                <em>Cephalosporum</em> pour les céphalosporines…).
              </li>
              <li>
                Ajoutons la <strong>cyclosporine</strong>, très important immunosuppresseur utilisé
                pour les greffes.
              </li>
              <li>
                De nombreuses protéines issues du génie génétique sont aujourd'hui fabriquées par
                des levures. C'est le cas du vaccin contre l'<strong>hépatite B</strong>.
              </li>
            </ul>

            <h4 className="font-semibold text-foreground mt-4 mb-2 underline">Autres applications</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Dans la fabrication du pain (pâtes), du vin, de la bière ;</li>
              <li>Dans la fabrication des additifs ;</li>
              <li>En fromagerie.</li>
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
