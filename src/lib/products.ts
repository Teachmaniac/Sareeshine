import fs from 'fs/promises';
import path from 'path';

/**
 * Defines the structure for a product object, used throughout the application.
 */
export type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  priceId: string;
  description: string;
  imageUrl: string;
  'data-ai-hint': string;
};

/**
 * Reads product data from the products.json file.
 * This function simulates fetching data from a database or a headless CMS.
 * It's designed to be used on the server, for example in Server Components or API routes.
 * @returns {Promise<Product[]>} A promise that resolves to an array of products.
 */
export async function getProducts(): Promise<Product[]> {
  // Construct the full path to the products.json file.
  const filePath = path.join(process.cwd(), 'public', 'products.json');
  try {
    // Read the file content asynchronously.
    const jsonData = await fs.readFile(filePath, 'utf-8');
    // Parse the JSON string into a JavaScript array of products.
    const products: Product[] = JSON.parse(jsonData);
    return products;
  } catch (error) {
    console.error("Failed to read or parse products.json:", error);
    // In case of an error (e.g., file not found), return an empty array.
    return [];
  }
}

/**
 * Finds and returns a single product by its unique slug.
 * @param {string} slug The slug of the product to find.
 * @returns {Promise<Product | undefined>} A promise that resolves to the product object if found, otherwise undefined.
 */
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}
