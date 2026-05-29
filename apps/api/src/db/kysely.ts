import { Kysely, PostgresDialect } from "kysely";
import { type DB } from "kysely-codegen";
import { pool } from "./pool.ts";

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({ pool }),
});
