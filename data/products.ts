import productsData from "./products.json";

export interface Variant {
  size: string; // Display name e.g. "Grand Luxe"
  price: number;
  totalHeight: string; // Height of plant + vase
  plantHeight: string; // Height of plant alone
  vaseHeight: string;  // Height of vase alone
  vaseWidth: string;   // Width of vase (Laard)
  vaseDepth: string;   // Depth/Thickness of vase (Soumk)
}

export interface PlantCharacteristics {
  foliage: string[];
  texture: string[];
  pot: string[];
}

export interface Product {
  id: number;
  name: string;
  brand: string; // Use this for "Collection" or "Designer"
  description: string;
  miniDescription?: string; // Short summary for quick reading
  imageUrl: string;
  images?: string[]; // Array of images for the gallery
  variants: Variant[];
  category: "home-decor" | "office" | "luxury" | "new-arrivals";
  characteristics: PlantCharacteristics;
}

export const products: Product[] = productsData as any[];
