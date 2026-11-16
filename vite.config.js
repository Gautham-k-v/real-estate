import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const githubPages = mode === "pages" || process.env.GITHUB_PAGES === "true";

  return {
    base: githubPages ? "/real-estate/" : "/",
    plugins: [react(), tailwindcss()],
  };
});
