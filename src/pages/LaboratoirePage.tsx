import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CourseGate from "@/components/CourseGate";
import PresentationChapters from "@/components/PresentationChapters";
import { PRESENTATIONS_SF_S1 } from "@/data/presentationsSfS1";
import { RESSOURCES_SF_S1 } from "@/data/ressourcesSfS1";
import { SF_S1_EXERCICES, SF_S1_CORRECTIONS, FilePasswordBanner } from "@/pages/LicencePage";
import polycopieExoSfS1 from "@/assets/exercices/sf-s1/polycopie_exercices.pdf.asset.json";
import type { CourseId } from "@/lib/courseAccess";

/* ================================================================
   CONFIGURATION — Option Laboratoire
   ================================================================ */
const COLOR = "#1d4ed8";
const LIGHT = "#eaf0fe";

const OPTION = {
  filiere: "Filière Techniques de Santé — Option Laboratoire",
  semestres: [
    {
      id: "s1",
      label: "Semestre 1",
      module: "Biologie cellulaire, Immunologie",
      cours: [
        {
          id: "bc",
          titre: "Biologie cellulaire",
          soustitre: "Semestre 1 · Option Laboratoire",
          courseId: "lab-s1-bc" as CourseId,
          courseRoute: "/laboratoire/biologie-cellulaire",
          description:
            "Structure cellulaire, membrane plasmique, cytoplasme et organites.",
        },
        {
          id: "immuno",
          titre: "Immunologie",
          soustitre: "Semestre 1 · Option Laboratoire",
          courseId: "lab-s1-immuno" as CourseId,
          courseRoute: "/laboratoire/immunologie",
          description:
            "Système immunitaire : notions de soi / non-soi, immunité naturelle (innée) et immunité acquise (adaptative), réponse humorale et cellulaire, vaccination et sérothérapie.",
        },
      ],
    },
  ],
};

/* Onglets options (haut de page) */
const OPTIONS_PILLS = [
  { id: "sf", label: "Sage-Femme", color: "#7c3d8f", to: "/licence" },
  { id: "dn", label: "Diététique & Nutrition", color: "#1a7a4a", to: "/licence" },
  { id: "lab", label: "Laboratoire", color: COLOR, to: "/laboratoire" },
];

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

const TABS = [
  { id: "cours",         label: "Cours complet", icon: "book"   },
  { id: "exercices",     label: "Exercices",     icon: "pencil" },
  { id: "corrections",   label: "Corrections",   icon: "check"  },
  { id: "presentations", label: "Présentations", icon: "slides" },
  { id: "ressources",    label: "Ressources",    icon: "link"   },
];

