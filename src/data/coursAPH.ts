/**
 * Métadonnées du cours « Anatomie et physiologie humaine »
 * Licence — Option Diététique & Nutrition — Semestre 1 (dn-s1, code APH2026).
 */

export const APH_COURSE_PATH = "/licence/dietetique/s1/anatomie-physiologie";

export interface AphChapter {
  num: number;
  title: string;
  disponible: boolean;
}

export const APH_CHAPTERS: AphChapter[] = [
  { num: 1, title: "Organisation du corps humain", disponible: true },
  { num: 2, title: "Structure cellulaire", disponible: false },
  { num: 3, title: "Fonctions cellulaires", disponible: false },
  { num: 4, title: "Reproduction cellulaire", disponible: false },
  { num: 5, title: "Tissus et téguments", disponible: false },
  { num: 6, title: "Système osseux, articulations et système musculaire", disponible: false },
  { num: 7, title: "Encéphale et système nerveux", disponible: false },
  { num: 8, title: "Sang et système lymphatique", disponible: false },
];

export const chapterPath = (num: number) => `${APH_COURSE_PATH}/chapitre-${num}`;
