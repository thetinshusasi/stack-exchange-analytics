// apps/api/src/app.ts

import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { pinoHttp } from "pino-http";

import { healthRouter } from "./routes/health.routes.ts";
import { questionsRouter } from "./routes/questions.routes.ts";
import { usersRouter } from "./routes/users.routes.ts";
import { tagsRouter } from "./routes/tags.routes.ts";
import { analyticsRouter } from "./routes/analytics.routes.ts";
import { errorHandler } from "./middleware/error-handler.ts";

export const app: Express = express();

app.use(helmet());
app.use(cors({ origin: process.env.WEB_ORIGIN ?? "http://localhost:3005" }));
app.use(compression());
app.use(express.json());
app.use(pinoHttp());

app.use("/api/health", healthRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/users", usersRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/analytics", analyticsRouter);

app.use(errorHandler);