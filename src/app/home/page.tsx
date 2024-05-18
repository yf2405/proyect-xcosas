'use client';

import React, { useState, useEffect } from 'react';
import ProductCardHome from '@/components/product-card-home';
import { getProducts } from '@/lib/getproducts';
import Link from 'next/link';
import { Product } from '@/constants/index'; 

const SettingProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];
    setCart(storedCart);
  }, []);

  const addToCart = (product: Product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 outline-none">
        {products.map((product) => (
          <ProductCardHome
            product={product}
            key={product.id}
            addToCart={addToCart}
            inCart={cart.some((cartItem) => cartItem.id === product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SettingProduct;


