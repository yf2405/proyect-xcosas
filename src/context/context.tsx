"use client"
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartContextType } from '@/constants/index';

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const addToCart = (product: Product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(product => product.id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};