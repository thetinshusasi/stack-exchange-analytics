import { Router } from "express";
import { pool } from "../db/pool.ts";

export const healthRouter: Router = Router();

healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

healthRouter.get("/db", async (_req, res, next) => {
  try {
    const { rows } = await pool.query("select 1 as ok");
    res.json({ status: "ok", db: rows[0] });
  } catch (err) {
    next(err);
  }
});
