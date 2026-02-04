import { NextRequest, NextResponse } from "next/server";
import {
  mockCollections,
  mockMenu,
  mockPages,
  mockProducts
} from "./mock";
import {
  Cart,
  Collection,
  Menu,
  Page,
  Product
} from "./types";

export async function createCart(): Promise<Cart> {
  return {
    id: "mock-cart-id",
    checkoutUrl: "/checkout",
    cost: {
      subtotalAmount: { amount: "0.0", currencyCode: "USD" },
      totalAmount: { amount: "0.0", currencyCode: "USD" },
      totalTaxAmount: { amount: "0.0", currencyCode: "USD" },
    },
    lines: [],
    totalQuantity: 0,
  };
}

export async function addToCart(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
    return {
    id: "mock-cart-id",
    checkoutUrl: "/checkout",
    cost: {
      subtotalAmount: { amount: "100.0", currencyCode: "USD" },
      totalAmount: { amount: "100.0", currencyCode: "USD" },
      totalTaxAmount: { amount: "0.0", currencyCode: "USD" },
    },
    lines: [
        {
            id: "line1",
            quantity: 1,
            cost: { totalAmount: { amount: "100.0", currencyCode: "USD" } },
            merchandise: {
                id: "var1",
                title: "Mock Product",
                selectedOptions: [],
                product: {
                    id: "1",
                    handle: "mock-product-1",
                    title: "Mock Product 1",
                    featuredImage: {
                        url: "https://placehold.co/600x600/png",
                        altText: "Mock Product 1",
                        width: 600,
                        height: 600
                    }
                }
            }
        }
    ],
    totalQuantity: 1,
  };
}

export async function removeFromCart(lineIds: string[]): Promise<Cart> {
  return createCart();
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  return createCart();
}

export async function getCart(): Promise<Cart | undefined> {
  return createCart();
}

export async function getCollection(
  handle: string
): Promise<Collection | undefined> {
  return mockCollections.find((c) => c.handle === handle);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  return mockProducts;
}

export async function getCollections(): Promise<Collection[]> {
  return mockCollections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  return mockMenu;
}

export async function getPage(handle: string): Promise<Page> {
  const page = mockPages.find((p) => p.handle === handle);
  return page || mockPages[0]!;
}

export async function getPages(): Promise<Page[]> {
  return mockPages;
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const product = mockProducts.find((p) => p.handle === handle);
  return product || mockProducts[0]!;
}

export async function getProductRecommendations(
  productId: string
): Promise<Product[]> {
  return mockProducts;
}

export async function getProducts({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  return mockProducts;
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
