import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";

// Retry dynamic imports once, then hard-reload to clear stale chunk references
// (fixes "error loading dynamically imported module" after a redeploy).
function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (err) {
      const key = "lovable-chunk-reload";
      if (typeof window !== "undefined" && !sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        window.location.reload();
        return new Promise<{ default: T }>(() => {});
      }
      throw err;
    }
  });
}

const Index = lazyWithRetry(() => import("./pages/Index.tsx"));
const AccueilPage = lazyWithRetry(() => import("./pages/AccueilPage.tsx"));
const LicencePage = lazyWithRetry(() => import("./pages/LicencePage.tsx"));
const MasterPage = lazyWithRetry(() => import("./pages/MasterPage.tsx"));
const LaboratoirePage = lazyWithRetry(() => import("./pages/LaboratoirePage.tsx"));
const CvPage = lazyWithRetry(() => import("./pages/CvPage.tsx"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound.tsx"));
const CoursModesActionMicroorganismes = lazyWithRetry(
  () => import("./pages/cours/CoursModesActionMicroorganismes.tsx"),
);
const CoursBacteries = lazyWithRetry(() => import("./pages/cours/CoursBacteries.tsx"));
const CoursVirus = lazyWithRetry(() => import("./pages/cours/CoursVirus.tsx"));
const CoursParasites = lazyWithRetry(() => import("./pages/cours/CoursParasites.tsx"));
const CoursMycetes = lazyWithRetry(() => import("./pages/cours/CoursMycetes.tsx"));
const CoursHematologie = lazyWithRetry(() => import("./pages/cours/CoursHematologie.tsx"));
const CoursImmunologie = lazyWithRetry(() => import("./pages/cours/CoursImmunologie.tsx"));
const CoursGenetique = lazyWithRetry(() => import("./pages/cours/CoursGenetique.tsx"));

const queryClient = new QueryClient();

const Loading = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "1.2rem", color: "#666" }}>
    Chargement...
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<Index />}>
              <Route path="/" element={<AccueilPage />} />
              <Route path="/cv" element={<CvPage />} />
              <Route path="/licence" element={<LicencePage />} />
              <Route path="/licence/sage-femme" element={<LicencePage />} />
              <Route path="/licence/dietetique" element={<LicencePage />} />
              <Route path="/master" element={<MasterPage />} />
              <Route path="/laboratoire" element={<LaboratoirePage />} />
              <Route
                path="/licence/sage-femme/s1/microbio/modes-action"
                element={<CoursModesActionMicroorganismes />}
              />
              <Route
                path="/licence/sage-femme/s1/microbio/bacteries"
                element={<CoursBacteries />}
              />
              <Route
                path="/licence/sage-femme/s1/microbio/virus"
                element={<CoursVirus />}
              />
              <Route
                path="/licence/sage-femme/s1/microbio/parasites"
                element={<CoursParasites />}
              />
              <Route
                path="/licence/sage-femme/s1/microbio/mycetes"
                element={<CoursMycetes />}
              />
              <Route
                path="/licence/sage-femme/s1/hematologie"
                element={<CoursHematologie />}
              />
              <Route
                path="/licence/sage-femme/s1/immunologie"
                element={<CoursImmunologie />}
              />
              <Route
                path="/licence/sage-femme/s1/genetique"
                element={<CoursGenetique />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
