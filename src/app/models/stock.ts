export interface Stock {
  quantity: number;
  product: string;
  id: string;
}

export interface createdStock {
  quantity: number;
  product: string;
}

export interface ProductWithStock {
  name: string;
  description: string;
  image: string;
  user: string;
  price: number;
  id: string;
  stocks?: Stock;
}
