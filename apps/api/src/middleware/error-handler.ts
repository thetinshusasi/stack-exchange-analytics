import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  req.log?.error({ err }, "request failed");

  const status = typeof err?.status === "number" ? err.status : 500;
  const message = status >= 500 ? "Internal Server Error" : err?.message ?? "Error";

  res.status(status).json({ error: message });
};
