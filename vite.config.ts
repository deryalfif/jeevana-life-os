import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    tanstackStart({
      react: { babel: false },
      server: {
        entry: "./src/server.ts",
        preset: "vercel",
      },
    }),
    viteReact(),
    tsConfigPaths(),
    tailwindcss(),
  ],
});
