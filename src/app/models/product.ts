export interface Product {
  name: string;
  description: string;
  image: string;
  user: string;
  price: number;
  id: string;
}

export interface createdProduct {
  name: string;
  description: string;
  image: string;
  user: string;
  price: number;
}

export interface ProductID_Name {
  name: string;
  id: string;
  stock?: number;
}
