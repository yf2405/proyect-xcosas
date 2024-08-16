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
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      const newCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const removeFromCart = (productId: number) => {
    const newCart = cart.filter(product => product.id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateQuantity = (productId: number, change: number) => {
    const newCart = cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0) {
          return { ...item, quantity: newQuantity };
        } else {
          return null; // Retorna null si la cantidad es 0 o menor
        }
      }
      return item;
    }).filter(item => item !== null) as Product[];
  
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
