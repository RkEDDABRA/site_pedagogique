import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseGate from "@/components/CourseGate";
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
        },
        {
          id: "immuno",
          titre: "Immunologie",
          soustitre: "Semestre 1 · Option Laboratoire",
          courseId: "lab-s1-immuno" as CourseId,
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
  book:   "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",
  pencil: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  check:  "M20 6L9 17l-5-5",
  slides: "M2 3h20v14H2z M8 21h8M12 17v4",
  link:   "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  lock:   "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M17 11V7a5 5 0 0 0-10 0v4",
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

function CourseBlock({ cours }: { cours: { titre: string; soustitre: string; courseId: CourseId } }) {
  const [activeTab, setActiveTab] = useState("cours");

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
          <div style={{ padding: "3rem 2rem", textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: LIGHT, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <Ico name="lock" size={24} color={COLOR} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 8 }}>Contenu en cours de préparation</div>
            <div style={{ fontSize: 14, color: "#6b7280" }}>Cette section sera disponible prochainement.</div>
          </div>
        </CourseGate>
      </div>
    </div>
  );
}
