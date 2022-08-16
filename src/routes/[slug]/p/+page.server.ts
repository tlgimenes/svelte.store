import { gql } from "$lib/server/autogen";
import { run } from "$lib/server/graphql";
import { isNotFoundError } from "@faststore/api";
import { error } from "@sveltejs/kit";

import type {
  GetProductQuery,
  GetProductQueryVariables,
} from "$lib/server/autogen/graphql";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params: { slug } }) => {
  const { data, errors = [] } = await run<
    GetProductQuery,
    GetProductQueryVariables
  >({
    query,
    variables: {
      locator: [
        { key: "slug", value: slug },
      ],
    },
  });

  const notFound = errors.find(isNotFoundError);

  if (notFound || !data) {
    throw error(404, `Product ${slug} not found`);
  }

  if (errors.length > 0) {
    throw error(500, errors[0].message);
  }

  return data;
};

const query = gql(`
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
  }
`);
