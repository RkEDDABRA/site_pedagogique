import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseGate from "@/components/CourseGate";
import PresentationChapters from "@/components/PresentationChapters";
import { PRESENTATIONS_SF_S1 } from "@/data/presentationsSfS1";
import { PRESENTATIONS_SF_S2 } from "@/data/presentationsSfS2";
import { RESSOURCES_SF_S1 } from "@/data/ressourcesSfS1";
import polycopieExoSfS1 from "@/assets/exercices/sf-s1/polycopie_exercices.pdf.asset.json";
import type { CourseId } from "@/lib/courseAccess";

import CoursSageFemmeS1 from "./cours/CoursSageFemmeS1";
import CoursAnatomieGynecoObstetricale from "./cours/CoursAnatomieGynecoObstetricale";
import CoursDietetiqueS2 from "./cours/CoursDietetiqueS2";


/* ================================================================
   CONFIGURATION
   ================================================================ */
const CONFIG = {
  options: [
    {
      id: "sf",
      label: "Sage-Femme",
      filiere: "Filière Sage-Femme — Option Sage-Femme",
      color: "#7c3d8f",
      light: "#f5eef8",
      semestres: [
        {
          id: "s1",
          label: "Semestre 1",
          module: "Sciences Biologiques",
          CoursComponent: CoursSageFemmeS1 as React.ComponentType | null,
          courseId: "sf-s1" as CourseId,
          exercices: [
            { titre: "Série 1 – Biologie cellulaire", niveau: "Niveau 1", enonce: "Décrivez les différents organites de la cellule eucaryote et précisez leurs fonctions. Comparez cellule animale et cellule végétale." },
            { titre: "Série 2 – Microbiologie générale", niveau: "Niveau 2", enonce: "Distinguez bactéries, virus, champignons et parasites. Donnez deux exemples pathogènes rencontrés en obstétrique pour chaque groupe." },
            { titre: "Série 3 – Immunologie", niveau: "Niveau 2", enonce: "Expliquez les mécanismes de la réponse immunitaire innée et adaptative. Quel est le rôle du placenta dans la protection immunitaire du fœtus ?" },
          ],
          corrections: [
            { titre: "Corrigé Série 1 – Biologie cellulaire", detail: "Correction détaillée avec schémas annotés.", fichier: "#" },
            { titre: "Corrigé Série 2 – Microbiologie", detail: "Tableaux comparatifs des micro-organismes.", fichier: "#" },
            { titre: "Corrigé Série 3 – Immunologie", detail: "Schémas de la réponse immunitaire.", fichier: "#" },
          ],
          presentations: [
            { titre: "Présentation – La cellule eucaryote", type: "PowerPoint", fichier: "#" },
            { titre: "Présentation – Micro-organismes pathogènes", type: "PowerPoint", fichier: "#" },
            { titre: "Présentation – Immunologie de base", type: "PowerPoint", fichier: "#" },
          ],
          ressources: [
            { titre: "Biologie cellulaire et moléculaire – Karp", type: "Ouvrage de référence", lien: "#" },
            { titre: "Microbiologie – Tortora, Funke & Case", type: "Manuel recommandé", lien: "#" },
            { titre: "PubMed – Base de données scientifiques", type: "Ressource en ligne", lien: "https://pubmed.ncbi.nlm.nih.gov/" },
          ],
        },
        {
          id: "s2",
          label: "Semestre 2",
          module: "Anatomie Gynéco-Obstétricale",
          CoursComponent: CoursAnatomieGynecoObstetricale as React.ComponentType | null,
          courseId: "sf-s2" as CourseId,
          exercices: [
            { titre: "Série 1 – Le bassin obstétrical", niveau: "Niveau 1", enonce: "Décrivez les différents diamètres du bassin obstétrical et leur importance clinique lors de l'accouchement." },
            { titre: "Série 2 – Physiologie de la grossesse", niveau: "Niveau 2", enonce: "Expliquez les modifications anatomiques et physiologiques majeures survenant au cours de la grossesse (cardiovasculaires, respiratoires, rénales, hormonales)." },
            { titre: "Série 3 – Mécanismes de l'accouchement", niveau: "Niveau 3", enonce: "Décrivez les différents temps du mécanisme de l'accouchement en présentation céphalique et les variétés de présentation possibles." },
          ],
          corrections: [
            { titre: "Corrigé Série 1 – Bassin obstétrical", detail: "Schémas et mesures des diamètres pelviens.", fichier: "#" },
            { titre: "Corrigé Série 2 – Modifications de la grossesse", detail: "Tableaux récapitulatifs par système.", fichier: "#" },
            { titre: "Corrigé Série 3 – Mécanismes d'accouchement", detail: "Schémas séquentiels des temps de l'accouchement.", fichier: "#" },
          ],
          presentations: [
            { titre: "Présentation – Anatomie du pelvis féminin", type: "PowerPoint", fichier: "#" },
            { titre: "Présentation – Le bassin obstétrical", type: "PowerPoint", fichier: "#" },
            { titre: "Présentation – Mécanismes de l'accouchement", type: "PowerPoint", fichier: "#" },
          ],
          ressources: [
            { titre: "Atlas d'anatomie humaine – Netter", type: "Atlas de référence", lien: "#" },
            { titre: "Obstétrique – Merger, Lévy & Melchior", type: "Ouvrage de référence", lien: "#" },
            { titre: "WHO – Reproductive health library", type: "Ressource internationale", lien: "https://www.who.int/reproductivehealth/" },
          ],
        },
      ],
    },
    {
      id: "dn",
      label: "Diététique & Nutrition",
      filiere: "Filière Techniques de Santé — Option Diététique & Nutrition",
      color: "#1a7a4a",
      light: "#eaf7f0",
      semestres: [
        {
          id: "s1",
          label: "Semestre 1",
          module: "Anatomie et Physiologie Humaine",
          CoursComponent: null as React.ComponentType | null,
          courseId: "dn-s1" as CourseId,
          exercices: [
            { titre: "Série 1 – Le système digestif", niveau: "Niveau 1", enonce: "Décrivez les différents segments du tube digestif en précisant pour chacun la structure anatomique, les sécrétions et le rôle dans la digestion des macronutriments." },
            { titre: "Série 2 – Absorption intestinale", niveau: "Niveau 2", enonce: "Expliquez les mécanismes d'absorption intestinale des glucides, lipides et protéines. Précisez le rôle de la villosité intestinale." },
          ],
          corrections: [
            { titre: "Corrigé Série 1 – Système digestif", detail: "Correction avec schémas anatomiques annotés.", fichier: "#" },
            { titre: "Corrigé Série 2 – Absorption intestinale", detail: "Schémas des mécanismes de transport membranaire.", fichier: "#" },
          ],
          presentations: [
            { titre: "Présentation – Organisation du corps humain", type: "PowerPoint", fichier: "#" },
            { titre: "Présentation – Le système digestif", type: "PowerPoint", fichier: "#" },
          ],
          ressources: [
            { titre: "Physiologie humaine – Sherwood", type: "Manuel de référence", lien: "#" },
            { titre: "Anatomie & Physiologie – Marieb & Hoehn", type: "Ouvrage recommandé", lien: "#" },
          ],
        },
        {
          id: "s2",
          label: "Semestre 2",
          module: "Bases Physiologiques de la Nutrition",
          CoursComponent: CoursDietetiqueS2 as React.ComponentType | null,
          courseId: "dn-s2" as CourseId,
          exercices: [
            { titre: "Série 1 – Métabolisme des glucides", niveau: "Niveau 1", enonce: "Décrivez les voies métaboliques des glucides (glycolyse, néoglucogenèse, glycogénèse). Calculez les besoins glucidiques journaliers d'un adulte de 70 kg avec activité physique modérée." },
            { titre: "Série 2 – Métabolisme lipidique", niveau: "Niveau 2", enonce: "Distinguez les acides gras saturés, insaturés et trans. Expliquez le rôle des lipoprotéines (HDL, LDL, VLDL) dans le transport des lipides sanguins." },
            { titre: "Série 3 – Bilan énergétique", niveau: "Niveau 3", enonce: "Calculez le métabolisme de base (Harris-Benedict), la dépense énergétique totale et les apports recommandés pour un patient hospitalisé en dénutrition modérée." },
          ],
          corrections: [
            { titre: "Corrigé Série 1 – Glucides", detail: "Schémas des voies métaboliques + calcul détaillé.", fichier: "#" },
            { titre: "Corrigé Série 2 – Lipides", detail: "Tableau comparatif des acides gras et lipoprotéines.", fichier: "#" },
            { titre: "Corrigé Série 3 – Bilan énergétique", detail: "Application numérique complète avec toutes les formules.", fichier: "#" },
          ],
          presentations: [
            { titre: "Présentation – Métabolisme des glucides", type: "PowerPoint", fichier: "#" },
            { titre: "Présentation – Métabolisme des lipides", type: "PowerPoint", fichier: "#" },
            { titre: "Présentation – Besoins énergétiques et caloriques", type: "PowerPoint", fichier: "#" },
          ],
          ressources: [
            { titre: "Nutrition clinique pratique – Cynober & Aussel", type: "Ouvrage de référence", lien: "#" },
            { titre: "Apports Nutritionnels Conseillés – ANSES", type: "Référentiel officiel", lien: "https://www.anses.fr/" },
            { titre: "FAO – Nutrition et alimentation", type: "Ressource internationale", lien: "https://www.fao.org/nutrition/" },
          ],
        },
      ],
    },
  ],
};

