import productsData from "./products.json";

export interface Size {
  ml: number;
  price: number;
}

export interface FragranceNotes {
  top: string[];
  middle: string[];
  base: string[];
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  imageUrl: string;
  sizes: Size[];
  category: "men" | "women" | "unisex" | "middle eastern";
  notes: FragranceNotes;
}

export interface Pack {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  included_products: string[]; // List of fragrance names or IDs
  category: "men" | "women" | "unisex" | "middle eastern";
}

export const products: Product[] = productsData as Product[];
