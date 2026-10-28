import { useEffect, useMemo, useState } from "react";
import { ArrowUp, BookOpen, ChevronRight, Lock, Menu, X, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import fig1 from "@/assets/cours-diet-s2/fig1-appareil-digestif.jpg";
import fig2 from "@/assets/cours-diet-s2/fig2-vue-ensemble.jpg";
import fig3 from "@/assets/cours-diet-s2/fig3-mecanismes.jpg";
import fig4 from "@/assets/cours-diet-s2/fig4-histologie.jpg";
import fig5 from "@/assets/cours-diet-s2/fig5-paroi.jpg";
import imgEpithelium from "@/assets/cours-diet-s2/epithelium.jpg";
import imgLamina from "@/assets/cours-diet-s2/lamina-propria.jpg";
import imgMuscle1 from "@/assets/cours-diet-s2/muscle-lisse-1.jpg";
import imgMuscle2 from "@/assets/cours-diet-s2/muscle-lisse-2.jpg";
import imgOesophage from "@/assets/cours-diet-s2/oesophage-couches.jpg";
import imgPlexus from "@/assets/cours-diet-s2/plexus-nerveux.jpg";
import imgInnervation from "@/assets/cours-diet-s2/innervation-autonome.jpg";
import imgSympPara from "@/assets/cours-diet-s2/sympathique-parasympathique.jpg";
import imgControle from "@/assets/cours-diet-s2/controle-tube-digestif.jpg";
import imgInnervationDetail from "@/assets/cours-diet-s2/innervation-detail.jpg";

// Partie 4 & 5 — Physiologie de la digestion
import p2Fig1a from "@/assets/cours-diet-s2/p2-fig1a-cavite-orale.jpg";
import p2Fig1b from "@/assets/cours-diet-s2/p2-fig1b-bouche.jpg";
import p2Fig2 from "@/assets/cours-diet-s2/p2-fig2-langue.jpg";
import p2Fig3 from "@/assets/cours-diet-s2/p2-fig3-glandes-salivaires.jpg";
import p2Fig3b from "@/assets/cours-diet-s2/p2-fig3b-glandes-detail.jpg";
import p2Fig3c from "@/assets/cours-diet-s2/p2-fig3c-glandes-principales.jpg";
import p2Fig5b from "@/assets/cours-diet-s2/p2-fig5b-salivation.jpg";
import p2Fig446 from "@/assets/cours-diet-s2/p2-fig446-controle-salive.jpg";
import p2Fig4 from "@/assets/cours-diet-s2/p2-fig4-deglutition.jpg";
import p2Fig5 from "@/assets/cours-diet-s2/p2-fig5-peristaltisme.jpg";
import p2Fig6 from "@/assets/cours-diet-s2/p2-fig6-oesophage.jpg";
import p2Fig7 from "@/assets/cours-diet-s2/p2-fig7-peristaltisme-oeso.jpg";

// Partie 6 & 7 — Estomac et intestin grêle
import p3Fig8a from "@/assets/cours-diet-s2/p3-fig8a-estomac.jpg";
import p3Fig8b from "@/assets/cours-diet-s2/p3-fig8b-estomac.jpg";
import p3Fig8c from "@/assets/cours-diet-s2/p3-fig8c-paroi-estomac.jpg";
import p3Fig9 from "@/assets/cours-diet-s2/p3-fig9-cellules-gastriques.jpg";
import p3Fig10 from "@/assets/cours-diet-s2/p3-fig10-controle-secretion.jpg";
import p3ProdSuc from "@/assets/cours-diet-s2/p3-prod-suc-gastrique.jpg";
import p3Phases from "@/assets/cours-diet-s2/p3-phases-secretion.jpg";
import p3Fig11a from "@/assets/cours-diet-s2/p3-fig11a-accommodation.jpg";
import p3Fig11b from "@/assets/cours-diet-s2/p3-fig11b-brassage.jpg";
import p3Fig11c from "@/assets/cours-diet-s2/p3-fig11c-vidange.jpg";
import p3Fig12 from "@/assets/cours-diet-s2/p3-fig12-peristaltisme.jpg";
import p3Fig13 from "@/assets/cours-diet-s2/p3-fig13-intestin.jpg";
import p3Fig14 from "@/assets/cours-diet-s2/p3-fig14-paroi-intestin.jpg";
import p3Fig15a from "@/assets/cours-diet-s2/p3-fig15a-villosites.jpg";
import p3Fig15b1 from "@/assets/cours-diet-s2/p3-fig15b-villosite-detail.jpg";
import p3Fig15b2 from "@/assets/cours-diet-s2/p3-fig15b-crypte.jpg";

// Partie 8 & 9 — Motricité, sécrétions, absorption, gros intestin (doc 4)
import p4Fig16 from "@/assets/cours-diet-s2/p4-fig16-mouvements-grele.jpg";
import p4Fig17a from "@/assets/cours-diet-s2/p4-fig17a-anatomie.jpg";
import p4Fig17b from "@/assets/cours-diet-s2/p4-fig17b-controle.jpg";
import p4Fig18ent from "@/assets/cours-diet-s2/p4-fig18-enterocyte.jpg";
import p4FigVillosite from "@/assets/cours-diet-s2/p4-fig-villosite.jpg";
import p4FigVoies from "@/assets/cours-diet-s2/p4-fig-voies-absorption.jpg";
import p4FigGros from "@/assets/cours-diet-s2/p4-fig18-gros-intestin.jpg";
import p4Fig19histo from "@/assets/cours-diet-s2/p4-fig19-histologie-colon.jpg";
import p4Fig20eau from "@/assets/cours-diet-s2/p4-fig20-eau-colon.jpg";
import p4FigRoles from "@/assets/cours-diet-s2/p4-fig-roles-colon.jpg";
import p4FigDefecation from "@/assets/cours-diet-s2/p4-fig-defecation.jpg";
import p4FigMouv from "@/assets/cours-diet-s2/p4-fig-mouvements-colon.jpg";
import p4Fig21 from "@/assets/cours-diet-s2/p4-fig21-microbiote.jpg";
import p4Fig22 from "@/assets/cours-diet-s2/p4-fig22-enzymes-microbiote.jpg";

// Parties 10-14 — Métabolisme (doc 5)
import p5Fig23 from "@/assets/cours-diet-s2/p5-fig23-digestion-glucides.jpg";
import p5Fig24 from "@/assets/cours-diet-s2/p5-fig24-absorption-monosaccharides.jpg";
import p5Fig25 from "@/assets/cours-diet-s2/p5-fig25-digestion-protides.jpg";
import p5Fig25b from "@/assets/cours-diet-s2/p5-fig25b-peptidases.jpg";
import p5Fig26 from "@/assets/cours-diet-s2/p5-fig26-absorption-aa.jpg";
import p5Fig27a from "@/assets/cours-diet-s2/p5-fig27a-emulsion.jpg";
import p5Fig27b from "@/assets/cours-diet-s2/p5-fig27b-digestion-lipides.jpg";
import p5Fig27c from "@/assets/cours-diet-s2/p5-fig27c-tg-mg.jpg";
import p5Fig28 from "@/assets/cours-diet-s2/p5-fig28-absorption-ag.jpg";
import p5Fig29 from "@/assets/cours-diet-s2/p5-fig29-lpl.jpg";
import p5Fig29b from "@/assets/cours-diet-s2/p5-fig29b-chylomicrons.jpg";
import p5Fig30 from "@/assets/cours-diet-s2/p5-fig30-transport-nutriments.jpg";
import p5Fig31 from "@/assets/cours-diet-s2/p5-fig31-eau-proprietes.jpg";
import p5Fig32 from "@/assets/cours-diet-s2/p5-fig32-electrolytes.jpg";
import p5Fig33 from "@/assets/cours-diet-s2/p5-fig33-vit-liposolubles.jpg";
import p5Fig34 from "@/assets/cours-diet-s2/p5-fig34-vit-hydrosolubles.jpg";
import p5Fig35 from "@/assets/cours-diet-s2/p5-fig35-synthese.jpg";
import p5FigB12 from "@/assets/cours-diet-s2/p5-fig-b12.jpg";

// Chapitre 2 — Système endocrinien
import ch2Img1 from "@/assets/cours-diet-s2/ch2/img1.png";
import ch2Img2 from "@/assets/cours-diet-s2/ch2/img2.png";
import ch2Img3 from "@/assets/cours-diet-s2/ch2/img3.png";
import ch2Img4 from "@/assets/cours-diet-s2/ch2/img4.png";
import ch2Img5 from "@/assets/cours-diet-s2/ch2/img5.png";
import ch2Img6 from "@/assets/cours-diet-s2/ch2/img6.png";
import ch2Img7 from "@/assets/cours-diet-s2/ch2/img7.png";
import ch2Img8 from "@/assets/cours-diet-s2/ch2/img8.png";
import ch2Img9 from "@/assets/cours-diet-s2/ch2/img9.png";
import ch2Img10 from "@/assets/cours-diet-s2/ch2/img10.png";
import ch2Img11 from "@/assets/cours-diet-s2/ch2/img11.png";
import ch2Img12 from "@/assets/cours-diet-s2/ch2/img12.png";
import ch2Img13 from "@/assets/cours-diet-s2/ch2/img13.png";
import ch2Img14 from "@/assets/cours-diet-s2/ch2/img14.png";
import ch2Img15 from "@/assets/cours-diet-s2/ch2/img15.png";
import ch2Img16 from "@/assets/cours-diet-s2/ch2/img16.png";
import ch2Img17 from "@/assets/cours-diet-s2/ch2/img17.png";
import ch2Img18 from "@/assets/cours-diet-s2/ch2/img18.png";
import ch2Img19 from "@/assets/cours-diet-s2/ch2/img19.png";

// Chapitre 2 — Sections supplémentaires (parathyroïdes, surrénales, pancréas)
import ch2Parathy from "@/assets/cours-diet-s2/ch2/parathy-anat.jpg";
import ch2ParathyPth from "@/assets/cours-diet-s2/ch2/parathy-pth.jpg";
import ch2ParathyCa from "@/assets/cours-diet-s2/ch2/parathy-calcium.jpg";
import ch2ParathyCalcemie from "@/assets/cours-diet-s2/ch2/parathy-calcemie.jpg";
import ch2SurrRein from "@/assets/cours-diet-s2/ch2/surrenale-rein.jpg";
import ch2SurrZones from "@/assets/cours-diet-s2/ch2/surrenale-zones.jpg";
import ch2Medullo from "@/assets/cours-diet-s2/ch2/medullo.jpg";
import ch2CortReg from "@/assets/cours-diet-s2/ch2/cortisol-reg.jpg";
import ch2Stress from "@/assets/cours-diet-s2/ch2/stress.jpg";
import ch2PancHisto from "@/assets/cours-diet-s2/ch2/pancreas-histo.jpg";
import ch2Ilot from "@/assets/cours-diet-s2/ch2/ilot-langerhans.jpg";
import ch2GlycVal from "@/assets/cours-diet-s2/ch2/glycemie-valeur.jpg";
import ch2GlycRep from "@/assets/cours-diet-s2/ch2/glycemie-rep.jpg";
import ch2InsGluc from "@/assets/cours-diet-s2/ch2/insuline-glucagon.jpg";
import ch2Diabete from "@/assets/cours-diet-s2/ch2/diabete-info.jpg";
import ch2GlycNiv from "@/assets/cours-diet-s2/ch2/glycemie-niveau.jpg";
import ch2GlycReg from "@/assets/cours-diet-s2/ch2/glycemie-reg.jpg";
import ch2MetabProt from "@/assets/cours-diet-s2/ch2/metab-prot.jpg";
import ch2MetabLip from "@/assets/cours-diet-s2/ch2/metab-lip.jpg";
import ch2MetabGluc from "@/assets/cours-diet-s2/ch2/metab-gluc.jpg";
import { dimsFor } from "@/lib/imageDims";
import { ZoomableImage } from "@/components/ZoomableImage";

const PASSWORD = "BPN2026";
const STORAGE_KEY = "course_unlocked_dn-s2";

/* ---------- Petits composants utilitaires ---------- */

function AnchorLink({ id }: { id: string }) {
  const copy = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
  };
  return (
    <button
      onClick={copy}
      className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded text-muted-foreground/50 opacity-0 transition-opacity hover:text-primary group-hover:opacity-100"
      aria-label="Copier le lien"
      title="Copier le lien"
    >
      <LinkIcon size={12} />
    </button>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="group scroll-mt-28 font-display text-2xl font-bold text-foreground mt-10 mb-4 flex items-center">
      {children}
      <AnchorLink id={id} />
    </h2>
  );
}
function H3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="group scroll-mt-28 font-display text-xl font-semibold text-foreground mt-8 mb-3 flex items-center">
      {children}
      <AnchorLink id={id} />
    </h3>
  );
}
function H4({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h4 id={id} className="group scroll-mt-28 font-display text-lg font-semibold text-primary mt-6 mb-2 flex items-center">
      {children}
      <AnchorLink id={id} />
    </h4>
  );
}

function Figure({ src, n, legend, alt }: { src: string; n: string; legend: string; alt?: string }) {
  return (
    <figure className="my-6 rounded-xl border border-border bg-muted/30 p-3">
      <ZoomableImage src={src} alt={alt ?? legend} className="mx-auto max-h-[600px] w-auto cursor-zoom-in rounded-md"/>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{n}.</span> {legend}
      </figcaption>
    </figure>
  );
}

function Mark({ children }: { children: React.ReactNode }) {
  return <mark className="rounded bg-amber-100 px-1 text-foreground">{children}</mark>;
}

function Callout({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "note" }) {
  const styles =
    type === "note"
      ? "border-l-4 border-amber-400 bg-amber-50/60 text-foreground"
      : "border-l-4 border-primary bg-primary/5 text-foreground";
  return <div className={cn("my-4 rounded-r-lg p-4 text-sm", styles)}>{children}</div>;
}

/* ---------- Structure du cours ---------- */

type Section = { id: string; title: string };
type Chapter = { id: string; number: number; title: string; sections: Section[] };

const CHAPTERS: Chapter[] = [
  {
    id: "ch1",
    number: 1,
    title: "Aspects anatomiques et physiologiques du système digestif",
    sections: [
      { id: "sec-1-1", title: "Partie 1 — Caractéristiques générales du système digestif" },
      { id: "sec-1-2", title: "Partie 2 — Organisation histologique du tube digestif" },
      { id: "sec-1-3", title: "Partie 3 — Régulations des processus digestifs" },
      { id: "sec-1-4", title: "Partie 4 — Physiologie de la digestion : la cavité buccale" },
      { id: "sec-1-5", title: "Partie 5 — Pharynx (déglutition) et œsophage" },
      { id: "sec-1-6", title: "Partie 6 — IV. La digestion gastrique (estomac)" },
      { id: "sec-1-7", title: "Partie 7 — V. Au niveau de l'intestin grêle" },
      { id: "sec-1-8", title: "Partie 8 — Motricité, sécrétions et absorption intestinales" },
      { id: "sec-1-9", title: "Partie 9 — VI. Le gros intestin" },
      { id: "sec-1-10", title: "Partie 10 — Vue d'ensemble des sécrétions digestives" },
      { id: "sec-1-11", title: "Partie 11 — Métabolisme des glucides" },
      { id: "sec-1-12", title: "Partie 12 — Métabolisme des protéines" },
      { id: "sec-1-13", title: "Partie 13 — Métabolisme des lipides" },
      { id: "sec-1-14", title: "Partie 14 — Absorption d'eau et de micro-nutriments" },
    ],
  },
  {
    id: "ch2",
    number: 2,
    title: "Aspects anatomiques et physiologiques du système endocrinien",
    sections: [
      { id: "sec-2-1", title: "1. Notions générales d'endocrinologie" },
      { id: "sec-2-2", title: "2. Axe hypothalamo-hypophysaire" },
      { id: "sec-2-3", title: "3. La thyroïde" },
      { id: "sec-2-4", title: "4. Les parathyroïdes" },
      { id: "sec-2-5", title: "5. Les surrénales" },
      { id: "sec-2-6", title: "6. Le pancréas endocrine" },
    ],
  },
];

/* ---------- Mot de passe ---------- */

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 350));
    if (val === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      onUnlock();
    } else {
      setErr(true);
      setVal("");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-md">
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Lock className="text-primary" size={22} />
          </div>
        </div>
        <h2 className="mb-2 text-center text-xl font-semibold text-foreground">Cours protégé</h2>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Entrez le code d'accès pour ouvrir le cours <strong>Diététique / Nutrition — Semestre 2</strong>.
        </p>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="password"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
              setErr(false);
            }}
            placeholder="Code d'accès"
            className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            autoFocus
            disabled={loading}
          />
          {err && <p className="text-center text-xs text-destructive">Code incorrect.</p>}
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Vérification…" : "Accéder au cours"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------- Contenu Chapitre 1 — Partie 1 (intégration fidèle du fichier) ---------- */

function Section1_1() {
  return (
    <section>
      <H2 id="sec-1-1">Partie 1 — I. Caractéristiques générales du système digestif</H2>

      <p className="text-foreground/90 leading-relaxed">
        Le système digestif a comme principale fonction d'assurer la digestion.
      </p>

      <H3 id="sec-1-1-1">1. Définition : Digestion</H3>
      <p className="text-foreground/90 leading-relaxed">
        On peut appeler <u>digestion au sens le plus large</u> l'ensemble des processus qui permettent
        l'ingestion d'aliments, leur simplification et leur dégradation en nutriments, leur absorption et
        leur passage dans le sang (ou la lymphe), ainsi que l'évacuation hors de l'organisme des aliments
        non assimilés (= <u>égestion</u>).
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        La <u>digestion au sens le plus strict</u> désigne seulement{" "}
        <strong>la dégradation des aliments en nutriments</strong>, le processus comportant une dimension
        mécanique et une dimension chimique catalysée par des enzymes.
      </p>

      <H3 id="sec-1-1-2">2. Organes impliqués</H3>
      <p className="text-foreground/90 leading-relaxed">
        Les <strong>organes impliqués dans ces phénomènes</strong> sont regroupés en un{" "}
        <u>appareil digestif</u>, comprenant deux grands types d'organes (<Mark>figures 1-2</Mark>) :
      </p>

      <div className="mt-3 rounded-lg border border-border bg-card p-4">
        <p className="text-foreground/90">
          • Le <u>tube digestif</u> correspondant à{" "}
          <strong>l'ensemble des voies par lesquelles transitent les aliments</strong> :
        </p>
        <ul className="mt-2 ml-6 list-disc space-y-0.5 text-foreground/90">
          <li>bouche,</li>
          <li>œsophage,</li>
          <li>pharynx,</li>
          <li>intestin grêle,</li>
          <li>gros intestin (= côlon),</li>
          <li>anus.</li>
        </ul>
        <p className="mt-3 text-foreground/90">
          Ces organes ont généralement eux-mêmes <strong>une activité sécrétrice d'enzymes digestives</strong>{" "}
          (voire d'hormones) et certains (surtout l'intestin grêle) permettent l'absorption des nutriments.
        </p>
      </div>

      <div className="mt-3 rounded-lg border border-border bg-card p-4">
        <p className="text-foreground/90">
          • Les <u>glandes digestives</u> correspondant à des <strong>glandes exocrines</strong>{" "}
          (quoiqu'elles puissent avoir aussi une activité endocrine) qui produisent des sécrétions riches en
          enzymes digestives assurant la digestion chimique des aliments :
        </p>
        <ul className="mt-2 ml-6 list-disc space-y-0.5 text-foreground/90">
          <li>les glandes salivaires,</li>
          <li>le pancréas,</li>
          <li>et le foie associé à la vésicule biliaire.</li>
        </ul>
      </div>

      <Figure
        src={fig1}
        n="FIGURE 1"
        legend="Vue d'ensemble de l'appareil digestif et de la digestion (incluant les durées indicatives moyennes de transit des aliments)."
      />
      <Figure src={fig2} n="FIGURE 2" legend="Vue d'ensemble de l'appareil digestif." />

      <H3 id="sec-1-1-3">3. Principaux processus</H3>
      <p className="text-foreground/90 leading-relaxed">
        Les principaux processus affectant l'<strong>appareil digestif</strong> sont les suivants (
        <Mark>figure 3</Mark>) :
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-foreground/90">
        <li>
          La <u>motilité</u> qui permet à la fois la <strong>digestion mécanique</strong> (= fragmentation
          des aliments) et l'<strong>avancée des aliments</strong> dans le tube digestif (={" "}
          <Mark>péristaltisme</Mark>).
        </li>
        <li>
          La <u>sécrétion exocrine</u> de <Mark>sucs digestifs</Mark> (= sécrétions aqueuses riches en
          enzymes digestives) qui assurent la <Mark>digestion chimique</Mark>.
        </li>
        <li>
          L'<u>absorption</u>, c'est-à-dire ici{" "}
          <strong>la traversée de la paroi du tube digestif</strong> par les nutriments jusqu'au sang.
        </li>
      </ul>

      <Figure
        src={fig3}
        n="FIGURE 3"
        legend="Mécanismes fondamentaux du système digestif. Ces quatre mécanismes sont la digestion de la nourriture en molécules plus petites ; l'absorption des nutriments depuis la lumière du tube vers le liquide extracellulaire ; la motilité, capacité de mouvement permettant le déplacement des produits dans le tube digestif et la sécrétion de substances par les cellules épithéliales dans la lumière du tube ou vers le liquide interstitiel."
      />

      <H3 id="sec-1-1-4">4. Rôle de l'appareil digestif</H3>
      <ul className="ml-6 list-disc space-y-1.5 text-foreground/90">
        <li>l'ingestion et le transit des aliments de la bouche au rectum ;</li>
        <li>le broyage mécanique des aliments (cavité buccale, estomac) ;</li>
        <li>
          la digestion chimique et enzymatique des aliments sous l'influence des sécrétions salivaires,
          gastriques, entérales, biliaires et pancréatiques ;
        </li>
        <li>l'absorption et le métabolisme des nutriments (intestin grêle) ;</li>
        <li>
          la transformation des aliments en selles par des phénomènes de réabsorption et de destruction
          bactérienne (côlon) ;
        </li>
        <li>le stockage et l'élimination des selles (rectum).</li>
      </ul>
    </section>
  );
}

