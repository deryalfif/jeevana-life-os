import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

const bundledServerDeps = [
  "tslib",
  "@supabase/supabase-js",
  "@supabase/functions-js",
  "@supabase/auth-js",
  "@supabase/postgrest-js",
  "@supabase/realtime-js",
  "@supabase/storage-js",
];

export default defineConfig({
  ssr: {
    noExternal: bundledServerDeps,
  },
  plugins: [
    tanstackStart({
      react: { babel: false },
      server: {
        preset: "vercel",
      },
    }),
    tsConfigPaths(),
    tailwindcss(),
  ],
  nitro: {
    noExternals: bundledServerDeps,
    externals: {
      inline: bundledServerDeps,
    },
  },
} as any);