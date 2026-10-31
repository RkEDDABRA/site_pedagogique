import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Désactive la restauration automatique du scroll par le navigateur
// (au rechargement ou à la navigation, la page doit démarrer en haut).
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")!).render(<App />);
