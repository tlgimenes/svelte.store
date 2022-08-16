import { run } from "$lib/server/graphql";
import { parse } from "graphql";

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { query, operationName, variables } = await request.json();

  const data = await run({
    query: parse(query),
    variables,
    operationName,
  });

  return new Response(JSON.stringify(data));
};
