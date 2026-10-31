import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Remonte toujours la page tout en haut à chaque changement de route
 * (pathname, search ou hash), pour que l'utilisateur voie le header
 * et la bandeau de filière avant de scroller naturellement.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, search, hash]);

  return null;
}
