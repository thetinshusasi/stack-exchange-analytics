// apps/api/src/services/questions.service.ts

import { db } from "../db/kysely.ts";

type GetQuestionsInput = {
  page: number;
  limit: number;
  search: string;
  tag: string;
};

export const questionsService = {
  async getQuestions(input: GetQuestionsInput) {
    const offset = (input.page - 1) * input.limit;

    let query = db
      .selectFrom("posts")
      .select([
        "id",
        "title",
        "score",
        "viewcount",
        "answercount",
        "commentcount",
        "tags",
        "creationdate",
        "owneruserid",
      ])
      .where("posttypeid", "=", 1);

    if (input.search) {
      query = query.where("title", "ilike", `%${input.search}%`);
    }

    if (input.tag) {
      query = query.where("tags", "ilike", `%<${input.tag}>%`);
    }

    const rows = await query
      .orderBy("creationdate", "desc")
      .limit(input.limit)
      .offset(offset)
      .execute();

    return {
      data: rows,
      pagination: {
        page: input.page,
        limit: input.limit,
        count: rows.length,
      },
    };
  },

  async getQuestionById(id: number) {
    return await db
      .selectFrom("posts as p")
      .leftJoin("users as u", "u.id", "p.owneruserid")
      .select([
        "p.id",
        "p.title",
        "p.body",
        "p.score",
        "p.viewcount",
        "p.answercount",
        "p.commentcount",
        "p.tags",
        "p.creationdate",
        "p.acceptedanswerid",
        "p.owneruserid",
        "u.displayname as owner_display_name",
        "u.reputation as owner_reputation",
      ])
      .where("p.id", "=", id)
      .where("p.posttypeid", "=", 1)
      .executeTakeFirst();
  },

  async getAnswersForQuestion(questionId: number) {
    return await db
      .selectFrom("posts as p")
      .leftJoin("users as u", "u.id", "p.owneruserid")
      .select([
        "p.id",
        "p.parentid",
        "p.body",
        "p.score",
        "p.creationdate",
        "p.owneruserid",
        "u.displayname as owner_display_name",
        "u.reputation as owner_reputation",
      ])
      .where("p.parentid", "=", questionId)
      .where("p.posttypeid", "=", 2)
      .orderBy("p.score", "desc")
      .orderBy("p.creationdate", "asc")
      .execute();
  },
};
