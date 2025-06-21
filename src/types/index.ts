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

export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  neighborhood: string;
  number: string;
  complement?: string;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
  user?: Users;
  orders?: Order[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image:string;
  description:string;
  material:string;
  provider:string;
  available:boolean;
  discountValue?:number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
  addressId: string;
  userId: string;
  address?: Address;
  user?: Users;
}

export interface CreateOrderDto {
  items: OrderItem[];
  total: number;
  customerName: string;
  customerEmail: string;
}