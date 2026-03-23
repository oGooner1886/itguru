export interface Product {
  id: number;
  title: string;
  category: string;
  brand: string;
  sku: string;
  rating: number;
  price: number;
  thumbnail: string;
}

export type SortOrder = "asc" | "desc" | "";

export interface SortConfig {
  key: keyof Product | "";
  order: SortOrder;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}
