import { app } from "./app.ts";
import { db } from "./db/kysely.ts";

const port = Number(process.env.PORT ?? 3000);

const server = app.listen(port, () => {
  console.log(`api listening on http://localhost:${port}`);
});

const shutdown = async (signal: string) => {
  console.log(`${signal} received, shutting down`);

  const forceExit = setTimeout(() => {
    console.error("shutdown timed out, forcing exit");
    process.exit(1);
  }, 10_000);
  forceExit.unref();

  server.close(async (err) => {
    if (err) {
      console.error("error closing http server", err);
      process.exit(1);
    }
    try {
      await db.destroy();
      process.exit(0);
    } catch (dbErr) {
      console.error("error closing db", dbErr);
      process.exit(1);
    }
  });
};

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));
