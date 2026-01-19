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
        dimensions {
          length
          width
          height
        }
        reviewsAllowed
        averageRating
        reviewCount
        images {
          nodes {
            id
            sourceUrl
            altText
            title
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        tags {
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
        type
        status
        featured
        catalogVisibility
        purchasable
        virtual
        downloadable
        downloads {
          nodes {
            name
            file
          }
        }
        externalUrl
        buttonText
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
      dimensions {
        length
        width
        height
      }
      reviewsAllowed
      averageRating
      reviewCount
      images {
        nodes {
          id
          sourceUrl
          altText
          title
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
      tags {
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
      related {
        nodes {
          id
          databaseId
          name
          slug
          price
          regularPrice
          salePrice
          images {
            nodes {
              sourceUrl
              altText
            }
          }
        }
      }
      type
      status
      featured
      catalogVisibility
      purchasable
      virtual
      downloadable
      downloads {
        nodes {
          name
          file
        }
      }
      externalUrl
      buttonText
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
        price
        regularPrice
        salePrice
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
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
