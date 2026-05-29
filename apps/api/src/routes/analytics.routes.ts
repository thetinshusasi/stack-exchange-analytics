import { Router } from "express";

export const analyticsRouter: Router = Router();

analyticsRouter.get("/top-users", (_req, res) => {
  res.json({ items: [] });
});

analyticsRouter.get("/trending-tags", (_req, res) => {
  res.json({ items: [] });
});

analyticsRouter.get("/unanswered", (_req, res) => {
  res.json({ items: [] });
});
