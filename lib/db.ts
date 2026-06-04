import { promises as fs } from "fs";
import path from "path";
import { Pool } from "pg";
import type { DbShape, ThumbnailTest, Vote } from "./types";
import { calculateVoteResults, makeId } from "./utils";

const dataDir = path.join(process.cwd(), ".data");
const dataFile = path.join(dataDir, "thumbbattle.json");

const emptyDb: DbShape = {
  tests: [],
  votes: []
};

declare global {
  var thumbbattlePgPool: Pool | undefined;
  var thumbbattlePgSchemaReady: Promise<void> | undefined;
}

function hasPostgres() {
  return Boolean(process.env.DATABASE_URL);
}

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!globalThis.thumbbattlePgPool) {
    const isLocal = process.env.DATABASE_URL.includes("localhost") || process.env.DATABASE_URL.includes("127.0.0.1");

    globalThis.thumbbattlePgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: isLocal ? undefined : { rejectUnauthorized: false }
    });
  }

  return globalThis.thumbbattlePgPool;
}

async function ensurePgSchema() {
  if (!hasPostgres()) {
    return;
  }

  if (!globalThis.thumbbattlePgSchemaReady) {
    globalThis.thumbbattlePgSchemaReady = getPool().query(`
      create extension if not exists pgcrypto;

      create table if not exists thumbnail_tests (
        id uuid primary key default gen_random_uuid(),
        share_id text unique not null,
        session_id text,
        title text not null,
        channel_name text not null,
        target_keyword text,
        view_count text,
        published_at text,
        variants jsonb not null default '[]'::jsonb,
        competitors jsonb not null default '[]'::jsonb,
        attribution jsonb,
        owner_email text,
        stripe_customer_id text,
        created_at timestamptz not null default now()
      );

      create table if not exists votes (
        id uuid primary key default gen_random_uuid(),
        test_id uuid not null references thumbnail_tests(id) on delete cascade,
        variant_id text not null,
        voter_key text not null,
        comment text,
        created_at timestamptz not null default now(),
        unique(test_id, voter_key)
      );

      create table if not exists entitlements (
        id uuid primary key default gen_random_uuid(),
        email text,
        stripe_customer_id text,
        stripe_subscription_id text,
        plan text not null,
        credits_remaining int not null default 0,
        status text not null default 'active',
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      );

      create index if not exists thumbnail_tests_share_id_idx on thumbnail_tests(share_id);
      create index if not exists thumbnail_tests_session_id_idx on thumbnail_tests(session_id);
      create index if not exists votes_test_id_idx on votes(test_id);
      create index if not exists entitlements_email_idx on entitlements(email);
      create index if not exists entitlements_stripe_customer_id_idx on entitlements(stripe_customer_id);
    `).then(() => undefined);
  }

  await globalThis.thumbbattlePgSchemaReady;
}

function rowToTest(row: Record<string, unknown>): ThumbnailTest {
  const createdAt = row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at);

  return {
    id: String(row.id),
    shareId: String(row.share_id),
    sessionId: String(row.session_id ?? ""),
    title: String(row.title),
    channelName: String(row.channel_name),
    targetKeyword: row.target_keyword ? String(row.target_keyword) : undefined,
    viewCount: String(row.view_count ?? "New upload"),
    publishedAt: String(row.published_at ?? "Just now"),
    variants: Array.isArray(row.variants) ? row.variants : [],
    competitors: Array.isArray(row.competitors) ? row.competitors : [],
    attribution: row.attribution && typeof row.attribution === "object" ? row.attribution : undefined,
    createdAt
  } as ThumbnailTest;
}

function rowToVote(row: Record<string, unknown>): Vote {
  const createdAt = row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at);

  return {
    id: String(row.id),
    testId: String(row.test_id),
    variantId: String(row.variant_id),
    voterKey: String(row.voter_key),
    comment: row.comment ? String(row.comment) : undefined,
    createdAt
  };
}

async function ensureJsonDb() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify(emptyDb, null, 2), "utf8");
  }
}

async function readJsonDb(): Promise<DbShape> {
  await ensureJsonDb();
  const raw = await fs.readFile(dataFile, "utf8");
  return JSON.parse(raw) as DbShape;
}

async function writeJsonDb(db: DbShape) {
  await ensureJsonDb();
  await fs.writeFile(dataFile, JSON.stringify(db, null, 2), "utf8");
}

