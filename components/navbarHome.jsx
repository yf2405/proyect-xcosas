import Link from 'next/link';
import React from 'react';

const NavbarHome = () => {
  return (
    <nav className="p-6 bg-gray-900 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">
            Inicio
          </Link>
        </li>
        <li>
          <Link href="/cart">
            Carrito
          </Link>
        </li>
      </ul>
    </nav>
    
  );
};

export default NavbarHome;
