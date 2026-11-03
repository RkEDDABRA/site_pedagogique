import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Lock } from "lucide-react";
import { APH_CHAPTERS, APH_COURSE_PATH, chapterPath } from "@/data/coursAPH";

/**
 * Page d'accueil du cours « Anatomie et physiologie humaine » :
 * liste des 8 chapitres sous forme de cartes cliquables.
 * Utilisée dans l'onglet « Cours complet » de la page Licence
 * (embedded) et comme page dédiée sur sa propre route.
 */
export default function CoursAnatomiePhysioDnS1({ embedded = false }: { embedded?: boolean }) {
  const GREEN = "#1a7a4a";
  const LIGHT = "#eaf7f0";

  const liste = (
    <ol className="grid gap-4 sm:grid-cols-2">
      {APH_CHAPTERS.map((ch) => {
        const inner = (
          <div
            className="group flex h-full items-start gap-4 rounded-2xl border bg-card p-5 transition-all hover:shadow-lg"
            style={{
              borderColor: ch.disponible ? GREEN + "55" : "#e5e7eb",
              cursor: ch.disponible ? "pointer" : "default",
            }}
          >
            <div
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold"
              style={{ background: ch.disponible ? GREEN : "#f3f4f6", color: ch.disponible ? "#fff" : "#9ca3af" }}
            >
              {ch.num}
            </div>
            <div className="min-w-0 flex-1">
              <h3
                className="font-display text-base font-bold leading-snug transition-colors sm:text-lg"
                style={{ color: ch.disponible ? GREEN : "#374151" }}
              >
                Chapitre {ch.num} — {ch.title}
              </h3>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold" style={{ color: ch.disponible ? GREEN : "#9ca3af" }}>
                {ch.disponible ? (
                  <>
                    <BookOpen size={13} aria-hidden="true" />
                    <span>Disponible — ouvrir le chapitre</span>
                  </>
                ) : (
                  <>
                    <Lock size={12} aria-hidden="true" />
                    <span>Contenu à venir</span>
                  </>
                )}
              </div>
            </div>
          </div>
        );
        return (
          <li key={ch.num} className="h-full">
            {ch.disponible ? (
              <Link to={chapterPath(ch.num)} className="block h-full" aria-label={`Chapitre ${ch.num} — ${ch.title}`}>
                {inner}
              </Link>
            ) : (
              <div aria-label={`Chapitre ${ch.num} — ${ch.title} (contenu à venir)`}>{inner}</div>
            )}
          </li>
        );
      })}
    </ol>
  );

  if (embedded) {
    return (
      <div style={{ padding: "1.75rem 2rem" }}>
        <p className="text-sm leading-relaxed text-foreground/80 mb-6">
          Le cours <strong>Anatomie et physiologie humaine</strong> est structuré en 8 chapitres.
          Cliquez sur un chapitre pour ouvrir sa page dédiée.
        </p>
        {liste}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-gradient-to-br from-emerald-50/60 to-background" style={{ background: `linear-gradient(135deg, ${LIGHT}, #ffffff)` }}>
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <Link
            to="/licence"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Retour à la page Licence
          </Link>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: GREEN }}>
            Licence · Option Diététique &amp; Nutrition · Semestre 1
          </p>
          <h1 className="font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Anatomie et physiologie humaine
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Le cours est structuré en 8 chapitres. Cliquez sur un chapitre pour ouvrir sa page dédiée.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {liste}
      </main>
    </div>
  );
}
