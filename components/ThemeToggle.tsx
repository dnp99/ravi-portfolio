"use client";

import { useState } from "react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => (
    typeof document !== "undefined" && document.documentElement.dataset.theme === "light"
      ? "light"
      : "light"
  ));

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    window.dispatchEvent(new Event("themechange"));
    setTheme(nextTheme);
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
