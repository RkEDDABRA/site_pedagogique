import { useState, FormEvent } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import CourseGate from "@/components/CourseGate";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { ExternalLink } from "lucide-react";
import qrActivites from "@/assets/qr-activites-master.png";
import LordIcon, { LORD_ICONS } from "@/components/LordIcon";
import calendrier2024 from "@/assets/calendrier-vacances-2024-2025.png";
import calendrier2026 from "@/assets/calendrier-vacances-2025-2026.png";
import { dimsFor } from "@/lib/imageDims";

const tabs = [
  { id: "cours", label: "Cours", fa: "fa-solid fa-book-open", lordicon: LORD_ICONS.book, color: "gold" },
  { id: "activites", label: "Activités réalisées", fa: "fa-solid fa-bullseye", lordicon: LORD_ICONS.target, color: "purple" },
  { id: "organisation", label: "Organisation Modulaire", fa: "fa-solid fa-puzzle-piece", lordicon: LORD_ICONS.settings, color: "green" },
  { id: "planning", label: "Planning", fa: "fa-solid fa-calendar-days", lordicon: LORD_ICONS.calendar, color: "blue" },
  { id: "stages", label: "Stages", fa: "fa-solid fa-hospital", lordicon: LORD_ICONS.check, color: "yellow" },
  { id: "guides", label: "Guides", fa: "fa-solid fa-book", lordicon: LORD_ICONS.bookAlt, color: "pink" },
  { id: "eval", label: "Évaluation", fa: "fa-solid fa-clipboard-check", lordicon: LORD_ICONS.check, color: "teal" },
  { id: "pfe", label: "PFE", fa: "fa-solid fa-graduation-cap", lordicon: LORD_ICONS.document, color: "grey" },
];

const semesters = [
  {
    title: "Semestre 1",
    color: "bg-emerald-600",
    textColor: "text-emerald-700",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    modules: [
      { nature: "Disciplinaire", intitule: "Philosophie des soins et raisonnement clinique", vh: "50h", credits: "5" },
      { nature: "Disciplinaire", intitule: "Psychologie et sociologie de la santé", vh: "50h", credits: "4" },
      { nature: "Disciplinaire", intitule: "Déontologie et aspect organisationnel des urgences", vh: "50h", credits: "5" },
      { nature: "Disciplinaire", intitule: "Pharmacologie d'urgence et matériel/appareillage utilisé en soins d'urgence", vh: "50h", credits: "5" },
      { nature: "Disciplinaire", intitule: "Approfondissement clinique en soins d'urgences, démarche qualité", vh: "50h", credits: "5" },
      { nature: "Langues étrangères", intitule: "Français / Anglais", vh: "46h", credits: "3" },
      { nature: "Power Skills", intitule: "Soft Skills", vh: "45h", credits: "3" },
    ],
    totalVH: "341h",
    totalCredits: "30",
  },
  {
    title: "Semestre 2",
    color: "bg-blue-600",
    textColor: "text-blue-700",
    bgLight: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    modules: [
      { nature: "Disciplinaire", intitule: "Urgences médicales et stratégie de prise en charge", vh: "50h", credits: "5" },
      { nature: "Disciplinaire", intitule: "Urgences chirurgicales et pathologies circonstancielles", vh: "50h", credits: "5" },
      { nature: "Disciplinaire", intitule: "Stage d'application : simulation en santé", vh: "120h", credits: "4" },
      { nature: "Disciplinaire", intitule: "Stage au bloc opératoire", vh: "120h", credits: "5" },
      { nature: "Disciplinaire", intitule: "Stage d'approfondissement : Service d'Accueil des Urgences (SAU)", vh: "120h", credits: "5" },
      { nature: "Langues étrangères", intitule: "Français / Anglais", vh: "46h", credits: "3" },
      { nature: "Power Skills", intitule: "Culture digitale", vh: "45h", credits: "3" },
    ],
    totalVH: "551h",
    totalCredits: "30",
  },
  {
    title: "Semestre 3",
    color: "bg-orange-500",
    textColor: "text-orange-700",
    bgLight: "bg-orange-50 dark:bg-orange-950/30",
    borderColor: "border-orange-200 dark:border-orange-800",
    modules: [
      { nature: "Disciplinaire", intitule: "Méthodologie de recherche et biostatistique", vh: "50h", credits: "5" },
      { nature: "Disciplinaire", intitule: "Urgences mère enfant et stratégie de prise en charge", vh: "50h", credits: "5" },
      { nature: "Disciplinaire", intitule: "Traumatologie vitale et Médecine de catastrophe", vh: "50h", credits: "4" },
      { nature: "Disciplinaire", intitule: "Stage : Service d'Assistance Médicale d'Urgence (SAMU)", vh: "120h", credits: "5" },
      { nature: "Disciplinaire", intitule: "Stage : Mère Enfant", vh: "120h", credits: "5" },
      { nature: "Langues étrangères", intitule: "Langues étrangères", vh: "46h", credits: "3" },
      { nature: "Power Skills", intitule: "Culture and Art Skills", vh: "45h", credits: "3" },
    ],
    totalVH: "481h",
    totalCredits: "30",
  },
  {
    title: "Semestre 4",
    color: "bg-red-600",
    textColor: "text-red-700",
    bgLight: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
    modules: [
      { nature: "Power Skills", intitule: "Employment Skills", vh: "45h", credits: "3" },
      { nature: "PFE", intitule: "Projet de Fin d'Études", vh: "300h", credits: "27" },
    ],
    totalVH: "345h",
    totalCredits: "30",
  },
];