export async function createThumbnailTest(test: ThumbnailTest) {
  if (hasPostgres()) {
    await ensurePgSchema();
    const result = await getPool().query(
      `insert into thumbnail_tests (
        id, share_id, session_id, title, channel_name, target_keyword, view_count, published_at, variants, competitors, attribution, created_at
      ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10::jsonb, $11::jsonb, $12)
      returning *`,
      [
        test.id,
        test.shareId,
        test.sessionId,
        test.title,
        test.channelName,
        test.targetKeyword ?? null,
        test.viewCount,
        test.publishedAt,
        JSON.stringify(test.variants),
        JSON.stringify(test.competitors),
        JSON.stringify(test.attribution ?? null),
        test.createdAt
      ]
    );

    return rowToTest(result.rows[0]);
  }

  const db = await readJsonDb();
  db.tests.unshift(test);
  await writeJsonDb(db);
  return test;
}

export async function listThumbnailTests(sessionId?: string) {
  if (hasPostgres()) {
    await ensurePgSchema();
    const result = sessionId
      ? await getPool().query("select * from thumbnail_tests where session_id = $1 order by created_at desc", [sessionId])
      : await getPool().query("select * from thumbnail_tests order by created_at desc limit 100");

    return result.rows.map(rowToTest);
  }

  const db = await readJsonDb();
  return sessionId ? db.tests.filter((test) => test.sessionId === sessionId) : db.tests;
}

export async function getThumbnailTest(id: string) {
  if (hasPostgres()) {
    await ensurePgSchema();
    const result = await getPool().query("select * from thumbnail_tests where id::text = $1 limit 1", [id]);
    return result.rows[0] ? rowToTest(result.rows[0]) : null;
  }

  const db = await readJsonDb();
  return db.tests.find((test) => test.id === id) ?? null;
}

export async function getThumbnailTestByShareId(shareId: string) {
  if (hasPostgres()) {
    await ensurePgSchema();
    const result = await getPool().query("select * from thumbnail_tests where share_id = $1 limit 1", [shareId]);
    return result.rows[0] ? rowToTest(result.rows[0]) : null;
  }

  const db = await readJsonDb();
  return db.tests.find((test) => test.shareId === shareId) ?? null;
}

export async function addVote(input: Omit<Vote, "id" | "createdAt">) {
  if (hasPostgres()) {
    await ensurePgSchema();

    try {
      const result = await getPool().query(
        `insert into votes (test_id, variant_id, voter_key, comment)
         values ($1, $2, $3, $4)
         returning *`,
        [input.testId, input.variantId, input.voterKey, input.comment ?? null]
      );

      return { vote: rowToVote(result.rows[0]), duplicate: false };
    } catch (error) {
      if (typeof error === "object" && error && "code" in error && error.code === "23505") {
        const existing = await getPool().query(
          "select * from votes where test_id::text = $1 and voter_key = $2 limit 1",
          [input.testId, input.voterKey]
        );

        return { vote: rowToVote(existing.rows[0]), duplicate: true };
      }

      throw error;
    }
  }

  const db = await readJsonDb();
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
  await writeJsonDb(db);
  return { vote, duplicate: false };
}

export async function getVotesForTest(testId: string) {
  if (hasPostgres()) {
    await ensurePgSchema();
    const result = await getPool().query("select * from votes where test_id::text = $1 order by created_at desc", [testId]);
    return result.rows.map(rowToVote);
  }

  const db = await readJsonDb();
  return db.votes.filter((vote) => vote.testId === testId);
}

export async function getRecentVotes(limit = 20) {
  if (hasPostgres()) {
    await ensurePgSchema();
    const result = await getPool().query("select * from votes order by created_at desc limit $1", [limit]);
    return result.rows.map(rowToVote);
  }

  const db = await readJsonDb();
  return [...db.votes]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export async function getDebugSummary() {
  if (hasPostgres()) {
    await ensurePgSchema();
    const [tests, votes, counts] = await Promise.all([
      getPool().query("select * from thumbnail_tests order by created_at desc limit 20"),
      getPool().query("select * from votes order by created_at desc limit 20"),
      getPool().query("select (select count(*)::int from thumbnail_tests) as tests, (select count(*)::int from votes) as votes")
    ]);

    return {
      tests: tests.rows.map(rowToTest),
      votes: votes.rows.map(rowToVote),
      counts: counts.rows[0]
    };
  }

  const db = await readJsonDb();
  return {
    tests: [...db.tests].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 20),
    votes: [...db.votes].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 20),
    counts: {
      tests: db.tests.length,
      votes: db.votes.length
    }
  };
}

export async function getResultsForTest(test: ThumbnailTest) {
  const votes = await getVotesForTest(test.id);
  return calculateVoteResults(
    test.variants.map((variant) => variant.id),
    votes
  );
}
