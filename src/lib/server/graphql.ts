import { getContextFactory, getSchema } from "@faststore/api";
import { execute } from "graphql";
import type { DocumentNode, ExecutionResult } from "graphql";
import type { Options } from "@faststore/api";

interface ExecuteOptions<V = Record<string, unknown>> {
  operationName?: string;
  variables: V;
  query: DocumentNode;
}

const options: Options = {
  platform: "vtex",
  account: "storeframework",
  environment: "vtexcommercestable",
  channel: '{"salesChannel":"1","regionId":""}',
  hideUnavailableItems: true,
  locale: "en-US",
  flags: {
    enableOrderFormSync: true,
  },
};

const schema = getSchema(options);

const contextFactory = getContextFactory(options);

export const run = async <
  D extends Record<string, unknown>,
  V extends Record<string, unknown>,
>(
  { query, variables, operationName }: ExecuteOptions<V>,
) =>
  execute({
    schema: await schema,
    document: query,
    variableValues: variables,
    contextValue: contextFactory({}),
    operationName,
  }) as Promise<ExecutionResult<D>>;
