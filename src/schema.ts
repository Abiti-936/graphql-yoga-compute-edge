import { AsyncExecutor } from "@graphql-tools/utils";
import { introspectSchema, wrapSchema } from "@graphql-tools/wrap";
import { print } from "graphql";

export const createRemoteSchema = async (
  url: string,
  token: string,
  backend: string,
) => {
  const executor: AsyncExecutor = async ({ document, variables }) => {
    const query = print(document);

    const fetchResult = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      backend,
      body: JSON.stringify({ query, variables }),
    });

    return await fetchResult.json();
  };

  const schema = wrapSchema({
    schema: await introspectSchema(executor),
    executor,
  });

  return schema;
};
