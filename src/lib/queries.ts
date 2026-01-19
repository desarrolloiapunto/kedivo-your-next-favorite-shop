// GraphQL queries for WooCommerce data
export const GET_CATEGORIES = `
  query GetCategories {
    productCategories {
      nodes {
        id
        name
        slug
        count
        image {
          sourceUrl
        }
      }
    }
  }
`;

export const GET_PRODUCTS = `
  query GetProducts($first: Int, $after: String, $where: RootQueryToProductConnectionWhereArgs) {
    products(first: $first, after: $after, where: $where) {
      nodes {
        id
        name
        slug
        description
        shortDescription
        price
        regularPrice
        salePrice
        stockStatus
        stockQuantity
        images {
          nodes {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        attributes {
          nodes {
            id
            name
            options
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_PRODUCT = `
  query GetProduct($id: ID!) {
    product(id: $id, idType: DATABASE_ID) {
      id
      name
      slug
      description
      shortDescription
      price
      regularPrice
      salePrice
      stockStatus
      stockQuantity
      images {
        nodes {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
      attributes {
        nodes {
          id
          name
          options
        }
      }
      related {
        nodes {
          id
          name
          slug
          price
          images {
            nodes {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;
