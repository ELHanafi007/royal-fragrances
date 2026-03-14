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

export const products: Product[] = productsData as Product[];
