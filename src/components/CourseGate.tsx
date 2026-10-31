import { useState } from "react";
import { getCourseLabel, useCourseUnlock, type CourseId } from "@/lib/courseAccess";

interface CourseGateProps {
  courseId: CourseId;
  children: React.ReactNode;
  accent?: string;
}

/**
 * Porte d'accès par cours : une fois le bon mot de passe saisi,
 * tous les onglets du même cours sont déverrouillés pour la session.
 */
export default function CourseGate({ courseId, children, accent }: CourseGateProps) {
  const { unlocked, tryUnlock } = useCourseUnlock(courseId);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 350));
    if (tryUnlock(value)) {
      setError(false);
    } else {
      setError(true);
      setValue("");
    }
    setLoading(false);
  };

  if (unlocked === null) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (unlocked) return <>{children}</>;

  const color = accent ?? "hsl(var(--primary))";

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-md">
        <div className="mb-4 flex justify-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: `${color}1a` }}
          >
            <i className="fa-solid fa-lock text-xl" style={{ color }} aria-hidden="true" />
          </div>
        </div>
        <h2 className="mb-2 text-center text-xl font-semibold text-foreground">Cours protégé</h2>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Entrez le code d'accès pour ouvrir le cours <strong>{getCourseLabel(courseId)}</strong>.
          Il déverrouille l'ensemble des onglets de ce cours.
        </p>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            placeholder="Code d'accès"
            disabled={loading}
            className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
          />
          {error && (
            <p className="text-center text-xs text-destructive">Code d'accès incorrect.</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: color }}
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Vérification…
              </>
            ) : (
              "Accéder au cours"
            )}
          </button>
        </form>
        <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
          Code d'accès communiqué en cours. Pour toute demande :
          <br />
          <a href="mailto:eddabrarkia@gmail.com" className="text-primary hover:underline">
            eddabrarkia@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
