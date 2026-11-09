import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://serdesk.srosthai.me",
  output: "static",
  devToolbar: { enabled: false },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.endsWith("/404") && !page.endsWith("/404/"),
    }),
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
