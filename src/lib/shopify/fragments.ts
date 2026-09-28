export const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  descriptionHtml
  productType
  tags
  availableForSale
  featuredImage {
    url
    altText
    width
    height
  }
  images(first: 12) {
    nodes {
      url
      altText
      width
      height
    }
  }
  options {
    name
    values
  }
  priceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
  compareAtPriceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
  variants(first: 100) {
    nodes {
      id
      title
      availableForSale
      quantityAvailable
      selectedOptions { name value }
      price { amount currencyCode }
      compareAtPrice { amount currencyCode }
      image { url altText width height }
    }
  }
  collections(first: 10) {
    nodes {
      id
      handle
      title
    }
  }
`;
