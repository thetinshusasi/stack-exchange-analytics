import { Router } from "express";
import { getQuestions, getQuestionById, getAnswersForQuestion } from "../controllers/questions.controller.ts";


export const questionsRouter: Router = Router();

questionsRouter.get("/", getQuestions);
questionsRouter.get("/:id", getQuestionById);
questionsRouter.get("/:id/answers", getAnswersForQuestion);