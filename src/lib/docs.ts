import type { CollectionEntry } from "astro:content";

export type DocEntry = CollectionEntry<"docs">;

export const docSections = ["Getting started", "Connections", "Server work", "Reference"];

const sectionRank = new Map(docSections.map((section, index) => [section, index]));

export function sortDocs(entries: DocEntry[]): DocEntry[] {
  return [...entries].sort((left, right) => {
    const leftRank = sectionRank.get(left.data.section) ?? 99;
    const rightRank = sectionRank.get(right.data.section) ?? 99;
    if (leftRank !== rightRank) return leftRank - rightRank;
    if (left.data.order !== right.data.order) return left.data.order - right.data.order;
    return left.data.title.localeCompare(right.data.title);
  });
}

export function groupDocs(entries: DocEntry[]) {
  const sorted = sortDocs(entries);
  const sections = [...new Set(sorted.map((entry) => entry.data.section))];

  return sections.map((section) => ({
    section,
    entries: sorted.filter((entry) => entry.data.section === section),
  }));
}

export function getDocNeighbours(entries: DocEntry[], id: string) {
  const sorted = sortDocs(entries);
  const index = sorted.findIndex((entry) => entry.id === id);
  return {
    previous: index > 0 ? sorted[index - 1] : null,
    next: index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}
