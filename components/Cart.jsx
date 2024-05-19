'use client';
import React, { useContext, useEffect, useState } from 'react';
import ContactForm from './contact-form';
import { CardContent } from './ui/card';
import { CartContext } from '../src/context/context';

const Cart = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  const { cart, removeFromCart } = cartContext;
  const [cartItems, setCartItems] = useState(cart);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const calculateTotal = () => {
    return cartItems.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  return (
    <div className="flex justify-center items-center flex-col container mx-auto">
      <div className="mb-4">
        <h2 className="text-xl">Carrito de compras</h2>
      </div>
      <div className="p-5 rounded-md w-full max-w-md">
        {cartItems.map((product) => (
          <CardContent key={product.id} className="mb-2 p-5 gap-4 shadow-md rounded-md flex flex-row items-center">
            <div className="flex-shrink-0">
              <img src={product.image} alt={product.name} style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
            </div>
            <div className="flex flex-col flex-grow">
              <h5 className="font-bold">{product.name}</h5>
              <h5 className="font-bold">${product.price.toFixed(2)}</h5>
            </div>
            <button onClick={() => removeFromCart(product.id)} className="text-red-500 ml-4">x</button>
          </CardContent>
        ))}
        <div className="mt-4 text-lg font-bold">
          Total: ${calculateTotal()}
        </div>
      </div>
      <ContactForm cart={cartItems} />
    </div>
  );
};

export default Cart;