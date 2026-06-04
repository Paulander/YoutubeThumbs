import { exampleImages, getExampleImagesByTag, type ExampleImage } from "./example-images";
import type { CompetitorVideo } from "./types";

const fallbackImageIds = [
  "ai-tech-lab",
  "finance-reset",
  "tech-tool",
  "productivity-worksystem",
  "fitness-transformation",
  "gaming-guide",
  "productivity-hustle",
  "travel-paradise"
];

const channels = ["Creator Lab", "Signal Studio", "Clickcraft", "A/B Room", "Retention House"];
const views = ["482K views", "218K views", "91K views", "744K views", "63K views"];
const dates = ["2 weeks ago", "5 days ago", "1 month ago", "3 weeks ago", "Yesterday"];
const durations = ["12:44", "9:18", "15:02", "18:37", "7:55"];

function uniqueImages(images: ExampleImage[]) {
  const seen = new Set<string>();
  return images.filter((image) => {
    if (seen.has(image.id)) {
      return false;
    }

    seen.add(image.id);
    return true;
  });
}

function fallbackImages() {
  const ordered = fallbackImageIds
    .map((id) => exampleImages.find((image) => image.id === id))
    .filter((image): image is ExampleImage => Boolean(image));

  return [...ordered, ...exampleImages];
}

function getCompetitorImages(keyword: string) {
  const directMatches = getExampleImagesByTag(keyword);
  return uniqueImages([...directMatches, ...fallbackImages()]).slice(0, 5);
}

function titleForImage(image: ExampleImage, keyword: string, index: number) {
  const niche = keyword.trim() || image.niche;
  const templates = [
    `I Tested 27 ${niche} Ideas So You Do Not Have To`,
    `The Simple ${niche} Framework That Changed My Channel`,
    `Why Most Creators Get ${niche} Completely Wrong`,
    `I Spent $500 Testing Thumbnails for ${niche}`,
    `${niche}: The Before and After Nobody Shows You`
  ];

  return templates[index] ?? image.title;
}

export function getMockCompetitors(keyword = "creator growth"): CompetitorVideo[] {
  const niche = keyword.trim() || "creator growth";

  return getCompetitorImages(niche).map((image, index) => ({
    id: `mock-${index + 1}`,
    title: titleForImage(image, niche, index),
    channelName: channels[index] ?? "Creator Studio",
    imageUrl: image.imageUrl,
    views: views[index] ?? "42K views",
    publishedAt: dates[index] ?? "This week",
    duration: durations[index] ?? "10:00"
  }));
}
