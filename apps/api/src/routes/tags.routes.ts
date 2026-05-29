import { Router } from "express";

export const tagsRouter: Router = Router();

tagsRouter.get("/", (_req, res) => {
  res.json({ items: [] });
});

tagsRouter.get("/:name", (req, res) => {
  res.json({ name: req.params.name });
});
