import { useState, useEffect } from "react";

const CORRECT_PASSWORD = "Eddabra2025";
const STORAGE_KEY = "portfolio_auth";

interface PasswordGateProps {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    setUnlocked(stored === "true");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    // Small delay to prevent brute force
    await new Promise((r) => setTimeout(r, 400));
    if (input === CORRECT_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setUnlocked(true);
    } else {
      setError(true);
      setInput("");
    }
    setLoading(false);
  };

  // Loading state — prevents FOUC
  if (unlocked === null) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Chargement…</p>
        </div>
      </div>
    );
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-md">
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <i className="fa-solid fa-lock text-xl text-primary" aria-hidden="true" />
          </div>
        </div>
        <h2 className="mb-2 text-center text-xl font-semibold text-foreground">
          Accès protégé
        </h2>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Entrez le mot de passe pour accéder au contenu.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder="Mot de passe"
            className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-shadow"
            disabled={loading}
          />
          {error && (
            <p className="text-center text-xs text-destructive">
              Mot de passe incorrect.
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Vérification…
              </>
            ) : (
              "Accéder"
            )}
          </button>
        </form>
        <p className="mt-5 text-center text-xs text-muted-foreground leading-relaxed">
          Ce site pédagogique personnel est privé, veuillez me contacter pour y accéder.
          <br />
          <a href="mailto:eddabrarkia@gmail.com" className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
            eddabrarkia@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
