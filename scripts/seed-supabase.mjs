import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase credentials missing in .env.local.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log("Starting Royal Synchronization...");

  try {
    const products = fs.existsSync('./data/products.json') ? JSON.parse(fs.readFileSync('./data/products.json', 'utf8')) : [];
    const packs = fs.existsSync('./data/packs.json') ? JSON.parse(fs.readFileSync('./data/packs.json', 'utf8')) : [];
    const brands = fs.existsSync('./data/brands.json') ? JSON.parse(fs.readFileSync('./data/brands.json', 'utf8')) : [];

    // 1. Sync Categories
    const derivedCategories = [...new Set(products.map(p => p.category))].filter(Boolean);
    console.log(`Deriving and syncing ${derivedCategories.length} categories from products...`);
    await supabase.from('categories').delete().neq('id', 0); // Clear all first
    for (const cat of derivedCategories) {
      const { error } = await supabase
        .from('categories')
        .insert([{ name: cat.replace('-', ' '), slug: cat }]);
      if (error) console.error(`Error syncing category ${cat}:`, error.message);
    }

    // 2. Sync Brands
    if (brands.length > 0) {
      console.log(`Syncing ${brands.length} brands...`);
      for (const brand of brands) {
        const { error } = await supabase
          .from('brands')
          .upsert([{ name: brand }], { onConflict: 'name' });
        if (error) console.error(`Error syncing brand ${brand}:`, error.message);
      }
    } else {
      // Derive brands from products if brands.json is missing
      const derivedBrands = [...new Set(products.map(p => p.brand))].filter(Boolean);
      console.log(`Deriving and syncing ${derivedBrands.length} brands from products...`);
      for (const brand of derivedBrands) {
        const { error } = await supabase
          .from('brands')
          .upsert([{ name: brand }], { onConflict: 'name' });
        if (error) console.error(`Error syncing brand ${brand}:`, error.message);
      }
    }

    // 2. Sync Products
    if (products.length > 0) {
      console.log(`Clearing and Syncing ${products.length} products...`);
      await supabase.from('products').delete().neq('id', 0); // Delete all
      
      const formattedProducts = products.map(p => ({
        name: p.name,
        brand: p.brand,
        description: p.description,
        mini_description: p.miniDescription,
        image_url: p.imageUrl,
        category: p.category,
        images: p.images || [p.imageUrl],
        variants: p.variants,
        characteristics: p.characteristics,
        notes: p.notes
      }));

      const { error: prodError } = await supabase
        .from('products')
        .insert(formattedProducts);
      if (prodError) console.error("Error syncing products:", prodError.message);
    }

    // 3. Sync Packs
    if (packs.length > 0) {
      console.log(`Clearing and Syncing ${packs.length} packs...`);
      await supabase.from('packs').delete().neq('id', 0); // Delete all

      const formattedPacks = packs.map(p => ({
        name: p.name,
        description: p.description,
        image_url: p.imageUrl,
        price: p.price,
        included_products: p.included_products,
        category: p.category
      }));

      const { error: packError } = await supabase
        .from('packs')
        .insert(formattedPacks);
      if (packError) console.error("Error syncing packs:", packError.message);
    }

    console.log("Synchronization complete.");
  } catch (error) {
    console.error("Royal Failure:", error.message);
  }
}

seed();
