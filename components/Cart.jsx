'use client';
import React, { useContext } from 'react';
import { MdDeleteForever } from "react-icons/md";
import ContactForm from './contact-form';
import { CardContent } from './ui/card';
import { CartContext } from '../src/context/context';
import Link from 'next/link';
import '../src/styles/cart.css'

const Cart = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  const { cart, removeFromCart, updateQuantity } = cartContext;

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  };
  
  return (
    <>
    <div className="cart-header">
      <h2>Carrito de compras</h2>
    </div>
  
    <div className="cart-container">
      <div className="cart-items">
        {cart.map((product) => (
          <CardContent key={product.id} className="cart-item">
            <div className="item-image">
              <Link href={`/description/${product.id}/card`}>
                {product.image && (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                  />
                )}
              </Link>
            </div>
            <div className='flex flex-col'>
            <h5 className="item-name">{product.name}</h5> 
            <h5 className="item-price">${product.price.toFixed(2)}</h5>
        </div>
            <div className="item-quantity">
              <button onClick={() => updateQuantity(product.id, -1)}>
                -
              </button>
              <span>{product.quantity}</span>
              <button onClick={() => updateQuantity(product.id, 1)}>
                +
              </button>
            </div>
           
            <button onClick={() => removeFromCart(product.id)} className="remove-item">
              <MdDeleteForever size={24}/>
            </button>
          </CardContent>
        ))}
      </div>
  
      <div className="w-full">
      <div className="total-amount">
          Total: ${calculateTotal()}
        </div>
        <ContactForm cart={cart} />
      </div>
    </div>
  </>
  );
};

export default Cart;