import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Tipos necessários
export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

interface CartActions {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

type CartStore = CartState & CartActions;

const useCartStore = create<CartStore>()(devtools((set, get) => ({
  // Estado inicial
  items: [],
  total: 0,
  itemCount: 0,

  // Ações
  addToCart: (product: Product) => {
    const { items } = get();
    const existingItem = items.find(item => item.id === product.id);
    
    let newItems: CartItem[];
    
    if (existingItem) {
      newItems = items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newItems = [...items, { ...product, quantity: 1 }];
    }
    
    const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
    
    set({ items: newItems, total, itemCount }, false, 'addToCart');
  },

  removeFromCart: (productId: string) => {
    const { items } = get();
    const newItems = items.filter(item => item.id !== productId);
    
    const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
    
    set({ items: newItems, total, itemCount }, false, 'removeFromCart');
  },

  updateQuantity: (productId: string, quantity: number) => {
    const { items } = get();
    const newItems = items.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    ).filter(item => item.quantity > 0);
    
    const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
    
    set({ items: newItems, total, itemCount }, false, 'updateQuantity');
  },

  clearCart: () => {
    set({ items: [], total: 0, itemCount: 0 }, false, 'clearCart');
  },
}), {
  name: 'cart-store', // Nome para o devtools
}));

export default useCartStore;