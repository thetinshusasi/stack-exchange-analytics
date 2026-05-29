import { defineConfig } from "kysely-ctl";
import { db } from "./src/db/kysely.ts";

export default defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: "migrations",
  },
});
