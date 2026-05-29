// apps/api/src/controllers/questions.controller.ts

import type { Request, Response, NextFunction } from "express";
import { questionsService } from "../services/questions.service.ts";

export async function getQuestions(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Math.min(Number(req.query.limit ?? 20), 100);
    const search = String(req.query.search ?? "");
    const tag = String(req.query.tag ?? "");

    const data = await questionsService.getQuestions({
      page,
      limit,
      search,
      tag,
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function getQuestionById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const question = await questionsService.getQuestionById(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json({ data: question });
  } catch (error) {
    next(error);
  }
}

export async function getAnswersForQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const answers = await questionsService.getAnswersForQuestion(id);

    res.json({ data: answers });
  } catch (error) {
    next(error);
  }
}