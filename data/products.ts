import productsData from "./products.json";

export interface Variant {
  size: string; // e.g., "60cm", "120cm", "180cm"
  price: number;
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
  imageUrl: string;
  variants: Variant[];
  category: "home-decor" | "office" | "luxury" | "new-arrivals";
  characteristics: PlantCharacteristics;
}

export const products: Product[] = productsData as any[];
