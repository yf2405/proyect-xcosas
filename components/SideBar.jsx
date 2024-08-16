"use client";
import "../src/styles/SliderBar.css"; // Asegúrate de importar el archivo CSS
import Link from "next/link";
import React, { useContext, useState } from "react";
import {  FaBackspace, FaShoppingCart } from "react-icons/fa";
import { CardContent } from "./ui/card";
import { CartContext } from "../src/context/context";
import { MdDeleteForever } from "react-icons/md";
import { Button } from "./ui/button";

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
      <div className="sidebar-toggle">
        <button onClick={toggleSidebar} className="sidebar-button">
          <FaShoppingCart size={24} />
          <span className="cart-count">
            {cart.length}
          </span>
        </button>
      </div>

      <div className={`sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <button onClick={toggleSidebar} className="sidebar-close-button">
              <FaBackspace size={24} />
            </button>
            <h2 className="sidebar-title">Carrito de compras</h2>
          </div>
          <div className="cart-items">
            {cart.map((product) => (
              <CardContent key={product.id} className="cart-item">
                <div className="cart-item-image">
                  <Link href={`/description/${product.id}/card`}>
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                    )}
                  </Link>
                </div>
                <div className="cart-item-info">
                  <h5 className="product-name">{product.name}</h5>
                  <h5 className="product-price">${product.price.toFixed(2)}</h5>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(product.id, -1)} className="quantity-button">-</button>
                    <span className="quantity">{product.quantity}</span>
                    <button onClick={() => updateQuantity(product.id, 1)} className="quantity-button">+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(product.id)} className="remove-button">
                  <MdDeleteForever />
                </button>
              </CardContent>
            ))}
            <div className="total-amount">Total: ${calculateTotal()}</div>
          </div>
        </div>
        <div className="sidebar-footer">
          {cart.length ? (
            <Link href={'/cart'}>
              <Button>Cotizar</Button>
            </Link>
          ) : (
            <h3 className="empty-cart">No hay items seleccionados.</h3>
          )}
        </div>
      </div>
      {sidebarOpen && (
        <div onClick={toggleSidebar} className="sidebar-overlay"></div>
      )}
    </>
  );
}

export default SideBar;