function Section1_2() {
  return (
    <section>
      <H2 id="sec-1-2">Partie 2 — II. Organisation histologique du tube digestif</H2>
      <p className="text-foreground/90 leading-relaxed">
        Le <strong>tube digestif</strong> comprend fondamentalement <strong>quatre couches</strong> (de la
        plus proche de la cavité vers la plus externe) (<Mark>figures 4, 5</Mark>) :
      </p>

      <H3 id="sec-1-2-1">1. La muqueuse</H3>
      <p className="text-foreground/90 leading-relaxed">
        C'est la couche la plus interne qui est au contact de la lumière digestive et donc des aliments et
        où se réalise l'activité de sécrétion (mucus, enzymes digestives et hormones) et éventuellement
        d'absorption. Elle joue un rôle également dans la protection contre les microorganismes. Elle est
        tapissée d'un mucus protecteur de la paroi sous-jacente.
      </p>

      <div className="my-5 overflow-hidden rounded-xl border border-border">
        <div className="bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
          TABLEAU 1 — Les fonctions de la muqueuse
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="border-b border-border px-3 py-2 text-left font-semibold w-1/3">Fonctions</th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            <tr>
              <td className="border-b border-border px-3 py-3 align-top font-medium">
                Sécrétion de mucus, d'<Mark>enzymes</Mark> et d'hormones
              </td>
              <td className="border-b border-border px-3 py-3 align-top">
                • Le mucus conserve la surface humide et facilite le déplacement de la nourriture dans le
                tube digestif.
                <br />
                • Les enzymes et les hormones contribuent à la digestion des aliments.
              </td>
            </tr>
            <tr>
              <td className="border-b border-border px-3 py-3 align-top font-medium">
                Protection de la paroi interne du tube digestif
              </td>
              <td className="border-b border-border px-3 py-3 align-top">
                • Le mucus protège la muqueuse de la digestion de certains organes par les enzymes
                digestives.
                <br />
                • Les follicules lymphatiques épars assument un rôle dans la défense contre les bactéries et
                les autres agents pathogènes pouvant se retrouver dans le tube digestif.
              </td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top font-medium">Absorption des nutriments et de l'eau</td>
              <td className="px-3 py-3 align-top">
                • Les capillaires nourrissent l'épithélium et diffusent les nutriments dans l'organisme.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-foreground/90">La muqueuse comprend :</p>

      <H4 id="sec-1-2-1-a">a. Un épithélium digestif</H4>
      <p className="text-foreground/90 leading-relaxed">
        C'est un épithélium <strong>unistratifié prismatique</strong> (= cellules allongées){" "}
        <em>[sauf œsophage]</em> au contact de la <strong>lumière du tube</strong>. On y trouve localement
        des <strong>cellules glandulaires exocrines</strong>. Des <strong>cellules endocrines</strong> sont
        également <strong>dispersées</strong>.
      </p>
      <Figure src={imgEpithelium} n="Schéma" legend="Épithélium prismatique unistratifié de la muqueuse digestive." />

      <div className="my-4 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="border-r border-border px-4 py-3 text-center font-semibold">
                Unistratifié prismatique
              </td>
              <td className="px-4 py-3 text-center italic">Pluristratifié pavimenteux</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H4 id="sec-1-2-1-b">b. Du tissu conjonctif lâche</H4>
      <p className="text-foreground/90 leading-relaxed">
        Qu'on peut appeler <em>lamina propria</em> ou <strong>chorion</strong>. On y trouve de{" "}
        <strong>nombreux vaisseaux sanguins plutôt fins</strong> ou encore des{" "}
        <strong>cellules immunitaires</strong> qui peuvent être regroupées en <strong>MALT</strong>{" "}
        (<em>mucosa-associated lymphoid tissues</em>, tissus lymphoïdes associés à la muqueuse), notamment
        dans l'<strong>intestin</strong> (qui est une porte potentielle d'entrée de nombreux pathogènes) où
        elles forment par exemple des <strong>plaques de PEYER</strong>.
      </p>
      <Figure src={imgLamina} n="Schéma" legend="Coupe : épithélium et lamina propria." />

      <Callout>
        <strong>Fonctions du tissu conjonctif :</strong>
        <ul className="mt-2 ml-5 list-disc space-y-1">
          <li>Enveloppe les organes</li>
          <li>Ses macrophagocytes phagocytent les bactéries</li>
          <li>Joue un rôle important dans la réaction inflammatoire</li>
          <li>Retient le liquide interstitiel</li>
          <li>Constitue un site d'échange entre le plasma sanguin et les cellules et vice versa</li>
        </ul>
      </Callout>

      <H4 id="sec-1-2-1-c">c. La muscularis mucosae</H4>
      <p className="text-foreground/90 leading-relaxed">
        La musculaire muqueuse qui est une <strong>couche fine</strong> d'<strong>orientation variée</strong>{" "}
        et dont <strong>la contraction permettrait les sécrétions depuis les cryptes</strong>.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <Figure
          src={imgMuscle1}
          n="Schéma"
          legend="Cellules fusiformes avec un noyau central ; absence de stries ; les cellules sont collées les unes aux autres et forment des feuillets."
        />
        <Figure src={imgMuscle2} n="Schéma" legend="Cellules musculaires lisses organisées en feuillets." />
      </div>

      <Figure
        src={fig4}
        n="FIGURE 4"
        legend="Histologie du tube digestif. Structure fondamentale du tube digestif : le tube digestif se compose de quatre couches principales — la muqueuse, la sous-muqueuse, la musculeuse et la séreuse."
      />

      <H3 id="sec-1-2-2">2. La sous-muqueuse</H3>
      <p className="text-foreground/90 leading-relaxed">
        Couche conjonctive <strong>plus dense</strong> (plus riche en collagène){" "}
        <strong>et riche en vaisseaux sanguins</strong> de diamètre plus important que dans la muqueuse. La
        présence d'un <Mark>plexus</Mark> (= ensemble de nerfs) dit <Mark>sous-muqueux</Mark> est à noter.
      </p>

      <Figure src={fig5} n="FIGURE 5" legend="Organisation simplifiée de la paroi gastro-intestinale." />

      <H3 id="sec-1-2-3">3. La musculeuse</H3>
      <p className="text-foreground/90 leading-relaxed">
        <strong>
          Couche de cellules musculaires lisses à l'origine de la motilité digestive et de la digestion
          mécanique
        </strong>{" "}
        qui comprend fondamentalement <strong>deux niveaux</strong> :
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-2 text-foreground/90">
        <li>
          Une couche de <strong>muscles circulaires</strong> qui permet plutôt la variation du diamètre du
          tube digestif et <strong>favorise la fragmentation des aliments</strong>.
        </li>
        <li>
          Une couche de <strong>muscles longitudinaux</strong> dont la contraction facilite plutôt l'avancée
          des aliments dans le tube digestif (<strong>péristaltisme</strong>).
        </li>
      </ul>

      <Callout type="note">
        <strong>Remarque :</strong>
        <ul className="mt-2 ml-5 list-disc space-y-1">
          <li>
            En réalité, les <strong>deux types de muscles</strong> lisses coopèrent à ces deux{" "}
            <strong>fonctions</strong> (fragmentation et péristaltisme).
          </li>
          <li>
            Entre les deux couches musculaires, on trouve un <strong>plexus</strong> dit ici{" "}
            <strong>myentérique</strong>.
          </li>
          <li>
            On peut trouver, par exemple dans l'<strong>estomac</strong>, une fine couche de{" "}
            <strong>muscles obliques</strong> au-dessus de la couche circulaire.
          </li>
        </ul>
      </Callout>

      <H3 id="sec-1-2-4">4. La séreuse</H3>
      <p className="text-foreground/90 leading-relaxed">
        <strong>Couche composée d'un mésothélium (épithélium pavimenteux simple).</strong> C'est la couche
        la plus externe du TD, c'est une couche de protection.
      </p>

      <Callout type="note">
        <strong>Remarque :</strong> Dans l'œsophage, on ne trouve pas de séreuse mais une adventice (il n'y
        a pas de mésothélium = il y a juste une couche conjonctive).
      </Callout>

      <Figure src={imgOesophage} n="Schéma" legend="Particularité de l'œsophage : absence de séreuse, présence d'une adventice." />
    </section>
  );
}

