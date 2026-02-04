import { Collection, Menu, Page, Product } from "./types";

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";

export const mockMenu: Menu[] = [
  { title: "All", path: "/search" },
  { title: "Mocks", path: "/search/mock-c" },
  { title: "About", path: "/about" },
];

export const mockPages: Page[] = [
  {
    id: "1",
    title: "About Us",
    handle: "about",
    body: "<p>This is a mock about page.</p>",
    bodySummary: "About us mock summary",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seo: { title: "About Us", description: "About us description" },
  },
];

export const mockCollections: Collection[] = [
  {
    handle: "mock-c",
    title: "Mock Collection",
    description: "A collection of mock products",
    seo: { title: "Mock Collection", description: "Mock collection description" },
    updatedAt: new Date().toISOString(),
    path: "/search/mock-c",
  },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    handle: "mock-product-1",
    availableForSale: true,
    title: "Mock Product 1",
    description: "This is a mock product description.",
    descriptionHtml: "<p>This is a mock product description.</p>",
    options: [
      { id: "opt1", name: "Color", values: ["Black", "White"] },
      { id: "opt2", name: "Size", values: ["S", "M", "L"] },
    ],
    priceRange: {
      maxVariantPrice: { amount: "100.00", currencyCode: "USD" },
      minVariantPrice: { amount: "100.00", currencyCode: "USD" },
    },
    variants: [
      {
        id: "var1",
        title: "Black / S",
        availableForSale: true,
        selectedOptions: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "S" },
        ],
        price: { amount: "100.00", currencyCode: "USD" },
      },
    ],
    featuredImage: {
      url: "https://placehold.co/600x600/png",
      altText: "Mock Product 1",
      width: 600,
      height: 600,
    },
    images: [
      {
        url: "https://placehold.co/600x600/png",
        altText: "Mock Product 1",
        width: 600,
        height: 600,
      },
    ],
    seo: { title: "Mock Product 1", description: "Mock product 1 description" },
    tags: ["mock"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    handle: "mock-product-2",
    availableForSale: true,
    title: "Mock Product 2",
    description: "Another mock product.",
    descriptionHtml: "<p>Another mock product.</p>",
    options: [],
    priceRange: {
      maxVariantPrice: { amount: "50.00", currencyCode: "USD" },
      minVariantPrice: { amount: "50.00", currencyCode: "USD" },
    },
    variants: [
      {
        id: "var2",
        title: "Default",
        availableForSale: true,
        selectedOptions: [],
        price: { amount: "50.00", currencyCode: "USD" },
      },
    ],
    featuredImage: {
      url: "https://placehold.co/600x600/png",
      altText: "Mock Product 2",
      width: 600,
      height: 600,
    },
    images: [
      {
        url: "https://placehold.co/600x600/png",
        altText: "Mock Product 2",
        width: 600,
        height: 600,
      },
    ],
    seo: { title: "Mock Product 2", description: "Mock product 2 description" },
    tags: ["mock"],
    updatedAt: new Date().toISOString(),
  },
    {
    id: "3",
    handle: "mock-product-3",
    availableForSale: true,
    title: "Mock Product 3",
    description: "Third mock product.",
    descriptionHtml: "<p>Third mock product.</p>",
    options: [],
    priceRange: {
      maxVariantPrice: { amount: "150.00", currencyCode: "USD" },
      minVariantPrice: { amount: "150.00", currencyCode: "USD" },
    },
    variants: [
      {
        id: "var3",
        title: "Default",
        availableForSale: true,
        selectedOptions: [],
        price: { amount: "150.00", currencyCode: "USD" },
      },
    ],
    featuredImage: {
      url: "https://placehold.co/600x600/png",
      altText: "Mock Product 3",
      width: 600,
      height: 600,
    },
    images: [
      {
        url: "https://placehold.co/600x600/png",
        altText: "Mock Product 3",
        width: 600,
        height: 600,
      },
    ],
    seo: { title: "Mock Product 3", description: "Mock product 3 description" },
    tags: ["mock"],
    updatedAt: new Date().toISOString(),
  }
];
