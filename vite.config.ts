import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      react: { babel: false },
      server: {
        preset: "Other", // ← preset masuk SINI, bukan plugin terpisah
      },
    }),
    tsConfigPaths(),
    tailwindcss(),
  ],
});