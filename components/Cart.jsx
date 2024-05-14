

import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="p-6 bg-gray-800 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p className="text-gray-300">El carrito está vacío</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
              <div>
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-gray-300">Cantidad: {item.quantity}</p>
                <p className="text-gray-300">Precio: ${item.price}</p>
              </div>
              <Button onClick={() => removeFromCart(item.id)} className="bg-red-500">Eliminar</Button>
            </div>
          ))}
          <div className="flex justify-end">
            <Button onClick={clearCart} className="bg-red-500">Vaciar Carrito</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
