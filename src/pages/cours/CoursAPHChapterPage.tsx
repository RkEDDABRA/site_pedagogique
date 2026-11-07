import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { APH_CHAPTERS, APH_COURSE_PATH } from "@/data/coursAPH";
import CoursAPHChapitre1 from "./CoursAPHChapitre1";

export default function CoursAPHChapterPage() {
  const { num } = useParams();
  const chapterNum = Number(num);
  const chapter = APH_CHAPTERS.find((item) => item.num === chapterNum);

  if (!chapter) return <Navigate to={APH_COURSE_PATH} replace />;
  if (chapterNum === 1) return <CoursAPHChapitre1 />;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <Link
            to={APH_COURSE_PATH}
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Retour aux chapitres du cours
          </Link>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Licence · Option Diététique &amp; Nutrition · Semestre 1
          </p>
          <h1 className="font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Chapitre {chapter.num} — {chapter.title}
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex max-w-xl items-start gap-4 border-l-4 border-emerald-700 bg-card p-5">
          <Lock size={20} className="mt-0.5 shrink-0 text-emerald-700" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Le contenu de ce chapitre est en cours de préparation.
          </p>
        </div>
      </main>
    </div>
  );
}