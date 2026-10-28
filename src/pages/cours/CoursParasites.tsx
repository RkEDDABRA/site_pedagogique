import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Menu, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

import fig1 from "@/assets/cours-sf-s1/parasites/fig1-localisations-new.png";
import fig2 from "@/assets/cours-sf-s1/parasites/fig2-cycle-direct.jpg";
import fig3 from "@/assets/cours-sf-s1/parasites/fig3-cycle-trichuris.jpg";
import fig4 from "@/assets/cours-sf-s1/parasites/fig4-cycle-indirect.jpg";
import fig5 from "@/assets/cours-sf-s1/parasites/fig5-cycle-schistosomose.jpg";
import { dimsFor } from "@/lib/imageDims";

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type TocEntry = { label: string; level: 1 | 2 };
const TOC_ENTRIES: TocEntry[] = [
  { label: "Introduction", level: 1 },
  { label: "1. Définitions", level: 1 },
  { label: "2. Relations hôte-parasite", level: 1 },
  { label: "3. Caractères, formes parasitaires et mode de contamination", level: 1 },
  { label: "3.1 Caractères fondamentaux du parasitisme", level: 2 },
  { label: "3.2 Formes de parasites", level: 2 },
  { label: "3.3 Voies de contamination", level: 2 },
  { label: "4. Différents types d'action des parasites", level: 1 },
  { label: "5. Cycle parasitaire / Cycle évolutif", level: 1 },
  { label: "5.1 Définitions", level: 2 },
  { label: "5.2 Cycle direct", level: 2 },
  { label: "5.3 Cycle indirect", level: 2 },
  { label: "6. Diagnostic des parasitoses", level: 1 },
  { label: "6.1 Diagnostic direct", level: 2 },
  { label: "6.2 Diagnostic indirect", level: 2 },
  { label: "7. Principales parasitoses humaines", level: 1 },
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

export default function CoursParasites() {
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
            1.4 Parasites — Parasitologie
          </h1>
          <p className="text-muted-foreground mt-3 max-w-3xl">
            Définitions, relations hôte-parasite, formes parasitaires, voies de contamination, cycles évolutifs, diagnostic et principales parasitoses humaines.
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

        <article className="min-w-0 prose-content leading-relaxed text-foreground/90 space-y-4">
          <H2 id={slug("Introduction")}>Introduction</H2>
          <p>
            La parasitologie est l'étude des parasites, de leurs hôtes et de leurs interactions mutuelles.
            La parasitologie en médecine humaine étudie les maladies de l'homme provoquées directement
            ou indirectement par les parasites (parasitoses).
          </p>
          <p>
            Les problèmes médicaux liés aux parasitoses concernent en réalité 6 à 8/10<sup>èmes</sup> de l'humanité.
            La moitié de la population mondiale est exposée au risque palustre (paludisme) ; environ 2 millions
            en meurent chaque année : un enfant en meurt toutes les 30 secondes, généralement des jeunes africains.
          </p>

          <H2 id={slug("1. Définitions")}>1. Définitions</H2>
          <p>
            <strong>Parasites :</strong> être vivant (animal ou champignon) qui, de façon permanente ou temporaire,
            <strong> doit obligatoirement</strong> se nourrir aux dépens d'un autre organisme vivant, qui est son hôte,
            et <strong>sans que sa présence entraîne la destruction</strong> de cet hôte.
          </p>
          <p className="pl-4 border-l-2 border-primary/40 text-muted-foreground">
            Le parasite vit en équilibre avec l'hôte : il a besoin de l'hôte pour survivre, donc il a peu d'intérêt
            à entraîner des signes cliniques graves chez lui.
          </p>
          <p><strong>Hôte :</strong> organisme vivant qui héberge un agent pathogène.</p>

          <H2 id={slug("2. Relations hôte-parasite")}>2. Relations hôte-parasite</H2>
          <p>
            Les relations entre hôte et parasite qui définissent les modalités d'un parasitisme sont souvent très complexes
            et font intervenir des mécanismes adaptés à prolonger la survie du parasite au sein de son hôte, aussi bien
            que des mécanismes déclenchés chez l'hôte tendant à limiter ou arrêter le développement du parasite. On distingue :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Parasites permanents :</strong> quelle que soit la forme parasitaire, elle est retrouvée chez l'homme. <em>Ex.</em> : œufs, larves, vers du <em>Taenia</em> retrouvés chez l'homme.</li>
            <li><strong>Parasites temporaires :</strong> pour assurer la continuité du cycle, les larves évoluent dans le milieu extérieur pour devenir contaminantes. Elles peuvent y rencontrer un deuxième hôte, autre que l'homme.</li>
            <li><strong>Parasites facultatifs :</strong> mènent normalement une vie saprophyte mais peuvent à l'occasion envahir l'organisme de l'hôte.</li>
          </ul>

          <H2 id={slug("3. Caractères, formes parasitaires et mode de contamination")}>
            3. Caractères, formes parasitaires et mode de contamination
          </H2>

          <H3 id={slug("3.1 Caractères fondamentaux du parasitisme")}>3.1 Caractères fondamentaux du parasitisme</H3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Association</li>
            <li>Hétérospécifique (2 espèces différentes)</li>
            <li><u>Obligatoire</u></li>
            <li>L'hôte sert de milieu au parasite</li>
            <li>La <u>dépendance</u> spatiale et énergétique du parasite vis-à-vis de l'hôte est totale ou partielle</li>
            <li>Équilibre parfois délicat entre le parasitisme « sans dégâts » et la pathologie</li>
          </ul>

          <H3 id={slug("3.2 Formes de parasites")}>3.2 Formes de parasites</H3>
          <p>
            Le parasite est dit <strong>obligatoire</strong> : il a besoin de l'homme pour assurer sa survie.
            Chez l'homme, on retrouve 3 formes de parasites :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Ectoparasites :</strong> parasites vivant à la surface (poux, puces, punaises…) ou dans l'épiderme de l'hôte.</li>
            <li><strong>Endoparasites :</strong> parasites vivant dans les cavités profondes du corps (tube digestif, vaisseaux), les tissus ou les cellules : les protozoaires et les helminthes.</li>
            <li><strong>Micromycètes (ou fungi) :</strong> champignons microscopiques ; ce ne sont pas tous des parasites.</li>
          </ul>
          <Figure src={fig1} n={1} caption="Localisations des endoparasites, ectoparasites et mésoparasites dans un organisme hôte." />

          <h4 className="font-semibold text-lg mt-4">3.2.1 Les protozoaires</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Rhizoflagellés :</strong>
              <ul className="list-[circle] pl-6 mt-2 space-y-1">
                <li><strong>Amibes :</strong> la forme végétative est dotée de pseudopodes qui lui permettent de bouger. La forme kystique n'en a pas puisqu'elle ne bouge pas (forme de résistance). <em>Ex.</em> : <em>Entamoeba histolytica</em>.</li>
                <li><strong>Flagellés :</strong> la forme végétative est mobile grâce à un flagelle. <em>Ex.</em> : <em>Giardia intestinalis</em>.</li>
                <li><strong>Ciliés :</strong> la forme végétative est mobile grâce à des cils. <em>Ex.</em> : <em>Balantidium coli</em>.</li>
              </ul>
            </li>
            <li><strong>Sporozoaires :</strong> ils ne sont pas mobiles. <em>Ex.</em> : <em>Toxoplasma gondii</em>, <em>Plasmodium sp.</em>, <em>Cryptosporidium sp.</em></li>
          </ul>

          <TableCap n={1}>Classification des endoparasites.</TableCap>
          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-primary/10">
                <tr>
                  <th className="text-left p-3 border-b border-border">Protozoaires</th>
                  <th className="text-left p-3 border-b border-border">Helminthes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-3 align-top">Unicellulaires</td>
                  <td className="p-3 align-top">Pluricellulaires</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 align-top">Eucaryote, microscopique</td>
                  <td className="p-3 align-top">Eucaryote, souvent macroscopique</td>
                </tr>
                <tr>
                  <td className="p-3 align-top">
                    Multiplication asexuée :
                    <ul className="list-disc pl-5 mt-1">
                      <li>forme végétative → mobile</li>
                      <li>kyste → forme de résistance immobile</li>
                      <li>= Rhizoflagellés et ciliés : mobiles, intra- ou extracellulaires</li>
                    </ul>
                    Multiplications asexuée et sexuée :
                    <ul className="list-disc pl-5 mt-1">
                      <li>divers stades parasitaires dont l'oocyste (l'œuf encapsulé)</li>
                      <li>= Sporozoaires : immobiles et toujours intracellulaires</li>
                    </ul>
                  </td>
                  <td className="p-3 align-top">
                    Multiplication sexuée : vers adultes mâles et femelles ; œufs ; larves.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold text-lg mt-6">3.2.2 Helminthes = Métazoaires</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Némathelminthes</strong> (= vers ronds) : <em>Ex.</em> <em>Ascaris lumbricoides</em>.</li>
            <li>
              <strong>Plathelminthes</strong> (= vers plats) :
              <ul className="list-[circle] pl-6 mt-1 space-y-1">
                <li><strong>Trématodes</strong> (vers plats non segmentés) : <em>Ex.</em> <em>Fasciola hepatica</em>.</li>
                <li><strong>Cestodes</strong> (vers plats segmentés) : <em>Ex.</em> <em>Taenia sp.</em> (ver solitaire).</li>
              </ul>
            </li>
          </ul>

          <H3 id={slug("3.3 Voies de contamination")}>3.3 Voies de contamination</H3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Voie digestive :</strong> la forme infestante est absorbée par voie orale. <em>Ex.</em> : <em>Ascaris</em> et nombreux autres.</li>
            <li><strong>Voie cutanée ou muqueuse (contact direct) :</strong> <em>Ex.</em> : gale, poux.</li>
            <li>
              <strong>Voie transcutanée :</strong>
              <ul className="list-[circle] pl-6 mt-1 space-y-1">
                <li><strong>Active :</strong> sans vecteur. <em>Ex.</em> : <em>Schistosoma</em>.</li>
                <li><strong>Passive :</strong> avec vecteur, par l'intermédiaire d'un insecte. <em>Ex.</em> : <em>Plasmodium</em>.</li>
              </ul>
            </li>
          </ul>
          <p className="mt-2"><u>Autres voies :</u></p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Par transfusion sanguine (paludisme)</li>
            <li>Par voie transplacentaire (toxoplasmose : risques pour le fœtus surtout au premier trimestre)</li>
            <li>Par inhalation</li>
            <li>Par don d'organe (transfert de kystes, toxoplasmose)</li>
          </ul>

          <H2 id={slug("4. Différents types d'action des parasites")}>4. Différents types d'action des parasites</H2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Action spoliatrice :</strong> le parasite vivant aux dépens de son hôte est spoliateur par définition.</li>
            <li><strong>Action traumatique bactérifère :</strong> tout parasite perforant une muqueuse ou le revêtement cutané peut constituer une porte d'entrée microbienne.</li>
            <li><strong>Action toxique :</strong> due à l'émission de sécrétions toxiques d'arthropodes (vecteurs) dans les plaies de piqûre ou de produits métabolisés par le parasite, avec actions allergisantes.</li>
            <li><strong>Action mécanique/traumatique :</strong> éclatement des globules blancs pour les leishmanies, des globules rouges dans le cas de l'hématozoaire, des cellules rétiniennes par le toxoplasme.</li>
            <li><strong>Action infectieuse :</strong> coexistence entre un parasite et un microbe, parfois mise à juste titre en évidence dans le couple bilharzies-salmonelles.</li>
            <li><strong>Action immunodépressive.</strong></li>
          </ul>

          <H2 id={slug("5. Cycle parasitaire / Cycle évolutif")}>5. Cycle parasitaire / Cycle évolutif</H2>
          <H3 id={slug("5.1 Définitions")}>5.1 Définitions</H3>
          <p><strong>Cycle parasitaire :</strong> ensemble des transformations que doit subir un parasite pour passer d'une génération à l'autre (pour assurer la pérennité de son espèce).</p>
          <p><strong>Hôte définitif (HD) :</strong> hôte qui héberge la forme adulte du parasite ou la forme sexuée.</p>
          <p><strong>Hôte intermédiaire (HI) :</strong> hôte qui héberge la forme larvaire du parasite ou la forme non sexuée et qui assure la prolifération (l'homme peut être hôte intermédiaire).</p>
          <p><strong>Vecteurs :</strong> agents transmetteurs des parasites. La transmission de la maladie est active : inoculation/piqûre après déplacement pouvant être d'une distance élevée. Le vecteur est aussi un hôte intermédiaire, mais qui assure une dissémination plus importante de la maladie.</p>

          <p className="font-semibold mt-4">Remarques :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Au cours de son cycle, le parasite va passer par plusieurs stades de transformation obligatoires :
              <ul className="list-[circle] pl-6 mt-1">
                <li>Vers : œufs → larves (très diverses) → adultes</li>
                <li>Kyste et forme végétative (protozoaires)</li>
              </ul>
            </li>
            <li>
              L'homme est un <u>hôte définitif</u> lorsque <u>la forme adulte y est responsable des signes cliniques</u>.
              Au contraire, <u>c'est un hôte intermédiaire</u> lorsque <u>c'est la forme larvaire qui est responsable des signes cliniques</u>.
            </li>
          </ul>
          <p>
            <em>Exemple :</em> dans l'hydatidose (ou échinococcose, due à <em>Echinococcus granulosus</em>), le ver adulte est
            retrouvé dans le tube digestif du chien (HD), mais chez l'homme, c'est la larve qui est responsable de la maladie :
            le kyste hydatique (pulmonaire ou hépatique) est une réaction inflammatoire autour de la larve.
          </p>
          <p>
            L'homme constitue dans le cycle une <strong>impasse parasitaire</strong> ; il ne représente donc qu'un hôte
            intermédiaire accidentel. La transmission à l'homme se fait au contact du chien infesté, en recueillant des œufs sur son pelage.
          </p>
          <p>
            La transmission ne se fait pas de l'homme à l'animal ; elle nécessite d'autres hôtes intermédiaires, en particulier
            les ovins, bovins, porcins et équins : le mouton est infecté en mangeant de l'herbe contaminée par des selles de chien,
            puis le passage du mouton au chien se fait lorsque ce dernier mange des viscères de moutons.
          </p>

          <H3 id={slug("5.2 Cycle direct")}>5.2 Cycle direct</H3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Un seul hôte (qui est donc un hôte définitif)</li>
            <li>Passage direct d'un hôte parasité à l'hôte sain</li>
          </ul>
          <Figure src={fig2} n={2} caption="Cycle direct." />
          <p><strong>Exemple : cycle de <em>Trichuris trichiura</em></strong></p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Contamination : ingestion d'œufs.</li>
            <li>Éclosion → larves.</li>
            <li>Trajet extra-intestinal des larves (larves → vers adultes).</li>
            <li>Œufs infestants après plusieurs semaines dans le milieu extérieur → pas d'auto-infestation.</li>
            <li>Le délai de maturation des œufs est très long : au début, même en contact avec les œufs, il ne se passe rien.</li>
          </ul>
          <Figure src={fig3} n={3} caption="Cycle parasitaire chez l'hôte humain (délais 1 mois à 1 an ; 1 mois)." />

          <H3 id={slug("5.3 Cycle indirect")}>5.3 Cycle indirect</H3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nécessité d'hôtes intermédiaires ou de vecteurs.</li>
          </ul>
          <p>
            Comme dans le cycle direct, il y a absorption de la forme contaminante, croissance de l'adulte dans le corps puis
            relargage des œufs dans les selles vers le milieu extérieur (ME).
          </p>
          <p>
            L'hôte intermédiaire (HI) est alors indispensable : il permet le développement des larves qui, une fois dans le milieu
            extérieur, permettent l'ingestion par un hôte définitif (HD) et donc la continuité du cycle parasitaire.
          </p>
          <Figure src={fig4} n={4} caption="Cycle indirect, contamination buccale (ingestion, selles, HD, ME, HI)." />

          <p><strong>Exemples : Schistosomoses ou Bilharzioses</strong></p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Hôte définitif : l'homme (forme adulte du parasite).</li>
            <li>Hôte intermédiaire : les mollusques (formes larvaires).</li>
          </ul>
          <Figure src={fig5} n={5} caption="Cycle de vie des schistosomoses : reproduction chez l'homme, œufs émis dans le milieu aquatique, infestation des mollusques par les miracidia, pénétration transcutanée des cercaires." />

          <H2 id={slug("6. Diagnostic des parasitoses")}>6. Diagnostic des parasitoses</H2>
          <H3 id={slug("6.1 Diagnostic direct")}>6.1 Diagnostic direct</H3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Mise en évidence du parasite, quelle que soit sa forme : œuf, larve, adulte, forme asexuée…</li>
            <li>Examen parasitaire des selles, frottis sanguin…</li>
          </ul>
          <H3 id={slug("6.2 Diagnostic indirect")}>6.2 Diagnostic indirect</H3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Réservé à certaines phases du cycle parasitaire ou à des parasites non accessibles aux prélèvements chez l'homme.</li>
            <li>Mise en évidence des réactions de l'hôte : anticorps = sérologie.</li>
          </ul>

          <H2 id={slug("7. Principales parasitoses humaines")}>7. Principales parasitoses humaines</H2>

          <h4 className="font-semibold text-lg mt-4">Protozoaires</h4>
          <TableCap n={2}>Principales parasitoses à protozoaires.</TableCap>
          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-primary/10">
                <tr>
                  <th className="text-left p-3 border-b border-border">Parasitoses</th>
                  <th className="text-left p-3 border-b border-border">Agent pathogène</th>
                  <th className="text-left p-3 border-b border-border">Hôte</th>
                  <th className="text-left p-3 border-b border-border">Vecteur</th>
                  <th className="text-left p-3 border-b border-border">Expositions à risque</th>
                  <th className="text-left p-3 border-b border-border">Signes cliniques</th>
                  <th className="text-left p-3 border-b border-border">Diagnostic</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border align-top">
                  <td className="p-3">Amibiase (rhizopodes intestinaux)</td>
                  <td className="p-3"><em>Entamoeba histolytica</em></td>
                  <td className="p-3">Côlon de l'homme</td>
                  <td className="p-3">—</td>
                  <td className="p-3">Eau et aliments contaminés par des déjections humaines</td>
                  <td className="p-3">Diarrhée afécale (10 à 15 selles/jour), douleurs abdominales, absence de fièvre en général</td>
                  <td className="p-3">Examen des selles (kystes) ; endoscopie du côlon (complément)</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="p-3">Giardiose (flagellés intestinaux)</td>
                  <td className="p-3"><em>Giardia intestinalis</em></td>
                  <td className="p-3">Intestin (duodénum) de l'homme et d'autres mammifères</td>
                  <td className="p-3">—</td>
                  <td className="p-3">Eau et aliments contaminés</td>
                  <td className="p-3">Diarrhée modérée, douleurs épigastriques, ballonnements postprandiaux, nausées, anorexie</td>
                  <td className="p-3">Examen des selles (kystes) ; recherche d'antigènes spécifiques dans les selles</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="p-3">Trichomonose uro-génitale</td>
                  <td className="p-3"><em>Trichomonas vaginalis</em></td>
                  <td className="p-3">Voies uro-génitales de l'homme et de la femme</td>
                  <td className="p-3">—</td>
                  <td className="p-3">Transmission sexuelle (IST)</td>
                  <td className="p-3">Femme : leucorrhées mousseuses malodorantes, prurit vulvaire, dyspareunie. Homme : urétrite souvent asymptomatique</td>
                  <td className="p-3">Examen direct à l'état frais des sécrétions vaginales/urétrales ; PCR</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="p-3">Cryptosporidiose</td>
                  <td className="p-3"><em>Cryptosporidium parvum / hominis</em></td>
                  <td className="p-3">Épithélium intestinal (homme, bovins)</td>
                  <td className="p-3">—</td>
                  <td className="p-3">Eau de boisson ou de baignade contaminée ; contact avec animaux</td>
                  <td className="p-3">Diarrhée aqueuse profuse, douleurs abdominales, fièvre modérée ; forme chronique grave chez l'immunodéprimé</td>
                  <td className="p-3">Recherche d'oocystes dans les selles (coloration de Ziehl-Neelsen modifiée) ; antigènes ; PCR</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="p-3">Toxoplasmose</td>
                  <td className="p-3"><em>Toxoplasma gondii</em></td>
                  <td className="p-3">HD : chat ; HI : homme et mammifères</td>
                  <td className="p-3">—</td>
                  <td className="p-3">Ingestion de viande peu cuite, crudités souillées, contact avec litière de chat ; transmission materno-fœtale</td>
                  <td className="p-3">Souvent asymptomatique ; fièvre, adénopathies. Formes graves : toxoplasmose congénitale, cérébrale chez l'immunodéprimé</td>
                  <td className="p-3">Sérologie (IgG, IgM) ; PCR (liquide amniotique, LCR)</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="p-3">Paludisme (malaria)</td>
                  <td className="p-3"><em>Plasmodium falciparum, vivax, ovale, malariae, knowlesi</em></td>
                  <td className="p-3">HD : moustique ; HI : homme (foie, hématies)</td>
                  <td className="p-3">Moustique <em>Anopheles</em> femelle</td>
                  <td className="p-3">Séjour en zone d'endémie (Afrique, Asie, Amérique du Sud)</td>
                  <td className="p-3">Fièvre en accès, frissons, sueurs, céphalées, splénomégalie ; forme grave : neuropaludisme (P. falciparum)</td>
                  <td className="p-3">Frottis sanguin et goutte épaisse ; tests de diagnostic rapide (TDR) ; PCR</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="p-3">Leishmanioses (cutanée, viscérale)</td>
                  <td className="p-3"><em>Leishmania</em> spp.</td>
                  <td className="p-3">HD : phlébotome ; HI : homme, chien, rongeurs</td>
                  <td className="p-3">Phlébotome (<em>Phlebotomus</em>)</td>
                  <td className="p-3">Zones rurales endémiques (Maghreb, Moyen-Orient, Amérique latine)</td>
                  <td className="p-3">Forme cutanée : ulcère indolore (bouton d'Orient). Forme viscérale (kala-azar) : fièvre irrégulière, hépatosplénomégalie, pancytopénie</td>
                  <td className="p-3">Examen direct (frottis lésion, moelle) ; culture ; PCR ; sérologie (forme viscérale)</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="p-3">Trypanosomose africaine (maladie du sommeil)</td>
                  <td className="p-3"><em>Trypanosoma brucei gambiense / rhodesiense</em></td>
                  <td className="p-3">HD : glossine ; HI : homme, bétail</td>
                  <td className="p-3">Mouche tsé-tsé (<em>Glossina</em>)</td>
                  <td className="p-3">Séjour en Afrique subsaharienne</td>
                  <td className="p-3">Phase lymphatico-sanguine : fièvre, adénopathies. Phase méningo-encéphalitique : troubles du sommeil, du comportement, coma</td>
                  <td className="p-3">Examen sanguin, ponction ganglionnaire, LCR ; sérologie (CATT)</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="p-3">Trypanosomose américaine (maladie de Chagas)</td>
                  <td className="p-3"><em>Trypanosoma cruzi</em></td>
                  <td className="p-3">HD : réduve ; HI : homme, mammifères</td>
                  <td className="p-3">Réduve (punaise hématophage)</td>
                  <td className="p-3">Amérique latine ; transfusion, transmission congénitale</td>
                  <td className="p-3">Phase aiguë : chagome, signe de Romaña, fièvre. Phase chronique : cardiomyopathie, méga-œsophage, mégacôlon</td>
                  <td className="p-3">Examen sanguin direct (phase aiguë) ; sérologie (phase chronique) ; PCR</td>
                </tr>
                <tr className="align-top">
                  <td className="p-3">Pneumocystose</td>
                  <td className="p-3"><em>Pneumocystis jirovecii</em></td>
                  <td className="p-3">Poumons de l'homme</td>
                  <td className="p-3">—</td>
                  <td className="p-3">Immunodépression (VIH, chimiothérapie, greffe)</td>
                  <td className="p-3">Pneumopathie interstitielle : toux sèche, dyspnée, fièvre, hypoxémie</td>
                  <td className="p-3">Recherche du germe dans le LBA (colorations, immunofluorescence, PCR)</td>
                </tr>

              </tbody>
            </table>
          </div>

          <h4 className="font-semibold text-lg mt-8">Helminthes</h4>
          <TableCap n={3}>Principales parasitoses à helminthes.</TableCap>
          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-primary/10">
                <tr>
                  <th className="text-left p-3 border-b border-border">Parasitoses</th>
                  <th className="text-left p-3 border-b border-border">Agent pathogène</th>
                  <th className="text-left p-3 border-b border-border">Hôte</th>
                  <th className="text-left p-3 border-b border-border">Expositions à risque</th>
                  <th className="text-left p-3 border-b border-border">Signes cliniques</th>
                  <th className="text-left p-3 border-b border-border">Diagnostic</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border align-top">
                  <td className="p-3">Hydatidose (cestodes)</td>
                  <td className="p-3"><em>Echinococcus granulosus</em></td>
                  <td className="p-3">HD : canidés (chien) ; HI : mammifères herbivores et omnivores ; homme : impasse parasitaire (accidentelle)</td>
                  <td className="p-3">Contact avec des chiens infestés ou ingestion d'aliments souillés</td>
                  <td className="p-3">Symptômes dépendant de la localisation et de l'évolution (compression, fissuration, rupture, surinfection) de cette « tumeur » parasitaire liquidienne</td>
                  <td className="p-3">Imagerie (échographie, scanner, IRM) ; NFS ; diagnostic parasitologique direct ; diagnostic immunologique</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="p-3">Tænias (cestodes)</td>
                  <td className="p-3"><em>Taenia saginata</em>, <em>T. solium</em></td>
                  <td className="p-3">HD : homme (surtout enfant) ; HI : bœuf, porc</td>
                  <td className="p-3">Ingestion de viandes de bœuf ou de porc mal cuites</td>
                  <td className="p-3">Troubles de l'appétit (boulimie ou anorexie), vagues douleurs abdominales, nausées, troubles du transit</td>
                  <td className="p-3">Examen des selles</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="p-3">Bilharziose (trématodes)</td>
                  <td className="p-3"><em>Schistosoma mansoni</em></td>
                  <td className="p-3">HD : mammifère ; HI : mollusque d'eau douce</td>
                  <td className="p-3">Bains en eaux douces</td>
                  <td className="p-3">Diarrhée, hépato-splénomégalie</td>
                  <td className="p-3">Examen des selles</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="p-3">Ankylostomose (vers ronds intestinaux)</td>
                  <td className="p-3"><em>Ancylostoma duodenale</em>, <em>Necator americanus</em></td>
                  <td className="p-3">Homme</td>
                  <td className="p-3">Passages transcutanés de larves (régions tropicales)</td>
                  <td className="p-3">Adulte : anémie ferriprive microcytique, anémie hypochromique</td>
                  <td className="p-3">Méthodes de concentration et frottis fécal direct</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="p-3">Ascaridiose (vers ronds intestinaux)</td>
                  <td className="p-3"><em>Ascaris lumbricoides</em></td>
                  <td className="p-3">Homme</td>
                  <td className="p-3">Crudités, eau, terre souillées</td>
                  <td className="p-3">Syndrome de Löffler, signes digestifs</td>
                  <td className="p-3">Examen des selles</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="p-3">Anguillulose (vers ronds intestinaux)</td>
                  <td className="p-3"><em>Strongyloides stercoralis</em></td>
                  <td className="p-3">Homme</td>
                  <td className="p-3">Passages transcutanés de larves (régions tropicales)</td>
                  <td className="p-3">Souvent asymptomatique ; à la phase d'état : douleurs épigastriques, épisodes diarrhéiques ; signes cutanés allergiques inconstants traduisant la migration sous-cutanée des larves</td>
                  <td className="p-3">Découverte de larves dans les selles fraîchement émises</td>
                </tr>
                <tr className="align-top">
                  <td className="p-3">Oxyurose (vers ronds intestinaux)</td>
                  <td className="p-3"><em>Enterobius vermicularis</em></td>
                  <td className="p-3">Homme</td>
                  <td className="p-3">Ingestion d'œufs : auto-infestation, transmission intrafamiliale</td>
                  <td className="p-3">Eczéma périanal, troubles du sommeil, appendicite</td>
                  <td className="p-3">Scotch-test</td>
                </tr>
              </tbody>
            </table>
          </div>
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