export default function LaboratoirePage() {
  const navigate = useNavigate();
  const [activeSem, setActiveSem] = useState("s1");
  const semestre = OPTION.semestres.find(s => s.id === activeSem) ?? OPTION.semestres[0];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", background: "#f4f5f7" }}>

      <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 1.5rem", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: COLOR, color: "#fff", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>RE</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.1 }}>Pr. Rkia EDDABRA</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>Microbiologie · ISPITS Agadir · Option Laboratoire</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap" }}>
            {OPTIONS_PILLS.map(opt => (
              <button key={opt.id} onClick={() => navigate(opt.to)} style={{
                padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer",
                border: `2px solid ${opt.color}`,
                background: opt.id === "lab" ? opt.color : "transparent",
                color:      opt.id === "lab" ? "#fff"    : opt.color,
                transition: "all 0.2s",
              }}>{opt.label}</button>
            ))}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "1.75rem 1.5rem" }}>

        <div style={{ background: COLOR, borderRadius: 18, padding: "1.6rem 2rem", color: "#fff", marginBottom: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", opacity: 0.7, marginBottom: 6 }}>{OPTION.filiere}</div>
            <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.15 }}>{semestre.module}</div>
            <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>{semestre.label}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {OPTION.semestres.map(sem => (
              <button key={sem.id} onClick={() => setActiveSem(sem.id)} style={{
                padding: "10px 22px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer",
                border: "2px solid rgba(255,255,255,0.5)",
                background: activeSem === sem.id ? "rgba(255,255,255,0.22)" : "transparent",
                color: "#fff", transition: "all 0.2s",
              }}>{sem.label}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          {semestre.cours.map(cours => (
            <CourseBlock key={cours.id} cours={cours} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CourseBlock({ cours }: { cours: { id: string; titre: string; soustitre: string; courseId: CourseId; courseRoute?: string; description?: string } }) {
  const [activeTab, setActiveTab] = useState("cours");
  const [openExo, setOpenExo] = useState<number | null>(null);

  const isImmuno = cours.id === "immuno";

  return (
    <div>
      <div style={{ background: COLOR, borderRadius: 16, padding: "1.15rem 1.6rem", color: "#fff", marginBottom: "1rem" }}>
        <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.15 }}>{cours.titre}</div>
        <div style={{ fontSize: 12.5, opacity: 0.8, marginTop: 5 }}>{cours.soustitre}</div>
      </div>

      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", background: "#fff", borderRadius: 14, padding: 5, marginBottom: "1rem", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1px solid #e5e7eb" }}>
        {TABS.map(tab => {
          const on = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              display: "flex", alignItems: "center", gap: 7, padding: "9px 16px",
              borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
              border: "none", whiteSpace: "nowrap",
              background: on ? COLOR : "transparent",
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
        <CourseGate courseId={cours.courseId} accent={COLOR}>

          {!isImmuno && activeTab !== "cours" && (
            <div style={{ padding: "3rem 2rem", textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: LIGHT, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <Ico name="lock" size={24} color={COLOR} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 8 }}>Contenu en cours de préparation</div>
              <div style={{ fontSize: 14, color: "#6b7280" }}>Cette section sera disponible prochainement.</div>
            </div>
          )}

          {activeTab === "cours" && (
            <div style={{ padding: "2.5rem 2rem", textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: LIGHT, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <Ico name="book" size={24} color={COLOR} />
              </div>
              <div style={{ fontWeight: 800, fontSize: 19, color: "#111827", marginBottom: 8 }}>{cours.titre} — Cours complet</div>
              <p style={{ fontSize: 14, color: "#6b7280", maxWidth: 560, margin: "0 auto 1.5rem", lineHeight: 1.7 }}>{cours.description}</p>
              <Link to={cours.courseRoute ?? "/laboratoire"} style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px",
                borderRadius: 12, fontSize: 14, fontWeight: 700, background: COLOR, color: "#fff",
                textDecoration: "none", transition: "opacity 0.2s",
              }}>
                <Ico name="book" size={16} color="#fff" /> Ouvrir le cours complet
              </Link>
            </div>
          )}

          {isImmuno && activeTab === "exercices" && (
            <div style={{ padding: "1.75rem 2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: COLOR + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Ico name="pencil" size={18} color={COLOR} />
                </div>
                <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: "#111827" }}>Exercices</h2>
              </div>
              <div style={{ background: LIGHT, border: `1px solid ${COLOR}25`, borderRadius: 10, padding: "10px 14px", display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: "#374151", marginBottom: "1.25rem" }}>
                <Ico name="info" size={15} color={COLOR} />
                <span>Essayez de résoudre chaque exercice avant de consulter la correction dans l'onglet dédié.</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", border: "1px solid #e5e7eb", borderRadius: 12, background: "#fafafa", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "#dc262618", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <i className="fa-solid fa-file-pdf" aria-hidden="true" style={{ color: "#dc2626", fontSize: 18 }} />
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>Polycopié des exercices – Immunologie</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>
                    PDF · {(polycopieExoSfS1.size / 1024 / 1024).toFixed(1)} Mo
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <a href={encodeURI(polycopieExoSfS1.url)} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, border: `1.5px solid ${COLOR}`, color: COLOR, textDecoration: "none" }}>
                    <Ico name="external" size={14} color={COLOR} /> Ouvrir
                  </a>
                  <a href={encodeURI(polycopieExoSfS1.url)} download={polycopieExoSfS1.original_filename} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, background: COLOR, color: "#fff", textDecoration: "none" }}>
                    <Ico name="download" size={14} color="#fff" /> Télécharger
                  </a>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {SF_S1_EXERCICES.map((ex, i) => (
                  <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
                    <button onClick={() => setOpenExo(openExo === i ? null : i)} style={{
                      width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "13px 16px", background: openExo === i ? LIGHT : "#fafafa",
                      border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.2s",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLOR, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                        <span style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{ex.titre}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: LIGHT, color: COLOR, fontWeight: 700 }}>{ex.niveau}</span>
                        <div style={{ transform: openExo === i ? "rotate(90deg)" : "none", transition: "transform 0.2s", display: "flex" }}>
                          <Ico name="chevron" size={15} color="#9ca3af" />
                        </div>
                      </div>
                    </button>
                    {openExo === i && (
                      <div style={{ padding: "1rem 1.25rem", borderTop: `3px solid ${COLOR}`, background: "#fff", fontSize: 14, color: "#374151", lineHeight: 1.75 }}>
                        {ex.enonce}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {isImmuno && activeTab === "corrections" && (
            <div style={{ padding: "1.75rem 2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: COLOR + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Ico name="check" size={18} color={COLOR} />
                </div>
                <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: "#111827" }}>Corrections</h2>
              </div>
              <div style={{ background: "#eaf7f0", border: "1px solid #1a7a4a25", borderRadius: 10, padding: "10px 14px", display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: "#374151", marginBottom: "1.25rem" }}>
                <Ico name="info" size={15} color="#1a7a4a" />
                <span>Les corrigés sont fournis à titre indicatif. D'autres approches peuvent être acceptées.</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {SF_S1_CORRECTIONS.map((item, i) => (
                  <div key={i} style={{ borderLeft: `4px solid ${COLOR}`, borderRadius: "0 12px 12px 0", padding: "14px 16px", background: LIGHT, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: COLOR, marginBottom: 4 }}>{item.titre}</div>
                      <div style={{ fontSize: 13, color: "#4b5563" }}>{item.detail}</div>
                    </div>
                    <a href={item.fichier} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, background: COLOR, color: "#fff", textDecoration: "none", flexShrink: 0 }}>
                      <Ico name="download" size={14} color="#fff" /> Télécharger
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isImmuno && activeTab === "presentations" && (
            <div style={{ padding: "1.75rem 2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: COLOR + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Ico name="slides" size={18} color={COLOR} />
                </div>
                <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: "#111827" }}>Mes présentations</h2>
              </div>
              <FilePasswordBanner color={COLOR} light={LIGHT} password="S12024" />
              <PresentationChapters chapters={PRESENTATIONS_SF_S1} color={COLOR} light={LIGHT} />
            </div>
          )}

          {isImmuno && activeTab === "ressources" && (
            <div style={{ padding: "1.75rem 2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: COLOR + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Ico name="link" size={18} color={COLOR} />
                </div>
                <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: "#111827" }}>Ressources bibliographiques</h2>
              </div>
              <PresentationChapters chapters={RESSOURCES_SF_S1} color={COLOR} light={LIGHT} />
            </div>
          )}

        </CourseGate>
      </div>
    </div>
  );
}
