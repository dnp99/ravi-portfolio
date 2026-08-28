"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("themechange", onChange);
      return () => window.removeEventListener("themechange", onChange);
    },
    () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light"),
    () => "light",
  ) as Theme;

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    window.dispatchEvent(new Event("themechange"));
  }

  const isLight = theme === "light";
  const nextTheme = isLight ? "dark" : "light";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={isLight}
    >
      <span className="theme-toggle-icon" aria-hidden="true">{isLight ? "☾" : "☼"}</span>
      <span>{nextTheme === "light" ? "Light" : "Dark"}</span>
    </button>
  );
}
