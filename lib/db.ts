import { promises as fs } from "fs";
import path from "path";
import type { DbShape, ThumbnailTest, Vote } from "./types";
import { calculateVoteResults, makeId } from "./utils";

const dataDir = path.join(process.cwd(), ".data");
const dataFile = path.join(dataDir, "thumbbattle.json");

const emptyDb: DbShape = {
  tests: [],
  votes: []
};

async function ensureDb() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify(emptyDb, null, 2), "utf8");
  }
}

async function readDb(): Promise<DbShape> {
  await ensureDb();
  const raw = await fs.readFile(dataFile, "utf8");
  return JSON.parse(raw) as DbShape;
}

async function writeDb(db: DbShape) {
  await ensureDb();
  await fs.writeFile(dataFile, JSON.stringify(db, null, 2), "utf8");
}

export async function createThumbnailTest(test: ThumbnailTest) {
  const db = await readDb();
  db.tests.unshift(test);
  await writeDb(db);
  return test;
}

export async function listThumbnailTests(sessionId?: string) {
  const db = await readDb();
  return sessionId ? db.tests.filter((test) => test.sessionId === sessionId) : db.tests;
}

export async function getThumbnailTest(id: string) {
  const db = await readDb();
  return db.tests.find((test) => test.id === id) ?? null;
}

export async function getThumbnailTestByShareId(shareId: string) {
  const db = await readDb();
  return db.tests.find((test) => test.shareId === shareId) ?? null;
}

export async function addVote(input: Omit<Vote, "id" | "createdAt">) {
  const db = await readDb();
  const existing = db.votes.find((vote) => vote.testId === input.testId && vote.voterKey === input.voterKey);

  if (existing) {
    return { vote: existing, duplicate: true };
  }

  const vote: Vote = {
    ...input,
    id: makeId("vote"),
    createdAt: new Date().toISOString()
  };

  db.votes.push(vote);
  await writeDb(db);
  return { vote, duplicate: false };
}

export async function getVotesForTest(testId: string) {
  const db = await readDb();
  return db.votes.filter((vote) => vote.testId === testId);
}

export async function getResultsForTest(test: ThumbnailTest) {
  const votes = await getVotesForTest(test.id);
  return calculateVoteResults(
    test.variants.map((variant) => variant.id),
    votes
  );
}