/** Nouvelle organisation modulaire — accréditation CNPN 2025 */
const semesters2025 = [
  {
    title: "Semestre 1",
    color: "bg-emerald-600",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    modules: [
      { nature: "Disciplinaire", intitule: "Psychologie et sociologie de la santé", vh: "50h", credits: "5" },
      { nature: "Disciplinaire", intitule: "Aspect organisationnel des urgences", vh: "40h", credits: "5" },
      { nature: "Disciplinaire", intitule: "Droit à la santé, éthique et responsabilité", vh: "50h", credits: "5" },
      { nature: "Disciplinaire", intitule: "Approfondissement clinique en soins d'urgences", vh: "50h", credits: "5" },
      { nature: "Langues étrangères", intitule: "Langues étrangères : anglais professionnel", vh: "40h", credits: "3" },
      { nature: "Transversal", intitule: "Philosophie des soins et raisonnement clinique", vh: "40h", credits: "3" },
      { nature: "Disciplinaire", intitule: "Épidémiologie et biostatistique", vh: "50h", credits: "4" },
    ],
    totalVH: "320h",
    totalCredits: "30",
  },
  {
    title: "Semestre 2",
    color: "bg-blue-600",
    bgLight: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    modules: [
      { nature: "Disciplinaire", intitule: "Urgences chirurgicales et pathologies circonstancielles", vh: "50h", credits: "5" },
      { nature: "Disciplinaire", intitule: "Stage au bloc opératoire", vh: "120h", credits: "4" },
      { nature: "Disciplinaire", intitule: "Stage d'approfondissement : service d'accueil des urgences (SAU)", vh: "120h", credits: "5" },
      { nature: "Transversal", intitule: "Culture entrepreneuriale et communication managériale", vh: "40h", credits: "3" },
      { nature: "Disciplinaire", intitule: "Urgences médicales et stratégie de prise en charge (1)", vh: "50h", credits: "5" },
      { nature: "Disciplinaire", intitule: "Pharmacologie d'urgence et matériel/appareillage utilisé en soins d'urgence", vh: "50h", credits: "5" },
      { nature: "Transversal", intitule: "Méthodologie de recherche", vh: "50h", credits: "3" },
    ],
    totalVH: "480h",
    totalCredits: "30",
  },
  {
    title: "Semestre 3",
    color: "bg-rose-600",
    bgLight: "bg-rose-50 dark:bg-rose-950/30",
    borderColor: "border-rose-200 dark:border-rose-800",
    modules: [
      { nature: "Disciplinaire", intitule: "Urgences médicales et stratégie de prise en charge (2)", vh: "50h", credits: "4" },
      { nature: "Disciplinaire", intitule: "Démarche qualité / gestion de risques", vh: "40h", credits: "4" },
      { nature: "Disciplinaire", intitule: "Urgences mère-enfant et stratégie de prise en charge", vh: "50h", credits: "4" },
      { nature: "Disciplinaire", intitule: "Stage d'application : simulation en santé", vh: "120h", credits: "4" },
      { nature: "Disciplinaire", intitule: "Stage : service d'assistance médicale d'urgence (SAMU)", vh: "120h", credits: "5" },
      { nature: "Disciplinaire", intitule: "Stage : mère-enfant", vh: "120h", credits: "5" },
      { nature: "Disciplinaire", intitule: "Traumatologie vitale et médecine de catastrophe", vh: "50h", credits: "4" },
    ],
    totalVH: "550h",
    totalCredits: "30",
  },
  {
    title: "Semestre 4",
    color: "bg-amber-600",
    bgLight: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800",
    modules: [
      { nature: "Disciplinaire", intitule: "Stage d'intégration : Service d'Accueil des Urgences (SAU) / PFE", vh: "300h", credits: "30" },
    ],
    totalVH: "300h",
    totalCredits: "30",
  },
];


