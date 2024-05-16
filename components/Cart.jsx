'use client';

import React, { useState, useEffect } from 'react';
import { CardContent } from './ui/card';
import ContactForm from './contact-form'

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  return (
    <div className="flex justify-center items-center flex-col container mx-auto">
      <div className="mb-4">
        <h2 className="text-xl">Carrito de compras</h2>
      </div>
      <div className="p-5 rounded-md w-full max-w-lg">
        {cart.map((product) => (
          <CardContent key={product.id} className="mb-2 p-5 gap-4 shadow-md rounded-md flex flex-row items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img src={product.image} alt={product.name} style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
              </div>
              <div className="flex flex-col ml-4">
                <h5 className="font-bold">{product.name}</h5>
                <h5 className="font-bold">${product.price}</h5>
              </div>
            </div>
          </CardContent>
        ))}
        <ContactForm cart={cart} />
      </div>
    </div>
  );
};

export default Cart;