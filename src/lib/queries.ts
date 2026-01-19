// GraphQL queries for WooCommerce using WPGraphQL + WooGraphQL
export const GET_CATEGORIES = `
  query GetCategories($first: Int = 20) {
    productCategories(first: $first) {
      nodes {
        id
        databaseId
        name
        slug
        image {
          sourceUrl
          altText
        }
        display
        # Nota: El campo 'count' puede no estar disponible en WooGraphQL
        # Usaremos una aproximación o lo calcularemos de otra manera
      }
    }
  }
`;

export const GET_PRODUCTS = `
  query GetProducts(
    $first: Int = 20
    $after: String
    $where: RootQueryToProductUnionConnectionWhereArgs
  ) {
    products(first: $first, after: $after, where: $where) {
      nodes {
        id
        databaseId
        name
        slug
        description
        shortDescription
        sku
        type
        status
        featured
        catalogVisibility
        purchasable
        virtual
        reviewsAllowed
        averageRating
        reviewCount
        image {
          id
          sourceUrl
          altText
          title
        }
        galleryImages {
          nodes {
            id
            sourceUrl
            altText
            title
          }
        }
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          stockStatus
          stockQuantity
          manageStock
          backorders
          backordersAllowed
          soldIndividually
          weight
          ... on DownloadableProduct {
            downloads {
              nodes {
                name
                file
              }
            }
          }
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
        }
        ... on ExternalProduct {
          externalUrl
          buttonText
          price
          regularPrice
          salePrice
        }
        ... on GroupProduct {
          products {
            nodes {
              id
              name
              slug
            }
          }
        }
        productCategories {
          nodes {
            id
            name
            slug
          }
        }
        productTags {
          nodes {
            id
            name
            slug
          }
        }
        ... on ProductWithAttributes {
          attributes {
            nodes {
              id
              name
              label
              options
              position
              visible
              variation
            }
          }
        }
        ... on ProductWithVariations {
          variations {
            nodes {
              id
              name
              sku
              price
              regularPrice
              salePrice
              stockStatus
              stockQuantity
              attributes {
                nodes {
                  name
                  value
                }
              }
            }
          }
        }
        metaData {
          key
          value
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_PRODUCT = `
  query GetProduct($id: ID!, $idType: ProductIdTypeEnum = SLUG) {
    product(id: $id, idType: $idType) {
      id
      databaseId
      name
      slug
      description
      shortDescription
      sku
      type
      status
      featured
      catalogVisibility
      purchasable
      virtual
      reviewsAllowed
      averageRating
      reviewCount
      image {
        id
        sourceUrl
        altText
        title
      }
      galleryImages {
        nodes {
          id
          sourceUrl
          altText
          title
        }
      }
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
        stockStatus
        stockQuantity
        manageStock
        backorders
        backordersAllowed
        soldIndividually
        weight
        ... on DownloadableProduct {
          downloads {
            nodes {
              name
              file
            }
          }
        }
      }
      ... on VariableProduct {
        price
        regularPrice
        salePrice
      }
      ... on ExternalProduct {
        externalUrl
        buttonText
        price
        regularPrice
        salePrice
      }
      ... on GroupProduct {
        products {
          nodes {
            id
            name
            slug
          }
        }
      }
      productCategories {
        nodes {
          id
          name
          slug
        }
      }
      productTags {
        nodes {
          id
          name
          slug
        }
      }
      ... on ProductWithAttributes {
        attributes {
          nodes {
            id
            name
            label
            options
            position
            visible
            variation
          }
        }
      }
      ... on ProductWithVariations {
        variations {
          nodes {
            id
            name
            sku
            price
            regularPrice
            salePrice
            stockStatus
            stockQuantity
            attributes {
              nodes {
                name
                value
              }
            }
          }
        }
      }
      related {
        nodes {
          id
          databaseId
          name
          slug
          ... on SimpleProduct {
            price
            regularPrice
            salePrice
          }
          ... on VariableProduct {
            price
            regularPrice
            salePrice
          }
          ... on ExternalProduct {
            price
            regularPrice
            salePrice
          }
          image {
            sourceUrl
            altText
          }
        }
      }
      metaData {
        key
        value
      }
    }
  }
`;

// Query para productos por categoría específica
export const GET_PRODUCTS_BY_CATEGORY = `
  query GetProductsByCategory($category: String!, $first: Int = 20, $after: String) {
    products(where: { category: $category }, first: $first, after: $after) {
      nodes {
        id
        databaseId
        name
        slug
        ... on ProductWithPricing {
          price
          regularPrice
          salePrice
        }
        image {
          sourceUrl
          altText
        }
        productCategories {
          nodes {
            id
            name
            slug
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
