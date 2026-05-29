import { Router } from "express";

export const usersRouter: Router = Router();

usersRouter.get("/", (_req, res) => {
  res.json({ items: [] });
});

usersRouter.get("/:id", (req, res) => {
  res.json({ id: req.params.id });
});
