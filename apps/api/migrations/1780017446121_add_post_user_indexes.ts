import { sql, type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await sql`CREATE INDEX IF NOT EXISTS idx_posts_posttypeid_creationdate ON posts (posttypeid, creationdate DESC)`.execute(db);
  await sql`CREATE INDEX IF NOT EXISTS idx_posts_score ON posts (score DESC)`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`DROP INDEX IF EXISTS idx_posts_score`.execute(db);
  await sql`DROP INDEX IF EXISTS idx_posts_posttypeid_creationdate`.execute(db);
}
