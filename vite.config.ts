import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      react: { babel: false },
      server: {
        preset: "vercel",
        externals: {
          inline: [
            "tslib",
            /^@supabase\/.*/,  // inline semua package @supabase
          ],
        },
      },
    }),
    tsConfigPaths(),
    tailwindcss(),
  ],
});