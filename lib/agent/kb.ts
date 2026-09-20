import type { KbEntry } from "../support-kit/types";
export type { KbEntry };

export const KB: KbEntry[] = [
  {
    id: "what",
    title: "What NeighborhoodGuide does",
    keywords: ["NeighborhoodGuide", "neighborhoodguide", "what", "product", "about", "Neighborhood blurbs that make the location the hero."],
    body: "Neighborhood blurbs that make the location the hero.. Given a neighborhood and who's moving there, get a lifestyle-focused description for listings, relocation packets, or your site.",
    source: "NeighborhoodGuide product definition",
    tags: [],
  },
  {
    id: "features",
    title: "NeighborhoodGuide features",
    keywords: ["features", "feature", "can", "does", "Lifestyle framing", "Buyer-matched", "Nearby highlights", "Relocation-ready"],
    body: "NeighborhoodGuide includes: Lifestyle framing; Buyer-matched; Nearby highlights; Relocation-ready. It does not add capabilities that are not listed here.",
    source: "NeighborhoodGuide feature list",
    tags: [],
  },
  {
    id: "pricing",
    title: "NeighborhoodGuide pricing",
    keywords: ["price", "pricing", "plan", "cost", "billing", "subscription", "monthly", "yearly"],
    body: "Listed prices for NeighborhoodGuide: $15/month and $150/year. Checkout uses the in-app checkout route. This assistant cannot change a subscription or issue a refund.",
    source: "NeighborhoodGuide pricing fields",
    tags: [],
  },
  {
    id: "howto",
    title: "How to use NeighborhoodGuide",
    keywords: ["how", "start", "use", "tool", "run", "Write a neighborhood blurb"],
    body: "Open NeighborhoodGuide and use Write a neighborhood blurb. The form asks for: Neighborhood; City; Who's moving there; Highlights (optional).",
    source: "NeighborhoodGuide tool fields",
    tags: [],
  },
  {
    id: "faq-1",
    title: "What is NeighborhoodGuide?",
    keywords: ["What", "is", "NeighborhoodGuide?"],
    body: "NeighborhoodGuide is a tool that writes a lifestyle-focused neighborhood description from a neighborhood and the buyer profile.",
    source: "NeighborhoodGuide FAQ",
    tags: [],
  },
  {
    id: "faq-2",
    title: "What does it include?",
    keywords: ["What", "does", "it", "include?"],
    body: "Lifestyle framing, buyer-matched highlights, nearby highlights, and relocation-ready copy.",
    source: "NeighborhoodGuide FAQ",
    tags: [],
  },
  {
    id: "faq-3",
    title: "Is it tailored to the buyer?",
    keywords: ["Is", "it", "tailored", "to", "the", "buyer?"],
    body: "Yes. It matches the blurb to who is moving there.",
    source: "NeighborhoodGuide FAQ",
    tags: [],
  },
  {
    id: "honesty",
    title: "What this assistant will not claim",
    keywords: ["legal", "advice", "guarantee", "demo", "human", "refund", "support"],
    body: "Answers about NeighborhoodGuide are decision support only, not legal, tax, accessibility-certification, or compliance sign-off. This assistant does not invent integrations, SSO, CSV export, or Slack connections unless they are already in the product description. If live AI is unavailable, the product must not pretend a demo result is live. Say you want a human and leave an email if you need a person.",
    source: "NeighborhoodGuide support policy",
    tags: ["compliance"],
  },
];

function normalize(s: string): string {
  return (s || "").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");
}
function toWords(s: string): string[] {
  return normalize(s).split(/\s+/).map((w) => w.trim()).filter(Boolean);
}
function cjkBigrams(s: string): string[] {
  const grams: string[] = [];
  const han = /[\u4e00-\u9fff]/;
  for (const w of toWords(s)) {
    if (han.test(w) && w.length >= 2) {
      for (let i = 0; i < w.length - 1; i++) grams.push(w.slice(i, i + 2));
    }
  }
  return grams;
}
function scoreEntry(entry: KbEntry, query: string): number {
  const q = normalize(query);
  const qWords = new Set(toWords(q));
  const qGrams = new Set(cjkBigrams(q));
  let s = 0;
  for (const kw of entry.keywords) {
    const k = kw.toLowerCase();
    if (q.includes(k)) s += 3;
  }
  for (const tw of toWords(entry.title)) {
    if (qWords.has(tw)) s += 2;
  }
  const idx = normalize(entry.keywords.join(" ") + " " + entry.title + " " + entry.body.slice(0, 400));
  for (const g of qGrams) if (idx.includes(g)) s += 0.5;
  return s;
}

export interface RetrieveResult {
  entries: KbEntry[];
  topScore: number;
}

export function retrieve(query: string, topK = 4, entries: KbEntry[] = KB): RetrieveResult {
  const scored = entries
    .map((e) => ({ e, s: scoreEntry(e, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, topK);
  return { entries: scored.map((x) => x.e), topScore: scored.length ? scored[0].s : 0 };
}

export function isComplianceRelated(entries: KbEntry[]): boolean {
  return entries.some((e) => e.tags.includes("compliance"));
}
