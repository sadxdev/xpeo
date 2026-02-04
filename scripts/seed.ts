import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { mockCollections, mockMenu, mockPages, mockProducts } from '../lib/shopify/mock';

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('Starting DB seed with Prisma...');

    // 1. Clean up existing data
    console.log('Deleting existing data...');
    // Delete in order to respect foreign keys if we had stricter constraints
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.collection.deleteMany();
    await prisma.page.deleteMany();
    await prisma.menu.deleteMany();

    // 2. Insert Data
    console.log('Inserting data...');

    // Insert Products & Variants
    for (const product of mockProducts) {
      await prisma.product.create({
        data: {
          id: product.id,
          handle: product.handle,
          title: product.title,
          description: product.description,
          descriptionHtml: product.descriptionHtml,
          availableForSale: product.availableForSale,
          priceRange: product.priceRange as any,
          featuredImage: product.featuredImage as any,
          images: product.images as any,
          options: product.options as any,
          seo: product.seo as any,
          tags: product.tags,
          updatedAt: new Date(product.updatedAt),
          variants: {
            create: product.variants.map(v => ({
              id: v.id,
              title: v.title,
              availableForSale: v.availableForSale,
              selectedOptions: v.selectedOptions as any,
              price: v.price as any
            }))
          }
        }
      });
    }

    // Insert Collections
    for (const collection of mockCollections) {
      await prisma.collection.create({
        data: {
          handle: collection.handle,
          title: collection.title,
          description: collection.description,
          seo: collection.seo as any,
          path: collection.path,
          updatedAt: new Date(collection.updatedAt)
        }
      });
    }

    // Insert Pages
    for (const page of mockPages) {
      await prisma.page.create({
        data: {
          id: page.id,
          handle: page.handle,
          title: page.title,
          body: page.body,
          bodySummary: page.bodySummary,
          seo: page.seo as any,
          createdAt: new Date(page.createdAt),
          updatedAt: new Date(page.updatedAt)
        }
      });
    }

    // Insert Menu
    for (const item of mockMenu) {
      await prisma.menu.create({
        data: {
          title: item.title,
          path: item.path
        }
      });
    }

    console.log('Seed completed successfully!');

  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
