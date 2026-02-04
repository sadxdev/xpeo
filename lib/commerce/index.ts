import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../prisma";
import {
  Cart,
  Collection,
  Menu,
  Page,
  Product
} from "./types";

// Helper to map Prisma models to Types
const mapProduct = (row: any): Product => {
  return {
    id: row.id,
    handle: row.handle,
    availableForSale: row.availableForSale,
    title: row.title,
    description: row.description || "",
    descriptionHtml: row.descriptionHtml || "",
    options: (row.options as any) || [],
    priceRange: (row.priceRange as any),
    featuredImage: (row.featuredImage as any),
    images: (row.images as any) || [],
    seo: (row.seo as any),
    tags: row.tags,
    updatedAt: row.updatedAt.toISOString(),
    variants: []
  };
};

const mapPage = (row: any): Page => ({
  id: row.id,
  handle: row.handle,
  title: row.title,
  body: row.body || "",
  bodySummary: row.bodySummary || "",
  seo: (row.seo as any),
  createdAt: row.createdAt.toISOString(),
  updatedAt: row.updatedAt.toISOString()
});

const mapCollection = (row: any): Collection => ({
  handle: row.handle,
  title: row.title,
  description: row.description || "",
  seo: (row.seo as any),
  updatedAt: row.updatedAt.toISOString(),
  path: row.path || `/${row.handle}`
});

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
    return createCart();
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
  const collection = await prisma.collection.findUnique({
    where: { handle }
  });
  return collection ? mapCollection(collection) : undefined;
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
  // Simplification: In a real app we'd filter by collection.
  // Since we don't have a Many-to-Many relation defined in this simple schema yet,
  // we return all products or mock filtering.
  const products = await prisma.product.findMany();
  return products.map(mapProduct);
}

export async function getCollections(): Promise<Collection[]> {
  const collections = await prisma.collection.findMany();
  return collections.map(mapCollection);
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const menus = await prisma.menu.findMany();
  return menus.map(m => ({
    title: m.title,
    path: m.path
  }));
}

export async function getPage(handle: string): Promise<Page> {
  const page = await prisma.page.findUnique({
    where: { handle }
  });
  
  if (page) return mapPage(page);

  // Fallback
  const firstPage = await prisma.page.findFirst();
  return firstPage ? mapPage(firstPage) : ({} as Page);
}

export async function getPages(): Promise<Page[]> {
  const pages = await prisma.page.findMany();
  return pages.map(mapPage);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const product = await prisma.product.findUnique({
    where: { handle },
    include: { variants: true }
  });

  if (!product) return undefined;

  const mappedProduct = mapProduct(product);
  mappedProduct.variants = product.variants.map((v) => ({
    id: v.id,
    title: v.title,
    availableForSale: v.availableForSale,
    selectedOptions: (v.selectedOptions as any) || [],
    price: (v.price as any) || { amount: "0", currencyCode: "USD" }
  }));

  return mappedProduct;
}

export async function getProductRecommendations(
  productId: string
): Promise<Product[]> {
  const products = await prisma.product.findMany({
    take: 4
  });
  return products.map(mapProduct);
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
  const where: any = {};
  if (query) {
    where.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } }
    ];
  }

  let orderBy: any = undefined;
  if (sortKey === 'CREATED_AT') {
    orderBy = { updatedAt: reverse ? 'desc' : 'asc' };
  } 
  // Note: JSON sorting is tricky in Prisma, skipping price sort for now or handle in memory if needed.
  
  const products = await prisma.product.findMany({
    where,
    orderBy,
    include: { variants: true }
  });

  return products.map(p => {
    const mapped = mapProduct(p);
    mapped.variants = p.variants.map(v => ({
      id: v.id,
      title: v.title,
      availableForSale: v.availableForSale,
      selectedOptions: (v.selectedOptions as any) || [],
      price: (v.price as any) || { amount: "0", currencyCode: "USD" }
    }));
    return mapped;
  });
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
