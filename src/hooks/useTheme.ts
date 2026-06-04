import { useEffect } from "react";

export function useTheme() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("besti-theme");
  }, []);

  return { theme: "light" as const, toggle: () => {} };
}
