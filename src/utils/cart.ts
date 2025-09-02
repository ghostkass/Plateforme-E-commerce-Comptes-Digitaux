import { Product, CartItem } from '../types';

export const addToCart = (cart: CartItem[], product: Product): CartItem[] => {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    return cart.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cart, { ...product, quantity: 1 }];
};

export const removeFromCart = (cart: CartItem[], productId: string): CartItem[] => {
  return cart.filter(item => item.id !== productId);
};