function Section1_3() {
  return (
    <section>
      <H2 id="sec-1-3">Partie 3 — III. Les régulations des processus digestifs</H2>
      <p className="text-foreground/90 leading-relaxed">
        Toutes les régulations qui s'opèrent sur le système digestif permettent d'optimiser les conditions
        digestives, c'est-à-dire <strong>d'absorber le maximum des nutriments présents</strong> : il n'y a
        pas (sauf pour quelques oligo-éléments) de régulation de la quantité de nutriments absorbés.
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1.5 text-foreground/90">
        <li>
          Les régulations sont exercées essentiellement par le <strong>système nerveux autonome</strong>.
        </li>
        <li>
          Les signaux déclenchant ces régulations sont la{" "}
          <strong>présence d'aliments dans le système digestif</strong>, ainsi que l'
          <strong>analyse chimique de ces aliments</strong>.
        </li>
        <li>
          Les voies utilisées pour conduire les informations sont <strong>d'ordre nerveux et endocrine</strong>.
        </li>
      </ul>

      <H3 id="sec-1-3-1">1. Système nerveux autonome</H3>

      <H4 id="sec-1-3-1-a">a. Système nerveux intrinsèque</H4>
      <p className="text-foreground/90 leading-relaxed">
        Le système nerveux entérique (SNE) est un système autonome capable de régler la majorité de ses
        fonctions sans aucun contrôle nerveux extrinsèque (non soumis au contrôle volontaire).
      </p>
      <p className="mt-2 text-foreground/90">Le SNE contrôle :</p>
      <ul className="ml-6 list-disc space-y-1 text-foreground/90">
        <li>le système digestif</li>
        <li>mais également les activités sécrétrices et motrices</li>
        <li>et il est en interaction avec les autres parties du système nerveux autonome</li>
      </ul>

      <p className="mt-4 text-foreground/90 leading-relaxed">
        Les deux principaux <em>plexus nerveux intrinsèques</em> des parois du tube digestif sont formés de
        500 millions de neurones entériques, soit presque 5 fois plus que la moelle épinière :
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-2 text-foreground/90">
        <li>
          <strong>le plexus myentérique (ou plexus d'Auerback)</strong> : ce plexus est situé entre les
          couches musculaires longitudinale et circulaire. Il est surtout{" "}
          <strong>responsable du contrôle de la motricité digestive</strong>.
        </li>
        <li>
          <strong>le plexus sous-muqueux (ou plexus de Meissner)</strong> : situé entre la couche musculaire
          circulaire et la muqueuse. Il est responsable essentiellement des sécrétions gastro-intestinales
          et du débit sanguin local.
        </li>
      </ul>

      <Figure src={imgPlexus} n="Schéma" legend="Plexus nerveux intrinsèques de la paroi du tube digestif (myentérique et sous-muqueux)." />

      <H4 id="sec-1-3-1-b">b. Système nerveux extrinsèque</H4>
      <p className="text-foreground/90 leading-relaxed">
        Bien que le système nerveux entérique puisse assurer la motilité du tube digestif à lui seul, le
        système digestif est également sous l'influence des systèmes nerveux :
      </p>

      <Callout>
        <strong>Système nerveux parasympathique :</strong> On peut dire que le tonus de base du tube
        digestif et des glandes annexes dépend du système parasympathique. L'innervation parasympathique
        fait intervenir le nerf pneumogastrique (nerf vague ou X) et le parasympathique sacré pour la
        partie terminale du gros intestin, le côlon descendant, le sigmoïde et le rectum (nerfs pelviens).
      </Callout>

      <p className="text-foreground/90 font-semibold">La stimulation parasympathique :</p>
      <ul className="ml-6 list-disc space-y-1.5 text-foreground/90">
        <li>
          augmente le péristaltisme de l'estomac et de l'intestin et relâche le sphincter de l'estomac, ce
          qui accélère la progression du contenu alimentaire du tube digestif ;
        </li>
        <li>
          augmente aussi les sécrétions exocrines des différentes glandes du tube digestif : glandes
          salivaires avec une salive fluide, estomac, intestin et pancréas ;
        </li>
        <li>
          au niveau de la vésicule biliaire, la stimulation parasympathique entraîne la contraction de la
          vésicule et augmente la motricité des voies biliaires.
        </li>
      </ul>

      <Callout>
        <strong>Système nerveux sympathique :</strong> la plupart des fibres sympathiques postganglionnaires
        proviennent des ganglions cœliaques ou mésentériques. Le sympathique a des effets inverses
        (inhibent le SNE, ce qui entraîne une diminution des contractions et du tonus du tube digestif à
        l'exception des sphincters). <u>Seule</u> une <em>forte stimulation sympathique</em> entraîne :
      </Callout>

      <ul className="ml-6 list-disc space-y-1.5 text-foreground/90">
        <li>une diminution du péristaltisme gastro-intestinal,</li>
        <li>et une contraction du sphincter pylorique,</li>
        <li>elle augmente la sécrétion des glandes salivaires, en produisant une salive épaisse, riche en amylase,</li>
        <li>
          elle est dépourvue d'effet sur les sécrétions exocrines de l'estomac et de l'intestin, et elle
          diminue la sécrétion exocrine du pancréas.
        </li>
      </ul>

      <Figure
        src={imgInnervationDetail}
        n="FIGURE"
        legend="Innervation parasympathique (gauche) et sympathique (droite). La partie gauche montre l'innervation parasympathique provenant des sorties cervicales et sacrées. Le côté droit montre l'innervation sympathique qui atteint l'estomac et l'intestin grêle via les fibres postganglionnaires du ganglion cœliaque (GC). Le côlon ascendant et la première partie du côlon transverse reçoivent une innervation sympathique via le ganglion mésentérique supérieur (GMS), tandis que les fibres sympathiques postganglionnaires du ganglion mésentérique inférieur (GMI) innervent la deuxième partie du côlon transverse, le côlon descendant et le rectum. Les fibres préganglionnaires sont indiquées en bleu et les fibres postganglionnaires en vert."
      />

      <Figure src={imgInnervation} n="FIGURE" legend="Innervation autonome de l'intestin." />

      <Figure
        src={imgSympPara}
        n="Schéma comparatif"
        legend="Système nerveux parasympathique vs sympathique : actions sur les organes cibles (pupille, salivation, bronchioles, fréquence cardiaque, activité gastro-intestinale, sécrétions pancréatiques, vésicule biliaire, vessie, organes génitaux)."
      />

      <H3 id="sec-1-3-2">2. La voie hormonale</H3>
      <p className="text-foreground/90 leading-relaxed">
        En plus de son innervation étendue, le tractus gastro-intestinal est régulé par un certain nombre
        d'hormones peptidiques qui agissent par des voies endocriniennes et/ou paracrines.
      </p>
      <p className="mt-2 text-foreground/90 leading-relaxed">
        Les cellules sécrétrices d'hormones ou entéro-endocrines sont disséminées dans la muqueuse. (Les
        cellules entéro-endocrines sont également connues sous l'acronyme APUD pour{" "}
        <em>amine precursor uptake and decarboxylation</em>).
      </p>
      <p className="mt-2 text-foreground/90 leading-relaxed">
        Le tractus gastro-intestinal utilise au moins 20 peptides régulateurs différents. Huit polypeptides
        connus pour leur action en tant qu'hormones (endocrines) circulantes sont énumérés ci-dessous,
        ainsi que la région de l'intestin d'où ils sont sécrétés :
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>gastrine (antre de l'estomac) ;</li>
        <li>sécrétine (duodénum) ;</li>
        <li>cholécystokinine (CCK) (duodénum) ;</li>
        <li>polypeptide pancréatique (pancréas) ;</li>
        <li>polypeptide inhibiteur gastrique (GIP) (jéjunum et duodénum) ;</li>
        <li>motiline (jéjunum et duodénum) ;</li>
        <li>
          glucagon-like peptides GLP-1 et GLP-2 (iléon et côlon), anciennement appelés entéroglucagons ;
        </li>
        <li>neurotensine (intestin grêle inférieur).</li>
      </ul>

      <Figure
        src={imgControle}
        n="FIGURE 15-3"
        legend="Schéma simplifié des dispositifs de contrôle du fonctionnement du tube digestif."
      />
    </section>
  );
}

/* ---------- Partie 4 — Physiologie de la digestion : la cavité buccale ---------- */

function Section1_4() {
  return (
    <section>
      <H2 id="sec-1-4">Partie 4 — Physiologie de la digestion : I. Dans la cavité buccale</H2>

      <H3 id="sec-1-4-1">1. Situation de la cavité buccale</H3>
      <p className="text-foreground/90 leading-relaxed">
        La cavité buccale est étendue de l'orifice buccal en avant, à l'oropharynx en arrière. Elle est
        comprise entre les maxillaires et les mandibules : fermée en avant par les lèvres, limitée
        latéralement par les joues, communiquant en arrière avec l'oropharynx par l'isthme du gosier
        (<Mark>Figure 1a</Mark>).
      </p>

      <Figure src={p2Fig1a} n="Figure 1a" legend="La cavité orale et pharynx, section sagittale." />
      <Figure src={p2Fig1b} n="Figure 1b" legend="La bouche." />

      <H3 id="sec-1-4-2">2. Prise alimentaire</H3>
      <p className="text-foreground/90 leading-relaxed">
        La prise alimentaire (= manducation) correspond à l'action d'ingérer des aliments et les
        processus qui s'ensuivent immédiatement dans la bouche (<Mark>Figure 1b</Mark>).
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        La cavité buccale est le lieu de deux processus principaux : la <strong>mastication</strong> et
        l'<strong>insalivation</strong>.
      </p>

      <H3 id="sec-1-4-3">3. Mastication : broyage mécanique par les mâchoires et la dentition</H3>

      <H4 id="sec-1-4-3-a">a. Définition de la mastication</H4>
      <p className="text-foreground/90 leading-relaxed">
        La mastication est le premier acte mécanique de la digestion et correspond à l'ensemble des
        mouvements volontaires de la mâchoire (structures opposables comprenant des os, et des dents),
        de la langue, et des joues qui entraîne la dilacération des aliments.
      </p>

      <H4 id="sec-1-4-3-b">b. Rôle de la mastication</H4>
      <ul className="ml-6 list-disc space-y-1 text-foreground/90">
        <li>Réduction de la taille des aliments</li>
        <li>Faciliter l'insalivation en augmentant la surface de contact des aliments broyés avec les enzymes</li>
        <li>Faciliter la déglutition des aliments</li>
      </ul>

      <H4 id="sec-1-4-3-c">c. Rôle de la langue</H4>
      <p className="text-foreground/90 leading-relaxed">
        <strong>La langue</strong> participe à la digestion en évaluant certaines qualités des
        substances ingérées. Elle joue un rôle crucial, puisqu'elle détermine quels aliments
        poursuivront leur chemin dans le tube digestif.
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Une fois la nourriture jugée acceptable, la mastication débute et les mouvements de la langue
        façonnent les aliments en une boule appelée <strong>bol alimentaire</strong>. Pendant la
        déglutition, la langue a également pour fonction de pousser le bol alimentaire vers l'arrière
        de la cavité buccale, dans le pharynx.
      </p>

      <Figure src={p2Fig2} n="Figure 2" legend="La langue." />

      {/* Tableau : Les papilles de la muqueuse de la langue */}
      <div className="my-5 overflow-hidden rounded-xl border border-border">
        <div className="bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
          Tableau — Les papilles de la muqueuse de la langue
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">Types</th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">Emplacement</th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">Fonctions</th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            <tr className="bg-muted/40">
              <td colSpan={3} className="px-3 py-2 font-semibold">Papilles gustatives</td>
            </tr>
            <tr>
              <td className="border-b border-border px-3 py-3 align-top font-medium">Caliciformes</td>
              <td className="border-b border-border px-3 py-3 align-top">
                Sur la partie supérieure de la langue, disposées en forme de V inversé
              </td>
              <td rowSpan={3} className="border-b border-border px-3 py-3 align-top">
                Perception des saveurs (amer, acide, sucré et salé). Récemment, on a reconnu la
                perception de la saveur <u>umami</u> (du japonais savoureux).
              </td>
            </tr>
            <tr>
              <td className="border-b border-border px-3 py-3 align-top font-medium">Fongiformes</td>
              <td className="border-b border-border px-3 py-3 align-top">Sur toute la surface de la langue</td>
            </tr>
            <tr>
              <td className="border-b border-border px-3 py-3 align-top font-medium">Foliées</td>
              <td className="border-b border-border px-3 py-3 align-top">Sur les bords latéraux de la langue</td>
            </tr>
            <tr className="bg-muted/40">
              <td colSpan={3} className="px-3 py-2 font-semibold">Papilles tactiles</td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top font-medium">Filiformes</td>
              <td className="px-3 py-3 align-top">Sur toute la surface de la langue</td>
              <td className="px-3 py-3 align-top">
                Perception des textures, de la température et de la douleur
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3 id="sec-1-4-4">4. Insalivation et glandes salivaires</H3>
      <p className="text-foreground/90 leading-relaxed">
        Les glandes salivaires déversent leurs sécrétions dans la cavité buccale par l'intermédiaire de
        canaux.
      </p>

      <Figure src={p2Fig3} n="Figure 3" legend="Les glandes salivaires : une vision simple. Glande salivaire parotide, dents, langue, glande salivaire sous-maxillaire, glande salivaire sublinguale, œsophage." />
      <Figure src={p2Fig3b} n="Figure 3b" legend="Schéma anatomique détaillé : glande parotide (canal parotidien), glande sous-maxillaire (canal de Wharton), glande sublinguale." />
      <Figure src={p2Fig3c} n="Figure 3c" legend="Glandes principales (90 % de la sécrétion) : Parotides (canal de Stenon), Sublinguales (canal de Bartholin), Sous-maxillaires (canal de Wharton). Glandes accessoires (10 % de la sécrétion) : glandes buccales." />

      <H4 id="sec-1-4-4-b">b. Rôles</H4>
      <p className="text-foreground/90 leading-relaxed">Cette insalivation permet :</p>
      <ul className="mt-2 ml-6 list-disc space-y-2 text-foreground/90">
        <li><strong>L'humidification du bol alimentaire</strong> (eau 99,5 %).</li>
        <li>
          Le <strong>début de la digestion chimique</strong> :
          <ul className="mt-1 ml-6 list-[circle] space-y-1">
            <li>
              La salive contient des <strong>amylases</strong> salivaires qui{" "}
              <strong>dégradent l'amidon en maltose</strong> (disaccharide glucose-glucose).
            </li>
            <li>
              <strong>Lipase</strong> : dégradation des graisses, agit en l'absence des sels biliaires
              et à pH 2,2 et 5.
            </li>
            <li><strong>Lysozyme</strong> : dégradation de la paroi des bactéries.</li>
            <li>
              <strong>Le mucus</strong> : rend les aliments visqueux, ce qui facilite la déglutition et
              recouvre la muqueuse buccale.
            </li>
            <li><strong>Autres</strong> : immunoglobuline, mucine, protéines plasmatiques (albumine)…</li>
          </ul>
        </li>
        <li>
          On peut noter la <strong>richesse de la salive</strong> en ions variés, et surtout en{" "}
          <strong>ions bicarbonates HCO₃⁻</strong> qui contribuent à maintenir un{" "}
          <strong>pH buccal neutre</strong> proche de 7-8.
        </li>
      </ul>

      {/* TABLEAU 4 — Les fonctions de la salive */}
      <div className="my-5 overflow-hidden rounded-xl border border-border">
        <div className="bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
          TABLEAU 4 — Les fonctions de la salive
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="border-b border-border px-3 py-2 text-left font-semibold w-1/3">Fonctions</th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            <tr>
              <td className="border-b border-border px-3 py-3 align-top font-medium">Perception des saveurs</td>
              <td className="border-b border-border px-3 py-3 align-top">• Prépare les aliments pour la gustation.</td>
            </tr>
            <tr>
              <td className="border-b border-border px-3 py-3 align-top font-medium">Digestion</td>
              <td className="border-b border-border px-3 py-3 align-top">
                • Humidifie la bouche pour assurer une bonne mobilité des organes buccaux.<br />
                • Prépare les aliments pour la déglutition.<br />
                • Entame le processus digestif en digérant les sucres complexes (amidon).
              </td>
            </tr>
            <tr>
              <td className="border-b border-border px-3 py-3 align-top font-medium">Protection de l'organisme</td>
              <td className="border-b border-border px-3 py-3 align-top">
                • Limite la prolifération des bactéries grâce à ses qualités antiseptiques.<br />
                • Modifie le niveau d'acidité dans la bouche, ce qui protège les dents de la carie.
              </td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top font-medium">Phonation</td>
              <td className="px-3 py-3 align-top">• Humidifie la bouche afin de faciliter la parole.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H4 id="sec-1-4-4-c">c. Contrôle</H4>
      <p className="text-foreground/90 leading-relaxed">Les stimulus les plus efficaces sont :</p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>les solutions acides diluées (jus de citron : 7 – 8 ml/min) ;</li>
        <li>
          le point de départ peut aussi être extra-buccal (phase pré-orale ou d'anticipation) :{" "}
          <strong>vue</strong>, <strong>odeur</strong>. Ces réflexes sont très conditionnables ; c'est le
          réflexe classique de Pavlov. Ces 2 premiers sens envoient des premiers messages au cerveau
          pour préparer la personne à manger (la prise), et notamment préparer sa déglutition efficace.
        </li>
      </ul>

      <Callout type="note">
        <strong>Remarque :</strong> Il n'y a pas de commande hormonale spécifique de la salivation.
      </Callout>

      <Figure src={p2Fig5b} n="Schéma" legend="Schéma de la régulation de la salivation : stimulus (acidité, vue, odeur, sens) → centres (chémorécepteurs et récepteurs à la pression de la paroi de la bouche / langue → bulbe rachidien) → para Σ (et un peu Σ) → glandes salivaires (parotides, sous-maxillaires, sublinguales) → salive (eau 99 %, sels + protéines 1 %, amylase, mucus)." />

      <Figure src={p2Fig446} n="Figure 44.6" legend="Principaux facteurs influençant la sécrétion de salive. La stimulation des nerfs parasympathiques (NPS) entraîne une production abondante de salive liquide, tandis que la stimulation des nerfs sympathiques (SNS) entraîne la production de salive épaisse et visqueuse." />

      <ul className="mt-3 ml-6 list-disc space-y-1.5 text-foreground/90">
        <li>
          Le <strong>parasympathique</strong> est le principal régulateur du volume salivaire ; il
          provoque une <strong>sécrétion salivaire de volume abondant</strong>, fluide et pauvre en
          protéines ; aqueuse par vasodilatation.
        </li>
        <li>
          Le <strong>sympathique</strong> provoque une{" "}
          <strong>sécrétion salivaire de volume réduit</strong>, visqueuse par vasoconstriction.
        </li>
      </ul>
    </section>
  );
}

/* ---------- Partie 5 — Pharynx (déglutition) et œsophage ---------- */

function Section1_5() {
  return (
    <section>
      <H2 id="sec-1-5">Partie 5 — II. Au niveau pharyngien : la déglutition &amp; III. Au niveau de l'œsophage</H2>

      <H3 id="sec-1-5-1">1. Pharynx : définition, fonctions et segments</H3>
      <p className="text-foreground/90 leading-relaxed">
        Le pharynx est un conduit musculo-membraneux allant de la base du crâne jusqu'à l'œsophage.
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>
          Situé au carrefour aéro-digestif : entre voies aériennes (de la cavité nasale au larynx) et
          voies digestives (de la cavité buccale à l'œsophage).
        </li>
        <li>
          Ouverture de la trompe d'Eustache (tube auditif) dans le pharynx : communication avec
          l'oreille moyenne au niveau de la caisse du tympan.
        </li>
      </ul>
      <p className="mt-3 text-foreground/90"><strong>Fonctions :</strong> déglutition, respiration, phonation, audition.</p>
      <p className="mt-2 text-foreground/90">
        <strong>Le pharynx est formé de 3 segments :</strong> Nasopharynx, Oropharynx et Laryngopharynx.
      </p>

      <H3 id="sec-1-5-2">2. Définition</H3>
      <p className="text-foreground/90 leading-relaxed">
        On peut appeler <strong>bol alimentaire</strong> un ensemble d'aliments mâchés et insalivés qui
        est ensuite avalé.
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        La <u>déglutition</u> (<Mark>figure 5</Mark>) est le processus qui permet d'avaler le bol
        alimentaire. C'est une action volontaire mais la suite est un réflexe et provoque une apnée.
      </p>

      <H3 id="sec-1-5-3">3. Régions anatomiques impliquées</H3>
      <p className="text-foreground/90 leading-relaxed">
        Les régions anatomiques impliquées dans la déglutition sont la cavité orale, le pharynx, le
        larynx et l'œsophage (<Mark>figure 4</Mark>).
      </p>
      <p className="mt-2 text-foreground/90 leading-relaxed">
        Les structures de la cavité orale sont les lèvres, les dents, le maxillaire, la mandibule, le
        plancher buccal et la langue.
      </p>

      <Figure src={p2Fig4} n="Figure 4" legend="Coupe sagittale des organes impliqués dans la déglutition (bolus d'aliments sur la langue, cavité nasale, langue, épiglotte fermant l'orifice du larynx, naso-pharynx, palais mou, oro-pharynx, laryngo-pharynx, œsophage)." />

      <Figure src={p2Fig5} n="Figure 5" legend="De la bouche à l'estomac : réflexe de déglutition et péristaltisme œsophagien." />

      <H3 id="sec-1-5-4">4. Physiologie de la déglutition</H3>
      <p className="text-foreground/90 leading-relaxed">
        La <strong>déglutition</strong> permet au bol alimentaire de passer de la bouche à l'estomac.
        Elle représente une suite d'actes stéréotypés <strong>sous le contrôle d'un centre bulbaire</strong>{" "}
        (tronc cérébral), qui fonctionne en étroite relation avec le centre de la respiration, afin de
        garantir le passage des aliments vers l'œsophage et celui de l'air vers le larynx et la trachée
        (<Mark>figure 5</Mark>).
      </p>

      <p className="mt-3 text-foreground/90">La déglutition comporte trois étapes :</p>
      <ul className="mt-2 ml-6 list-disc space-y-2 text-foreground/90">
        <li>
          une <strong>étape buccale volontaire</strong>, qui aboutit à déplacer le bol alimentaire
          jusqu'à l'arrière de la cavité orale dans l'oropharynx et met en jeu des mouvements de la
          langue, vers le haut et vers l'arrière contre le palais mou ;
        </li>
        <li>
          une <strong>étape pharyngienne</strong> ou passage involontaire (automatique) du bol
          alimentaire depuis l'oropharynx jusque dans l'œsophage, qui commence lorsque le bol
          alimentaire pénètre dans l'oropharynx. Ceci entraîne de façon réflexe l'élévation du voile du
          palais et de la luette pour fermer le nasopharynx, et l'élévation du larynx avec abaissement
          de l'épiglotte pour fermer la glotte et donc les voies respiratoires. La respiration est alors
          momentanément interrompue et le bol alimentaire traverse le pharynx pour atteindre l'œsophage
          en une ou deux secondes, puis les voies respiratoires s'ouvrent de nouveau et la respiration
          reprend ;
        </li>
        <li>
          une <strong>étape œsophagienne</strong> ou passage involontaire du bol alimentaire le long de
          l'œsophage jusqu'à l'estomac, qui commence après le franchissement du sphincter œsophagien
          supérieur qui a été relâché par l'élévation du pharynx.
        </li>
      </ul>

      {/* Tableau : la déglutition permet le passage du bol alimentaire dans l'œsophage */}
      <div className="my-5 overflow-hidden rounded-xl border border-border">
        <div className="bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
          Schéma — La déglutition permet le passage du bol alimentaire dans l'œsophage
        </div>
        <table className="w-full text-sm">
          <tbody className="text-foreground/90">
            <tr className="bg-muted/40">
              <td className="border border-border px-3 py-2 font-semibold">Fermeture des fosses nasales (remontée du palais mou)</td>
              <td className="border border-border px-3 py-2 font-semibold">Remontée du larynx (mouvement inconscient)</td>
              <td className="border border-border px-3 py-2 font-semibold">Ouverture du sphincter œsophagien supérieur</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 italic">Empêchant</td>
              <td className="border border-border px-3 py-2 italic">permettant</td>
              <td className="border border-border px-3 py-2 italic">Qui entraîne</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2">Remontée des aliments vers les fosses nasales</td>
              <td className="border border-border px-3 py-2">Fermeture de la glotte par l'épiglotte</td>
              <td className="border border-border px-3 py-2">Glissement du bol vers l'œsophage</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 italic">Empêchant</td>
              <td className="border border-border px-3 py-2"></td>
              <td className="border border-border px-3 py-2"></td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2"></td>
              <td className="border border-border px-3 py-2">Nourriture d'aller dans la trachée</td>
              <td className="border border-border px-3 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3 id="sec-1-5-5">5. Activité sphinctérienne</H3>
      <p className="text-foreground/90">4 sphincters sont présents le long du tube digestif :</p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>le sphincter œsophagien supérieur,</li>
        <li>le sphincter œsophagien inférieur à l'entrée de l'estomac,</li>
        <li>le sphincter pylorique à la sortie de l'estomac,</li>
        <li>le sphincter anal.</li>
      </ul>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Les contractions de ces sphincters, commandées par voies réflexes (sauf pour le sphincter anal
        externe qui est constitué de muscle squelettique activé volontairement), ont pour rôle de
        contrôler le passage du contenu d'une partie du tube digestif à une autre partie.
      </p>

      <H3 id="sec-1-5-6">6. Contrôle nerveux de la déglutition</H3>
      <p className="text-foreground/90 leading-relaxed">
        Le centre de la déglutition se situe dans le tronc cérébral.
      </p>

      <div className="my-5 overflow-hidden rounded-xl border border-border">
        <div className="bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
          Nerfs crâniens impliqués
        </div>
        <table className="w-full text-sm">
          <tbody className="text-foreground/90">
            <tr>
              <td className="border border-border px-3 py-2">Nerf maxillaire</td>
              <td className="border border-border px-3 py-2">Nerf ophtalmique (V1)</td>
              <td className="border border-border px-3 py-2">Nerf trijumeau (V)</td>
              <td className="border border-border px-3 py-2">Nerf mandibulaire (V3)</td>
              <td className="border border-border px-3 py-2">Nerf glosso-pharyngien</td>
              <td className="border border-border px-3 py-2">Nerf vague (X)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-foreground/90 leading-relaxed">
        C'est un réseau mal individualisé de neurones, à proximité du centre ventilatoire et du centre
        salivaire. Il est impossible de déglutir et de respirer simultanément. Il possède des
        interactions avec la phonation et la respiration. Tous les organes participant à la déglutition
        sont innervés par les V, VII, IX, X, XI et XII paires de nerfs crâniens. Leurs noyaux sensitifs
        et moteurs sont situés dans la protubérance et le bulbe rachidien.
      </p>

      <H4 id="sec-1-5-6-a">a. Phase orale (préparation et propulsion) — durée variable</H4>
      <p className="text-foreground/90 leading-relaxed">
        L'aliment, une fois en bouche, est mastiqué et insalivé ; de nouveaux messages sont envoyés au
        cerveau : la perception gustative et olfactive, l'information sensitive et sensorielle des
        caractéristiques physiques et chimiques du bol (volume, texture, glissé, goût, température,
        comestibilité…) — se produit donc la préparation du bol et la propulsion. Dès que la décision
        de pousser le bol vers l'isthme du gosier (ouverture par laquelle la cavité buccale communique
        en arrière avec le pharynx) est prise (décision volontaire ou automatico-volontaire), un ordre
        est envoyé au centre déglutition bulbaire de l'imminence de l'arrivée d'un corps étranger dans
        le pharynx. Ces informations alertent la personne qu'il a quelque chose dans la bouche et qu'il
        va falloir l'avaler.
      </p>

      <H4 id="sec-1-5-6-b">b. Phase laryngo-pharyngée — durée 0,5 à 0,7 seconde</H4>
      <p className="text-foreground/90 leading-relaxed">
        Les messages envoyés au cerveau lors des 2 premières phases vont permettre l'activité des
        muscles de la déglutition :
      </p>
      <ul className="ml-6 list-disc space-y-1 text-foreground/90">
        <li>protéger les poumons</li>
        <li>et envoyer les aliments vers l'estomac.</li>
      </ul>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        La <strong>première réponse motrice</strong> consiste alors à fermer les voies aériennes avant
        que le bolus n'arrive sur la base de langue. <strong>Ensuite la déglutition pharyngée
        s'active</strong> et le bolus est poussé vers l'œsophage.
      </p>

      <H4 id="sec-1-5-6-c">c. Phase œsophagienne — durée 0,8 à 3 secondes</H4>
      <p className="text-foreground/90 leading-relaxed">
        Le bol alimentaire progresse par des <strong>mouvements musculaires involontaires de péristaltisme</strong>.
      </p>

      <H3 id="sec-1-5-7">III. Au niveau de l'œsophage — Particularités histologiques</H3>
      <p className="text-foreground/90 leading-relaxed">
        L'œsophage (<Mark>figure 6</Mark>) est un conduit de 25 cm qui amène le bol alimentaire jusqu'à
        l'estomac à grande vitesse. Il est accolé à la trachée dans sa partie antérieure puis traverse
        le diaphragme et débouche dans l'estomac.
      </p>

      <Figure src={p2Fig6} n="Figure 6" legend="Organisation simplifiée de l'œsophage." />

      <ul className="mt-3 ml-6 list-disc space-y-2 text-foreground/90">
        <li>
          <strong>MUQUEUSE</strong> : épithélium pluristratifié pavimenteux comprenant une couche
          cornée se desquamant dans la partie proche de la lumière — rôle protecteur — et une couche
          de cellules germinatives à la base, qui assure le renouvellement constant de l'épithélium.
        </li>
        <li>Lamina propria = chorion.</li>
        <li>Muscularis mucosae (favorise l'évacuation du mucus jusqu'à la lumière).</li>
        <li>
          <strong>SOUS-MUQUEUSE</strong> : on peut y observer des glandes œsophagiennes d'organisation
          acineuse (ou tubulo-acineuse) sécrétant un mucus protecteur. [Le mucus est évacué par des
          canalicules qui traversent la lamina propria et l'épithélium, débouchant ainsi au niveau de
          la lumière]. On trouve également le plexus sous-muqueux.
        </li>
        <li>
          <strong>MUSCULEUSE</strong> : couche très épaisse (muscles circulaires + muscles
          longitudinaux) permettant la puissance et la rapidité du transit œsophagien du bol
          alimentaire. On trouve également le plexus myentérique.
        </li>
        <li>
          <strong>ADVENTICE</strong> : tissu conjonctif. La particularité est l'absence de mésothélium ;
          il n'y a donc pas de vraie séreuse.
        </li>
      </ul>

      <H3 id="sec-1-5-8">Motricité œsophagienne : péristaltisme</H3>
      <p className="text-foreground/90 leading-relaxed">
        On appelle <strong>péristaltisme</strong> l'ensemble des contractions musculaires permettant la
        progression du contenu du tube digestif vers sa partie distale.
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Le péristaltisme œsophagien (<Mark>figure 7</Mark>) est assuré par{" "}
        <strong>la contraction des muscles circulaires</strong> (situés immédiatement au-dessus et
        autour du bol) et <strong>le relâchement des muscles longitudinaux</strong> (situés autour de
        la partie inférieure et immédiatement au-dessous du bol).
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Les contractions se répètent et forment des <strong>ondes péristaltiques qui forcent le
        déplacement du bol</strong> vers l'estomac. L'avancée du bol est facilitée par le mucus
        sécrété par les glandes œsophagiennes situées dans la sous-muqueuse.
      </p>

      <Figure src={p2Fig7} n="Figure 7" legend="Péristaltisme œsophagien." />

      <Callout type="note">
        <strong>Remarque :</strong> les ondes péristaltiques sont liées à des{" "}
        <strong>alternances contraction–relâchement réflexe</strong> des différentes musculatures de la
        paroi.
      </Callout>

      <Callout type="note">
        <strong>Remarque :</strong> Au repos, l'œsophage n'a pas d'activité motrice.
      </Callout>

      {/* TABLEAU 7 — Les transformations digestives dans le pharynx et l'œsophage */}
      <div className="my-5 overflow-hidden rounded-xl border border-border">
        <div className="bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
          TABLEAU 7 — Les transformations digestives dans le pharynx et l'œsophage
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="border border-border px-3 py-2 text-left font-semibold" colSpan={3}>
                Transformations mécaniques*
              </th>
              <th className="border border-border px-3 py-2 text-left font-semibold">Résultat</th>
            </tr>
            <tr>
              <th className="border border-border px-3 py-2 text-left">Structure</th>
              <th className="border border-border px-3 py-2 text-left">Mouvement</th>
              <th className="border border-border px-3 py-2 text-left">Fonction</th>
              <th className="border border-border px-3 py-2 text-left" rowSpan={2}>
                Progression du bol alimentaire vers l'estomac
              </th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            <tr>
              <td className="border border-border px-3 py-2">• Œsophage</td>
              <td className="border border-border px-3 py-2">Péristaltisme</td>
              <td className="border border-border px-3 py-2">Propulse le bol alimentaire dans l'œsophage.</td>
            </tr>
          </tbody>
          <thead className="bg-muted">
            <tr>
              <th className="border border-border px-3 py-2 text-left font-semibold" colSpan={3}>
                Réaction tissulaire**
              </th>
              <th className="border border-border px-3 py-2 text-left font-semibold">Résultat</th>
            </tr>
            <tr>
              <th className="border border-border px-3 py-2 text-left">Structures</th>
              <th className="border border-border px-3 py-2 text-left">Sécrétion</th>
              <th className="border border-border px-3 py-2 text-left">Fonction</th>
              <th className="border border-border px-3 py-2 text-left">Glissement du bol alimentaire facilité</th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            <tr>
              <td className="border border-border px-3 py-2">• Pharynx<br />• Œsophage</td>
              <td className="border border-border px-3 py-2">Mucus</td>
              <td className="border border-border px-3 py-2">Humidifie la paroi du pharynx et de l'œsophage.</td>
              <td className="border border-border px-3 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground italic mt-2">
        * Dans cette étape du processus digestif, il n'y a pas de transformation mécanique, mais un
        simple mouvement propulsif permettant le déplacement du bol alimentaire.
        <br />
        ** Dans cette étape du processus digestif, il n'y a pas de véritable transformation chimique,
        mais la production d'une sécrétion qui favorise la suite du processus.
      </p>
    </section>
  );
}

/* ---------- Partie 6 — IV. La digestion gastrique ---------- */

function Section1_6() {
  return (
    <section>
      <H2 id="sec-1-6">Partie 6 — IV. La digestion gastrique</H2>

      <H3 id="sec-1-6-1">1. Anatomie de l'estomac</H3>

      <H4 id="sec-1-6-1-a">a. Morphologie de l'estomac</H4>
      <p className="text-foreground/90 leading-relaxed">
        L'estomac est un lieu de <strong>digestion chimique</strong>, notamment grâce à la sécrétion de{" "}
        <strong>suc gastrique</strong>, mais aussi de <strong>brassage mécanique</strong> important des
        aliments grâce à une <strong>musculeuse importante</strong>.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 my-4">
        <Figure src={p3Fig8a} n="Figure 8a" legend="Diagramme de l'estomac (fundus, corps, sphincters, pylore, duodénum)" />
        <Figure src={p3Fig8b} n="Figure 8b" legend="Schéma de l'estomac : œsophage, diaphragme, fundus, antrum, valve pylorique" />
      </div>
      <Figure src={p3Fig8c} n="Figure 8c" legend="Organisation de l'estomac et de sa paroi (coupe histologique)" />

      <p className="text-foreground/90 leading-relaxed mt-4">
        L'estomac est une poche située à gauche sous le diaphragme, en forme de « J » majuscule, de 25 cm
        de long sur 12 cm de large, présentant une grande courbure à gauche et une petite courbure à droite,
        du côté du foie. Il a une capacité de 1 à 1,5 litre. Il commence au cardia et se termine dans
        l'intestin par le pylore, muni d'un sphincter puissant (figure 8 a et b). La surface interne présente
        des plis profonds longitudinaux qui permettent une distension importante au cours du repas.
      </p>

      <p className="mt-3 text-foreground/90">D'un point de vue fonctionnel, on différencie trois zones :</p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>l'estomac proximal formé par le <strong>fundus</strong> (ou poche à air, en haut) ;</li>
        <li>le <strong>corps de l'estomac</strong> qui a un rôle de réservoir à activité sécrétoire importante ;</li>
        <li>l'estomac distal formé par l'<strong>antre pylorique</strong>, partie motrice jouant un rôle dans la fragmentation, l'homogénéisation des solides et la régulation du vidange du chyme gastrique vers le duodénum ;</li>
        <li>on peut y ajouter le <strong>cardia</strong> (orifice d'entrée faisant la jonction avec l'œsophage) et le <strong>pylore</strong> (sortie de l'estomac où un puissant sphincter contrôle l'ouverture/fermeture du conduit).</li>
      </ul>

      <H4 id="sec-1-6-1-b">b. Histologie de l'estomac</H4>
      <p className="text-foreground/90 leading-relaxed">La paroi gastrique est constituée (Figure 8c) :</p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>
          <strong>MUQUEUSE</strong> : épithélium unistratifié prismatique comprenant des cellules exocrines
          et endocrines (voire paracrines), particulièrement concentrées au fond des cryptes ou glandes
          gastriques.
        </li>
      </ul>

      <div className="my-4 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="border border-border px-3 py-2 text-left"></th>
              <th className="border border-border px-3 py-2 text-left">Cryptes</th>
              <th className="border border-border px-3 py-2 text-left">Glandes principales</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-3 py-2 font-semibold">Muqueuse de type fundique (Fundus)</td>
              <td className="border border-border px-3 py-2">Larges et peu profondes</td>
              <td className="border border-border px-3 py-2">
                Longues glandes tubulaires droites
                <ul className="ml-4 list-disc mt-1">
                  <li>Cellules principales</li>
                  <li>Cellules pariétales (bordantes)</li>
                  <li>Cellules neuroendocrines (ECL)</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 font-semibold">Muqueuse de type pylorique (Antre)</td>
              <td className="border border-border px-3 py-2">Étroites et profondes</td>
              <td className="border border-border px-3 py-2">
                Glandes tubulaires contournées
                <ul className="ml-4 list-disc mt-1">
                  <li>Cellules à mucus</li>
                  <li>Cellules neuroendocrines (G)</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li><strong>Lamina propria</strong> riche en fins vaisseaux favorisant les échanges (sécrétion d'hormones, apport des nutriments et ions nécessaires à la production des sécrétions).</li>
        <li><em>Muscularis mucosae</em> (favorise l'évacuation des sécrétions exocrines jusqu'à la lumière).</li>
        <li><strong>SOUS-MUQUEUSE</strong></li>
        <li><strong>MUSCULEUSE</strong> : couche épaisse (muscles obliques + circulaires + longitudinaux) permettant un important brassage mécanique du contenu.</li>
        <li><strong>SÉREUSE</strong> : tissu conjonctif + mésothélium.</li>
      </ul>

      <H3 id="sec-1-6-2">2. Physiologie</H3>

      <H4 id="sec-1-6-2-a">a. Sécrétions gastriques</H4>
      <p className="text-foreground/90 leading-relaxed">
        La sécrétion gastrique est caractérisée essentiellement par sa concentration élevée en{" "}
        <strong>acide chlorhydrique</strong> (Figure 9). Cette acidité permet :
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>de stériliser le bol alimentaire ;</li>
        <li>et d'initier la digestion, notamment des protéines alimentaires.</li>
      </ul>
      <p className="mt-3 text-foreground/90">
        L'ensemble de ces sécrétions exocrines de l'estomac s'appelle le <strong>suc gastrique</strong> :
        liquide acide, incolore et visqueux. Le volume quotidien sécrété varie entre 2 et 2,5 litres, et le
        débit est rythmé par les repas.
      </p>

      <Figure src={p3Fig9} n="Figure 9" legend="Diversité des types cellulaires et des sécrétions de l'épithélium gastrique" />

      <div className="my-4 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="border border-border px-3 py-2 text-left">Types cellulaires</th>
              <th className="border border-border px-3 py-2 text-left">Substance sécrétée</th>
              <th className="border border-border px-3 py-2 text-left">Stimulus de la sécrétion</th>
              <th className="border border-border px-3 py-2 text-left">Rôle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-3 py-2" rowSpan={2}>Cellule à mucus du col</td>
              <td className="border border-border px-3 py-2">Mucus</td>
              <td className="border border-border px-3 py-2">Sécrétion tonique ; irritation de la muqueuse</td>
              <td className="border border-border px-3 py-2">Barrière physique entre lumière et épithélium</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2">Bicarbonate</td>
              <td className="border border-border px-3 py-2">Sécrété avec le mucus</td>
              <td className="border border-border px-3 py-2">Tampon de l'acide gastrique pour empêcher l'atteinte de l'épithélium</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2" rowSpan={2}>Cellules pariétales</td>
              <td className="border border-border px-3 py-2">Acide gastrique (HCl)</td>
              <td className="border border-border px-3 py-2">Acétylcholine, gastrine, histamine</td>
              <td className="border border-border px-3 py-2">Activation de la pepsine ; destruction des bactéries</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2">Facteur intrinsèque</td>
              <td className="border border-border px-3 py-2">—</td>
              <td className="border border-border px-3 py-2">Complexe avec la vitamine B12 permettant son absorption</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2">Cellule entéro-chromaffine-like (ECL)</td>
              <td className="border border-border px-3 py-2">Histamine</td>
              <td className="border border-border px-3 py-2">Acétylcholine, gastrine</td>
              <td className="border border-border px-3 py-2">Stimulation de la sécrétion d'acide gastrique</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2" rowSpan={2}>Cellules principales</td>
              <td className="border border-border px-3 py-2">Pepsin(ogène)</td>
              <td className="border border-border px-3 py-2">Acétylcholine, acide, sécrétine</td>
              <td className="border border-border px-3 py-2">Digestion des protéines</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2">Lipase gastrique</td>
              <td className="border border-border px-3 py-2">—</td>
              <td className="border border-border px-3 py-2">Digestion des graisses</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2">Cellules D</td>
              <td className="border border-border px-3 py-2">Somatostatine</td>
              <td className="border border-border px-3 py-2">Acidité gastrique</td>
              <td className="border border-border px-3 py-2">Inhibition de la sécrétion acide gastrique</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2">Cellules G</td>
              <td className="border border-border px-3 py-2">Gastrine</td>
              <td className="border border-border px-3 py-2">Acétylcholine, peptides et acides aminés</td>
              <td className="border border-border px-3 py-2">Stimulation de la sécrétion acide gastrique</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H4 id="sec-1-6-2-b">b. Régulation de la sécrétion acide gastrique</H4>
      <p className="text-foreground/90 leading-relaxed">
        La sécrétion acide gastrique est modulée en permanence par voie endocrine, paracrine et exocrine.
      </p>
      <p className="mt-3 font-semibold">La sécrétion acide est stimulée par 3 substances :</p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li><strong>Acétylcholine</strong> : libérée par la stimulation du nerf vague. Elle agit directement sur les cellules pariétales (récepteurs M3) et indirectement en stimulant les cellules ECL et les cellules à gastrine.</li>
        <li><strong>Gastrine</strong> : produite par les cellules G. Elle agit par voie <strong>endocrine</strong> sur les cellules pariétales et sur les cellules ECL en stimulant la libération d'histamine.</li>
        <li><strong>Histamine</strong> : sécrétée par les cellules ECL. Elle agit par voie <strong>paracrine</strong>, en se fixant sur les récepteurs H2 des cellules pariétales.</li>
      </ul>
      <p className="mt-3 font-semibold">La sécrétion acide est inhibée par :</p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li><strong>La somatostatine</strong> : sa sécrétion par les cellules D est stimulée par l'augmentation de la concentration en H<sup>+</sup> dans la cavité gastrique ; action paracrine.</li>
        <li><strong>La sécrétine</strong> : hormone digestive duodénale, libérée dans la circulation sanguine (voie endocrine) en réponse à l'arrivée de nutriments dans le duodénum.</li>
      </ul>

      <Figure src={p3Fig10} n="Figure 10" legend="Contrôle de la sécrétion gastrique acide au niveau des cellules pariétales" />

      <H4 id="sec-1-6-2-c">c. Régulation de la sécrétion du pepsinogène</H4>
      <p className="text-foreground/90 leading-relaxed">
        La production de pepsinogène par les cellules principales débute en phase céphalique et se poursuit
        durant la phase gastrique ; elle est largement induite par la <strong>stimulation du nerf vague</strong>{" "}
        en présence d'<strong>acétylcholine</strong>. La <strong>gastrine</strong> peut aussi stimuler la
        sécrétion d'acide et la production de pepsinogène.
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>Le pepsinogène est transformé en pepsine sous l'action de HCl.</li>
        <li>La sécrétion de pepsinogène est <strong>inhibée</strong> par une diminution du <strong>pH &lt; 1,5</strong>, après inhibition de la gastrine par les <strong>somatostatines</strong>.</li>
      </ul>

      <Figure src={p3ProdSuc} n="Schéma" legend="Production du suc gastrique" />

      <H4 id="sec-1-6-2-d">d. Phases de la sécrétion gastrique</H4>
      <p className="text-foreground/90"><strong>En dehors du repas :</strong> le débit de sécrétion est faible, assuré essentiellement par les cellules muqueuses (mucus et bicarbonate) — suc de jeûne.</p>
      <p className="mt-2 text-foreground/90"><strong>Au moment du repas :</strong> la prise alimentaire déclenche une abondante sécrétion gastrique par augmentation du débit des cellules pariétales ; ces sécrétions se déroulent en 3 phases successives.</p>

      <Figure src={p3Phases} n="Schéma" legend="Phases de la sécrétion gastrique (céphalique, gastrique, intestinale)" />

      <H4 id="sec-1-6-2-d-1">▸ Phase céphalique</H4>
      <p className="text-foreground/90 leading-relaxed">
        Phase de régulation nerveuse (réflexe) et paracrine. Elle correspond à la phase « pré-repas » :
        elle est déclenchée par la pensée, la vue, l'odeur, le goût et le contact des aliments dans la
        bouche et l'œsophage. Il s'ensuit une stimulation du nerf vague.
      </p>

      <H4 id="sec-1-6-2-d-2">▸ Phase gastrique</H4>
      <p className="font-semibold mt-2">Mécanisme chimique</p>
      <p className="text-foreground/90 leading-relaxed">
        L'activation du nerf vague pendant la phase céphalique entraîne, pendant le repas, une{" "}
        <strong>augmentation de l'acétylcholine</strong> dans l'estomac, qui va <strong>activer</strong> :
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>les <strong>cellules pariétales</strong> responsables de la production d'HCl (augmentation de l'acidité) ;</li>
        <li>les <strong>cellules à gastrine</strong>, amplifiant ainsi le nombre de cellules pariétales activées.</li>
      </ul>
      <p className="mt-3 text-foreground/90">
        De plus, certaines <strong>substances alimentaires</strong> (calcium, acides aminés, polypeptides){" "}
        <strong>activent les cellules à gastrine par mécanisme endocrine</strong>, qui activent à leur tour
        les cellules pariétales (≈ 80 % de la sécrétion acide).
      </p>
      <p className="font-semibold mt-3">Mécanisme mécanique</p>
      <p className="text-foreground/90 leading-relaxed">
        L'estomac est pourvu de <strong>mécanorécepteurs sensibles à la distension</strong> : leur activation
        stimule la sécrétion acide par des réflexes locaux à médiation vagale.
      </p>
      <p className="font-semibold mt-3">Rétrocontrôle négatif</p>
      <p className="text-foreground/90 leading-relaxed">
        Les cellules pariétales sont aussi responsables de leur <strong>rétrocontrôle négatif</strong> via un
        mécanisme paracrine : l'augmentation de la concentration en H<sup>+</sup> active les cellules D pour
        la sécrétion de <strong>somatostatine</strong>, ce qui inhibe la sécrétion de gastrine et d'histamine,
        diminuant ainsi la production d'HCl et l'acidité de l'estomac.
      </p>

      <H4 id="sec-1-6-2-d-3">▸ Phase intestinale</H4>
      <p className="text-foreground/90 leading-relaxed">
        Une fois digérés dans l'estomac, les aliments traversent le pylore et rejoignent le duodénum. Ce
        dernier exerce un rétrocontrôle négatif sur la sécrétion acide gastrique via la production
        d'hormones comme la <strong>cholécystokinine</strong>, le <strong>VIP</strong>, le{" "}
        <strong>GIP</strong> et la <strong>sécrétine</strong>, qui inhibent la sécrétion acide gastrique
        par voie endocrine.
      </p>

      <H4 id="sec-1-6-2-e">e. Motricité gastrique</H4>
      <p className="text-foreground/90 leading-relaxed">
        L'estomac est constitué de deux zones fonctionnelles distinctes (proximale et distale), et la
        motricité gastrique varie selon les zones :
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li><strong>L'estomac proximal</strong> : a une fonction de réservoir et de vidange des liquides ; c'est la zone principale de sécrétion. Cette partie est caractérisée par une faible activité motrice mais une grande capacité d'adaptation.</li>
        <li><strong>L'estomac distal</strong> : fonctionne de manière coordonnée avec le sphincter pylorique et le duodénum ; il a une fonction marquée de broyage mécanique, de mélange avec les sucs gastriques et de contrôle de la vidange des solides, permettant une absorption optimale des nutriments dans l'intestin grêle (Fig. 11).</li>
      </ul>

      <div className="grid sm:grid-cols-3 gap-3 my-4">
        <Figure src={p3Fig11a} n="Figure 11A" legend="Accommodation (relaxation) puis vidange du fundus" />
        <Figure src={p3Fig11b} n="Figure 11B" legend="Remplissage de l'antre et brassage (pylore fermé)" />
        <Figure src={p3Fig11c} n="Figure 11C" legend="Péristaltisme antral et vidange gastrique (pylore ouvert)" />
      </div>

      <H4 id="sec-1-6-2-f">f. Les ondes et la vidange gastrique</H4>
      <p className="text-foreground/90 leading-relaxed">
        Il existe une zone <em>pacemaker</em> située au tiers supérieur du corps gastrique, qui génère des
        ondes péristaltiques lentes à raison de trois cycles par minute. Ces ondes forment des anneaux
        contractiles qui progressent jusqu'au pylore (figure 12).
      </p>

      <Figure src={p3Fig12} n="Figure 12" legend="Sens du péristaltisme" />

      <p className="text-foreground/90 leading-relaxed">L'arrivée de l'onde péristaltique dans l'antre pylorique provoque simultanément :</p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>l'ouverture du sphincter pylorique ;</li>
        <li>et la relaxation duodénale,</li>
      </ul>
      <p className="mt-2 text-foreground/90">permettant ainsi l'évacuation d'un petit volume de chyme gastrique liquide (3 mL).</p>
      <p className="mt-2 text-foreground/90">La fermeture du sphincter pylorique entraîne la rétropulsion du chyme (environ 27 mL) dans l'estomac.</p>
      <Callout>
        La vidange gastrique est un phénomène <strong>biphasique (bidirectionnel)</strong> permettant aux
        aliments d'être bien mélangés avec les sécrétions et d'être réduits en bouillie ou chyme.
      </Callout>

      <H4 id="sec-1-6-2-g">g. Contrôle de la motricité gastrique</H4>
      <p className="text-foreground/90 leading-relaxed">L'activité électrique myogène est modulée par :</p>

      <p className="mt-3 font-semibold">• Le système nerveux végétatif</p>
      <p className="text-foreground/90 leading-relaxed">
        Les influx <strong>parasympathiques</strong> stimulent le <strong>péristaltisme</strong> de
        l'estomac, en agissant principalement sur le plexus myentérique d'Auerbach, et{" "}
        <strong>relâchent le sphincter</strong>, ce qui favorise <strong>l'évacuation gastrique</strong>.
        Le sympathique a une action inverse, mais son rôle est modeste.
      </p>

      <div className="my-4 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <tbody>
            <tr><td className="border border-border px-3 py-2 font-semibold bg-muted">Tube digestif (lumière)</td></tr>
            <tr><td className="border border-border px-3 py-2">Récepteurs sensoriels</td></tr>
            <tr><td className="border border-border px-3 py-2">Plexus submuqueux</td></tr>
            <tr><td className="border border-border px-3 py-2">Plexus myentérique</td></tr>
            <tr><td className="border border-border px-3 py-2">Système nerveux central</td></tr>
            <tr><td className="border border-border px-3 py-2">Innervation sympathique et parasympathique</td></tr>
          </tbody>
        </table>
      </div>

      <p className="mt-3 font-semibold">• Les aliments</p>
      <p className="text-foreground/90 leading-relaxed">
        Le volume et la nature physique des aliments (liquide ou solide) jouent un rôle sur la distension
        fundique qui provoque l'inhibition du péristaltisme et retarde le début de la vidange gastrique.
      </p>
      <p className="mt-2 text-foreground/90 leading-relaxed">
        La composition chimique des aliments modifie la motricité gastrique : les lipides et les acides
        aminés augmentent la libération de cholécystokinine en phase duodénale, ce qui ralentit fortement
        la vidange gastrique.
      </p>

      <p className="mt-3 font-semibold">• D'autres facteurs</p>
      <p className="text-foreground/90 leading-relaxed">
        La douleur, le stress et les émotions ralentissent la vidange de l'estomac par un mécanisme
        d'inhibition centrale (efférences par le X).
      </p>
    </section>
  );
}

/* ---------- Partie 7 — V. Au niveau de l'intestin grêle ---------- */

function Section1_7() {
  return (
    <section>
      <H2 id="sec-1-7">Partie 7 — V. Au niveau de l'intestin</H2>

      <H3 id="sec-1-7-1">1. Anatomie de l'intestin grêle</H3>

      <H4 id="sec-1-7-1-a">a. Morphologie de l'intestin</H4>
      <p className="text-foreground/90 leading-relaxed">
        L'intestin grêle mesure 4 à 6 m de long. Il exerce deux fonctions : il achève la digestion du chyme
        provenant de l'estomac et absorbe les produits de cette digestion au niveau de ses nombreux replis.
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Il a un diamètre faible de 3 à 4 cm et est rattaché à la paroi postérieure de l'abdomen par le
        mésentère (double feuillet péritonéal). Il va du muscle sphincter pylorique, dans la région
        épigastrique, jusqu'à la valve iléo-cæcale située dans la région iliaque droite, où il rejoint le
        gros intestin et comprend :
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1.5 text-foreground/90">
        <li>
          <strong>le duodénum</strong> (étym. « 12 doigts », en lien avec sa longueur), long de 25 cm
          environ : c'est une chambre de mélange du chyme gastrique avec la bile sécrétée par le foie et
          le suc pancréatique. Il neutralise l'acidité du chyme stomacal et est également le siège d'une
          absorption peu régulée ;
        </li>
        <li>
          <strong>le jéjunum</strong> (étym. « en lien avec le jeûne », parce qu'il s'agit du lieu où se
          trouvent les aliments lors du jeûne, plusieurs heures après un repas) d'environ 2,5 m : c'est le
          principal site d'absorption des nutriments ;
        </li>
        <li>
          <strong>l'iléon ou iléum</strong> (du gr. <em>eilein</em>, enrouler) qui constitue la partie
          mobile repliée en anses intestinales. On y trouve les plaques de Peyer à rôle immunitaire ; long
          d'environ 3,5 m. Dans l'iléon existent des mécanismes d'absorption très spécifiques (vitamine
          B12, sels biliaires).
        </li>
      </ul>

      <Figure src={p3Fig13} n="Figure 13" legend="Régionalisation de l'intestin grêle : une vision simple" />

      <H4 id="sec-1-7-1-b">b. Histologie de l'intestin</H4>
      <p className="text-foreground/90 leading-relaxed">
        Du point de vue histologique, la paroi de l'intestin grêle comprend les couches caractéristiques
        du tube digestif (Figure 14). Cependant, elle présente aussi des spécificités favorisant sa
        fonction d'absorption en augmentant considérablement la surface de la muqueuse (environ 200 m²) :
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        <u>La muqueuse et la sous-muqueuse</u> forment des replis profonds appelés{" "}
        <strong>plis circulaires ou valvules conniventes</strong> (Figure 15a).
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>La muqueuse présente des expansions vers la lumière en forme de doigts de gants appelées : <strong>villosités</strong>.</li>
        <li>Les entérocytes de la muqueuse présentent au niveau de la membrane apicale des <strong>microvillosités</strong>. On appelle <Mark>bordure en brosse</Mark> cette ornementation en microvillosités des membranes d'entérocytes.</li>
      </ul>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Entre les villosités, des cryptes intestinales se prolongent jusqu'aux glandes de la muqueuse,
        dans lesquelles on trouve de nombreuses cellules endocrines (voire <Mark>paracrines</Mark>) et
        exocrines.
      </p>

      <Figure src={p3Fig14} n="Figure 14" legend="Organisation de la paroi de l'intestin grêle" />

      <p className="text-foreground/90 leading-relaxed">Les sécrétions exocrines comprennent :</p>
      <ul className="mt-2 ml-6 list-disc space-y-1.5 text-foreground/90">
        <li>
          le <strong>mucus intestinal</strong> sécrété par les <em>cellules à mucus</em> appelées{" "}
          <strong>cellules caliciformes</strong>. Ce mucus aurait surtout un rôle immunitaire (en limitant
          l'adhésion des micro-organismes sur la paroi intestinale) ;
        </li>
        <li>
          quelques <strong>enzymes</strong> soit sécrétées dans la lumière, soit le plus souvent exprimées
          à la surface des cellules (au niveau de la membrane des microvillosités).
        </li>
      </ul>
      <Callout>
        On parle parfois de « <Mark>suc intestinal</Mark> » pour désigner les sécrétions intestinales
        exocrines.
      </Callout>
      <p className="text-foreground/90 leading-relaxed">
        Enfin, au niveau du duodénum, des <strong>glandes de Brünner</strong> présentes dans la
        sous-muqueuse déversent un mucus alcalin dans la lumière du duodénum contribuant à neutraliser
        l'acidité du chyme acide déversé par l'estomac. Dans le <strong>reste de l'intestin</strong>, ces
        glandes sont <strong>rares</strong> voire <strong>absentes</strong>. La <strong>sous-muqueuse</strong>{" "}
        ne présente alors rien de particulier, si ce n'est son implication dans les valvules conniventes.
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1.5 text-foreground/90">
        <li>
          <em>Lamina propria</em> riche en <strong>fins vaisseaux sanguins</strong> favorisant les{" "}
          <strong>échanges</strong> et notamment l'<strong>absorption</strong> ; présence aussi de{" "}
          <Mark>chylifères</Mark> (capillaires lymphatiques situés dans les villosités de l'intestin
          grêle) (figure 15b).
        </li>
        <li><em>Muscularis mucosae</em> : favorise l'évacuation des <strong>sécrétions exocrines</strong> jusqu'à la lumière.</li>
      </ul>
      <p className="mt-3 text-foreground/90">
        <strong>MUSCULEUSE</strong> : couche assurant le <strong>péristaltisme</strong> et la{" "}
        <strong>segmentation</strong> du chyme.
        <br />
        <strong>SÉREUSE</strong> : tissu conjonctif + mésothélium.
      </p>

      <Figure
        src={p3Fig15a}
        n="Figure 15a"
        legend="Augmentation de la surface de la paroi de l'intestin grêle par trois niveaux de replis (plis circulaires, villosités, microvillosités)"
      />

      <div className="grid sm:grid-cols-2 gap-4 my-4">
        <Figure
          src={p3Fig15b1}
          n="Figure 15b"
          legend="Vascularisation sanguine et lymphatique d'une villosité"
        />
        <Figure
          src={p3Fig15b2}
          n="Figure 15b"
          legend="Gros plan sur une villosité et une crypte de Lieberkühn"
        />
      </div>
    </section>
  );
}

/* ---------- Partie 8 — Motricité, sécrétions et absorption intestinales ---------- */

function Section1_8() {
  return (
    <section>
      <H2 id="sec-1-8">Partie 8 — Motricité intestinale, sécrétions glandulaires &amp; absorption</H2>

      <H3 id="sec-1-8-1">2. Motricité intestinale</H3>
      <p className="text-foreground/90 leading-relaxed">
        La <strong>musculeuse intestinale</strong> assure une <em>avancée des aliments</em> par{" "}
        <Mark>péristaltisme</Mark> (figure 16) à une <strong>vitesse</strong> toutefois considérée comme{" "}
        <strong>lente</strong> (vitesse de l'ordre de 1 cm·min⁻¹), ce qui laisse le temps à la{" "}
        <strong>digestion</strong> et l'<strong>absorption</strong> de se réaliser.
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        On peut aussi noter que l'<strong>intestin grêle</strong> favorise aussi une digestion mécanique
        grâce à des mouvements de <Mark>segmentation</Mark> (figure 16).
      </p>
      <Figure src={p4Fig16} n="Figure 16" legend="Principaux mouvements de l'intestin grêle" />

      <H3 id="sec-1-8-2">3. Sécrétions glandulaires</H3>
      <p className="text-foreground/90 leading-relaxed">
        Le duodénum est en forme de C, entourant la tête du pancréas. Il mesure 20 à 25 cm de long. Sa
        lumière est la plus large de l'intestin grêle. Les différents types de sécrétions glandulaires
        sont présentés dans le Tableau 1.
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Les conduits qui apportent la bile du foie et le suc pancréatique en provenance du pancréas se
        rejoignent près du duodénum où ils forment un bulbe appelé{" "}
        <strong>ampoule hépato-pancréatique</strong> (ou ampoule de Vater), celle-ci s'ouvre dans le
        duodénum par <strong>la papille duodénale majeure</strong> (ou grande caroncule) — Figure 17.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 my-4">
        <Figure src={p4Fig17a} n="Figure 17a" legend="Anatomie du foie, de la vésicule biliaire, du pancréas et du duodénum" />
        <Figure src={p4Fig17b} n="Figure 17b" legend="Contrôle hormonal des sécrétions pancréatique et biliaire (CCK, sécrétine)" />
      </div>

      <p className="font-semibold text-foreground mt-4">
        Tableau 1 : Hormones et substances semblables aux hormones qui jouent un rôle dans la digestion
      </p>
      <div className="my-3 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="border border-border px-3 py-2 text-left">Hormone</th>
              <th className="border border-border px-3 py-2 text-left">Site de production</th>
              <th className="border border-border px-3 py-2 text-left">Stimulus de la production</th>
              <th className="border border-border px-3 py-2 text-left">Organe cible</th>
              <th className="border border-border px-3 py-2 text-left">Activité</th>
            </tr>
          </thead>
          <tbody className="align-top">
            <tr>
              <td className="border border-border px-3 py-2 font-semibold">Somatostatine</td>
              <td className="border border-border px-3 py-2">Muqueuse du duodénum</td>
              <td className="border border-border px-3 py-2">Aliments dans l'estomac ; stimulation par les neurofibres du SNS</td>
              <td className="border border-border px-3 py-2">Pancréas, intestin grêle, vésicule biliaire</td>
              <td className="border border-border px-3 py-2">
                <ul className="ml-4 list-disc space-y-1">
                  <li>Inhibe la sécrétion</li>
                  <li>Diminue la circulation sanguine dans le tube digestif et inhibe l'absorption intestinale</li>
                  <li>Inhibe la contraction de l'organe et la libération de la bile</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 font-semibold">Gastrine entérique</td>
              <td className="border border-border px-3 py-2">Muqueuse du duodénum</td>
              <td className="border border-border px-3 py-2">Aliments <strong>acides</strong> partiellement digérés dans le duodénum</td>
              <td className="border border-border px-3 py-2">Estomac</td>
              <td className="border border-border px-3 py-2">Stimule les glandes et la motilité gastriques</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 font-semibold">Sécrétine</td>
              <td className="border border-border px-3 py-2">Muqueuse du duodénum</td>
              <td className="border border-border px-3 py-2">Chyme <strong>acide</strong> (aussi protéines partiellement digérées, graisses, liquides hypertoniques et hypotoniques)</td>
              <td className="border border-border px-3 py-2">Estomac, pancréas, foie</td>
              <td className="border border-border px-3 py-2">
                <ul className="ml-4 list-disc space-y-1">
                  <li>Inhibe la sécrétion et la motilité gastriques</li>
                  <li>Accroît la sécrétion du suc pancréatique riche en bicarbonate, potentialise la CCK</li>
                  <li>Accroît la production de la bile</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 font-semibold">Cholécystokinine (CCK)</td>
              <td className="border border-border px-3 py-2">Muqueuse du duodénum et du jéjunum</td>
              <td className="border border-border px-3 py-2">Chyme <strong>gras</strong> en particulier, mais aussi protéines partiellement digérées</td>
              <td className="border border-border px-3 py-2">Foie, pancréas, vésicule biliaire, sphincter de l'ampoule hépato-pancréatique, estomac</td>
              <td className="border border-border px-3 py-2">
                <ul className="ml-4 list-disc space-y-1">
                  <li>Accroît la production de la bile</li>
                  <li>Potentialise l'action de la sécrétine</li>
                  <li>Stimule la contraction et l'expulsion de la bile</li>
                  <li>Relâche le sphincter pour permettre l'entrée de la bile et du suc pancréatique dans le duodénum</li>
                  <li>Inhibe l'activité sécrétoire de l'estomac</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 font-semibold">Peptide inhibiteur gastrique (GIP)</td>
              <td className="border border-border px-3 py-2">Muqueuse du duodénum</td>
              <td className="border border-border px-3 py-2">Chyme <strong>gras</strong> ou contenant du glucose</td>
              <td className="border border-border px-3 py-2">Estomac, pancréas (cellules β)</td>
              <td className="border border-border px-3 py-2">
                <ul className="ml-4 list-disc space-y-1">
                  <li>Inhibe la sécrétion et la motilité gastrique</li>
                  <li>Stimule la libération de l'insuline</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2 font-semibold">Peptide intestinal vasoactif (VIP)</td>
              <td className="border border-border px-3 py-2">Muqueuse du duodénum</td>
              <td className="border border-border px-3 py-2">Chyme contenant des aliments partiellement digérés</td>
              <td className="border border-border px-3 py-2">Duodénum, estomac, intestin</td>
              <td className="border border-border px-3 py-2">
                <ul className="ml-4 list-disc space-y-1">
                  <li>Stimule la sécrétion de tampons ; dilate les capillaires intestinaux</li>
                  <li>Inhibe la production de HCl</li>
                  <li>Détend les muscles lisses de l'intestin</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3 id="sec-1-8-3">4. Absorption intestinale</H3>
      <p className="text-foreground/90 leading-relaxed">
        Les sécrétions intestinales achèvent la digestion, mais leur volume est beaucoup moins important
        que celui des sécrétions hépatiques et pancréatiques. En effet, la fonction essentielle de
        l'intestin est l'absorption. L'absorption et le drainage diffèrent suivant la nature chimique des
        substances digérées. L'absorption intestinale est un processus opéré grâce aux entérocytes.
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Les entérocytes sont les cellules absorbantes de l'intestin, particulièrement abondantes dans
        l'intestin grêle où se réalise la quasi-totalité de l'absorption des nutriments chez la plupart
        des Mammifères.
      </p>

      <H4 id="sec-1-8-3-a">a. Ultrastructure des entérocytes</H4>
      <p className="text-foreground/90 leading-relaxed">
        L'ultrastructure des entérocytes est présentée à la figure 30. On peut noter :
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1.5 text-foreground/90">
        <li>L'allure prismatique des cellules, forme favorisant l'absorption et permettant d'assurer le <strong>tri</strong> de molécules variées.</li>
        <li>La <strong>présence</strong> de microvillosités augmentant la <strong>surface d'absorption</strong>.</li>
        <li>La <strong>présence</strong> de jonctions étanches (jonctions serrées) qui <strong>empêchent</strong> le passage latéral et imposent le <strong>passage par la voie transcellulaire</strong>. Ces jonctions assurent aussi la <strong>cohésion</strong> du tissu.</li>
        <li>Un <strong>noyau volumineux</strong> en lien avec l'<strong>activité de synthèse</strong> et de <strong>renouvellement</strong> d'enzymes, de transporteurs membranaires…</li>
      </ul>
      <Figure src={p4Fig18ent} n="Figure 18" legend="Ultrastructure d'un entérocyte" />

      <H4 id="sec-1-8-3-b">b. Absorption des nutriments</H4>
      <p className="text-foreground/90 leading-relaxed">
        La fonction d'absorption se fait du pôle apical avec microvillosités permettant le captage des
        nutriments vers le pôle basal avec une proximité avec les capillaires et les chylifères permettant
        le transfert des nutriments vers le sang ou la lymphe : le <strong>transfert des nutriments</strong>{" "}
        s'effectue toujours <em>de la lumière intestinale vers les fluides circulants</em>, soit dans le{" "}
        <Mark>sens apico-basal</Mark>.
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        L'eau, les sels minéraux, le glucose, les acides aminés <strong>pénètrent par diffusion</strong>{" "}
        dans les capillaires sanguins de la villosité. C'est la <strong>voie sanguine</strong> qui
        comprend : la veine porte, le foie, les veines sus-hépatiques, la veine cave inférieure,
        l'oreillette droite.
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Les produits de la digestion des graisses s'unissent aux sels biliaires et passent dans le
        chylifère central de la villosité. C'est la <strong>voie lymphatique</strong> qui transporte le{" "}
        <u>chyle</u> de couleur laiteuse liée à sa charge en lipides. Le <u>chyle</u> est déversé dans le
        sang au niveau de la veine cave supérieure. Les sels biliaires sont récupérés par le foie et
        reviennent à la bile.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 my-4">
        <Figure src={p4FigVillosite} n="Figure" legend="Villosité intestinale : capillaires sanguins et chylifère central" />
        <Figure src={p4FigVoies} n="Figure" legend="Les deux voies de l'absorption intestinale (sanguine et lymphatique)" />
      </div>
    </section>
  );
}

/* ---------- Partie 9 — VI. Le gros intestin ---------- */

function Section1_9() {
  return (
    <section>
      <H2 id="sec-1-9">Partie 9 — VI. Le gros intestin</H2>

      <H3 id="sec-1-9-1">1. Anatomie du gros intestin</H3>
      <p className="text-foreground/90 leading-relaxed">
        Le gros intestin, parfois appelé abusivement côlon au sens large, est un conduit large (env. 8 cm
        de diamètre chez l'homme adulte) et long d'1,5 m en moyenne qui constitue la dernière partie du
        tube digestif.
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Le <strong>gros intestin</strong> comprend plusieurs régions (<strong>figure 18</strong>) :
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1.5 text-foreground/90">
        <li><strong>Le caecum</strong> : partie proximale en avant de la valvule iléo-cæcale. Il se termine en cul-de-sac et se prolonge par l'<strong>appendice</strong> (rôle immunitaire et entretien de la flore bactérienne).</li>
        <li><strong>Le côlon</strong> (lui-même divisible en plusieurs régions) qui comprend l'essentiel de l'organe.</li>
        <li><strong>Le rectum</strong> : partie dont les contractions assurent l'égestion (évacuation des fèces).</li>
        <li><strong>L'anus</strong> : orifice par lequel s'écoulent les fèces ; un puissant sphincter en contrôle l'ouverture et la fermeture.</li>
      </ul>
      <Figure src={p4FigGros} n="Figure 18" legend="Vue antérieure du gros intestin" />

      <H3 id="sec-1-9-2">2. Histologie</H3>
      <p className="text-foreground/90 leading-relaxed">
        <strong>MUQUEUSE</strong> : épithélium unistratifié prismatique comprenant quelques cellules
        absorbantes (entérocytes), mais surtout des <em>cellules exocrines</em> (cellules à mucus ou{" "}
        <span className="text-blue-600">cellules caliciformes</span>) d'apparence cubique, particulièrement
        concentrées au fond des <span className="text-blue-600">cryptes</span> ou{" "}
        <span className="text-blue-600">glandes de Lieberkühn</span>, plus nombreuses que dans l'intestin
        grêle. Les sécrétions exocrines constituent surtout du{" "}
        <span className="text-blue-600">mucus intestinal</span> (Figure 19).
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li><em>Lamina propria</em>.</li>
        <li><em>Muscularis mucosae</em> (favorise l'évacuation des sécrétions exocrines).</li>
      </ul>
      <p className="mt-3 text-foreground/90">
        <strong>SOUS-MUQUEUSE</strong> : rien de particulier.<br />
        <strong>MUSCULEUSE</strong> : couche assurant le <u>péristaltisme</u>.<br />
        <strong>SÉREUSE</strong> : tissu conjonctif + mésothélium.
      </p>
      <Figure src={p4Fig19histo} n="Figure 19" legend="Anatomie du gros intestin et histologie de sa paroi" />

      <H3 id="sec-1-9-3">3. Physiologie du côlon</H3>
      <p className="text-foreground/90 leading-relaxed">
        Le côlon joue un rôle fondamental dans le contrôle du volume et de la composition ionique finale
        des selles. Il permet une réabsorption d'eau (Figure 20) et des électrolytes, sous le contrôle de
        différentes hormones.
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Il est très riche en bactéries, surtout anaérobies, qui participent :
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>à la digestion des protéines endogènes (peptidases bactériennes),</li>
        <li>au cycle entéro-hépatique de l'urée,</li>
        <li>à la fermentation de certains glucides,</li>
        <li>à la production de gaz intestinaux, dont H₂,</li>
        <li>et à la synthèse de certaines vitamines (B, K, acide folique).</li>
      </ul>

      <div className="grid sm:grid-cols-2 gap-4 my-4">
        <Figure src={p4Fig20eau} n="Figure 20" legend="Sécrétion et absorption d'eau au niveau du tube digestif" />
        <Figure src={p4FigRoles} n="Figure" legend="Rôles du côlon" />
      </div>

      <H3 id="sec-1-9-4">4. Les mouvements du côlon</H3>
      <ul className="mt-2 ml-6 list-disc space-y-1.5 text-foreground/90">
        <li><strong>Segmentation</strong> : une série de contractions en anneaux à intervalles réguliers brassent et mélangent les fèces sans les faire avancer.</li>
        <li><strong>Péristaltisme</strong> : les fèces sont poussées vers le rectum ; les muscles se contractent en amont et se relâchent en aval.</li>
        <li><strong>Mouvements de masse</strong> : contractions péristaltiques propulsant les fèces deux à trois fois par jour sur une distance assez longue.</li>
      </ul>
      <Figure src={p4FigMouv} n="Figure" legend="Les mouvements du côlon" />

      <H3 id="sec-1-9-5">5. La défécation</H3>
      <p className="text-foreground/90 leading-relaxed">
        La défécation correspond au rejet des produits non digérés. En situation normale, le rectum est
        vide. Suite aux mouvements de masse du côlon, le rectum se remplit, créant la distension de sa
        paroi captée par des mécanorécepteurs. Ceux-ci commandent un renforcement des contractions du
        côlon descendant par réflexe court, forçant les fèces à descendre vers l'anus. À leur tour,
        d'autres mécanorécepteurs captent cette information qui est intégrée au niveau médullaire et
        provoque par les efférences parasympathiques un relâchement du sphincter anal interne et la
        contraction des muscles lisses du rectum.
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Si la situation est appropriée, le sphincter anal externe (muscles striés squelettiques) se
        relâche et permet la défécation. Dans le cas contraire, le sphincter anal externe reste
        volontairement contracté, retardant alors la défécation.
      </p>
      <Figure src={p4FigDefecation} n="Figure" legend="Anatomie fonctionnelle de la défécation : sphincters interne et externe" />

      <H3 id="sec-1-9-6">6. Le microbiote intestinal</H3>
      <p className="text-foreground/90 leading-relaxed">
        Le tube digestif abrite une vaste diversité de micro-organismes (plus de 400 espèces) en nombre
        tout aussi vaste : de l'ordre de 10¹⁴ <strong>cellules bactériennes</strong> (plus que le nombre
        de nos propres cellules), soit une <strong>biomasse de 1 à 2 kg</strong>. Les relations établies
        entre les bactéries du tractus digestif et leur hôte sont des relations mutualistes, allant du{" "}
        <u>commensalisme</u> à une véritable <u>symbiose</u> (Figure 21).
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Les bactéries du tractus digestif ont plusieurs rôles positifs pour leur hôte :
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1.5 text-foreground/90">
        <li>Elles produisent des métabolites absorbables et utilisables par leur hôte, comme <strong>les vitamines B₁₂ et K</strong>.</li>
        <li>Certaines digèrent des biomolécules complexes pour former des composés assimilables. Exemple : <strong>digestion de polysaccharides (fibres)</strong> (figure 22).</li>
        <li>Elles participent à de nombreux processus de défense de l'hôte (ex. : <strong>protection vis-à-vis des bactéries pathogènes</strong>).</li>
        <li>Elles protègent de certains <strong>troubles fonctionnels intestinaux</strong> ou des problèmes d'allergie ou d'obésité.</li>
      </ul>

      <div className="grid sm:grid-cols-2 gap-4 my-4">
        <Figure src={p4Fig21} n="Figure 21" legend="Bactéries dans le tractus digestif (œsophage, estomac, intestin grêle, côlon)" />
        <Figure src={p4Fig22} n="Figure 22" legend="Rôles respectifs des enzymes humaines et du microbiote dans la digestion des glucides" />
      </div>

      <H3 id="sec-1-9-7">7. Composition des selles</H3>
      <H4 id="sec-1-9-7-a">a. Définition</H4>
      <p className="text-foreground/90 leading-relaxed">
        Les selles sont un produit résultant des mouvements de l'eau et des électrolytes, de la digestion
        des aliments et de l'absorption des nutriments dans l'intestin grêle, puis au niveau du côlon.
      </p>
      <H4 id="sec-1-9-7-b">b. Composition</H4>
      <p className="text-foreground/90 leading-relaxed">Les selles normales se composent :</p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>d'eau,</li>
        <li>d'éléments de cellulose indigestible,</li>
        <li>de quelques fibres de viande bien digérées,</li>
        <li>de quelques lipides sous forme de savons,</li>
        <li>d'acides gras,</li>
        <li>et de bactéries mortes pour la plupart.</li>
      </ul>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Leur analyse physique et biochimique permet de différencier l'origine fonctionnelle ou organique
        des diarrhées, constipation, alternance de ces deux phénomènes, météorisme et autres troubles
        intestinaux.
      </p>

      <H3 id="sec-1-9-8">8. Gaz intestinaux</H3>
      <H4 id="sec-1-9-8-a">a. Définition</H4>
      <p className="text-foreground/90 leading-relaxed">
        Les gaz intestinaux, aussi appelés flatulences, sont un phénomène physiologique dû à la production
        de gaz par les bactéries du côlon. Cette production provient principalement de la dégradation des
        hydrates de carbone non digérés par l'estomac et l'intestin grêle (oligosaccharides des fruits et
        légumes, amidon et fibres alimentaires) ; la quantité de gaz produite est variable d'un individu à
        l'autre.
      </p>
      <H4 id="sec-1-9-8-b">b. Composition</H4>
      <p className="text-foreground/90 leading-relaxed">
        L'analyse de la composition des gaz intestinaux se fait généralement par chromatographie gazeuse.
        Cinq gaz, sans odeur, comptent pour plus de 99 % des gaz émis par le rectum :
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1 text-foreground/90">
        <li>l'azote (N₂),</li>
        <li>l'hydrogène (H₂),</li>
        <li>l'oxygène (O₂),</li>
        <li>le dioxyde de carbone (CO₂),</li>
        <li>et le méthane (CH₄).</li>
      </ul>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        La proportion de chacun de ces gaz et leur débit sont variables. Selon la flore bactérienne
        colique et le régime, l'H₂ peut représenter jusqu'à 80 % du volume total de chaque émission.
      </p>
      <p className="mt-3 text-foreground/90 leading-relaxed">
        Par spectrométrie de masse, les composés soufrés (méthanethiol [MES], diméthylsulfides [DMS] et
        sulfure d'hydrogène [H₂S]) ont été identifiés comme à l'origine des gaz malodorants, normalement
        présents à l'état de traces. Le sulfure d'hydrogène est le principal composé soufré responsable de
        l'odeur des gaz rectaux.
      </p>
    </section>
  );
}

/* ============ PARTIE 10 — Vue d'ensemble des sécrétions digestives ============ */
function Section1_10() {
  return (
    <section>
      <H2 id="sec-1-10">Partie 10 — 1. Une vue d'ensemble des sécrétions digestives</H2>
      <p className="text-foreground/90 leading-relaxed">
        Les macromolécules du vivant sont dépolymérisées par des enzymes spécifiques contenues dans les
        sécrétions digestives (ou situées à la surface des entérocytes), <strong>Tableau 2</strong>.
      </p>
      <div className="my-6 overflow-x-auto">
        <p className="text-sm font-semibold text-foreground mb-2">
          Tableau 2 — Sécrétions digestives et leurs principales enzymes
        </p>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-teal-50">
              <th className="border border-border p-2 text-left w-40">Sécrétion</th>
              <th className="border border-border p-2 text-left">Composants et rôles</th>
            </tr>
          </thead>
          <tbody className="[&_td]:border [&_td]:border-border [&_td]:p-2 align-top">
            <tr>
              <td className="font-semibold">Salive</td>
              <td>
                • <strong>Amylase</strong> : hydrolyse l'amidon (polymère de glucose) en maltose<br />
                • <strong>Bicarbonates</strong> : maintiennent le pH entre 7 et 8
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Suc gastrique</td>
              <td>
                • <strong>HCl</strong> : acidifie le chyme (le pH descend à 2)<br />
                • <strong>Pepsinogène</strong> : transformé en <strong>pepsine</strong> par HCl ; la
                pepsine hydrolyse les protéines
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Suc pancréatique</td>
              <td>
                • <strong>Bicarbonates</strong> : ramènent le pH à une valeur neutre<br />
                • <strong>Trypsine, chymotrypsine, carboxypeptidase</strong> : hydrolysent les protéines<br />
                • <strong>Lipase</strong> : hydrolyse les lipides en acides gras et monoglycérides<br />
                • <strong>Amylase</strong> : poursuit l'hydrolyse de l'amidon en maltose<br />
                • <strong>Ribonucléase, désoxyribonucléase</strong> : hydrolysent ARN et ADN
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Bile</td>
              <td>
                • <strong>Sels biliaires</strong> : facilitent l'émulsification des lipides et la
                formation des micelles
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Suc intestinal</td>
              <td>
                • <strong>Maltase, saccharase, lactase</strong> : hydrolysent maltose, saccharose et
                lactose en sucres simples (glucose, fructose, galactose...)<br />
                • <strong>Dipeptidase</strong> : hydrolysent les dipeptides en acides aminés
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ============ PARTIE 11 — Métabolisme des glucides ============ */
function Section1_11() {
  return (
    <section>
      <H2 id="sec-1-11">Partie 11 — 2. Métabolisme des glucides</H2>

      <H3 id="sec-1-11-a">a. Contenu de la ration alimentaire en glucides</H3>
      <p className="text-foreground/90 leading-relaxed">
        La ration alimentaire quotidienne contient environ <strong>400 g de glucides</strong>. La majorité,
        soit <Mark>80 %</Mark>, est sous forme de hauts polymères du glucose, surtout des{" "}
        <strong>amidons</strong> présents dans tous les aliments d'origine végétale et un peu de{" "}
        <strong>glycogène</strong> d'origine animale, et de la <strong>cellulose</strong> qui constitue
        une fibre alimentaire indigeste pour l'homme. Les 20 % restants sont sous forme de{" "}
        <strong>disaccharides</strong> (saccharose, maltose, lactose). Le <strong>fructose</strong> est le
        seul sucre présent en petites quantités sous forme de monosaccharide.
      </p>

      <H3 id="sec-1-11-b">b. Digestion des glucides</H3>
      <p className="text-foreground/90 leading-relaxed">
        La digestion de l'amidon ou du glycogène s'opère grâce à l'<u>amylase salivaire</u> et surtout
        l'<u>amylase pancréatique</u> qui produisent toutes deux des petits oligomères de glucose et du{" "}
        <strong>maltose</strong> (disaccharide glucose-glucose).
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Les <strong>disaccharides</strong> (saccharose, maltose, lactose) sont, quant à eux, digérés par
        des <strong>enzymes spécifiques de la bordure en brosse</strong> (maltases, saccharases...). On
        obtient à la fin surtout des sucres simples (glucose, fructose...) même si certains disaccharides
        peuvent être absorbés (Figure 23).
      </p>
      <Figure src={p5Fig23} n="Figure 23" legend="Digestion des glucides." />

      <H3 id="sec-1-11-c">c. Localisation de l'absorption</H3>
      <p className="text-foreground/90 leading-relaxed">
        <strong>L'absorption des sucres est pratiquement totale dès la première moitié du jéjunum.</strong>
      </p>
      <p className="text-foreground/90 leading-relaxed">
        <strong>La cellulose</strong> reste intacte jusqu'au côlon, où elle est attaquée par la flore
        bactérienne avec production d'acides gras à chaîne courte, d'H₂ et de CO₂. Elle forme un ballast
        dans l'intestin grêle, jouant le rôle de fibres inertes qui retiennent l'eau.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        De même, <strong>la pectine</strong> est constituée de polysaccharides plus ou moins complexes,
        qui forment des gels en phase aqueuse, augmentant la viscosité du bol alimentaire.
      </p>

      <H3 id="sec-1-11-d">d. Voies d'absorption (systèmes de transport)</H3>
      <H4 id="sec-1-11-d1">d1. Les monosaccharides : Glucose – Galactose</H4>
      <p className="text-foreground/90 leading-relaxed">
        L'absorption des monosaccharides (glucose, galactose) est surtout assurée par la voie{" "}
        <strong>transcellulaire</strong>, grâce aux transporteurs <strong>SGLUT1</strong> situés dans les
        membranes de l'entérocyte (Figure 24) : <strong>cotransport avec des Na⁺ (transport actif)</strong>.
        Son activité est déterminée par la pompe Na⁺/K⁺-ATPase de la membrane basolatérale, qui maintient
        une concentration de Na⁺ faible dans la cellule.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Les monosaccharides peuvent aussi diffuser <strong>passivement par voie paracellulaire</strong> à
        travers les jonctions serrées, surtout dans le duodénum, en fonction des gradients de
        concentration.
      </p>
      <Figure src={p5Fig24} n="Figure 24" legend="Absorption des monosaccharides." />
      <p className="text-foreground/90 leading-relaxed">
        Tous les monosaccharides quittent les cellules épithéliales par <strong>diffusion facilitée</strong>{" "}
        grâce au transporteur <strong>GLUT2</strong> et pénètrent dans le sang par les capillaires des
        villosités, ensuite transportés jusqu'au foie par la veine porte hépatique.
      </p>

      <H4 id="sec-1-11-d2">d2. Fructose</H4>
      <p className="text-foreground/90 leading-relaxed">
        Le fructose est pris en charge par un transporteur spécifique, localisé dans la membrane apicale,{" "}
        <strong>GLUT5</strong>, qui permet une <strong>diffusion facilitée</strong>. Le franchissement de
        la membrane basolatérale est assuré par GLUT2. L'absorption du fructose ne dépend donc pas du Na⁺
        (Figure 24).
      </p>

      <H4 id="sec-1-11-d3">d3. Disaccharides</H4>
      <p className="text-foreground/90 leading-relaxed">
        Les disaccharidases intestinales agissent sur les disaccharides et sont présentes sur les
        membranes des entérocytes :
      </p>
      <ul className="ml-6 list-disc space-y-1 text-foreground/90">
        <li>α-Glucosidase (ou sucrase) hydrolyse le maltose en glucose.</li>
        <li>L'invertase (ou β-fructosidase) hydrolyse le saccharose en glucose et fructose.</li>
        <li>La lactase (β-galactosidase) hydrolyse le lactose en galactose et glucose.</li>
      </ul>

      <H3 id="sec-1-11-e">e. Destinée et anabolisme</H3>
      <p className="text-foreground/90 leading-relaxed">
        Une petite partie des monosaccharides est utilisée in situ par l'entérocyte, mais la majorité est
        drainée par voie sanguine et conduite au foie pour y être stockée sous forme de glycogène.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Il pourra également être utilisé directement par les cellules en manque d'énergie : le glucose est
        dégradé dans le cytosol puis dans la mitochondrie en CO₂, H₂O et ATP.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Lors d'une trop grande assimilation de sucres, le foie est saturé, obligeant l'organisme à les
        stocker sous forme de graisse au niveau des tissus adipeux. Lorsque l'organisme en a à nouveau
        besoin, le foie est responsable de la fabrication de glucose à partir de substances
        non-glucidiques : <strong>néoglucogenèse</strong>, ou à partir du glycogène :{" "}
        <strong>glycogénolyse</strong>.
      </p>
    </section>
  );
}

/* ============ PARTIE 12 — Métabolisme des protéines ============ */
function Section1_12() {
  return (
    <section>
      <H2 id="sec-1-12">Partie 12 — 3. Métabolisme des protéines</H2>

      <H3 id="sec-1-12-a">a. Les sources protéiques</H3>
      <p className="text-foreground/90 leading-relaxed">
        Les protéines fournissent l'azote indispensable à la croissance et au renouvellement cellulaire.
        Elles sont <strong>d'origine exogène alimentaire et endogène</strong>. Les apports alimentaires
        quotidiens se situent entre 70 et 100 g et représentent 13 à 16 % de la ration calorique, bien
        au-delà des besoins recommandés.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        La digestibilité de ces protéines dépend de nombreux facteurs : leur origine (animale ou végétale),
        le type de protéines, les modes de cuisson et de conservation.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Il faut y ajouter <strong>75 g/j de protéines endogènes</strong> (≈35 g/j pour les enzymes et
        glycoprotéines des sucs salivaire, gastrique, pancréatique et intestinal, 10 g/j pour les
        protéines de la bile et ≈30 g/j pour les protéines apportées par la desquamation de l'intestin).
      </p>

      <H3 id="sec-1-12-b">b. Digestion des protéines</H3>
      <p className="text-foreground/90 leading-relaxed">
        La digestion des protéines est initiée dans l'estomac sous l'action de l'acide chlorhydrique et
        des pepsines, puis poursuivie dans le duodénum par les protéases pancréatiques (trypsine,
        chymotrypsine...) particulièrement actives (Figure 25).
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Elle se poursuit dans l'intestin grêle au niveau de la bordure en brosse des entérocytes, qui
        contient de nombreuses peptidases coupant les oligopeptides et les protéines non digérées en
        acides aminés, dipeptides et tripeptides absorbables.
      </p>
      <Callout type="note">
        <strong>Remarque :</strong> on distingue les <em>exopeptidases</em> qui dépolymérisent les
        protéines par les extrémités, et les <em>endopeptidases</em>, majoritaires, qui scindent les
        protéines à l'intérieur de la chaîne (en reconnaissant des AA spécifiques).
      </Callout>
      <Figure src={p5Fig25} n="Figure 25" legend="La digestion des protides : étapes successives (estomac → intestin grêle)." />
      <Figure src={p5Fig25b} n="Figure 25 (suite)" legend="Action des endopeptidases et exopeptidases (aminopeptidase, carboxypeptidase) sur les peptides." />

      <H3 id="sec-1-12-c">c. Localisation et absorption des peptides et des acides aminés</H3>
      <p className="text-foreground/90 leading-relaxed">
        L'absorption <strong>se fait dans l'intestin grêle</strong> grâce à de nombreux systèmes de
        transport :
      </p>
      <ul className="ml-6 list-disc space-y-1 text-foreground/90">
        <li>
          Les <strong>acides aminés</strong> sont absorbés par <u>au moins sept systèmes de transport
          différents</u>, dont cinq dépendants du gradient de Na⁺ (Figure 26).
        </li>
        <li>
          Certains <strong>oligopeptides</strong> (di- et tripeptides) sont absorbés par cotransport des
          ions H⁺ et sont transformés en acides aminés par hydrolyse intracellulaire.
        </li>
      </ul>
      <p className="text-foreground/90 leading-relaxed">
        <strong>Les acides aminés quittent les cellules épithéliales par diffusion facilitée</strong> et
        pénètrent dans le sang par les capillaires des villosités, transportés jusqu'au foie par la veine
        porte hépatique.
      </p>
      <Figure src={p5Fig26} n="Figure 26" legend="Absorption des acides aminés (transports actifs secondaires Na⁺-dépendants, Na⁺/K⁺-ATPase)." />
      <Callout type="note">
        <strong>Remarque :</strong> l'absorption intestinale des acides aminés ou petits peptides se fait
        pratiquement exclusivement dans le jéjunum. Le côlon peut digérer et absorber les protéines
        bactériennes.
      </Callout>

      <H3 id="sec-1-12-d">d. Devenir et anabolisme</H3>
      <p className="text-foreground/90 leading-relaxed">
        La plus grande partie des peptides absorbés dans l'entérocyte est hydrolysée par les peptidases
        intracellulaires en acides aminés. Ceux-ci sont en majorité rejetés dans le sang mésentérique
        grâce à des systèmes de transport indépendants du Na⁺, localisés dans la membrane basolatérale,
        et gagnent le foie par la veine porte. L'entérocyte utilise surtout la glutamine et plus
        faiblement le glutamate, l'aspartate et l'arginine.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Les cellules utilisent les acides aminés pour la synthèse des protéines de l'organisme. Les
        fonctions de ces protéines sont diverses : structurale (collagène), enzymatique (pepsine), motrice
        (actine, myosine), de transport (lipoprotéines), hormonale (insuline), immunitaire
        (immunoglobulines), informationnelle (récepteurs)...
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Les <strong>malabsorptions intestinales</strong> qui touchent les protéines ont des conséquences
        graves. L'intolérance au gluten est responsable de la <strong>maladie cœliaque</strong>.
      </p>
    </section>
  );
}

/* ============ PARTIE 13 — Métabolisme des lipides ============ */
function Section1_13() {
  return (
    <section>
      <H2 id="sec-1-13">Partie 13 — 4. Métabolisme des lipides</H2>

      <H3 id="sec-1-13-a">a. La ration alimentaire</H3>
      <p className="text-foreground/90 leading-relaxed">
        La ration alimentaire lipidique est de <strong>60 à 150 g/j</strong>, soit 36 à 42 % (au lieu de
        30 à 35 % recommandé) de la ration calorique. Les <strong>triglycérides</strong> représentent 80 %
        de cette ration.
      </p>

      <H3 id="sec-1-13-b">b. Digestion des lipides</H3>
      <p className="text-foreground/90 leading-relaxed">
        La digestion intraluminale commence dans l'estomac, dont les mouvements de brassage favorisent
        l'émulsion lipidique. Elle nécessite l'intervention des différentes <strong>enzymes gastriques et
        pancréatiques</strong> (triglycéride lipase, phospholipase A2, cholestérol estérase) pour libérer
        les éléments constitutifs des différentes classes de lipides (Figure 27). <strong>Les sels
        biliaires</strong> sont indispensables : à partir d'une certaine concentration, les lipides se
        regroupent avec les sels biliaires en <strong>micelles</strong>.
      </p>
      <ul className="ml-6 list-disc space-y-2 text-foreground/90">
        <li>
          <strong>Une lyse enzymatique :</strong> les triglycérides commencent à être digérés dans
          l'estomac sous l'action de la lipase gastrique (et linguale), active en milieu acide surtout sur
          les émulsions de TG à chaîne moyenne. Ainsi, 20 % des triglycérides sont hydrolysés en
          monoglycérides et acides gras.
        </li>
      </ul>
      <Figure src={p5Fig27a} n="Figure 27a" legend="Émulsification des lipides par les sels biliaires." />
      <Figure src={p5Fig27b} n="Figure 27b" legend="Digestion des lipides : de la bouche à l'intestin grêle." />
      <Figure src={p5Fig27c} n="Figure 27c" legend="Digestion des triglycérides en monoglycérides et acides gras libres." />
      <ul className="ml-6 list-disc space-y-2 text-foreground/90">
        <li>
          <strong>Une émulsion</strong> (mélange intime de deux liquides non miscibles : milieu aqueux et
          lipides hydrophobes/amphiphiles) au moyen des sels biliaires. Dans l'intestin grêle,
          l'hydrolyse des émulsions de TG se poursuit sous l'action de la <strong>lipase pancréatique</strong>,
          active à l'interface huile/eau grâce à la <strong>colipase pancréatique</strong>. Des
          monoglycérides et des acides gras sont formés.
        </li>
        <li>
          Les <strong>phospholipides</strong> sont digérés dans l'intestin grêle à l'intérieur des
          micelles, sous l'action de la <strong>phospholipase A2</strong> pancréatique, libérant
          lysophospholipides et acides gras.
        </li>
        <li>
          Le <strong>cholestérol libre</strong> est libéré à partir des esters de cholestérol sous
          l'action de la <strong>cholestérol estérase pancréatique</strong>.
        </li>
      </ul>

      <H3 id="sec-1-13-c">c. Absorption intestinale des lipides</H3>
      <p className="text-foreground/90 leading-relaxed">
        Les acides gras et les monoglycérides, arrivés au contact de la membrane apicale, pénètrent dans
        l'entérocyte par <strong>diffusion passive</strong> (Figure 28).
      </p>
      <Figure src={p5Fig28} n="Figure 28" legend="Absorption des acides gras dans les cellules épithéliales : digestion des micelles, transport des chylomicrons vers le vaisseau chylifère." />
      <ul className="ml-6 list-disc space-y-2 text-foreground/90">
        <li>
          Dans les cellules, acides gras et monoglycérides se recombinent pour former des triglycérides
          (REL), puis sont combinés à d'autres lipides et à des protéines pour former des{" "}
          <strong>chylomicrons</strong> (complexe golgien), expulsés des cellules par <strong>exocytose</strong>.
        </li>
        <li>
          Les <strong>chylomicrons passent dans les vaisseaux chylifères</strong> des villosités et{" "}
          <strong>sont transportés avec la lymphe</strong> par le conduit thoracique jusqu'à la circulation
          systémique.
        </li>
        <li>
          <strong>Remarque :</strong> certains acides gras à chaîne courte entrent dans le sang par
          diffusion facilitée au niveau des capillaires des villosités, puis sont transportés au foie par
          la veine porte hépatique.
        </li>
      </ul>
      <p className="text-foreground/90 leading-relaxed">
        Au total, il s'agit d'un système complexe, ce qui explique que les <strong>malabsorptions des
        lipides</strong> (ou stéatorrhées) soient plus fréquentes que celles des glucides ou des
        protéines, et risquent d'entraîner une malabsorption des vitamines liposolubles A, D, E, K.
      </p>

      <H3 id="sec-1-13-d">d. Utilisation et anabolisme</H3>
      <p className="text-foreground/90 leading-relaxed">
        Dans la <strong>circulation sanguine</strong>, les triglycérides des chylomicrons sont dégradés en
        acides gras libres et glycérol par la <strong>lipoprotéine lipase (LPL)</strong>, enzyme associée
        à l'endothélium capillaire. Les acides gras et le glycérol traversent les parois capillaires et
        servent de source d'énergie ou sont stockés sous forme de lipides dans le tissu adipeux (Figure 29).
      </p>
      <Figure src={p5Fig29} n="Figure 29" legend="Intervention de la LPL sur les chylomicrons." />
      <p className="text-foreground/90 leading-relaxed">
        <strong>Au niveau du foie</strong>, les cellules hépatiques ajoutent des protéines aux résidus de
        chylomicrons ; les nouvelles <strong>lipoprotéines</strong> servent au transport du cholestérol
        dans le sang.
      </p>
      <Figure src={p5Fig29b} n="Figure 30" legend="Métabolisme des chylomicrons et de leurs résidus." />
      <Figure src={p5Fig30} n="Figure 31" legend="Vue d'ensemble des mécanismes de transport des nutriments à travers les cellules épithéliales intestinales." />
    </section>
  );
}

/* ============ PARTIE 14 — Absorption d'eau et de micro-nutriments ============ */
function Section1_14() {
  return (
    <section>
      <H2 id="sec-1-14">Partie 14 — 5. Absorption d'eau et de micro-nutriments</H2>

      <H3 id="sec-1-14-a">a. L'eau</H3>
      <p className="text-foreground/90 leading-relaxed">
        L'intestin est le siège de très nombreux transferts d'eau et d'ions. L'eau est la substance la plus
        abondante du chyme et l'intestin grêle en absorbe <Mark>95 % par osmose</Mark>. L'eau traverse
        librement la muqueuse intestinale dans les deux sens, mais une osmose nette se produit chaque fois
        que le transport actif des solutés (notamment de Na⁺) vers les cellules de la muqueuse crée un
        gradient de concentration.
      </p>
      <Callout type="note">
        <strong>Remarque :</strong> pour plusieurs auteurs, il semblerait que l'eau puisse même passer par
        les jonctions serrées.
      </Callout>
      <Figure src={p5Fig31} n="Figure 32" legend="Quelques propriétés de l'eau : régulation thermique, solvant, amortissement des chocs, transport de substances et lubrification." />

      <H3 id="sec-1-14-b">b. Électrolytes</H3>
      <p className="text-foreground/90 leading-relaxed">
        La digestion est la voie d'entrée de l'eau dans l'organisme mais aussi des ions qu'elle contient.
        Ceux-ci passent par des mécanismes variés de <strong>transport passif et actif</strong>. Cas de
        l'absorption de NaCl (Figure 33).
      </p>
      <Figure src={p5Fig32} n="Figure 33" legend="Réabsorption de NaCl au niveau de l'intestin grêle et du côlon. Une part non négligeable du Na⁺ est réabsorbée par des transports couplés Na⁺-solutés organiques (membrane apicale)." />

      <H3 id="sec-1-14-c">c. Vitamines</H3>
      <H4 id="sec-1-14-c1">Liposolubles</H4>
      <p className="text-foreground/90 leading-relaxed">
        Les vitamines liposolubles (<strong>A, D, E, K</strong>) sont absorbées essentiellement par
        diffusion passive ou facilitée, en suivant l'absorption des lipides (duodénum – jéjunum) :
        émulsification par les sels biliaires → formation de micelles mixtes → diffusion vers la bordure
        en brosse → entrée dans l'entérocyte → estérification → incorporation dans les chylomicrons →
        exocytose vers la lymphe puis la circulation sanguine (Figure 34).
      </p>
      <Figure src={p5Fig33} n="Figure 34" legend="Vitamines liposolubles A, D, E, K — absorption couplée à celle des lipides (duodénum – jéjunum)." />

      <H4 id="sec-1-14-c2">Hydrosolubles</H4>
      <p className="text-foreground/90 leading-relaxed">
        Les vitamines hydrosolubles diffèrent pour leur absorption selon leur nature physicochimique.
        Certaines dépendent de transporteurs membranaires, notamment les <strong>vitamines B1, B2 et C</strong>.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        L'<strong>absorption de la vitamine B12</strong> nécessite plusieurs étapes. Dans le milieu acide
        de l'estomac, elle est séparée des aliments par la pepsine et se lie aux <em>protéines R</em>{" "}
        salivaires dont elle se libère dans le duodénum sous l'effet des protéases pancréatiques, ce qui
        lui permet de se lier au <strong>facteur intrinsèque</strong> sécrété par les cellules pariétales
        de l'estomac. Le complexe B12 + FI est reconnu et absorbé par un transporteur dans la partie
        terminale de l'iléon.
      </p>
      <Figure src={p5Fig34} n="Figure 35" legend="Vitamines hydrosolubles B (sauf B12) et C — absorption directe dans le sang portal (jéjunum – iléon) via des transporteurs spécifiques (SVCT1, THTR, RFVT3, PCFT...)." />

      <div className="my-6 overflow-x-auto">
        <p className="text-sm font-semibold text-foreground mb-2">
          Tableau 3 — Vitamines hydrosolubles et leurs transporteurs
        </p>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-teal-50">
              <th className="border border-border p-2 text-left">Vitamine</th>
              <th className="border border-border p-2 text-left">Transport</th>
            </tr>
          </thead>
          <tbody className="[&_td]:border [&_td]:border-border [&_td]:p-2">
            <tr><td><strong>Vitamine C</strong> (acide ascorbique)</td><td>SVCT1 (Na⁺-dépendant)</td></tr>
            <tr><td><strong>Vitamine B1</strong> (Thiamine)</td><td>THTR-1 / THTR-2</td></tr>
            <tr><td><strong>Vitamine B2</strong> (Riboflavine)</td><td>RFVT3</td></tr>
            <tr><td><strong>Vitamine B3</strong> (Niacine)</td><td>Diffusion facilitée</td></tr>
            <tr><td><strong>Vitamine B6</strong> (Pyridoxine)</td><td>Diffusion + transport actif</td></tr>
            <tr><td><strong>Folate (B9)</strong> – pH acide optimal</td><td>PCFT (H⁺-dépendant)</td></tr>
          </tbody>
        </table>
      </div>

      <H4 id="sec-1-14-c3">Cas particulier : Vitamine B12 (cobalamine)</H4>
      <p className="text-foreground/90 leading-relaxed">
        Absorption complexe dans l'iléon terminal :
      </p>
      <ol className="ml-6 list-decimal space-y-1 text-foreground/90">
        <li>Libération de B12 des protéines alimentaires (estomac : HCl + pepsine).</li>
        <li>Liaison à l'haptocorrine (R-protéine salivaire).</li>
        <li>Dans le duodénum : libération et fixation au facteur intrinsèque (FI).</li>
        <li>Absorption dans l'iléon terminal.</li>
        <li>Récepteur spécifique : Cubiline + Amnionless (complexe Cubam).</li>
        <li>Endocytose du complexe FI-B12.</li>
        <li>Transport sanguin lié à la transcobalamine II (holo-TCII).</li>
      </ol>
      <Figure src={p5FigB12} n="Figure 36" legend="Étapes de l'absorption de la vitamine B12 dans l'iléon terminal." />
      <p className="text-foreground/90 leading-relaxed">
        L'<strong>acide folique (B9)</strong>, présent dans les fruits et légumes sous forme de
        polyglutamates, est déconjugué en folylmonoglutamate par la <em>folate conjugase</em> de la
        bordure en brosse du jéjunum. Un transport saturable permet alors son absorption.
      </p>

      <H3 id="sec-1-14-d">d. Synthèse globale</H3>
      <Figure src={p5Fig35} n="Figure 37" legend="Synthèse globale : absorption des vitamines liposolubles (micelles mixtes → entérocyte → chylomicrons → lymphe → sang) vs hydrosolubles (transporteurs spécifiques → sang portal)." />

      <div className="my-6 overflow-x-auto">
        <p className="text-sm font-semibold text-foreground mb-2">
          Tableau 4 — Facteurs influençant l'absorption des vitamines
        </p>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-teal-50">
              <th className="border border-border p-2 text-left">Favorisants</th>
              <th className="border border-border p-2 text-left">Inhibiteurs</th>
            </tr>
          </thead>
          <tbody className="[&_td]:border [&_td]:border-border [&_td]:p-2 align-top">
            <tr><td>Présence de lipides (A, D, E, K)</td><td>Malabsorption lipidique (cholestase, insuffisance pancréatique)</td></tr>
            <tr><td>Intégrité de la muqueuse intestinale</td><td>Atrophie villositaire, maladies intestinales</td></tr>
            <tr><td>pH adéquat (ex : folates)</td><td>Déficit en FI → anémie de Biermer</td></tr>
          </tbody>
        </table>
      </div>

      <div className="my-6 overflow-x-auto">
        <p className="text-sm font-semibold text-foreground mb-2">
          Tableau 5 — Sites de digestion et d'absorption des nutriments
        </p>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-teal-50">
              <th className="border border-border p-2 text-left">Nutriment</th>
              <th className="border border-border p-2 text-left">Bouche</th>
              <th className="border border-border p-2 text-left">Estomac</th>
              <th className="border border-border p-2 text-left">Intestin grêle (digestion)</th>
              <th className="border border-border p-2 text-left">Intestin grêle (absorption)</th>
              <th className="border border-border p-2 text-left">Gros intestin</th>
            </tr>
          </thead>
          <tbody className="[&_td]:border [&_td]:border-border [&_td]:p-2 align-top">
            <tr>
              <td className="font-semibold">Hydrates de carbone</td>
              <td>Amylase salivaire : amidons cuits → disaccharides</td>
              <td>HCl dénature et arrête l'amylase salivaire</td>
              <td>Amylase pancréatique : amidons cuits → disaccharides ; saccharase, maltase, lactase (entérocytes) → monosaccharides</td>
              <td>Capillaires sanguins des villosités</td>
              <td>—</td>
            </tr>
            <tr>
              <td className="font-semibold">Protéines</td>
              <td>—</td>
              <td>HCl : pepsinogène → pepsine ; pepsine : protéines → polypeptides</td>
              <td>Entérokinase ; chymotrypsine et trypsine ; peptidases → acides aminés</td>
              <td>Capillaires sanguins des villosités</td>
              <td>—</td>
            </tr>
            <tr>
              <td className="font-semibold">Graisses</td>
              <td>—</td>
              <td>—</td>
              <td>Bile (sels biliaires émulsifient) ; lipase pancréatique → AG + glycérol</td>
              <td>Chylifères des villosités</td>
              <td>—</td>
            </tr>
            <tr>
              <td className="font-semibold">Eau</td>
              <td>—</td>
              <td>Petites quantités absorbées</td>
              <td>—</td>
              <td>La plus grande partie absorbée ici</td>
              <td>Le reste est absorbé ici</td>
            </tr>
            <tr>
              <td className="font-semibold">Vitamines</td>
              <td>—</td>
              <td>Sécrétion du facteur intrinsèque pour B12</td>
              <td>—</td>
              <td>Vitamines hydrosolubles</td>
              <td>Bactéries synthétisent de la vitamine K</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
function Placeholder({ id, title }: { id: string; title: string }) {
  return (
    <section>
      <H2 id={id}>{title}</H2>
      <Callout>
        <p className="text-foreground/80">
          Cette partie est en cours de préparation. Le contenu détaillé sera ajouté prochainement.
        </p>
      </Callout>
    </section>
  );
}

/* ---------- Chapitre 2 — Système endocrinien ---------- */

function Section2_1() {
  return (
    <section>
      <H2 id="sec-2-1">1. Notions générales d'endocrinologie</H2>

      <Figure src={ch2Img1} n="Figure 38" legend="Vue d'ensemble du système endocrinien" />

      <H3 id="sec-2-1-1">1.1. Système endocrinien</H3>
      <p className="mb-3 text-foreground/90">
        Le maintien de l'homéostasie du milieu intérieur est réalisé d'une part par le système nerveux et d'autre part par le système endocrinien ou hormonal, les <strong>hormones</strong> étant des messagers élaborés par les glandes endocrines pour agir le plus souvent à distance des organes qui les ont synthétisées. Les glandes endocrines sont réparties dans tout l'organisme et sécrètent au moins une cinquantaine d'hormones.
      </p>
      <p className="mb-2 text-foreground/90">Le système endocrinien assure trois grandes fonctions :</p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-1">
        <li>il maintient l'équilibre des fonctions internes du corps humain,</li>
        <li>répond adéquatement aux stimuli internes et externes,</li>
        <li>et gère le développement du stade embryonnaire à l'âge adulte.</li>
      </ul>
      <p className="mb-2 text-foreground/90">Le système endocrinien est constitué :</p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-1">
        <li><strong>d'une dizaine de glandes spécialisées</strong> (l'hypophyse, la thyroïde, les quatre parathyroïdes, les deux surrénales et le thymus),</li>
        <li><strong>auxquelles s'ajoutent plusieurs organes</strong> capables de produire des hormones (le pancréas, le cœur, les reins, les ovaires, les testicules, les intestins…).</li>
        <li><strong>L'hypothalamus, qui n'est pas une glande mais un centre nerveux</strong>, joue également un rôle majeur dans la synthèse et la libération de certaines hormones.</li>
      </ul>

      <H3 id="sec-2-1-2">1.2. Glandes</H3>
      <p className="mb-3 text-foreground/90">
        <u>Glande :</u> organe dont le fonctionnement est caractérisé par la synthèse puis la sécrétion d'une substance. La sécrétion d'une glande peut être exocrine, endocrine ou mixte.
      </p>
      <p className="mb-3 text-foreground/90">
        <em><u>Glande endocrine</u></em> : sécrétion interne. Elle rejette la substance produite appelée hormone, <strong>dans le sang</strong>. Ainsi, la substance va agir sur un organe cible. <br />
        <span className="text-muted-foreground">Ex : hypophyse, thyroïde, parathyroïde, surrénale.</span>
      </p>
      <p className="mb-3 text-foreground/90">
        <em><u>Glande exocrine</u></em> : sécrétion externe du corps. Elle rejette la substance produite <strong>à l'extérieur</strong> soit directement (peau), soit indirectement (tube digestif, bronches, voies génitales et urinaires). Elles sont souvent munies d'un canal excréteur. <br />
        <span className="text-muted-foreground">Ex : les glandes salivaires (salive), sudoripares (sueur), lacrymales (larmes), glandes mammaires (lait).</span>
      </p>
      <p className="mb-3 text-foreground/90">
        <em><u>Glande mixte :</u></em> Une glande mixte sécrète à la fois des substances qui sont déversées à l'extérieur du corps et des substances (hormones) qui le sont directement dans le sang. Ce sont donc des glandes à la fois exocrines et endocrines. Parmi les principales glandes mixtes, on retrouve le foie, le pancréas, les ovaires et les testicules.
      </p>
      <Callout type="note">
        <p className="font-semibold mb-1"><u>Remarques</u> :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>certaines glandes sont à la fois exocrine et endocrine, comme le pancréas qui sécrète des enzymes digestives et des hormones comme l'insuline qui est rejetée dans le sang ;</li>
          <li>d'autres organes sont capables à la fois d'une sécrétion endocrine et d'un autre rôle physiologique, par exemple l'hypothalamus, les gonades ;</li>
          <li>une même glande endocrine peut sécréter plusieurs types d'hormones.</li>
        </ul>
      </Callout>
      <Figure src={ch2Img2} n="Figure 39" legend="Localisation des principales glandes du système endocrinien" />

      <H3 id="sec-2-1-3">1.3. Hormones</H3>

      <H4 id="sec-2-1-3-1">1.3.1. Définition</H4>
      <p className="mb-3 text-foreground/90">
        Les hormones sont des <strong>molécules qui sont sécrétées dans le milieu intérieur par</strong> des cellules spécifiques, <strong>les cellules endocrines</strong>, <strong>puis transportées par</strong> les liquides internes, en particulier <strong>le sang, pour agir sur des cellules cibles situées à distance en se fixant sur des récepteurs</strong> qui sont des protéines capables de les reconnaître de façon sélective. Cette définition correspond à l'endocrinie.
      </p>
      <p className="mb-3 text-foreground/90">
        Mais l'action des hormones peut s'exercer de façon paracrine (sur les cellules voisines) ou encore de façon autocrine (sur les cellules sécrétrices elles-mêmes) (Figure 40).
      </p>
      <Figure src={ch2Img3} n="Figure 40" legend="Les différents moyens de communication hormonale : endocrinie, autocrinie, paracrinie." />

      <H4 id="sec-2-1-3-2">1.3.2. Nature chimique des hormones</H4>
      <p className="mb-2 text-foreground/90">Il existe 3 grands groupes d'hormones selon leur nature chimique :</p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-1">
        <li><strong>les hormones protéiques (polypeptidiques)</strong> : regroupent des peptides, des protéines et des glycoprotéines. Le nombre des acides aminés qui les composent est variable, allant de 3 pour la thyrolibérine à 250 pour l'inhibine A.</li>
        <li><strong>les hormones dérivées d'un seul acide aminé particulier</strong> : comme la mélatonine sécrétée par l'épiphyse, l'adrénaline sécrétée par la médullosurrénale et les hormones thyroïdiennes sécrétées par la glande thyroïde.</li>
        <li><strong>les hormones stéroïdes</strong> (dérivées du cholestérol). Ex : le cortisol.</li>
      </ul>

      <H4 id="sec-2-1-3-3">1.3.3. Stimulation des glandes endocrines</H4>
      <p className="mb-3 text-foreground/90">
        La stimulation des glandes endocrines est réalisée par 3 mécanismes différents (Figure 41) :
      </p>
      <p className="mb-3 text-foreground/90">
        <strong>Stimulation humorale :</strong> ex : la diminution du taux sanguin de calcium déclenche la libération de parathormone (PTH) par les glandes parathyroïdes. La parathormone élève le taux sanguin de calcium en stimulant, entre autres, la libération de Ca<sup>2+</sup> des os. Ce qui va mettre fin au stimulus provoquant la sécrétion de PTH.
      </p>
      <p className="mb-3 text-foreground/90">
        <strong>Stimulus nerveux :</strong> la stimulation des cellules de la médulla surrénale par le système sympathique du SNA déclenche la libération d'adrénaline et de noradrénaline dans le sang.
      </p>
      <p className="mb-3 text-foreground/90">
        <strong>Stimulus hormonal :</strong> les hormones libérées par l'hypothalamus stimulent l'adénohypophyse : celle-ci va libérer des hormones qui amènent d'autres glandes endocrines à sécréter des hormones. Ainsi, l'hypothalamus régit une grande partie de l'activité du système endocrinien.
      </p>
      <Figure src={ch2Img4} n="Figure 41" legend="Stimulation des glandes endocrines" />
    </section>
  );
}

function Section2_2() {
  return (
    <section>
      <H2 id="sec-2-2">2. Axe hypothalamo-hypophysaire</H2>

      <H3 id="sec-2-2-1">2.1. Hypothalamus</H3>

      <H4 id="sec-2-2-1-1">2.1.1. Anatomie</H4>
      <p className="mb-3 text-foreground/90">
        La région hypothalamique est le véritable « <strong>cerveau endocrinien</strong> » de l'organisme puisqu'elle commande la sécrétion de toutes les glandes endocrines du corps — pancréas, thyroïde et parathyroïdes, ovaires et testicules, surrénales — à commencer par l'hypophyse. La fonction de l'hypophyse est sous la dépendance de l'hypothalamus.
      </p>
      <p className="mb-3 text-foreground/90">
        L'hypothalamus est relié par la tige pituitaire à l'hypophyse, l'ensemble constituant l'axe hypothalamo-hypophysaire. Il est situé à la base de l'encéphale délimité en avant par le chiasma optique et par les tubercules mamillaires en arrière (Figure 42).
      </p>
      <div className="grid sm:grid-cols-2 gap-4 my-4">
        <img src={ch2Img5} {...dimsFor(ch2Img5)} alt="Hypothalamus - vue 1" className="w-full rounded-lg border border-border" />
        <img src={ch2Img6} {...dimsFor(ch2Img6)} alt="Hypothalamus - vue 2" className="w-full rounded-lg border border-border" />
      </div>
      <Figure src={ch2Img7} n="Figure 42" legend="Localisation de l'hypothalamus et de l'axe neuro-endocrinien" />
      <p className="mb-3 text-foreground/90">
        L'hypothalamus se situe dans le plancher du troisième ventricule, se compose de 7 noyaux distincts.
      </p>

      <H4 id="sec-2-2-1-2">2.1.2. Hormones sécrétées</H4>
      <p className="mb-3 text-foreground/90">
        Les hormones hypothalamiques sont de nature protéique. Les hormones hypothalamiques qui ont pour cible des cellules de l'adénohypophyse sont appelées respectivement <strong>libérines ou statines</strong> selon qu'elles stimulent ou freinent la libération d'hormones hypophysaires. On distingue :
      </p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-1">
        <li><strong>La TRH</strong>, ou thyrolibérine, qui stimule la libération de TSH et de PRL ;</li>
        <li><strong>La GnRH</strong>, ou gonadolibérine, qui stimule la libération de FSH et LH ;</li>
        <li><strong>La CRH</strong>, ou corticolibérine, qui stimule la libération d'ACTH ;</li>
        <li><strong>La GHRH</strong>, ou somatolibérine, qui stimule la sécrétion de GH ;</li>
        <li><strong>La somatostatine</strong>, qui inhibe la sécrétion de GH et de TSH ;</li>
        <li><strong>Le PIF</strong> (Prolactine Inhibitory Factor), qui inhibe la sécrétion de PRL.</li>
      </ul>
      <Figure src={ch2Img8} n="Figure 43" legend="Hormones hypothalamiques et leurs cibles hypophysaires" />

      <H3 id="sec-2-2-2">2.2. Hypophyse</H3>

      <H4 id="sec-2-2-2-1">2.2.1. Définition et structure anatomique</H4>
      <p className="mb-3 text-foreground/90">
        L'hypophyse (ou glande pituitaire) est une petite glande, de la taille d'une noisette, ne pesant 0,5 à 0,7 g, située à la base de l'encéphale, dans une loge osseuse : la selle turcique de l'os sphénoïde, et est située sous l'hypothalamus auquel elle est reliée par la tige pituitaire, ou infundibulum (Figure 42).
      </p>
      <p className="mb-2 text-foreground/90">Elle est constituée de trois parties :</p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-1">
        <li>un lobe antérieur ou antéhypophyse (également appelé adénohypophyse) ;</li>
        <li>un lobe intermédiaire (fente hypophysaire) ;</li>
        <li>un lobe postérieur ou posthypophyse.</li>
      </ul>
      <p className="mb-3 text-foreground/90">
        Les lobes antérieur, intermédiaire et postérieur sécrètent des hormones qui agissent sur des organes cibles stimulant leur propre sécrétion endocrine ou exocrine.
      </p>
      <Figure src={ch2Img9} n="Figure 44" legend="Les différentes parties de l'hypophyse (ou glande pituitaire)" />

      <H3 id="sec-2-2-3">2.3. Physiologie</H3>

      <H4 id="sec-2-2-3-1">2.3.1. Hormones antéhypophysaires</H4>
      <p className="mb-2 text-foreground/90">Le lobe antérieur de l'hypophyse produit 5 hormones :</p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-2">
        <li>la <strong>TSH</strong> ou <strong>Thyréotrophine</strong>. Elle stimule la sécrétion d'hormones T3 et T4 par la thyroïde.</li>
        <li>la <strong>corticotrophine ou ACTH</strong>. Elle régule la sécrétion d'hormones par les cortico-surrénales.</li>
        <li>les <strong>gonadotrophines (LH et FSH)</strong> agissent en synergie sur les organes reproducteurs (ovaires et testicules).</li>
        <li>la <strong>prolactine (PRL)</strong>, excite la sécrétion lactée des glandes mammaires femelles, peu de temps après la naissance d'un enfant. En l'absence de cette hormone, la sécrétion lactée cesse rapidement.</li>
        <li>les <strong>somatotrophines ou STH ou hormone de croissance Gh</strong>. Elles sont responsables de la croissance chez l'enfant. Elle agit sur le métabolisme des protides et des glucides. Une trop faible production de cette hormone entraînera un arrêt de croissance. Une hyperproduction de STH aura l'effet contraire, soit le gigantisme.</li>
      </ul>

      <H4 id="sec-2-2-3-2">2.3.2. Les hormones posthypophysaires</H4>
      <p className="mb-3 text-foreground/90">
        Les deux hormones posthypophysaires (neurohormones), <strong>l'ocytocine</strong> et <strong>l'arginine-vasopressine (ou hormone antidiurétique, ADH)</strong>, <u>sont en réalité des hormones hypothalamiques</u> stockées dans la posthypophyse et libérées dans le sang à partir de la posthypophyse.
      </p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-1">
        <li><strong>ADH ou hormone antidiurétique</strong>. Elle empêche l'eau d'être éliminée par le rein quand il n'y a pas assez d'eau dans l'organisme.</li>
        <li><strong>Ocytocine :</strong> permet de stimuler l'émission de lait ainsi que les contractions utérines.</li>
      </ul>

      <H4 id="sec-2-2-3-3">2.3.3. Régulation et effets des hormones hypophysaires</H4>
      <p className="mb-3 text-foreground/90">
        Les tableaux 6 et 7 (Figures 45 à 48) montrent les différentes hormones hypophysaires, leurs régulations ainsi que leurs actions.
      </p>
      <Figure src={ch2Img10} n="Figure 45" legend="Tableau 6 — Hormones antéhypophysaires : régulation et actions (1)" />
      <Figure src={ch2Img11} n="Figure 46" legend="Tableau 6 (suite) — Hormones antéhypophysaires : régulation et actions (2)" />
      <Figure src={ch2Img12} n="Figure 47" legend="Tableau 7 — Hormones posthypophysaires : régulation et actions" />
      <Figure src={ch2Img13} n="Figure 48" legend="Synthèse de la régulation hypothalamo-hypophysaire" />
    </section>
  );
}

function Section2_3() {
  return (
    <section>
      <H2 id="sec-2-3">3. La thyroïde</H2>

      <H3 id="sec-2-3-1">3.1. Anatomie</H3>
      <p className="mb-3 text-foreground/90">
        La glande thyroïde est située dans le cou, devant le larynx et la trachée, à la hauteur des vertèbres cervicales. Elle est très vascularisée, pèse environ 30 g, elle est en forme de papillon, formée de deux lobes réunis par un isthme. La thyroïde est accessible à la palpation.
      </p>
      <p className="mb-3 text-foreground/90">
        Elle comprend 2 types de cellules : les cellules folliculaires et parafolliculaires (Figure 49).
      </p>
      <div className="grid sm:grid-cols-2 gap-4 my-4">
        <figure className="rounded-lg border border-border bg-muted/30 p-3">
          <img src={ch2Img14} {...dimsFor(ch2Img14)} alt="Vue antérieure de la thyroïde" className="w-full rounded-md" />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">Vue antérieure</figcaption>
        </figure>
        <figure className="rounded-lg border border-border bg-muted/30 p-3">
          <img src={ch2Img15} {...dimsFor(ch2Img15)} alt="Vue postérieure de la thyroïde" className="w-full rounded-md" />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">Vue postérieure</figcaption>
        </figure>
        <figure className="rounded-lg border border-border bg-muted/30 p-3">
          <img src={ch2Img16} {...dimsFor(ch2Img16)} alt="Follicules thyroïdiens" className="w-full rounded-md" />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">a : Follicules thyroïdiens</figcaption>
        </figure>
        <figure className="rounded-lg border border-border bg-muted/30 p-3">
          <img src={ch2Img17} {...dimsFor(ch2Img17)} alt="Histologie de la thyroïde" className="w-full rounded-md" />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">b : Histologie de la thyroïde</figcaption>
        </figure>
      </div>
      <p className="text-center text-sm text-muted-foreground -mt-2 mb-6">
        <span className="font-semibold text-foreground">Figure 49.</span> Glande thyroïde et structure histologique de la glande thyroïde
      </p>

      <H3 id="sec-2-3-2">3.2. Physiologie</H3>

      <H4 id="sec-2-3-2-1">3.2.1. Les hormones sécrétées</H4>
      <p className="mb-3 text-foreground/90">
        La thyroïde est responsable de la synthèse et de la sécrétion des hormones thyroïdiennes, sous le contrôle de l'hypophyse.
      </p>
      <p className="mb-3 text-foreground/90">
        Les hormones thyroïdiennes sont des molécules iodées, dérivées de la tyrosine ou plus précisément de la thyronine, qui correspond à la condensation de deux molécules de tyrosine entre elles.
      </p>

      <H4 id="sec-2-3-2-2">3.2.2. Les cellules folliculaires</H4>
      <p className="mb-2 text-foreground/90">
        Sécrètent <strong>triiodothyronine</strong> (<strong>T3</strong>, 20 %) et <strong>thyroxine</strong> (<strong>T4</strong>, 80 %) sous l'effet de la <strong>Thyréotrophine</strong> (TSH) sécrétée par l'antéhypophyse. Synthétisées par fixation d'iode. Indispensables à la vie. Les hormones :
      </p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-1">
        <li>règlent l'utilisation de l'oxygène ;</li>
        <li>ont un effet calorifique ;</li>
        <li>permettent la stimulation de la synthèse des protéines ;</li>
        <li>augmentent la lipolyse, la croissance ;</li>
        <li>et stimulent l'érythropoïèse.</li>
      </ul>

      <H4 id="sec-2-3-2-3">3.2.3. Les cellules parafolliculaires ou cellules C</H4>
      <p className="mb-3 text-foreground/90">
        Sécrètent de la <strong>calcitonine (Thyrocalcitonine)</strong>. Participe à la régulation du contenu du calcium et en phosphore dans le sang. Une calcémie basse inhibe la libération de calcitonine, une calcémie élevée la stimule. Certaines hormones, comme la gastrine, stimulent la libération de calcitonine (c'est pourquoi le calcium issu de l'alimentation est rapidement intégré dans les os).
      </p>
      <p className="mb-2 text-foreground/90 font-semibold">Action de la calcitonine :</p>
      <p className="mb-1 text-foreground/90"><u>Au niveau des os</u></p>
      <ul className="mb-3 list-disc pl-6 text-foreground/90 space-y-1">
        <li>Inhibe la libération du calcium et du phosphore par les os ;</li>
        <li>Et facilite en même temps leur incorporation dans la matrice osseuse.</li>
      </ul>
      <p className="mb-3 text-foreground/90">
        Ainsi, la concentration du calcium dans le sang chute : <strong>hypocalcémiante</strong>.
      </p>
      <p className="mb-1 text-foreground/90"><u>Au niveau des reins :</u></p>
      <p className="mb-3 text-foreground/90">
        La calcitonine <strong>augmente l'excrétion</strong> du phosphore, du calcium, mais également des ions sodium, potassium et magnésium.
      </p>
      <Callout type="note">
        <p><strong>Remarque :</strong> Elle ne semble pas jouer un rôle important dans l'homéostasie du calcium chez l'humain. D'ailleurs la calcitonine n'a pas besoin d'être remplacée chez les personnes qui ont subi une ablation de la thyroïde.</p>
      </Callout>

      <H4 id="sec-2-3-2-4">3.2.4. Régulation et action des hormones thyroïdiennes</H4>

      <H4 id="sec-2-3-2-5">3.2.5. La sécrétion des hormones thyroïdiennes</H4>
      <p className="mb-2 text-foreground/90">La sécrétion des hormones thyroïdiennes est principalement contrôlée par :</p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-2">
        <li><strong>la TSH</strong> (Thyroid Stimulating Hormone) hypophysaire et par les hormones thyroïdiennes (Figure 50).</li>
        <li>Mais d'autres facteurs, comme la <strong>quantité d'iodures</strong> apportés dans la glande. C'est <em>l'effet Wolff-Chaikoff</em> : une surcharge très importante en iodures (supérieure à 2 mg par jour) freine la captation des iodures par la glande thyroïde et stoppe la synthèse des hormones thyroïdiennes.</li>
        <li>La synthèse des hormones thyroïdiennes est stimulée par <strong>la noradrénaline libérée</strong> lors d'une stimulation des fibres sympathiques.</li>
      </ul>

      <H4 id="sec-2-3-2-6">3.2.6. Inhibition de la sécrétion de TSH</H4>
      <p className="mb-3 text-foreground/90">
        Elle fait intervenir <strong>la forme libre de T4</strong>. En réalité, la T4 agit dans la cellule après transformation en T3. Cette rétrorégulation négative (inhibition) s'exerce surtout sur l'adénohypophyse et, à un moindre degré, sur l'hypothalamus.
      </p>
      <p className="mb-3 text-foreground/90">
        Lorsque la concentration de T4 diminue, l'axe hypothalamo-hypophysaire est stimulé et la sécrétion de TSH augmente. À l'inverse, lorsque la concentration de T4 augmente, l'axe hypothalamo-hypophysaire est freiné et la sécrétion de TSH diminue.
      </p>
      <Figure src={ch2Img18} n="Figure 50" legend="Régulation et action des hormones thyroïdiennes" />
      <Callout type="note">
        <p><strong><u>Remarque :</u></strong> La thyroïde sécrète principalement T4. La conversion de T4 en T3 se produit dans de nombreux organes notamment le foie, grâce à une enzyme, la thyroxine-5'-désiodase qui réalise la 5'-monodésiodation de T4. Ainsi, 80 % de la T3 provient de la désiodation de la T4 et seulement 20 % provient de la synthèse thyroïdienne.</p>
      </Callout>

      <H3 id="sec-2-3-3">3.3. Pathologies thyroïdiennes</H3>
      <Figure src={ch2Img19} n="Figure 51" legend="Tableau 8 — Principales pathologies thyroïdiennes" />
    </section>
  );
}

function Section2_4() {
  return (
    <section>
      <H2 id="sec-2-4">4. Les parathyroïdes</H2>
      <H3 id="sec-2-4-1">4.1. Anatomie</H3>
      <p className="mb-3 text-foreground/90">Les glandes parathyroïdiennes sont généralement au nombre de quatre, les deux glandes supérieures sont accolées à la thyroïde et les deux glandes inférieures sont incluses dans les lobes thyroïdiens en position latérodorsale.</p>
      <p className="mb-3 text-foreground/90">Les dimensions de chaque glande sont de 6×4×2 mm. Le poids est de 20 à 50 mg pour chaque glande, soit 150 mg au total, face à 25 g pour la thyroïde. La vascularisation est assurée par des ramifications de plusieurs artères thyroïdiennes.</p>
      <Figure src={ch2Parathy} n="Figure 52" legend="Glandes parathyroïdiennes." />
      <H3 id="sec-2-4-2">4.2. Histologie</H3>
      <p className="mb-2 text-foreground/90">Le tissu des glandes parathyroïdes contient deux types de cellules :</p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-2">
        <li><strong>Les cellules principales</strong>, qui peuvent être <em>claires</em> (vacuolisées, ayant sécrété la PTH) ou <em>foncées</em> (qui synthétisent et sécrètent beaucoup de PTH).</li>
        <li><strong>Les cellules oxyphiles</strong>, plus grandes, dépourvues de glycogène, ayant un noyau très petit et dont le rôle est inconnu à l'heure actuelle.</li>
      </ul>
      <H3 id="sec-2-4-3">4.3. Physiologie</H3>
      <H4 id="sec-2-4-3-1">4.3.1. Action de l'hormone sécrétée</H4>
      <p className="mb-3 text-foreground/90">Les parathyroïdes, indispensables à la vie, contrôlent la calcémie et la maintiennent aux environs de 100 mg/L. Les cellules principales sécrètent la <strong>parathormone (PTH)</strong>, protéine de 84 acides aminés.</p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-1">
        <li>La PTH est <strong>activée par l'hypocalcémie</strong> et <strong>inhibée par l'hypercalcémie</strong>.</li>
        <li>Elle stimule la résorption osseuse, induisant un flux de calcium de l'os vers le sang.</li>
        <li>Elle augmente la réabsorption tubulaire rénale du calcium et diminue celle du phosphore.</li>
        <li>Elle est <strong>hypercalcémiante</strong> et hypophosphorémiante.</li>
      </ul>
      <Figure src={ch2ParathyPth} n="Figure 53" legend="Organigramme résumant les principales actions de la parathormone." />
      <p className="mb-2 text-foreground/90 font-semibold">a. Au niveau de l'os</p>
      <p className="mb-3 text-foreground/90">Dans le tissu osseux, elle <strong>provoque la décomposition de la matrice minéralisée</strong> renfermant du phosphate de calcium et la libération de Ca<sup>2+</sup> dans le sang, ce qui tend à augmenter la calcémie et la phosphatémie et à libérer l'hydroxyproline, la pyridinoline et la déoxypyridinoline retrouvées dans les urines.</p>
      <p className="mb-2 text-foreground/90 font-semibold">b. Au niveau du rein</p>
      <p className="mb-3 text-foreground/90">Dans les reins, elle <strong>inhibe l'élimination urinaire</strong> du calcium et favorise la conversion de la vitamine D en sa forme active (D3 ou cholécalciférol), processus accéléré par la PTH après une activation initiale dans le foie.</p>
      <p className="mb-2 text-foreground/90 font-semibold">c. Au niveau de l'intestin</p>
      <p className="mb-3 text-foreground/90">La PTH n'exerce pas d'effet direct sur l'intestin. Cependant, la forme active de la vitamine D agit directement sur les intestins où elle stimule l'absorption du Ca<sup>2+</sup>, augmentant ainsi l'effet de la PTH. Une boucle de rétroinhibition fait cesser la libération de PTH.</p>
      <Figure src={ch2ParathyCa} n="Figure 54" legend="Régulation du contenu du calcium de l'organisme. Vert : actions élevant le calcium sanguin ; bleu : celles qui le diminuent. PTH : parathormone, D : vitamine D, CT : calcitonine." />
      <H4 id="sec-2-4-3-2">4.3.2. Contrôle de la sécrétion de PTH</H4>
      <p className="mb-3 text-foreground/90">La PTH a une demi-vie d'environ 5 minutes et est sécrétée en continu à un faible taux. Une boucle de rétroaction négative directe entre les ions calcium plasmatiques et la sécrétion de PTH passe par le récepteur sensible au calcium (CaSR) sur la membrane des cellules principales.</p>
      <p className="mb-3 text-foreground/90">L'hypocalcémie est le stimulus le plus puissant ; l'hypercalcémie inhibe la libération de PTH. La PTH élève le Ca<sup>2+</sup> sanguin en stimulant 3 organes : squelette, reins et intestin (Figure 55).</p>
      <Figure src={ch2ParathyCalcemie} n="Figure 55" legend="La régulation homéostatique de la calcémie : actions opposées de la calcitonine et de la PTH." />
      <H4 id="sec-2-4-3-3">4.3.3. Hyper- / hypo-parathyroïdie</H4>
      <p className="mb-3 text-foreground/90">La régulation rigoureuse de la calcémie est vitale. Une forte baisse provoque des contractions convulsives (tétanie, mortelle si non traitée). Une augmentation marquée peut entraîner des dépôts de phosphate de calcium dans les tissus, causant des dommages organiques étendus.</p>
    </section>
  );
}

function Section2_5() {
  return (
    <section>
      <H2 id="sec-2-5">5. Les surrénales</H2>
      <H3 id="sec-2-5-1">5.1. Anatomie</H3>
      <p className="mb-3 text-foreground/90">Les glandes surrénales sont situées juste au-dessus de chaque rein (Figure 56). Chaque glande est constituée de 2 zones :</p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-2">
        <li><strong>une zone médullaire (médullosurrénale)</strong> qui produit des catécholamines, principalement l'adrénaline ;</li>
        <li><strong>une zone corticale (corticosurrénale ou cortex)</strong> occupant 90 % de la glande et sécrétant des hormones stéroïdes (à partir du cholestérol), composée de 3 parties :
          <ul className="list-disc pl-6 mt-1 space-y-1">
            <li><strong>zone glomérulée externe (10 %)</strong> : minéralocorticoïdes (aldostérone) ;</li>
            <li><strong>zone fasciculée centrale (75 %)</strong> : glucocorticoïdes (cortisol) ;</li>
            <li><strong>zone réticulée interne (15 %)</strong> : androgènes surrénaliens (DHEA, androstènedione).</li>
          </ul>
        </li>
      </ul>
      <div className="grid sm:grid-cols-2 gap-4 my-4">
        <img src={ch2SurrRein} {...dimsFor(ch2SurrRein)} alt="Surrénale et rein" className="w-full rounded-lg border border-border bg-muted/30 p-2" />
        <img src={ch2SurrZones} {...dimsFor(ch2SurrZones)} alt="Zones de la glande surrénale" className="w-full rounded-lg border border-border bg-muted/30 p-2" />
      </div>
      <p className="text-center text-sm text-muted-foreground -mt-2 mb-6"><span className="font-semibold text-foreground">Figure 56.</span> Glandes surrénaliennes et hormones sécrétées.</p>
      <H3 id="sec-2-5-2">5.2. La médullosurrénale</H3>
      <p className="mb-3 text-foreground/90">Les hormones médullaires sont les catécholamines, principalement adrénaline et noradrénaline.</p>
      <H4 id="sec-2-5-2-1">5.2.1. Effets hormonaux</H4>
      <p className="mb-2 text-foreground/90">Sécrétées en réponse à la stimulation sympathique (notamment au stress) :</p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-1">
        <li>Augmentation de la fréquence cardiaque ;</li>
        <li>Augmentation de la pression artérielle ;</li>
        <li>Dilatation des bronchioles ;</li>
        <li>Augmentation du glucose sanguin ;</li>
        <li>Diminution de l'activité digestive.</li>
      </ul>
      <H4 id="sec-2-5-2-2">5.2.2. Régulation</H4>
      <p className="mb-3 text-foreground/90">Un manque ne produit aucun effet significatif. L'<strong>hypersécrétion</strong> (souvent par tumeur) provoque des réactions sympathiques prolongées.</p>
      <Figure src={ch2Medullo} n="Figure 57" legend="Stimulation sympathique de la médullosurrénale et libération de catécholamines en réponse au stress." />
      <H3 id="sec-2-5-3">5.3. La corticosurrénale</H3>
      <H4 id="sec-2-5-3-1">5.3.1. Les glucocorticoïdes</H4>
      <p className="mb-3 text-foreground/90">Indispensables à la vie, ils régulent le métabolisme glucidique et la résistance au stress. Le cortisol représente 95 % de l'activité glucocorticoïde.</p>
      <p className="mb-2 text-foreground/90 font-semibold">a. Rôle</p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-2">
        <li><strong>Métabolisme glucidique</strong> : hyperglycémiant (néoglucogenèse hépatique).</li>
        <li><strong>Métabolisme protéique</strong> : protéolyse (muscles, peau, os) ; en excès → atrophie musculaire ; les acides aminés sont captés par le foie pour la formation de glucose.</li>
        <li><strong>Métabolisme lipidique</strong> : lipolyse, hypercholestérolémiant, hypertriglycéridémiant.</li>
      </ul>
      <p className="mb-2 text-foreground/90 font-semibold">b. Régulation</p>
      <p className="mb-3 text-foreground/90">Sous contrôle de l'axe hypothalamo-hypophyso-surrénalien (rythme circadien) : la <strong>CRH</strong> hypothalamique stimule l'<strong>ACTH</strong> hypophysaire, qui stimule les glucocorticoïdes. Les glucocorticoïdes exercent un <u>rétrocontrôle négatif</u> sur l'ACTH et la CRH.</p>
      <Figure src={ch2CortReg} n="Figure 58" legend="Axe hypothalamo-hypophyso-surrénalien : régulation de la sécrétion de cortisol et effets périphériques." />
      <Callout type="note">
        <p className="font-semibold mb-1">Effets des fortes doses de cortisol :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Réduisent la réaction inflammatoire ;</li>
          <li>Favorisent une rétention de Na<sup>+</sup> et d'eau ;</li>
          <li>Suppriment le système immunitaire ;</li>
          <li>Inhibent la réparation tissulaire.</li>
        </ul>
      </Callout>
      <H4 id="sec-2-5-3-2">5.3.2. Les minéralocorticoïdes</H4>
      <p className="mb-2 text-foreground/90 font-semibold">a. Rôle</p>
      <p className="mb-3 text-foreground/90">L'aldostérone agit sur le métabolisme hydrominéral au niveau du rein (tubule distal) et joue un rôle majeur dans la régulation de la pression artérielle :</p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-1">
        <li>Stimule la réabsorption de sodium (échange avec K<sup>+</sup>) accompagnée d'une réabsorption d'eau → ↑ volémie et pression artérielle ;</li>
        <li>Stimule l'élimination des H<sup>+</sup> (alcalose métabolique).</li>
      </ul>
      <Figure src={ch2Stress} n="Figure 59" legend="Réponse intégrée au stress : axes sympathique-médullosurrénalien (court terme) et corticotrope (long terme)." />
      <p className="mb-2 text-foreground/90 font-semibold">b. Régulation</p>
      <p className="mb-3 text-foreground/90">Régulée principalement par le système rénine-angiotensine et la kaliémie. L'aldostérone exerce un rétrocontrôle négatif sur la rénine.</p>
      <H4 id="sec-2-5-3-3">5.3.3. Les androgènes surrénaliens</H4>
      <p className="mb-3 text-foreground/90">Essentiellement DHEA et androstènedione, liés à l'albumine. Convertis dans les tissus périphériques en androgènes plus actifs (testostérone, delta-4 androstènedione) ou en œstrogènes. Rôle négligeable chez l'homme (5 % de la testostérone totale) ; chez la femme : 40-65 % de la testostérone provient de cette conversion. Sécrétion stimulée par l'ACTH (rythme circadien parallèle à celui du cortisol).</p>
    </section>
  );
}

function Section2_6() {
  return (
    <section>
      <H2 id="sec-2-6">6. Le pancréas endocrine</H2>
      <H3 id="sec-2-6-1">6.1. Situation</H3>
      <p className="mb-3 text-foreground/90">Le pancréas, adjacent à l'estomac, est connecté par le canal pancréatique au duodénum. Par ce canal, il sécrète des ions bicarbonate et diverses enzymes digestives.</p>
      <H3 id="sec-2-6-2">6.2. Anatomie</H3>
      <p className="mb-2 text-foreground/90">Le pancréas est un <strong>organe amphicrine</strong> :</p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-1">
        <li><strong>99 % exocrines</strong> (acineuses) : produisent le suc pancréatique ;</li>
        <li><strong>1 % endocrines</strong> rassemblées en <em>îlots de Langerhans</em> (150-300 μm), entourés d'artérioles et pénétrés par de nombreux capillaires.</li>
      </ul>
      <p className="mb-2 text-foreground/90">Chaque îlot comprend 2 500 à 3 000 cellules de quatre types :</p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-1">
        <li>Cellules <strong>B (β)</strong> (60-70 %, centrales) : <strong>insuline</strong> (hypoglycémiante) ;</li>
        <li>Cellules <strong>A (α)</strong> (20-25 %) : <strong>glucagon</strong> (hyperglycémiante) ;</li>
        <li>Cellules <strong>D (δ)</strong> (10 %) : <strong>somatostatine</strong> ;</li>
        <li>Cellules <strong>PP</strong> (10 %) : <strong>polypeptide pancréatique</strong>.</li>
      </ul>
      <Callout><p><strong>Remarque :</strong> Le pancréas endocrine est totalement indépendant du pancréas exocrine sur le plan fonctionnel.</p></Callout>
      <Figure src={ch2PancHisto} n="Figure 60" legend="Histologie simplifiée du pancréas." />
      <Figure src={ch2Ilot} n="Figure 61" legend="Un îlot de Langerhans : vaisseaux sanguins, pancréas exocrine, cellules α et β." />
      <H3 id="sec-2-6-3">6.3. Régulation de la sécrétion hormonale</H3>
      <Figure src={ch2GlycVal} n="Figure 62" legend="Valeur de la glycémie : entre glycopénie et hyperglycémie. Limites haute (≈ 1,1 g/L) et basse." />
      <p className="mb-3 text-foreground/90">Une perturbation de la glycémie permet, via un système réglant et des organes effecteurs (tissu adipeux, muscles, foie), de revenir à la valeur de consigne : <Mark>rétrocontrôle négatif</Mark>.</p>
      <H4 id="sec-2-6-3-1">6.3.1. En cas d'hypoglycémie</H4>
      <p className="mb-3 text-foreground/90">Une <Mark>hypoglycémie</Mark> est détectée par les <strong>cellules α</strong> qui libèrent du <strong>glucagon</strong>. Celui-ci stimule la lipolyse et surtout, dans le foie, la <strong>néoglucogenèse</strong>. La glycémie remonte : le glucagon est <strong>hyperglycémiant</strong>.</p>
      <Figure src={ch2GlycRep} n="Figure 63" legend="Réponses aux variations de la glycémie : insuline et glucagon." />
      <div className="grid sm:grid-cols-3 gap-4 my-4">
        <figure className="rounded-lg border border-border bg-muted/30 p-3"><img src={ch2MetabProt} {...dimsFor(ch2MetabProt)} alt="Protéines" className="w-full rounded-md" /><figcaption className="mt-2 text-center text-xs text-muted-foreground">Métabolisme des protéines</figcaption></figure>
        <figure className="rounded-lg border border-border bg-muted/30 p-3"><img src={ch2MetabLip} {...dimsFor(ch2MetabLip)} alt="Lipides" className="w-full rounded-md" /><figcaption className="mt-2 text-center text-xs text-muted-foreground">Métabolisme des lipides</figcaption></figure>
        <figure className="rounded-lg border border-border bg-muted/30 p-3"><img src={ch2MetabGluc} {...dimsFor(ch2MetabGluc)} alt="Glucides" className="w-full rounded-md" /><figcaption className="mt-2 text-center text-xs text-muted-foreground">Métabolisme des glucides</figcaption></figure>
      </div>
      <p className="text-center text-sm text-muted-foreground -mt-2 mb-6"><span className="font-semibold text-foreground">Figure 64.</span> Anabolisme et catabolisme des protéines, lipides et glucides.</p>
      <H4 id="sec-2-6-3-2">6.3.2. En cas d'hyperglycémie</H4>
      <p className="mb-3 text-foreground/90">Une <strong>hyperglycémie</strong> (post-prandiale) est détectée par les <strong>cellules β</strong> qui libèrent l'<strong>insuline</strong>. Celle-ci se fixe sur les récepteurs des hépatocytes, fibres musculaires et adipocytes, stimulant la captation du glucose, la glycogénogenèse et la lipogenèse. La glycémie diminue : l'insuline est <strong>hypoglycémiante</strong>.</p>
      <Figure src={ch2InsGluc} n="Figure 65" legend="Régulation de la glycémie par l'insuline et le glucagon." />
      <H3 id="sec-2-6-4">6.4. Actions physiologiques des hormones</H3>
      <p className="mb-2 text-foreground/90 font-semibold">a. Insuline</p>
      <p className="mb-3 text-foreground/90">Hormone clé contrôlant l'utilisation de tous les substrats énergétiques (glucides, lipides, protides). Augmente l'anabolisme et le stockage (glycogène, graisses).</p>
      <p className="mb-2 text-foreground/90 font-semibold">b. Glucagon</p>
      <p className="mb-3 text-foreground/90">Hormone hyperglycémiante d'urgence, antagoniste de l'insuline ; tissu cible : le foie.</p>
      <ul className="mb-4 list-disc pl-6 text-foreground/90 space-y-1">
        <li><strong>Foie</strong> : stimule glycogénolyse et néoglucogenèse ; inhibe la glycogène synthétase.</li>
        <li>Effet cétogène.</li>
        <li><strong>Tissu adipeux</strong> : stimule la lipolyse → ↑ acides gras libres.</li>
        <li>Effet natriurétique.</li>
        <li>À forte dose : stimule les contractions cardiaques.</li>
        <li>Stimule de façon paracrine la sécrétion d'insuline.</li>
      </ul>
      <H3 id="sec-2-6-5">6.5. Diabète sucré</H3>
      <Figure src={ch2Diabete} n="Figure 66" legend="Le diabète : maladie chronique. Rôle de l'insuline, types 1 et 2, symptômes, traitement et conséquences." />
      <Figure src={ch2GlycNiv} n="Figure 67" legend="Glycémie : seuil d'hypoglycémie (&lt; 2,8 mmol/L) et seuil rénal au-delà duquel apparaît la glycosurie." />
      <Figure src={ch2GlycReg} n="Figure 68" legend="Régulation de la glycémie : actions opposées de l'insuline (cellules β) et du glucagon (cellules α)." />
      <H4 id="sec-2-6-5-1">Tableau 9 — Système de régulation de la glycémie</H4>
      <div className="overflow-x-auto my-4">
        <table className="w-full border border-border text-sm">
          <tbody>
            <tr className="bg-muted/40"><td className="border border-border p-2 font-semibold">Système réglé</td><td className="border border-border p-2">Paramètre</td><td className="border border-border p-2"><strong>Glycémie</strong></td><td className="border border-border p-2">Valeur consigne</td><td className="border border-border p-2">1 g·L<sup>−1</sup></td></tr>
            <tr className="bg-muted/40"><td className="border border-border p-2 font-semibold" rowSpan={3}>Système réglant</td><td className="border border-border p-2">Capteurs</td><td className="border border-border p-2" colSpan={3}><strong>Cellules du pancréas</strong></td></tr>
            <tr><td className="border border-border p-2">Commande</td><td className="border border-border p-2" colSpan={3}>Hormones du pancréas (insuline, glucagon)</td></tr>
            <tr><td className="border border-border p-2">Effecteurs</td><td className="border border-border p-2" colSpan={3}><strong>Foie</strong>, muscles, tissu adipeux</td></tr>
          </tbody>
        </table>
      </div>
      <H4 id="sec-2-6-5-2">Tableau 10 — Diabète sucré : types 1 et 2</H4>
      <div className="overflow-x-auto my-4">
        <table className="w-full border border-border text-sm">
          <thead className="bg-muted/40"><tr><th className="border border-border p-2 text-left">Diabète de type 1</th><th className="border border-border p-2 text-left">Diabète de type 2</th></tr></thead>
          <tbody>
            <tr><td className="border border-border p-2">Carence absolue en insuline</td><td className="border border-border p-2">Carence relative en insuline</td></tr>
            <tr><td className="border border-border p-2">Insuline (base + bolus si possible) + régime adapté</td><td className="border border-border p-2">Régime adapté (réduction calorique, activité physique) → si insuffisant : antidiabétiques oraux → si insuffisant : insuline.</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}


export default function CoursDietetiqueS2() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [activeChapter, setActiveChapter] = useState<string>("ch1");
  const [activeSection, setActiveSection] = useState<string>("sec-1-1");
  const [showTop, setShowTop] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  // Scroll spy
  useEffect(() => {
    if (!unlocked) return;
    const allIds = CHAPTERS.flatMap((c) => c.sections.map((s) => s.id));
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
      const y = window.scrollY + 140;
      let current = allIds[0];
      for (const id of allIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActiveSection(current);
      const ch = CHAPTERS.find((c) => c.sections.some((s) => s.id === current));
      if (ch) setActiveChapter(ch.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [unlocked]);

  const progress = useMemo(() => {
    const ch = CHAPTERS.find((c) => c.id === activeChapter)!;
    const idx = ch.sections.findIndex((s) => s.id === activeSection);
    return { chapter: ch.number, totalCh: CHAPTERS.length, sec: idx + 1, totalSec: ch.sections.length };
  }, [activeChapter, activeSection]);

  if (unlocked === null) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTocOpen(false);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <header className="bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-3">
            <BookOpen size={14} /> Licence · Diététique / Nutrition · Semestre 2
          </span>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
            Diététique / Nutrition — Semestre 2
          </h1>
          <p className="mt-2 text-white/85 max-w-3xl text-sm sm:text-base">
            Aspects anatomiques et physiologiques du système digestif et du système endocrinien.
          </p>
        </div>
      </header>

      {/* Sticky progress + nav bar */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
          <div className="text-xs sm:text-sm text-muted-foreground truncate">
            <strong className="text-foreground">
              Chapitre {progress.chapter}/{progress.totalCh}
            </strong>{" "}
            — Section {progress.sec}/{progress.totalSec}
          </div>
          <button
            onClick={() => setTocOpen((v) => !v)}
            className="lg:hidden inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold"
          >
            {tocOpen ? <X size={14} /> : <Menu size={14} />}
            Sommaire
          </button>
        </div>
      </div>

      {/* Mobile drawer TOC */}
      {tocOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setTocOpen(false)}>
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background shadow-xl border-l border-border overflow-y-auto p-5"
          >
            <h3 className="font-display font-bold text-lg mb-4">Table des matières</h3>
            <TocList active={activeSection} onClick={scrollTo} />
          </aside>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar TOC desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
              Table des matières
            </h3>
            <TocList active={activeSection} onClick={scrollTo} />
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0">
          {CHAPTERS.map((ch) => (
            <article
              key={ch.id}
              id={ch.id}
              className={cn(
                "scroll-mt-24 mb-12 rounded-2xl border-l-4 bg-card p-5 sm:p-7 shadow-sm",
                ch.id === "ch1" ? "border-teal-500" : "border-cyan-600",
              )}
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-white font-bold",
                    ch.id === "ch1" ? "bg-teal-600" : "bg-cyan-700",
                  )}
                >
                  {ch.number}
                </span>
                <h2 id={`title-${ch.id}`} className="font-display text-xl sm:text-2xl font-bold">
                  Chapitre {ch.number} — {ch.title}
                </h2>
              </div>

              {ch.id === "ch1" ? (
                <>
                  <Section1_1 />
                  <Section1_2 />
                  <Section1_3 />
                  <Section1_4 />
                  <Section1_5 />
                  <Section1_6 />
                  <Section1_7 />
                  <Section1_8 />
                  <Section1_9 />
                  <Section1_10 />
                  <Section1_11 />
                  <Section1_12 />
                  <Section1_13 />
                  <Section1_14 />
                </>
              ) : (
                <>
                  <Section2_1 />
                  <Section2_2 />
                  <Section2_3 />
                  <Section2_4 />
                  <Section2_5 />
                  <Section2_6 />
                </>
              )}
            </article>
          ))}
        </main>
      </div>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90"
          aria-label="Retour en haut"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}

function TocList({ active, onClick }: { active: string; onClick: (id: string) => void }) {
  return (
    <nav className="space-y-4 text-sm">
      {CHAPTERS.map((ch) => (
        <div key={ch.id}>
          <button
            onClick={() => onClick(ch.sections[0].id)}
            className="w-full text-left font-display font-semibold text-foreground hover:text-primary"
          >
            Ch. {ch.number}. {ch.title}
          </button>
          <ul className="mt-1.5 ml-2 space-y-0.5 border-l border-border pl-3">
            {ch.sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => onClick(s.id)}
                  className={cn(
                    "flex w-full items-start gap-1.5 rounded px-2 py-1 text-left text-xs leading-snug transition-colors",
                    active === s.id
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <ChevronRight size={12} className="mt-0.5 shrink-0" />
                  <span>{s.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
