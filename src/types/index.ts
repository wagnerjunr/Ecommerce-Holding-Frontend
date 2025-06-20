export interface Product {
  id: string;
  externalId: string;
  name: string;
  price: number;
  provider: string;
  available: boolean;
  image:string;
  description:string;
  material:string;
  discountValue?:number;
}

export interface Users {
  id: string;
  name: string;
  email: string;
  order: Order[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export interface CreateOrderDto {
  items: OrderItem[];
  total: number;
  customerName: string;
  customerEmail: string;
}