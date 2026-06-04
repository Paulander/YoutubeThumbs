const DEFAULT_SUPABASE_URL = "https://vondxxiyuzlytgiwbsmj.supabase.co";
const DEFAULT_EXAMPLES_BUCKET = "examples";

export type ExampleImage = {
  id: string;
  path: string;
  niche: string;
  title: string;
  pattern: string;
  tags: string[];
  imageUrl: string;
};

type ExampleImageInput = Omit<ExampleImage, "imageUrl">;

function cleanBaseUrl(url: string) {
  return url.replace(/\/$/, "");
}

function encodeObjectPath(path: string) {
  return path
    .split("/")
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join("/");
}

export function getSupabasePublicObjectUrl(
  objectPath: string,
  options: { bucket?: string; projectUrl?: string } = {}
) {
  const projectUrl = options.projectUrl || process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const bucket = options.bucket || process.env.NEXT_PUBLIC_SUPABASE_EXAMPLES_BUCKET || DEFAULT_EXAMPLES_BUCKET;

  return `${cleanBaseUrl(projectUrl)}/storage/v1/object/public/${encodeURIComponent(bucket)}/${encodeObjectPath(objectPath)}`;
}

const exampleImageInputs: ExampleImageInput[] = [
  {
    id: "ai-tech-lab",
    path: "ai-tech/ai-tech.png",
    niche: "AI/tech",
    title: "AI Workflow Reveal",
    pattern: "Interface close-up, future-facing promise, and a strong focal subject for small-feed readability.",
    tags: ["ai", "tech", "productivity", "software", "workflow"]
  },
  {
    id: "tech-tool",
    path: "ai-tech/tech.png",
    niche: "tech",
    title: "New Tool Breakdown",
    pattern: "Product cue plus clear contrast, useful for launches, reviews, and tutorial packaging.",
    tags: ["tech", "tools", "review", "tutorial"]
  },
  {
    id: "finance-reset",
    path: "finance/finance.png",
    niche: "finance",
    title: "Money Reset",
    pattern: "Simple financial promise with enough contrast to survive mobile feed compression.",
    tags: ["finance", "money", "personal finance", "budget"]
  },
  {
    id: "fitness-transformation",
    path: "fitness/fitness.png",
    niche: "fitness",
    title: "Training Result",
    pattern: "Readable body/action cue, high energy, and a result-oriented visual direction.",
    tags: ["fitness", "health", "training", "transformation"]
  },
  {
    id: "fitness-meal",
    path: "fitness/meal.png",
    niche: "fitness",
    title: "Meal Plan Hook",
    pattern: "Food visual with a clear outcome angle, useful for nutrition and routine content.",
    tags: ["fitness", "nutrition", "meal", "health", "lifestyle"]
  },
  {
    id: "gaming-guide",
    path: "gaming/gaming.png",
    niche: "gaming",
    title: "Gaming Guide Moment",
    pattern: "Action-heavy composition with immediate genre recognition and strong curiosity potential.",
    tags: ["gaming", "guide", "challenge", "entertainment"]
  },
  {
    id: "lifestyle-paradise",
    path: "lifestyle/paradise.png",
    niche: "lifestyle",
    title: "Paradise Reset",
    pattern: "Aspirational setting with an emotional payoff, suitable for lifestyle and story-led videos.",
    tags: ["lifestyle", "travel", "story", "aspirational"]
  },
  {
    id: "productivity-ai",
    path: "productivity/ai-tech.png",
    niche: "productivity",
    title: "AI Productivity System",
    pattern: "Tech-forward productivity cue that can be tagged as both AI and workflow content.",
    tags: ["productivity", "ai", "tech", "workflow", "system"]
  },
  {
    id: "productivity-discipline",
    path: "productivity/discipline.png",
    niche: "productivity",
    title: "Discipline Framework",
    pattern: "Clear self-improvement angle with a focused transformation promise.",
    tags: ["productivity", "discipline", "self improvement", "habits"]
  },
  {
    id: "productivity-exam",
    path: "productivity/exam.png",
    niche: "education/productivity",
    title: "Exam Prep System",
    pattern: "Education stakes, deadline pressure, and practical outcome framing.",
    tags: ["education", "productivity", "exam", "study"]
  },
  {
    id: "productivity-hustle",
    path: "productivity/hustle.png",
    niche: "productivity",
    title: "Hustle Reality Check",
    pattern: "Motivation-coded image with a sharper promise for business or creator content.",
    tags: ["productivity", "business", "creator", "motivation"]
  },
  {
    id: "productivity-worksystem",
    path: "productivity/worksystem.png",
    niche: "productivity",
    title: "Work System Build",
    pattern: "System/process visual that supports planning, workflow, and operational content.",
    tags: ["productivity", "workflow", "system", "planning"]
  },
  {
    id: "travel-paradise",
    path: "travel/paradise.png",
    niche: "travel",
    title: "Travel Escape",
    pattern: "Destination-first visual that can also support lifestyle and aspirational story packaging.",
    tags: ["travel", "lifestyle", "paradise", "story"]
  }
];

export const exampleImages: ExampleImage[] = exampleImageInputs.map((image) => ({
  ...image,
  imageUrl: getSupabasePublicObjectUrl(image.path)
}));

export const inspirationExamples = exampleImages;

export function getExampleImagesByTag(tag: string) {
  const normalized = tag.trim().toLowerCase();
  return exampleImages.filter((image) =>
    [image.niche, image.title, image.path, ...image.tags].join(" ").toLowerCase().includes(normalized)
  );
}

export function getExampleImageById(id: string) {
  return exampleImages.find((image) => image.id === id);
}

export const exampleBattles = [
  {
    niche: "AI/tech",
    title: "I Replaced My Editing Workflow With AI",
    imageIds: ["ai-tech-lab", "tech-tool"],
    note: "Compare futuristic tool promise against a more grounded tech tutorial frame."
  },
  {
    niche: "fitness",
    title: "The 20-Minute Routine I Actually Stuck With",
    imageIds: ["fitness-transformation", "fitness-meal"],
    note: "Test whether the stronger click comes from transformation energy or practical nutrition utility."
  },
  {
    niche: "finance",
    title: "I Audited My Budget After 90 Days",
    imageIds: ["finance-reset", "productivity-worksystem"],
    note: "A money-first frame can battle a more systems-oriented planning visual."
  },
  {
    niche: "gaming guide",
    title: "The Build That Finally Beat Ranked",
    imageIds: ["gaming-guide", "productivity-discipline"],
    note: "Use a genre-native frame as the likely winner, with an off-pattern challenger to make the contrast obvious."
  },
  {
    niche: "education/productivity",
    title: "How I Plan a Week in 12 Minutes",
    imageIds: ["productivity-exam", "productivity-ai"],
    note: "Compare deadline pressure against AI-assisted planning."
  },
  {
    niche: "travel/lifestyle",
    title: "The Trip That Reset My Entire Year",
    imageIds: ["travel-paradise", "lifestyle-paradise"],
    note: "Two paradise uploads can be tagged differently and tested against title framing."
  }
];
