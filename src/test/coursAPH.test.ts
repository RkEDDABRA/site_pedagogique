import { describe, expect, it } from "vitest";
import { APH_CHAPTERS, APH_COURSE_PATH, chapterPath } from "@/data/coursAPH";

describe("cours Anatomie et physiologie humaine — Diététique S1", () => {
  it("publie les chapitres accessibles depuis la page Cours complet", () => {
    expect(APH_COURSE_PATH).toBe("/licence/dietetique/s1/anatomie-physiologie");
    expect(APH_CHAPTERS).toHaveLength(8);
    expect(APH_CHAPTERS[0]).toMatchObject({
      num: 1,
      title: "Organisation du corps humain",
      disponible: true,
    });
    expect(chapterPath(1)).toBe("/licence/dietetique/s1/anatomie-physiologie/chapitre/1");
  });
});