/* ================================================================
   ICÔNES SVG INLINE
   ================================================================ */
const ICONS: Record<string, string> = {
  book:     "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",
  pencil:   "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  check:    "M20 6L9 17l-5-5",
  slides:   "M2 3h20v14H2z M8 21h8M12 17v4",
  link:     "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5M12 15V3",
  chevron:  "M9 18l6-6-6-6",
  info:     "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 16v-4M12 8h.01",
  external: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6M10 14L21 3",
  lock:     "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M17 11V7a5 5 0 0 0-10 0v4",
};

function Ico({ name, size = 18, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      {ICONS[name]?.split(" M").map((d, i) => (
        <path key={i} d={i === 0 ? d : "M" + d} />
      ))}
    </svg>
  );
}

/** Mot de passe nécessaire pour ouvrir les fichiers de présentation, par cours. */
const FILE_PASSWORDS: Partial<Record<CourseId, string>> = {
  "sf-s1": "S12024",
  "sf-s2": "SF2025",
};

const TABS = [
  { id: "cours",         label: "Cours complet",    icon: "book"    },
  { id: "exercices",     label: "Exercices",         icon: "pencil"  },
  { id: "corrections",   label: "Corrections",       icon: "check"   },
  { id: "presentations", label: "Présentations",     icon: "slides"  },
  { id: "ressources",    label: "Ressources",        icon: "link"    },
];

