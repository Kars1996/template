import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { isDevelopment } from "@/hooks/is-development";

const globalForDb = globalThis as unknown as {
  client: postgres.Sql | undefined;
};

function createClient() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return postgres(url, {
    ssl: !isDevelopment() ? "require" : false,
  });
}

const client = globalForDb.client ?? createClient();

if (isDevelopment()) globalForDb.client = client;

export const db = drizzle(client, { schema });
export type Db = typeof db;