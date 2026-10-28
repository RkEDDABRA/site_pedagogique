import { useEffect, useState, type ReactNode } from "react";
import { BookOpen, Info, AlertTriangle, Pin, Menu, ArrowUp, ArrowLeft, Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

import fig1 from "@/assets/cours-sf-s1/modes-action/fig1-chaine-infection.jpg";
import fig2 from "@/assets/cours-sf-s1/modes-action/fig2-mucus.jpg";
import fig3 from "@/assets/cours-sf-s1/modes-action/fig3-adhesion-penetration.jpg";
import fig4 from "@/assets/cours-sf-s1/modes-action/fig4-gram-positif-exotoxine.jpg";
import fig5 from "@/assets/cours-sf-s1/modes-action/fig5-petri-exotoxines.jpg";
import fig6 from "@/assets/cours-sf-s1/modes-action/fig6-gram-negatif-endotoxine.jpg";
import fig7 from "@/assets/cours-sf-s1/modes-action/fig7-synthese-toxines.png";
import { dimsFor } from "@/lib/imageDims";

/* ---------- TOC ---------- */
type TocEntry = { id: string; num: string; label: string; level: 1 | 2 };
const TOC: TocEntry[] = [
  { id: "introduction",        num: "",      label: "Introduction",                                         level: 1 },
  { id: "saprophytisme",       num: "1.",    label: "Le saprophytisme",                                     level: 1 },
  { id: "parasitisme",         num: "2.",    label: "Le parasitisme",                                       level: 1 },
  { id: "commensalisme",       num: "2.1.",  label: "Commensalisme",                                        level: 2 },
  { id: "pathogenicite",       num: "2.2.",  label: "Pathogénicité",                                        level: 2 },
  { id: "symbiose",            num: "2.3.",  label: "Symbiose",                                             level: 2 },
  { id: "porteur-sain",        num: "3.",    label: "La notion de porteur sain",                            level: 1 },
  { id: "voies-contamination", num: "4.",    label: "Différentes voies de contamination",                   level: 1 },
  { id: "invasif-toxique",     num: "5.",    label: "Pouvoir invasif et pouvoir toxique",                   level: 1 },
  { id: "virulence",           num: "5.1.",  label: "La virulence (pouvoir invasif)",                       level: 2 },
  { id: "etapes-infection",    num: "5.1.1.",label: "Étapes d'une infection à bactéries invasives",        level: 2 },
  { id: "phases-infection",    num: "5.1.2.",label: "Phases d'une infection à bactéries invasives",        level: 2 },
  { id: "toxinogenese",        num: "5.2.",  label: "La toxinogénèse (pouvoir toxique)",                    level: 2 },
  { id: "exotoxines",          num: "5.2.1.",label: "Les exotoxines",                                       level: 2 },
  { id: "endotoxines",         num: "5.2.2.",label: "Les endotoxines",                                      level: 2 },
  { id: "comparaison",         num: "5.2.3.",label: "Comparaison endotoxine / exotoxine",                   level: 2 },
];

/* ---------- helpers ---------- */
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

function Section({ id, num, title, children }: { id: string; num: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 mt-12">
      <h2 className="group font-display text-2xl sm:text-3xl font-bold text-primary border-b border-primary/20 pb-2 mb-5 flex items-center">
        <span><span className="text-primary/60 mr-2 font-mono text-xl">{num}</span>{title}</span>
        <AnchorLink id={id} />
      </h2>
      {children}
    </section>
  );
}
function Sub({ id, num, title, children }: { id: string; num: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 mt-8">
      <h3 className="group font-display text-lg sm:text-xl font-semibold text-foreground/90 mb-3 flex items-center">
        <span><span className="text-primary/60 mr-2 font-mono text-base">{num}</span>{title}</span>
        <AnchorLink id={id} />
      </h3>
      {children}
    </section>
  );
}
const P = ({ children }: { children: ReactNode }) => (
  <p className="text-foreground/80 leading-relaxed mb-4">{children}</p>
);
const UL = ({ children }: { children: ReactNode }) => (
  <ul className="list-disc pl-6 space-y-1.5 text-foreground/80 leading-relaxed mb-4">{children}</ul>
);
const Em = ({ children }: { children: ReactNode }) => <em className="italic">{children}</em>;
const B = ({ children }: { children: ReactNode }) => <strong className="font-semibold text-foreground">{children}</strong>;
const U = ({ children }: { children: ReactNode }) => <span className="underline decoration-primary/40 underline-offset-2">{children}</span>;

function Callout({ type = "info", title, children }: { type?: "info" | "warning" | "important" | "definition"; title?: string; children: ReactNode }) {
  const styles = {
    info:       { wrap: "bg-blue-50 border-blue-400 text-blue-900 dark:bg-blue-950/40 dark:text-blue-100",        Icon: Info },
    warning:    { wrap: "bg-amber-50 border-amber-400 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100",   Icon: AlertTriangle },
    important:  { wrap: "bg-rose-50 border-rose-400 text-rose-900 dark:bg-rose-950/40 dark:text-rose-100",        Icon: Pin },
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

function Figure({ n, src, caption }: { n: number; src: string; caption: string }) {
  return (
    <figure className="my-6">
      <div className="rounded-lg border border-border bg-muted/30 overflow-hidden">
        <img src={src} {...dimsFor(src)} alt={caption} className="w-full h-auto block" loading="lazy" />
      </div>
      <figcaption className="text-sm text-muted-foreground mt-2 text-center">
        <span className="font-semibold text-foreground/80">Figure {n}.</span> {caption}
      </figcaption>
    </figure>
  );
}

/* ---------- TOC widgets ---------- */
function TocList({ onClick }: { onClick?: () => void }) {
  return (
    <nav aria-label="Table des matières" className="text-sm">
      <p className="font-display text-xs uppercase tracking-wider font-bold text-primary mb-3">Table des matières</p>
      <ol className="space-y-1.5">
        {TOC.map((t) => (
          <li key={t.id} className={cn(t.level === 2 && "pl-4")}>
            <a
              href={`#${t.id}`}
              onClick={onClick}
              className={cn(
                "block py-1 px-2 rounded hover:bg-primary/10 hover:text-primary transition-colors",
                t.level === 1 ? "font-semibold text-foreground/90" : "text-foreground/70"
              )}
            >
              <span className="font-mono text-xs text-primary/60 mr-1.5">{t.num}</span>
              {t.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function CoursModesActionMicroorganismes() {
  const [mobileToc, setMobileToc] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-background">
      {/* En-tête */}
      <header className="border-b border-border bg-gradient-to-br from-primary/5 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <a
            href="/licence/sage-femme"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Retour à Licence Sage-Femme
          </a>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            Licence · Option Sage-Femme · Semestre 1 · Microbiologie
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
            Mode d'action des micro-organismes
          </h1>
          <p className="text-muted-foreground mt-3 max-w-3xl">
            Sous-chapitre du module Sciences Biologiques — Relations hôte/micro-organisme,
            pouvoir invasif, toxinogénèse, exotoxines et endotoxines.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        {/* TOC desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 border border-border rounded-lg bg-card p-4 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <TocList />
          </div>
        </aside>

        {/* TOC mobile bouton */}
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

        {/* Contenu */}
        <article className="min-w-0">
          {/* Introduction */}
          <section id="introduction" className="scroll-mt-28">
            <h2 className="group font-display text-2xl sm:text-3xl font-bold text-primary border-b border-primary/20 pb-2 mb-5 flex items-center">
              <span>Introduction</span><AnchorLink id="introduction" />
            </h2>
            <P>
              La relation entre les micro-organismes et les autres êtres vivants est une relation
              complexe, un équilibre pouvant évoluer, et qui est influencé par de nombreux facteurs.
            </P>
            <Callout type="definition" title="Hôte">
              On appelle <B>« hôte »</B> <U>l'organisme qui héberge le micro-organisme, qui est soumis à la contamination.</U>
            </Callout>
            <P>Selon le type de relation existant, on distingue le <B>saprophytisme</B> et le <B>parasitisme</B>.</P>
          </section>

          <Section id="saprophytisme" num="1." title="Le saprophytisme">
            <P>
              Les micro-organismes saprophytes vivent à l'état libre dans la nature (eaux, sol…).
              Ils n'établissent pas de relation de dépendance avec d'autres êtres vivants. Ils
              puisent leur énergie et leurs éléments nutritifs en dégradant les matières
              organiques provenant de cadavres ou de résidus végétaux.
            </P>
            <P>
              Leur rôle est très important dans le cycle de la vie : ils permettent la dégradation
              des déchets organiques et la fertilisation des sols par l'humus.
            </P>
          </Section>

          <Section id="parasitisme" num="2." title="Le parasitisme">
            <P>
              Les micro-organismes parasites <U>vivent au dépend d'un autre organisme vivant.</U> Le
              parasite tire profit de cette association. L'établissement des liens peut satisfaire
              des besoins nutritionnels ou réaliser des conditions de vie optimales.
            </P>
            <P>L'hôte parasité peut être :</P>
            <UL>
              <li>indifférent : <B>commensalisme</B></li>
              <li>souffrir : <B>pathogénicité</B></li>
              <li>ou tirer profit de l'association : <B>symbiose</B></li>
            </UL>

            <Sub id="commensalisme" num="2.1." title="Commensalisme">
              <P>
                Type d'association conduisant <U>deux espèces différentes d'organismes à vivre
                ensemble, sans que l'une nuise à l'autre</U>, et où parfois l'une des espèces se
                procure de la nourriture, une protection ou d'autres avantages.
              </P>
              <Callout type="info" title="Exemples">
                <UL>
                  <li>Flore de la peau et des muqueuses.</li>
                  <li><Em>Escherichia coli</Em> vit dans le côlon chez l'homme et bénéficie des éléments
                    nutritifs, de la chaleur et de l'abri, mais ne provoque aucune maladie ni malaise.</li>
                </UL>
              </Callout>
            </Sub>

            <Sub id="pathogenicite" num="2.2." title="Pathogénicité">
              <P>
                Dans cette relation, les micro-organismes dits pathogènes <U>provoquent un ensemble
                de troubles chez l'hôte infecté</U>, pouvant être plus ou moins graves
                (ex : bactéries responsables des infections alimentaires).
              </P>
              <P>Les organismes pathogènes sont de trois types :</P>
              <UL>
                <li><B>Pathogènes opportunistes</B> : responsables de pathologies uniquement chez les
                  personnes dont le système immunitaire est affaibli (ex : déséquilibre de la
                  flore normale après antibiothérapie).</li>
                <li><B>Pathogènes spécifiques</B> : micro-organismes provoquant presque toujours une
                  maladie spécifique même chez le sujet « sain » (ex : typhoïde, choléra,
                  tuberculose, méningite).</li>
                <li><B>Pathogènes occasionnels</B> : souvent inoffensifs mais certaines souches sont
                  pathogènes. On y retrouve des bactéries commensales comme <Em>Escherichia coli</Em>
                  ou <Em>Staphylococcus aureus</Em>. En dehors du processus infectieux, ces
                  micro-organismes existent en portage sain.</li>
              </UL>
            </Sub>

            <Sub id="symbiose" num="2.3." title="Symbiose">
              <P>Dans cette relation symbiotique, chacun tire bénéfice de l'association.</P>
              <Callout type="info" title="Exemples">
                <UL>
                  <li>La termite, incapable de digérer la cellulose, héberge des protozoaires qui
                    digèrent la cellulose pour elle ; ces protozoaires meurent s'ils quittent la
                    termite.</li>
                  <li>Micro-organismes du rumen :
                    <ul className="list-[circle] pl-6 mt-1 space-y-1">
                      <li>la vache fournit l'incubateur à température et pH régulés, ainsi que
                        l'alimentation en cellulose et eau ;</li>
                      <li>les micro-organismes digèrent les parois cellulosiques des végétaux
                        (les ruminants ne synthétisent pas de cellulases) et produisent de
                        nombreux métabolites assimilables par la vache.</li>
                    </ul>
                  </li>
                </UL>
              </Callout>
            </Sub>
          </Section>

          <Section id="porteur-sain" num="3." title="La notion de porteur sain">
            <P>
              Un <B>porteur sain</B> est un individu qui héberge le micro-organisme pathogène sans
              présenter les symptômes de la maladie. Par contre, il présente un danger car il peut
              transmettre et contaminer d'autres personnes ou des aliments (dissémination).
            </P>
            <Callout type="warning" title="Exemples">
              <UL>
                <li>Le <B>staphylocoque doré</B> est présent dans la gorge et le nez de nombreux
                  porteurs sains qui contaminent sans le savoir l'environnement.</li>
                <li>Il existe aussi un portage sain à <B>salmonelle</B> dans l'intestin de certains
                  individus et animaux (coquilles d'œufs, lait et viande contaminés).</li>
              </UL>
            </Callout>
          </Section>

          <Section id="voies-contamination" num="4." title="Différentes voies de contamination">
            <P>
              Pour chaque voie possible de contamination ou porte d'entrée de la bactérie,
              l'organisme possède des défenses qui limitent l'implantation bactérienne et peuvent
              éventuellement éviter l'infection.
            </P>
            <UL>
              <li><B>Voie digestive</B> : ingestion d'eau ou d'aliments souillés (ex : choléra, typhoïde).</li>
              <li><B>Voie respiratoire</B> : inhalation d'aérosols contaminés (ex : légionellose, coqueluche).</li>
              <li><B>Voie cutanée</B> : inoculation par contact (plaie souillée) (ex : tétanos, surinfections de plaie).</li>
              <li><B>Voie transcutanée</B> : inoculation iatrogène (injection, cathéter) ou par piqûre
                d'insecte vecteur (ex : peste, maladie de Lyme).</li>
              <li><B>Voie sexuelle</B> : maladies sexuellement transmissibles (ex : syphilis, urétrite
                gonococcique ou à <Em>Chlamydia trachomatis</Em>).</li>
            </UL>
            <Figure n={1} src={fig1} caption="Diagramme de la chaîne d'infection." />
          </Section>

          <Section id="invasif-toxique" num="5." title="Notions de pouvoir invasif et pouvoir toxique">
            <P>
              Les micro-organismes pathogènes provoquent une maladie quand ils infectent l'homme
              grâce à 2 grands processus de pathogénicité : la <B>virulence</B> (pouvoir invasif) et
              la <B>toxinogénèse</B> (pouvoir toxique).
            </P>
            <Callout type="definition" title="Infection">
              L'<B>infection</B> est la pénétration et la multiplication, dans l'organisme, de
              micro-organismes pathogènes. Elle conduit à une maladie infectieuse qui se manifeste
              par des perturbations physiologiques plus ou moins graves.
            </Callout>

            <Sub id="virulence" num="5.1." title="La virulence (pouvoir invasif)">
              <P>
                C'est la capacité de certains micro-organismes à <U>envahir l'organisme, à s'y
                multiplier</U>, et à provoquer plus ou moins rapidement des troubles. Il existe deux
                types d'invasion non exclusifs :
              </P>
              <UL>
                <li>Invasion intracellulaire (<Em>Listeria</Em>, <Em>Salmonella</Em>, virus…)</li>
                <li>Invasion extracellulaire (<Em>Clostridium perfringens</Em>, pneumocoque…)</li>
              </UL>
            </Sub>

            <Sub id="etapes-infection" num="5.1.1." title="Étapes d'une infection bactérienne (bactéries invasives)">
              <UL>
                <li><B>Contamination</B> : contact entre le micro-organisme et l'organisme.</li>
                <li><B>Période d'incubation</B> : pas de signes cliniques ; la bactérie commence à se
                  multiplier et/ou à sécréter des toxines.</li>
                <li><B>Période d'invasion</B> : apparition de signes cliniques d'ordre général
                  (fièvre, nausées, fatigue, maux de tête…).</li>
                <li><B>Période d'état</B> : apparition des signes cliniques spécifiques permettant de
                  poser un diagnostic.</li>
                <li><B>Période de déclin (défervescence)</B> : diminution des signes de la maladie.</li>
                <li><B>Période de convalescence (guérison)</B> : l'organisme se rétablit.</li>
              </UL>
            </Sub>

            <Sub id="phases-infection" num="5.1.2." title="Phases d'une infection à bactéries invasives">
              <ol className="list-decimal pl-6 space-y-1.5 text-foreground/80 leading-relaxed mb-4">
                <li><B>Étape locale</B> : réaction inflammatoire caractérisée par une rougeur, une
                  chaleur, un gonflement et une douleur au niveau de la lésion.</li>
                <li><B>Étape loco-régionale (lymphatique)</B> : l'infection gagne les vaisseaux puis
                  les ganglions lymphatiques, qui deviennent durs et douloureux.</li>
                <li><B>Infection générale</B> : les bactéries passent dans le sang et déclenchent une
                  infection généralisée — on parle alors de <B>septicémie</B>.</li>
              </ol>

              <P>La virulence dépend à la fois du germe et de l'hôte :</P>

              <h4 className="font-display font-semibold text-foreground/90 mt-4 mb-2">Facteurs liés aux germes</h4>
              <UL>
                <li>Fixation et adhésion par les fimbriae, pili ou par l'adhésine (antigène d'adhésion).</li>
                <li>Capsule ⇒ résistance à la phagocytose.</li>
                <li>Production d'enzymes : coagulase, fibrinolysine…</li>
              </UL>

              <h4 className="font-display font-semibold text-foreground/90 mt-4 mb-2">Facteurs liés à l'hôte</h4>
              <UL>
                <li>Notion de terrain (âge, immunodépression, etc.).</li>
                <li>Traumatismes (plaies, fractures, etc.).</li>
                <li>Température.</li>
              </UL>

              <Callout type="info" title="Exemple — infection par Shigella">
                <p className="mb-2">La colonisation est décomposée en 4 étapes :</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <B>Passage de la barrière du mucus</B> qui présente 3 obstacles aux
                    micro-organismes :
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>un gel de haute viscosité ;</li>
                      <li>le milieu de la muqueuse : les micro-organismes possèdent l'équipement
                        enzymatique nécessaire pour survivre ;</li>
                      <li>une haute concentration en immunoglobulines qui attaquent les
                        micro-organismes.</li>
                    </ul>
                  </li>
                  <li><B>Adhésion</B> à la membrane intestinale (entérocytes : <Em>entéro-</Em> = intestin ;
                    <Em> -cyte</Em> = cellule).</li>
                  <li><B>Pénétration des micro-organismes</B> dans la cellule intestinale grâce à la
                    formation de vésicules.</li>
                  <li><B>La vésicule éclate</B> : les micro-organismes se répandent dans le cytoplasme
                    où ils se multiplient pour coloniser les cellules limitrophes.</li>
                </ol>
                <p className="mt-2">
                  La mort cellulaire est due à l'action d'une toxine inhibant les synthèses
                  protéiques. Il se forme alors des micro-abcès et des ulcérations de la muqueuse.
                </p>
              </Callout>

              <Figure n={2} src={fig2} caption="Rôle du mucus dans la protection de la muqueuse intestinale contre les bactéries pathogènes." />
              <Figure n={3} src={fig3} caption="Étapes de l'adhésion, de la pénétration bactérienne et de l'éclatement de la vésicule dans la cellule intestinale." />
            </Sub>

            <Sub id="toxinogenese" num="5.2." title="La toxinogénèse (pouvoir toxique)">
              <P>
                C'est la capacité du micro-organisme à <U>fabriquer des toxines</U>, ce qui a pour
                conséquences :
              </P>
              <UL>
                <li>l'apparition de troubles dans l'organisme : lésions cellulaires locales ou
                  altérations d'activités physiologiques essentielles ;</li>
                <li>l'apparition d'anticorps (Ac) spécifiques.</li>
              </UL>
              <P>
                Les toxines peuvent agir de plusieurs manières : sur le système immunitaire en
                provoquant une allergie (effet allergène), sur le système nerveux (effet
                neurotoxique) ou sur le système musculaire (effet myotoxique). Il en existe deux
                grandes variétés.
              </P>
            </Sub>

            <Sub id="exotoxines" num="5.2.1." title="Les exotoxines">
              <P>
                Les <B>exotoxines</B> sont rejetées hors du microbe au fur et à mesure de leur
                fabrication par la bactérie. Exemples : toxines du staphylocoque doré, des
                <Em> Clostridium tetani</Em> et <Em>botulinum</Em>. Elles ont une toxicité spécifique très
                élevée.
              </P>
              <Callout type="warning" title="Intoxination">
                Parfois, les bactéries meurent dans l'aliment (à la cuisson par ex.) et seules les
                toxines thermorésistantes subsistent, provoquant une <B>Toxi-Infection Alimentaire (TIA)</B>
                chez le consommateur : on parle alors d'<B>intoxination</B>.
              </Callout>
              <div className="grid sm:grid-cols-2 gap-4">
                <Figure n={4} src={fig4} caption="Bactérie à Gram positif produisant et libérant des exotoxines." />
                <Figure n={5} src={fig5} caption="Boîte de Petri montrant des bactéries et leurs exotoxines libérées." />
              </div>
            </Sub>

            <Sub id="endotoxines" num="5.2.2." title="Les endotoxines">
              <P>
                Les <B>endotoxines</B> sont accrochées à la paroi des bactéries et ne sont libérées
                qu'à la mort de la bactérie (ex : salmonelles). Elles ont une action peu spécifique,
                sont thermorésistantes (30 minutes à 100 °C) et provoquent la fièvre grâce à leur
                effet pyrogène.
              </P>
              <Figure n={6} src={fig6} caption="Bactérie à Gram négatif portant les endotoxines dans sa paroi, libérées lors de la mort de la cellule." />
              <Figure n={7} src={fig7} caption="Synthèse : bactéries contenant des toxines, endotoxines, et bactéries mortes libérant leurs toxines." />

              <Callout type="info" title="Exemples d'action">
                <UL>
                  <li>
                    <B>Toxine botulinique</B> : après ingestion, inhalation ou développement dans le
                    tube digestif, la toxine passe dans le sang et diminue la quantité
                    d'acétylcholine au niveau des jonctions neuromusculaires, provoquant une
                    paralysie.
                  </li>
                  <li>
                    <B>Toxine cholérique</B> : après ingestion, la bactérie adhère à l'épithélium
                    intestinal et produit la toxine qui se fixe sur les entérocytes. Elle empêche
                    l'absorption des ions Na⁺ et Cl⁻ et provoque donc une fuite hydrominérale.
                  </li>
                </UL>
              </Callout>
            </Sub>

            <Sub id="comparaison" num="5.2.3." title="Comparaison endotoxine / exotoxine">
              <P>
                Les deux types de toxine apparaissent très différents. Sur le plan physiologique,
                l'effet toxique de l'endotoxine nécessite une multiplication importante de la
                bactérie, alors que l'exotoxine, active à très faible dose, agit même si cette
                multiplication n'a pas eu lieu.
              </P>

              <div className="overflow-x-auto rounded-lg border border-border my-4">
                <table className="w-full text-sm border-collapse">
                  <caption className="caption-bottom text-xs text-muted-foreground pt-2">
                    <span className="font-semibold text-foreground/80">Tableau 1.</span> Comparaison des endotoxines et exotoxines bactériennes.
                  </caption>
                  <thead className="bg-primary/10">
                    <tr>
                      <th className="text-left p-3 font-semibold text-foreground/90 border-b border-border w-1/4">Caractéristique</th>
                      <th className="text-left p-3 font-semibold text-foreground/90 border-b border-border">Endotoxine</th>
                      <th className="text-left p-3 font-semibold text-foreground/90 border-b border-border">Exotoxine</th>
                    </tr>
                  </thead>
                  <tbody className="[&>tr:nth-child(even)]:bg-muted/30">
                    <tr><td className="p-3 font-medium border-b border-border align-top">Bactéries responsables</td><td className="p-3 border-b border-border align-top">Uniquement Gram −</td><td className="p-3 border-b border-border align-top">Gram positif et négatif</td></tr>
                    <tr><td className="p-3 font-medium border-b border-border align-top">Localisation</td><td className="p-3 border-b border-border align-top">Membrane externe de la bactérie</td><td className="p-3 border-b border-border align-top">Extracellulaire (Gram +)<br />Intracellulaire (Gram −)</td></tr>
                    <tr><td className="p-3 font-medium border-b border-border align-top">Nature biochimique</td><td className="p-3 border-b border-border align-top">Lipidique et polysaccharidique (LPS)</td><td className="p-3 border-b border-border align-top">Peptidique ou protéique</td></tr>
                    <tr><td className="p-3 font-medium border-b border-border align-top">Effets toxiques</td><td className="p-3 border-b border-border align-top">Non spécifiques, choc toxique</td><td className="p-3 border-b border-border align-top">Spécifiques, très variés selon les germes</td></tr>
                    <tr><td className="p-3 font-medium border-b border-border align-top">Propriétés immunologiques</td><td className="p-3 border-b border-border align-top">Faiblement immunogène ; réaction non spécifique et spécifique</td><td className="p-3 border-b border-border align-top">Fortement immunogène ; réaction spécifique</td></tr>
                    <tr><td className="p-3 font-medium border-b border-border align-top">Utilisation comme vaccin</td><td className="p-3 border-b border-border align-top">Très peu</td><td className="p-3 border-b border-border align-top">Depuis longtemps</td></tr>
                    <tr><td className="p-3 font-medium border-b border-border align-top">Multiplication cellulaire requise</td><td className="p-3 border-b border-border align-top">Oui</td><td className="p-3 border-b border-border align-top">Non</td></tr>
                    <tr><td className="p-3 font-medium align-top">Instabilité (thermique, solvants…)</td><td className="p-3 align-top">Non</td><td className="p-3 align-top">Oui</td></tr>
                  </tbody>
                </table>
              </div>
            </Sub>
          </Section>
        </article>
      </div>

      {/* Bouton retour en haut */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Retour en haut"
          className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
