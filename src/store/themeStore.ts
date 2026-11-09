import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  dark: boolean;
  toggle: () => void;
}

const prefersDark =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-color-scheme: dark)").matches;

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      dark: prefersDark,
      toggle: () => set((s) => ({ dark: !s.dark })),
    }),
    { name: "theme" },
  ),
);

// <html>에 dark 클래스를 붙였다 뗐다 해요
const apply = (dark: boolean) =>
  document.documentElement.classList.toggle("dark", dark);
apply(useThemeStore.getState().dark);
useThemeStore.subscribe((s) => apply(s.dark));