export default function LicencePage() {
  const navigate = useNavigate();
  const [activeOpt, setActiveOpt] = useState("sf");
  const [activeSem, setActiveSem] = useState("s1");
  const [activeTab, setActiveTab] = useState("cours");
  const [openExo,   setOpenExo]   = useState<number | null>(null);

  const option   = CONFIG.options.find(o => o.id === activeOpt)!;
  const semestre = option.semestres.find(s => s.id === activeSem) ?? option.semestres[0];
  const c        = option.color;
  const light    = option.light;
  const CoursComponent = semestre.CoursComponent;

  const switchOpt = (id: string) => {
    const opt = CONFIG.options.find(o => o.id === id)!;
    setActiveOpt(id);
    setActiveSem(opt.semestres[0]?.id ?? "s1");
    setActiveTab("cours");
    setOpenExo(null);
  };
  const switchSem = (id: string) => { setActiveSem(id); setActiveTab("cours"); setOpenExo(null); };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", background: "#f4f5f7" }}>

      <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 1.5rem", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: c, color: "#fff", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s", flexShrink: 0 }}>RE</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.1 }}>Pr. Rkia EDDABRA</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>Microbiologie · ISPITS Agadir · Licence</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            {CONFIG.options.map(opt => (
              <button key={opt.id} onClick={() => switchOpt(opt.id)} style={{
                padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer",
                border: `2px solid ${opt.color}`,
                background: activeOpt === opt.id ? opt.color : "transparent",
                color:      activeOpt === opt.id ? "#fff"    : opt.color,
                transition: "all 0.2s",
              }}>{opt.label}</button>
            ))}
            <button onClick={() => navigate("/laboratoire")} style={{
              padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer",
              border: "2px solid #1d4ed8", background: "transparent", color: "#1d4ed8",
              transition: "all 0.2s",
            }}>Laboratoire</button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "1.75rem 1.5rem" }}>

        <div style={{ background: c, borderRadius: 18, padding: "1.6rem 2rem", color: "#fff", marginBottom: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, transition: "background 0.3s" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", opacity: 0.7, marginBottom: 6 }}>{option.filiere}</div>
            <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.15 }}>{semestre.module}</div>
            <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>{semestre.label}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {option.semestres.map(sem => (
              <button key={sem.id} onClick={() => switchSem(sem.id)} style={{
                padding: "10px 22px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer",
                border: "2px solid rgba(255,255,255,0.5)",
                background: activeSem === sem.id ? "rgba(255,255,255,0.22)" : "transparent",
                color: "#fff", transition: "all 0.2s",
              }}>{sem.label}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", background: "#fff", borderRadius: 14, padding: 5, marginBottom: "1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1px solid #e5e7eb" }}>
          {TABS.map(tab => {
            const on = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                display: "flex", alignItems: "center", gap: 7, padding: "9px 16px",
                borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
                border: "none", whiteSpace: "nowrap",
                background: on ? c : "transparent",
                color:      on ? "#fff" : "#6b7280",
                transition: "all 0.2s",
              }}>
                <Ico name={tab.icon} size={15} color={on ? "#fff" : "#9ca3af"} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <CourseGate courseId={semestre.courseId} accent={c}>

          {activeTab === "cours" && (
            CoursComponent
              ? <CoursComponent />
              : (
                <div style={{ padding: "3rem 2rem", textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: light, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                    <Ico name="lock" size={24} color={c} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 8 }}>Cours en cours de préparation</div>
                  <div style={{ fontSize: 14, color: "#6b7280" }}>Ce cours sera disponible prochainement.</div>
                </div>
              )
          )}

          {activeTab === "exercices" && (
            <div style={{ padding: "1.75rem 2rem" }}>
              <SectionHead icon="pencil" label="Exercices" color={c} />
              <Notice color={c} light={light}>Essayez de résoudre chaque exercice avant de consulter la correction dans l'onglet dédié.</Notice>
              {semestre.courseId === "sf-s1" && (
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", border: "1px solid #e5e7eb", borderRadius: 12, background: "#fafafa", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "#dc262618", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <i className="fa-solid fa-file-pdf" aria-hidden="true" style={{ color: "#dc2626", fontSize: 18 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>Polycopié des exercices – Sciences Biologiques</div>
                    <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>
                      PDF · {(polycopieExoSfS1.size / 1024 / 1024).toFixed(1)} Mo
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <a href={encodeURI(polycopieExoSfS1.url)} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, border: `1.5px solid ${c}`, color: c, textDecoration: "none" }}>
                      <Ico name="external" size={14} color={c} /> Ouvrir
                    </a>
                    <a href={encodeURI(polycopieExoSfS1.url)} download={polycopieExoSfS1.original_filename} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, background: c, color: "#fff", textDecoration: "none" }}>
                      <Ico name="download" size={14} color="#fff" /> Télécharger
                    </a>
                  </div>
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {semestre.exercices.map((ex, i) => (
                  <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
                    <button onClick={() => setOpenExo(openExo === i ? null : i)} style={{
                      width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "13px 16px", background: openExo === i ? light : "#fafafa",
                      border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.2s",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: c, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                        <span style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{ex.titre}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: light, color: c, fontWeight: 700 }}>{ex.niveau}</span>
                        <div style={{ transform: openExo === i ? "rotate(90deg)" : "none", transition: "transform 0.2s", display: "flex" }}>
                          <Ico name="chevron" size={15} color="#9ca3af" />
                        </div>
                      </div>
                    </button>
                    {openExo === i && (
                      <div style={{ padding: "1rem 1.25rem", borderTop: `3px solid ${c}`, background: "#fff", fontSize: 14, color: "#374151", lineHeight: 1.75 }}>
                        {ex.enonce}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "corrections" && (
            <div style={{ padding: "1.75rem 2rem" }}>
              <SectionHead icon="check" label="Corrections" color={c} />
              <Notice color="#1a7a4a" light="#eaf7f0">Les corrigés sont fournis à titre indicatif. D'autres approches peuvent être acceptées.</Notice>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {semestre.corrections.map((item, i) => (
                  <div key={i} style={{ borderLeft: `4px solid ${c}`, borderRadius: "0 12px 12px 0", padding: "14px 16px", background: light, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: c, marginBottom: 4 }}>{item.titre}</div>
                      <div style={{ fontSize: 13, color: "#4b5563" }}>{item.detail}</div>
                    </div>
                    <a href={item.fichier} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, background: c, color: "#fff", textDecoration: "none", flexShrink: 0 }}>
                      <Ico name="download" size={14} color="#fff" /> Télécharger
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "presentations" && (
            <div style={{ padding: "1.75rem 2rem" }}>
              <SectionHead icon="slides" label="Mes présentations" color={c} />
              {FILE_PASSWORDS[semestre.courseId] && (
                <FilePasswordBanner color={c} light={light} password={FILE_PASSWORDS[semestre.courseId]!} />
              )}
              {semestre.courseId === "sf-s1" ? (
                <PresentationChapters chapters={PRESENTATIONS_SF_S1} color={c} light={light} />
              ) : semestre.courseId === "sf-s2" ? (
                <PresentationChapters chapters={PRESENTATIONS_SF_S2} color={c} light={light} />
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
                  {semestre.presentations.map((p, i) => (
                    <a key={i} href={p.fichier} style={{ textDecoration: "none", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", display: "block", background: "#fff", transition: "box-shadow 0.2s, transform 0.2s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.10)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                      <div style={{ height: 90, background: light, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Ico name="slides" size={40} color={c} />
                      </div>
                      <div style={{ padding: "12px 14px" }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: "#111827", marginBottom: 4 }}>{p.titre}</div>
                        <div style={{ fontSize: 11, color: "#9ca3af" }}>{p.type}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}


          {activeTab === "ressources" && (
            <div style={{ padding: "1.75rem 2rem" }}>
              <SectionHead icon="link" label="Ressources bibliographiques" color={c} />
              {semestre.courseId === "sf-s1" ? (
                <PresentationChapters chapters={RESSOURCES_SF_S1} color={c} light={light} />
              ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {semestre.ressources.map((r, i) => (
                  <a key={i} href={r.lien} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, textDecoration: "none", border: "1px solid #e5e7eb", background: "#fafafa", transition: "background 0.15s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = light}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#fafafa"}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: light, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Ico name="external" size={18} color={c} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{r.titre}</div>
                      <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{r.type}</div>
                    </div>
                    <Ico name="chevron" size={15} color="#d1d5db" />
                  </a>
                ))}
              </div>
              )}
            </div>
          )}

          </CourseGate>
        </div>
      </div>
    </div>
  );
}

function SectionHead({ icon, label, color }: { icon: string; label: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Ico name={icon} size={18} color={color} />
      </div>
      <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: "#111827" }}>{label}</h2>
    </div>
  );
}

function Notice({ color, light, children }: { color: string; light: string; children: React.ReactNode }) {
  return (
    <div style={{ background: light, border: `1px solid ${color}25`, borderRadius: 10, padding: "10px 14px", display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: "#374151", marginBottom: "1.25rem" }}>
      <Ico name="info" size={15} color={color} />
      <span>{children}</span>
    </div>
  );
}

function FilePasswordBanner({ color, light, password }: { color: string; light: string; password: string }) {
  return (
    <div style={{ background: light, border: `1px solid ${color}35`, borderRadius: 12, padding: "12px 16px", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: "1.25rem" }}>
      <Ico name="lock" size={16} color={color} />
      <span style={{ fontSize: 13, color: "#374151" }}>
        Mot de passe requis pour ouvrir les fichiers :
      </span>
      <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: 0.6, color, background: "#fff", border: `1px solid ${color}35`, borderRadius: 8, padding: "4px 12px" }}>
        {password}
      </span>
    </div>
  );
}