const cours = [
  { fa: "fa-solid fa-pills", title: "Pharmacologie d'urgence", desc: "Pharmacologie des médicaments utilisés en situation d'urgence.", tag: "Pharmacologie", color: "border-t-gold", link: "https://padlet.com/eddabra/breakout-room/jzJX4E5jpVm34bnO-RdZYv7LoE55JbrPl" },
  { fa: "fa-solid fa-chart-line", title: "Méthodologie de recherche", desc: "Bases de la recherche scientifique appliquée aux soins d'urgence.", tag: "Recherche", color: "border-t-primary", link: "https://padlet.com/eddabra/breakout-room/jzJX4E5jpVm34bnO-RdZYv7LoE55JbrPl" },
  { fa: "fa-solid fa-baby", title: "Urgences pédiatriques et stratégies de prise en charge", desc: "Prise en charge des urgences pédiatriques et stratégies thérapeutiques adaptées.", tag: "Pédiatrie", color: "border-t-rose", link: "https://padlet.com/eddabra/breakout-room/nRxeqrly7kaw456P-RdZYv7LoE55JbrPl" },
];



const stages = [
  { name: "Stage d'application : Simulation en santé", badge: "S2", desc: "120h · 4 crédits", color: "bg-primary/10 text-primary" },
  { name: "Stage au bloc opératoire", badge: "S2", desc: "120h · 5 crédits", color: "bg-rose/10 text-rose" },
  { name: "Stage d'approfondissement : Service d'Accueil des Urgences (SAU)", badge: "S2", desc: "120h · 5 crédits", color: "bg-gold/10 text-gold" },
  { name: "Stage : Service d'Assistance Médicale d'Urgence (SAMU)", badge: "S3", desc: "120h · 5 crédits", color: "bg-teal/10 text-teal" },
  { name: "Stage : Mère Enfant", badge: "S3", desc: "120h · 5 crédits", color: "bg-accent/10 text-accent" },
];

const guides = [
  { title: "Guide du stagiaire", fa: "fa-solid fa-book-open", items: ["Objectifs de stage par service", "Compétences à acquérir", "Grille d'auto-évaluation", "Carnet de stage à compléter"], color: "border-l-primary" },
  { title: "Rapport de stage", fa: "fa-solid fa-file-lines", items: ["Structure attendue du rapport", "Critères d'évaluation", "Exemples de problématiques", "Normes de rédaction APA"], color: "border-l-gold" },
  { title: "Guide du PFE", fa: "fa-solid fa-graduation-cap", items: ["Choix du sujet et validation", "Recherche bibliographique", "Méthodologie et outils", "Préparation de la soutenance"], color: "border-l-rose" },
];

const evalStage = [
  { critere: "Savoir-faire technique", indicateur: "Maîtrise des gestes d'urgence (VVP, IOT, MCE…)", pts: "20 pts" },
  { critere: "Raisonnement clinique", indicateur: "Analyse, priorisation, décision en urgence", pts: "20 pts" },
  { critere: "Communication", indicateur: "Relation soignant-patient, transmissions SBAR", pts: "15 pts" },
  { critere: "Travail en équipe", indicateur: "Collaboration, leadership en situation critique", pts: "15 pts" },
  { critere: "Éthique et déontologie", indicateur: "Respect confidentialité, posture professionnelle", pts: "10 pts" },
  { critere: "Rapport de stage", indicateur: "Qualité rédactionnelle, structuration, richesse clinique", pts: "20 pts" },
];

