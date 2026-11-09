import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.string(),
    order: z.number().default(0),
  }),
});

const changelog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/changelog" }),
  schema: z.object({
    version: z.string(),
    releaseDate: z.coerce.date(),
    status: z.enum(["development", "release"]).default("release"),
    summary: z.string(),
    added: z.array(z.string()).default([]),
    fixed: z.array(z.string()).default([]),
    knownIssues: z.array(z.string()).default([]),
  }),
});

export const collections = { docs, changelog };
