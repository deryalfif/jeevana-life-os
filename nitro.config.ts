import { defineNitroConfig } from "nitro/config";

const bundledServerDeps = [
  "tslib",
  "@supabase/supabase-js",
  "@supabase/functions-js",
  "@supabase/auth-js",
  "@supabase/postgrest-js",
  "@supabase/realtime-js",
  "@supabase/storage-js",
];

export default defineNitroConfig({
  externals: {
    inline: bundledServerDeps,
  },
  noExternals: bundledServerDeps,
});