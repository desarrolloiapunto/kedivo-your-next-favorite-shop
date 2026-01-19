// GraphQL queries for WooCommerce using WPGraphQL + WooGraphQL
export const GET_CATEGORIES = `
  query GetCategories($first: Int = 20) {
    productCategories(first: $first) {
      nodes {
        id
        databaseId
        name
        slug
        count
        image {
          sourceUrl
          altText
        }
        display
      }
    }
  }
`;

export const GET_PRODUCTS = `
  query GetProducts(
    $first: Int = 20
    $after: String
    $where: RootQueryToProductConnectionWhereArgs
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
        downloadable
        externalUrl
        buttonText
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
        ... on ProductWithPricing {
          price
          regularPrice
          salePrice
        }
        ... on SimpleProduct {
          stockStatus
          stockQuantity
          manageStock
          backorders
          backordersAllowed
          soldIndividually
          weight
          dimensions {
            length
            width
            height
          }
        }
        ... on VariableProduct {
          stockStatus
          stockQuantity
          manageStock
          backorders
          backordersAllowed
          soldIndividually
          weight
          dimensions {
            length
            width
            height
          }
        }
        ... on ExternalProduct {
          externalUrl
          buttonText
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
        variations {
          nodes {
            id
            name
            sku
            ... on ProductVariationWithPricing {
              price
              regularPrice
              salePrice
            }
            ... on ProductVariation {
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
        downloads {
          nodes {
            name
            file
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
        total
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
      downloadable
      externalUrl
      buttonText
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
      ... on ProductWithPricing {
        price
        regularPrice
        salePrice
      }
      ... on SimpleProduct {
        stockStatus
        stockQuantity
        manageStock
        backorders
        backordersAllowed
        soldIndividually
        weight
        dimensions {
          length
          width
          height
        }
      }
      ... on VariableProduct {
        stockStatus
        stockQuantity
        manageStock
        backorders
        backordersAllowed
        soldIndividually
        weight
        dimensions {
          length
          width
          height
        }
      }
      ... on ExternalProduct {
        externalUrl
        buttonText
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
      variations {
        nodes {
          id
          name
          sku
          ... on ProductVariationWithPricing {
            price
            regularPrice
            salePrice
          }
          ... on ProductVariation {
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
          ... on ProductWithPricing {
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
      downloads {
        nodes {
          name
          file
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
