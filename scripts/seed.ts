import 'dotenv/config';
import { pool } from '../lib/db';
import { mockCollections, mockMenu, mockPages, mockProducts } from '../lib/shopify/mock';

async function seed() {
  const client = await pool.connect();

  try {
    console.log('Starting seed...');

    // Begin transaction
    await client.query('BEGIN');

    // 1. Clean up existing tables
    console.log('Dropping existing tables...');
    await client.query(`
      DROP TABLE IF EXISTS product_variants CASCADE;
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS collections CASCADE;
      DROP TABLE IF EXISTS pages CASCADE;
      DROP TABLE IF EXISTS menus CASCADE;
    `);

    // 2. Create tables
    console.log('Creating tables...');
    
    // Products
    await client.query(`
      CREATE TABLE products (
        id TEXT PRIMARY KEY,
        handle TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        description_html TEXT,
        available_for_sale BOOLEAN DEFAULT true,
        price_range JSONB,
        featured_image JSONB,
        images JSONB,
        options JSONB,
        seo JSONB,
        tags TEXT[],
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Product Variants
    await client.query(`
      CREATE TABLE product_variants (
        id TEXT PRIMARY KEY,
        product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        available_for_sale BOOLEAN DEFAULT true,
        selected_options JSONB,
        price JSONB
      );
    `);

    // Collections
    await client.query(`
      CREATE TABLE collections (
        handle TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        seo JSONB,
        path TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Pages
    await client.query(`
      CREATE TABLE pages (
        id TEXT PRIMARY KEY,
        handle TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        body TEXT,
        body_summary TEXT,
        seo JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Menus
    await client.query(`
      CREATE TABLE menus (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        path TEXT NOT NULL
      );
    `);

    // 3. Insert Data
    console.log('Inserting data...');

    // Insert Products & Variants
    for (const product of mockProducts) {
      await client.query(`
        INSERT INTO products (
          id, handle, title, description, description_html, available_for_sale, 
          price_range, featured_image, images, options, seo, tags, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      `, [
        product.id,
        product.handle,
        product.title,
        product.description,
        product.descriptionHtml,
        product.availableForSale,
        JSON.stringify(product.priceRange),
        JSON.stringify(product.featuredImage),
        JSON.stringify(product.images),
        JSON.stringify(product.options),
        JSON.stringify(product.seo),
        product.tags,
        product.updatedAt
      ]);

      if (product.variants) {
        for (const variant of product.variants) {
          await client.query(`
            INSERT INTO product_variants (
              id, product_id, title, available_for_sale, selected_options, price
            ) VALUES ($1, $2, $3, $4, $5, $6)
          `, [
            variant.id,
            product.id,
            variant.title,
            variant.availableForSale,
            JSON.stringify(variant.selectedOptions),
            JSON.stringify(variant.price)
          ]);
        }
      }
    }

    // Insert Collections
    for (const collection of mockCollections) {
      await client.query(`
        INSERT INTO collections (
          handle, title, description, seo, path, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        collection.handle,
        collection.title,
        collection.description,
        JSON.stringify(collection.seo),
        collection.path,
        collection.updatedAt
      ]);
    }

    // Insert Pages
    for (const page of mockPages) {
      await client.query(`
        INSERT INTO pages (
          id, handle, title, body, body_summary, seo, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [
        page.id,
        page.handle,
        page.title,
        page.body,
        page.bodySummary,
        JSON.stringify(page.seo),
        page.createdAt,
        page.updatedAt
      ]);
    }

    // Insert Menu
    for (const item of mockMenu) {
      await client.query(`
        INSERT INTO menus (title, path) VALUES ($1, $2)
      `, [item.title, item.path]);
    }

    // Commit transaction
    await client.query('COMMIT');
    console.log('Seed completed successfully!');

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error seeding database:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
