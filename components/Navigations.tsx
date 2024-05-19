"use client"
import React, { useContext } from 'react';
import { NavLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CartContext } from '../src/context/context';

const Navigation = () => {
  const path = usePathname();
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  const { cart } = cartContext;

  return (
    <div className="mt-16">
      <div className="fixed z-[50] bottom-0 w-[100%] md:w-[20%] max-h-[50px] flex justify-between rounded-t-3xl items-center border bg-gray-800 bg-opacity-30 px-4 py-7">
        {NavLinks.map((nav) => (
          <Link key={nav.name} href={nav.link} className="pl-2 min-w-[20%]">
            <nav.icon
              className={`w-[24px] h-[24px] ${path === nav.name ? 'text-sky-800' : 'text-white'}`}
            />
            {nav.name === '/cart' && cart.length > 0 && (
              <span className="text-white bg-red-500 rounded-full px-2 text-xs">
                {cart.length}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation;