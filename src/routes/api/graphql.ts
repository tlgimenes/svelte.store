import { run } from "$lib/server/graphql";
import { parse } from "graphql";

import type { RequestHandler } from "@sveltejs/kit";

export const post: RequestHandler = async ({ request }) => {
  const { query, operationName, variables } = await request.json()

  const data = await run({
    query: parse(query),
    variables,
    operationName,
  });

  return {
    body: JSON.stringify(data),
  };
};
