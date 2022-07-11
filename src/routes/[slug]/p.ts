import { gql, run } from "$lib/server/graphql";
import { isNotFoundError } from "@faststore/api";

import type {
  GetProductQuery,
  GetProductQueryVariables,
} from "$lib/server/types";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ params: { slug } }) => {
  const { data, errors = [] } = await run<
    GetProductQuery,
    GetProductQueryVariables
  >({
    query: gql`
      query GetProduct($locator: [IStoreSelectedFacet!]!) {
        product(locator: $locator) {
          id: productID

          seo {
            title
            description
            canonical
          }
         
          breadcrumbList {
            itemListElement {
              item
              name
              position
            }
          }

          brand {
            name
          }

          sku
          gtin
          name
          description

          image {
            url
            alternateName
          }

          offers {
            lowPrice
            highPrice
            priceCurrency
            offers {
              availability
              price
              priceValidUntil
              priceCurrency
              itemCondition
              seller {
                identifier
              }
            }
          }

          isVariantOf {
            productGroupID
          }

          ...ProductDetails_product
        }
    }`,
    variables: {
      locator: [
        { key: "slug", value: slug },
      ],
    },
  });

  const notFound = errors.find(isNotFoundError);

  if (notFound || !data) {
    return {
      status: 404,
    };
  }

  if (errors.length > 0) {
    throw errors[0];
  }

  return {
    body: data,
  };
};
