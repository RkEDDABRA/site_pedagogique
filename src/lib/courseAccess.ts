import { useCallback, useEffect, useState } from "react";

/**
 * Registre central des cours protégés.
 * Un seul mot de passe par cours, valable pour TOUS ses onglets
 * (Cours complet, Exercices, Corrections, Présentations, Ressources).
 *
 * Pour ajouter un cours : ajouter une entrée ici, puis utiliser
 * <CourseGate courseId="..."> autour du contenu.
 */
export const COURSES = {
  "sf-s1": { password: "SB2026", label: "Sciences Biologiques — Sage-Femme (Semestre 1)" },
  "sf-s2": { password: "AGO2026", label: "Anatomie Gynéco-Obstétricale — Sage-Femme (Semestre 2)" },
  "dn-s1": { password: "APH2026", label: "Anatomie et Physiologie Humaine — Diététique (Semestre 1)" },
  "dn-s2": { password: "BPN2026", label: "Bases Physiologiques de la Nutrition — Diététique (Semestre 2)" },
  "master-pau": { password: "MPAU2026", label: "Master PAU — Pratiques Avancées en Urgentologie" },
  "lab-s1-bc": { password: "BC2026", label: "Biologie cellulaire — Laboratoire (Semestre 1)" },
  "lab-s1-immuno": { password: "IMM2026", label: "Immunologie — Laboratoire (Semestre 1)" },

} as const;

export type CourseId = keyof typeof COURSES;

const storageKey = (id: CourseId) => `course_unlocked_${id}`;
const EVENT = "course-unlock-changed";

export function getCourseLabel(id: CourseId) {
  return COURSES[id]?.label ?? "";
}

/** Déverrouillage valable uniquement pour la session de navigation en cours. */
export function isCourseUnlocked(id: CourseId): boolean {
  try {
    return sessionStorage.getItem(storageKey(id)) === "true";
  } catch {
    return false;
  }
}

export function unlockCourse(id: CourseId, password: string): boolean {
  if (COURSES[id]?.password !== password) return false;
  try {
    sessionStorage.setItem(storageKey(id), "true");
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
  return true;
}

/**
 * `null` = état inconnu (premier rendu) pour éviter tout flash de contenu.
 */
export function useCourseUnlock(id: CourseId) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);

  useEffect(() => {
    setUnlocked(isCourseUnlocked(id));
    const sync = () => setUnlocked(isCourseUnlocked(id));
    window.addEventListener(EVENT, sync);
    window.addEventListener("focus", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("focus", sync);
    };
  }, [id]);

  const tryUnlock = useCallback(
    (password: string) => {
      const ok = unlockCourse(id, password);
      if (ok) setUnlocked(true);
      return ok;
    },
    [id],
  );

  return { unlocked, tryUnlock };
}
