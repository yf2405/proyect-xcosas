"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FaBars, FaBackspace, FaShoppingCart } from "react-icons/fa";
import { CardContent } from "./components/ui/card";
import { CartContext } from "./src/context/context";
import { MdDeleteForever } from "react-icons/md";
import { Button } from "./components/ui/button";

function SideBar() {
  const cartContext = useContext(CartContext);
  
  if (!cartContext) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  const { cart, removeFromCart, updateQuantity } = cartContext;

  const calculateTotal = () => {
    return cart
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Botón para abrir/cerrar la barra lateral */}
      <div className="flex  px-2">
        <button onClick={toggleSidebar} className="text-gray-800 dark:text-gray-100">
          <FaShoppingCart  size={24} />
          <span className="text-white bg-red-500 rounded-full px-2 text-xs">
                {cart.length}
              </span>
        </button>
      </div>

      {/* Barra lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-74 bg-gray-800 text-white transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-center items-center flex-col p-4">
          <div className="mb-4 gap-4 flex">
          <button onClick={toggleSidebar} className="text-gray-800 dark:text-gray-100 ">
          <FaBackspace size={24} />
        </button>
            <h2 className="text-xl">Carrito de compras</h2>
          </div>
          <div className="rounded-md w-full max-w-md">
            {cart.map((product) => (
              <CardContent
                key={product.id}
                className="mb-2 p-5 gap-4 shadow-md rounded-md flex flex-row items-center"
              >
                <div className="flex-shrink-0">
                  <Link href={`/description/${product.id}/card`}>
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                      />
                    )}
                  </Link>
                </div>
                <div className="flex flex-col flex-grow">
                  <h5 className="font-bold">{product.name}</h5>
                  <h5 className="font-bold">${product.price.toFixed(2)}</h5>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className="text-gray-600 px-2"
                    >
                      -
                    </button>
                    <span className="px-4">{product.quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="text-gray-600 px-2"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-red-500 ml-4"
                >
                 <MdDeleteForever/>
                </button>
              </CardContent>
            ))}
            <div className="mt-4 text-lg font-bold">Total: ${calculateTotal()}</div>
          </div>
        </div>
        <div className="p-4">
        {cart.length ? (
        <Link href={'/cart'}>
        <Button>
        Cotizar
        </Button>
       
        </Link>
     ) : (<h3 className="font-bold">No hay items seleccionado.</h3>)}
      </div>
 </div>
      {/* Fondo semitransparente para cuando la barra lateral esté abierta */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}
    </>
  );
}

export default SideBar;