const evalPFE = [
  { critere: "Pertinence du sujet", indicateur: "Problématique claire, justification, intérêt scientifique", pts: "10 pts" },
  { critere: "Revue de littérature", indicateur: "Exhaustivité, pertinence, citations normées", pts: "15 pts" },
  { critere: "Méthodologie", indicateur: "Rigueur, cohérence, outils adaptés", pts: "20 pts" },
  { critere: "Résultats", indicateur: "Présentation, tableaux, graphiques, objectivité", pts: "20 pts" },
  { critere: "Discussion", indicateur: "Interprétation, comparaison avec la littérature, limites", pts: "15 pts" },
  { critere: "Soutenance orale", indicateur: "Clarté, maîtrise, réponses aux questions du jury", pts: "15 pts" },
  { critere: "Présentation PowerPoint", indicateur: "Lisibilité, structuration, respect du timing", pts: "5 pts" },
];

const PAU_PASSWORD = "MPAU-AGADIR";
const PAU_STORAGE_KEY = "pau_guide_auth";

export default function MasterPage() {
  const [activeTab, setActiveTab] = useState("cours");
  const [pauUnlocked, setPauUnlocked] = useState(() => sessionStorage.getItem(PAU_STORAGE_KEY) === "true");
  const [pauInput, setPauInput] = useState("");
  const [pauError, setPauError] = useState(false);
  const [pauLoading, setPauLoading] = useState(false);

  const handlePauSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (pauLoading) return;
    setPauLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    if (pauInput === PAU_PASSWORD) {
      sessionStorage.setItem(PAU_STORAGE_KEY, "true");
      setPauUnlocked(true);
    } else {
      setPauError(true);
      setPauInput("");
    }
    setPauLoading(false);
  };

  const getTabColor = (id: string, isActive: boolean) => {
    if (!isActive) return "bg-muted text-muted-foreground hover:text-foreground";
    const map: Record<string, string> = {
      cours: "bg-gold text-gold-foreground shadow-md",
      activites: "bg-primary text-primary-foreground shadow-md",
      organisation: "bg-emerald-600 text-white shadow-md",
      planning: "bg-primary text-primary-foreground shadow-md",
      stages: "bg-gold text-gold-foreground shadow-md",
      guides: "bg-rose text-rose-foreground shadow-md",
      eval: "bg-teal text-teal-foreground shadow-md",
      pfe: "bg-foreground text-background shadow-md",
    };
    return map[id] || "";
  };

  const getTabIconColors = (id: string, isActive: boolean) => {
    if (!isActive) return "primary:#6b7280,secondary:#9ca3af";
    const map: Record<string, string> = {
      cours: "primary:#1a2332,secondary:#1a2332",
      activites: "primary:#ffffff,secondary:#ffffff",
      organisation: "primary:#ffffff,secondary:#ffffff",
      planning: "primary:#ffffff,secondary:#ffffff",
      stages: "primary:#1a2332,secondary:#1a2332",
      guides: "primary:#ffffff,secondary:#ffffff",
      eval: "primary:#ffffff,secondary:#ffffff",
      pfe: "primary:#ffffff,secondary:#ffffff",
    };
    return map[id] || "primary:#ffffff,secondary:#ffffff";
  };

  return (
    <CourseGate courseId="master-pau">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <AnimatedSection>
        <div className="relative rounded-2xl overflow-hidden min-h-[200px] flex items-center mb-8 bg-gradient-to-br from-slate-800 via-slate-700 to-cyan-900">
          <img
            src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=1200&q=80"
            alt="Master Pratiques Avancées en Urgentologie"
            width={1200} height={400}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/40 to-transparent" />
          <div className="relative z-10 p-8 sm:p-12">
            <span className="inline-flex items-center gap-2 bg-gold/15 border border-gold/35 text-gold px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-3">
              <LordIcon src={LORD_ICONS.trophy} size={20} colors="primary:#FFD700,secondary:#FFD700" trigger="loop" /> Master
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-card mb-2">Master PAU</h1>
            <p className="text-card/60 text-sm"><i className="fa-solid fa-stethoscope mr-1" aria-hidden="true" />Pratiques Avancées en Urgentologie · ISPITS Agadir</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Tabs */}
      <AnimatedSection delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-8 p-3 bg-card rounded-2xl border border-border shadow-card">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5",
                getTabColor(tab.id, activeTab === tab.id)
              )}
            >
              <LordIcon src={tab.lordicon} size={20} colors={getTabIconColors(tab.id, activeTab === tab.id)} />
              {tab.label}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Cours */}
      {activeTab === "cours" && (
        <AnimatedSection>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2 pb-4 border-b border-border">
              <LordIcon src={LORD_ICONS.book} size={28} colors="primary:#FFD700,secondary:#3B82F6" /> Programme des Cours
            </h2>
           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cours.map((c, i) => (
                <div key={i} className={`bg-secondary rounded-xl p-5 shadow-card border-t-[3px] ${c.color} hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200`}>
                  <div className="text-2xl mb-3 text-primary"><i className={c.fa} aria-hidden="true" /></div>
                  <h4 className="font-bold text-sm mb-1">{c.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                  <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary mt-3">{c.tag}</span>
                  <div className="mt-3 flex items-center gap-2">
                    <a href={c.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors">
                      <ExternalLink size={14} /> Accéder au Padlet
                    </a>
                  </div>
                  <div className="mt-3 bg-card rounded-lg p-2 inline-block">
                    <QRCodeSVG value={c.link} size={80} bgColor="transparent" fgColor="hsl(var(--foreground))" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Activités réalisées */}
      {activeTab === "activites" && (
        <AnimatedSection>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2 pb-4 border-b border-border">
              <LordIcon src={LORD_ICONS.target} size={28} colors="primary:#3B82F6,secondary:#FFD700" /> Activités réalisées dans le cadre du Master
            </h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Découvrez toutes les activités réalisées dans le cadre du Master Pratiques Avancées en Urgentologie.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="bg-secondary rounded-xl p-3">
                <img src={qrActivites} {...dimsFor(qrActivites)} alt="QR code Activités réalisées" width={150} height={150} loading="lazy" className="w-[150px] h-[150px]" />
              </div>
              <div className="flex-1">
                <a
                  href="https://padlet.com/eddabra/activit-s-r-alis-es-dans-le-cadre-du-master-pau-iqpbsk0ngliz6r5e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink size={16} />
                  Accéder au Padlet des Activités
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Planning */}
      {activeTab === "planning" && (
        <AnimatedSection>
          <div className="space-y-8">
            {/* Planning de démarrage */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2 pb-4 border-b border-border">
                <LordIcon src={LORD_ICONS.calendar} size={28} colors="primary:#3B82F6,secondary:#FFD700" /> Planning Prévisionnel — Master PAU (2024-2026)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-navy text-navy-foreground">
                      <th className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase rounded-tl-lg">Semestre</th>
                      <th className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase">Dates</th>
                      <th className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase rounded-tr-lg">Événements clés</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { sem: "S1", date: "Lundi 17 février 2025", event: "Rentrée effective" },
                      { sem: "S1", date: "Du 16 juin au 4 juillet 2025", event: "Examens de fin de semestre" },
                      { sem: "S1", date: "Lundi 7 juillet 2025", event: "Début du 2ème semestre" },
                      { sem: "S2", date: "Du 15 au 31 décembre 2025", event: "Examens de fin de semestre" },
                      { sem: "S2", date: "Lundi 5 janvier 2026", event: "Début du 3ème semestre" },
                      { sem: "S3", date: "Du 11 au 26 mai 2026", event: "Examens de fin de semestre" },
                      { sem: "S3", date: "Lundi 1 juin 2026", event: "Début du 4ème semestre" },
                      { sem: "S3", date: "Du 9 au 27 novembre 2026", event: "Examens de fin de semestre" },
                      { sem: "S4", date: "Du 30 nov. au 25 déc. 2026", event: "Soutenances" },
                      { sem: "S4", date: "Fin décembre 2026", event: "Fin de formation" },
                    ].map((row, i) => {
                      const semColors: Record<string, string> = {
                        S1: "bg-emerald-100 text-emerald-800",
                        S2: "bg-blue-100 text-blue-800",
                        S3: "bg-orange-100 text-orange-800",
                        S4: "bg-red-100 text-red-800",
                      };
                      return (
                        <tr key={i} className="border-b border-border last:border-b-0 hover:bg-primary/[0.02]">
                          <td className="px-4 py-3">
                            <span className={`text-xs font-bold px-2 py-1 rounded-md ${semColors[row.sem] || ""}`}>{row.sem}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{row.date}</td>
                          <td className="px-4 py-3 text-sm font-medium">{row.event}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <a
                  href="/documents/planning-demarrage-master.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <i className="fa-solid fa-file-pdf" /> Télécharger le planning officiel (PDF)
                </a>
              </div>
            </div>

            {/* Calendrier des vacances 2024-2025 */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                <i className="fa-solid fa-umbrella-beach text-emerald-500" /> Calendrier des Vacances Universitaires 2024/2025
              </h3>
              <img
                src={calendrier2024} {...dimsFor(calendrier2024)}
                alt="Calendrier des vacances universitaires 2024-2025"
                className="w-full max-w-2xl mx-auto rounded-xl border border-border shadow-sm"
              />
            </div>

            {/* Calendrier des vacances 2025-2026 */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                <i className="fa-solid fa-umbrella-beach text-blue-500" /> Calendrier des Vacances Universitaires 2025/2026
              </h3>
              <img
                src={calendrier2026} {...dimsFor(calendrier2026)}
                alt="Calendrier des vacances universitaires 2025-2026"
                className="w-full max-w-2xl mx-auto rounded-xl border border-border shadow-sm"
              />
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Organisation Modulaire */}
      {activeTab === "organisation" && (
        <AnimatedSection>
          {/* Nouvelle organisation — CNPN 2025 */}
          <div className="bg-card rounded-2xl p-6 shadow-card mb-8">
            <h2 className="font-display text-xl font-bold mb-2 flex items-center gap-2">
              <LordIcon src={LORD_ICONS.settings} size={28} colors="primary:#059669,secondary:#3B82F6" /> Nouvelle Organisation Modulaire de la filière
            </h2>
            <div className="mb-6 pb-4 border-b border-border">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 border border-gold/35 px-3 py-1 text-xs font-bold text-gold">
                <i className="fa-solid fa-certificate" aria-hidden="true" /> Accréditée suivant le CNPN 2025
              </span>
            </div>
            <div className="space-y-8">
              {semesters2025.map((sem, si) => (
                <div key={si} className={`rounded-xl overflow-hidden border ${sem.borderColor}`}>
                  <div className={`${sem.color} text-white px-4 py-3 font-bold text-sm tracking-wide flex items-center gap-2`}>
                    <i className="fa-solid fa-book-bookmark" aria-hidden="true" /> {sem.title}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={sem.bgLight}>
                          <th className="text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Nature</th>
                          <th className="text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Intitulé</th>
                          <th className="text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Volume Horaire</th>
                          <th className="text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Crédits</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sem.modules.map((m, mi) => (
                          <tr key={mi} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                            <td className="px-3 py-2.5">
                              <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-md ${
                                m.nature === "Disciplinaire" ? "bg-primary/10 text-primary" :
                                m.nature === "Transversal" ? "bg-rose/10 text-rose" :
                                "bg-teal/10 text-teal"
                              }`}>{m.nature}</span>
                            </td>
                            <td className="px-3 py-2.5 text-foreground">{m.intitule}</td>
                            <td className="px-3 py-2.5 font-medium text-muted-foreground">{m.vh}</td>
                            <td className="px-3 py-2.5 font-bold text-foreground">{m.credits}</td>
                          </tr>
                        ))}
                        <tr className={`font-bold ${sem.bgLight}`}>
                          <td className="px-3 py-2.5" colSpan={2}>Total</td>
                          <td className="px-3 py-2.5">{sem.totalVH}</td>
                          <td className="px-3 py-2.5">{sem.totalCredits}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-gold/10 to-rose/10 border border-border text-center">
              <p className="font-bold text-foreground text-sm"><i className="fa-solid fa-chart-pie mr-1" aria-hidden="true" /> Total Général : <span className="text-primary">1650h</span> — <span className="text-gold">120 crédits</span> — <span className="text-rose">4 Semestres</span></p>
            </div>
          </div>

          {/* Ancienne organisation — promotion 2024-2026 */}
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-xl font-bold mb-2 flex items-center gap-2">
              <LordIcon src={LORD_ICONS.settings} size={28} colors="primary:#059669,secondary:#3B82F6" /> Organisation Modulaire — Master PAU
            </h2>
            <div className="mb-6 pb-4 border-b border-border">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/25 px-3 py-1 text-xs font-bold text-primary">
                <i className="fa-solid fa-users" aria-hidden="true" /> Organisation modulaire concernant la promotion 2024-2026
              </span>
            </div>
            <div className="space-y-8">

              {semesters.map((sem, si) => (
                <div key={si} className={`rounded-xl overflow-hidden border ${sem.borderColor}`}>
                  <div className={`${sem.color} text-white px-4 py-3 font-bold text-sm tracking-wide flex items-center gap-2`}>
                    <i className="fa-solid fa-book-bookmark" aria-hidden="true" /> {sem.title}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={sem.bgLight}>
                          <th className="text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Nature</th>
                          <th className="text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Intitulé</th>
                          <th className="text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Volume Horaire</th>
                          <th className="text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Crédits</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sem.modules.map((m, mi) => (
                          <tr key={mi} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                            <td className="px-3 py-2.5">
                              <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-md ${
                                m.nature === "Disciplinaire" ? "bg-primary/10 text-primary" :
                                m.nature === "PFE" ? "bg-gold/15 text-gold" :
                                m.nature === "Power Skills" ? "bg-rose/10 text-rose" :
                                "bg-teal/10 text-teal"
                              }`}>{m.nature}</span>
                            </td>
                            <td className="px-3 py-2.5 text-foreground">{m.intitule}</td>
                            <td className="px-3 py-2.5 font-medium text-muted-foreground">{m.vh}</td>
                            <td className="px-3 py-2.5 font-bold text-foreground">{m.credits}</td>
                          </tr>
                        ))}
                        <tr className={`font-bold ${sem.bgLight}`}>
                          <td className="px-3 py-2.5" colSpan={2}>Total</td>
                          <td className="px-3 py-2.5">{sem.totalVH}</td>
                          <td className="px-3 py-2.5">{sem.totalCredits}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-gold/10 to-rose/10 border border-border text-center">
              <p className="font-bold text-foreground text-sm"><i className="fa-solid fa-chart-pie mr-1" aria-hidden="true" /> Total Général : <span className="text-primary">1718h</span> — <span className="text-gold">120 crédits</span> — <span className="text-rose">4 Semestres</span></p>
            </div>
          </div>
        </AnimatedSection>
      )}

      {activeTab === "stages" && (
        <AnimatedSection>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2 pb-4 border-b border-border">
              <LordIcon src={LORD_ICONS.check} size={28} colors="primary:#FFD700,secondary:#3B82F6" /> Stages Cliniques
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {stages.map((s, i) => (
                <div key={i} className="bg-secondary rounded-xl p-5 border border-border hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200">
                  <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${s.color}`}>{s.badge}</span>
                  <h4 className="font-bold text-sm mb-1">{s.name}</h4>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Guides */}
      {activeTab === "guides" && (
        <AnimatedSection>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2 pb-4 border-b border-border">
              <LordIcon src={LORD_ICONS.bookAlt} size={28} colors="primary:#E23670,secondary:#3B82F6" /> Guides Pédagogiques
            </h2>
            <div className="space-y-4">
              {guides.map((g, i) => (
                <div key={i} className={`bg-secondary rounded-xl p-5 border-l-4 ${g.color} hover:translate-x-1 transition-all duration-200`}>
                  <h4 className="font-bold text-sm mb-3 flex items-center gap-2"><i className={g.fa} aria-hidden="true" /> {g.title}</h4>
                  <ul className="space-y-1.5 pl-4 list-disc">
                    {g.items.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              {pauUnlocked ? (
                <a
                  href="https://padlet.com/eddabra/breakout-room/5Wkoqm1alVemq8pM-RdZYv7LoE55JbrPl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-rose text-rose-foreground text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-rose/90 transition-colors"
                >
                  <ExternalLink size={16} />
                  Accéder au Guide
                </a>
              ) : (
                <div className="w-full max-w-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <i className="fa-solid fa-lock text-muted-foreground" aria-hidden="true" />
                    <p className="text-sm font-medium text-foreground">Accès protégé</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">Entrez le mot de passe pour accéder au guide PAU.</p>
                  <form onSubmit={handlePauSubmit} className="flex flex-col gap-3">
                    <input
                      type="password"
                      value={pauInput}
                      onChange={(e) => { setPauInput(e.target.value); setPauError(false); }}
                      placeholder="Mot de passe"
                      className="rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring transition-shadow"
                      disabled={pauLoading}
                    />
                    {pauError && <p className="text-xs text-destructive">Mot de passe incorrect.</p>}
                    <button
                      type="submit"
                      disabled={pauLoading}
                      className="rounded-lg bg-rose text-rose-foreground px-4 py-2 text-sm font-semibold hover:bg-rose/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {pauLoading ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-rose-foreground border-t-transparent" />
                          Vérification...
                        </>
                      ) : (
                        "Accéder au guide"
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Évaluation */}
      {activeTab === "eval" && (
        <AnimatedSection>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2 pb-4 border-b border-border">
              <LordIcon src={LORD_ICONS.check} size={28} colors="primary:#158FAD,secondary:#3B82F6" /> Grilles d'Évaluation
            </h2>

            <h3 className="font-bold text-sm mb-3 text-foreground flex items-center gap-2"><i className="fa-solid fa-hospital text-primary" aria-hidden="true" /> Évaluation du Stage</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Critère</th>
                    <th className="text-left px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Indicateurs</th>
                    <th className="text-left px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {evalStage.map((e, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0">
                      <td className="px-3 py-2 font-medium">{e.critere}</td>
                      <td className="px-3 py-2 text-muted-foreground">{e.indicateur}</td>
                      <td className="px-3 py-2"><span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-md">{e.pts}</span></td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="px-3 py-2" colSpan={2}>TOTAL</td>
                    <td className="px-3 py-2"><span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-md">100 pts</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-bold text-sm mb-3 text-foreground flex items-center gap-2"><i className="fa-solid fa-graduation-cap text-gold" aria-hidden="true" /> Évaluation du PFE</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Critère</th>
                    <th className="text-left px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Détail</th>
                    <th className="text-left px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {evalPFE.map((e, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0">
                      <td className="px-3 py-2 font-medium">{e.critere}</td>
                      <td className="px-3 py-2 text-muted-foreground">{e.indicateur}</td>
                      <td className="px-3 py-2"><span className="bg-gold/15 text-gold text-xs font-bold px-2 py-0.5 rounded-md">{e.pts}</span></td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="px-3 py-2" colSpan={2}>TOTAL</td>
                    <td className="px-3 py-2"><span className="bg-gold text-gold-foreground text-xs font-bold px-2 py-0.5 rounded-md">100 pts</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* PFE */}
      {activeTab === "pfe" && (
        <AnimatedSection>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2 pb-4 border-b border-border">
              <LordIcon src={LORD_ICONS.document} size={28} colors="primary:#333333,secondary:#3B82F6" /> Projet de Fin d'Étude
            </h2>
            <div className="space-y-4">
              {guides.map((g, i) => (
                <div key={i} className={`bg-secondary rounded-xl p-5 border-l-4 ${g.color}`}>
                  <h4 className="font-bold text-sm mb-3 flex items-center gap-2"><i className={g.fa} aria-hidden="true" /> {g.title}</h4>
                  <ul className="space-y-1.5 pl-4 list-disc">
                    {g.items.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}
    </div>
    </CourseGate>
  );
}
