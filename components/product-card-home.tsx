"use client"
import { Badge } from '@/components/ui/badge';
import { CardHeader, Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import Link from 'next/link';
import { Product } from '@/constants/index';
import React, { useContext } from 'react';
import { CartContext } from '../src/context/context';

interface ProductCardHomeProps {
  product: Product;
  inCart: boolean;
}

const ProductCardHome: React.FC<ProductCardHomeProps> = ({ product, inCart }) => {
  const cartContext = useContext(CartContext);

  const handleAddToCart = () => {
    if (cartContext) {
      cartContext.addToCart(product);
    }
  };

  return (
    <Card key={product.id} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-none w-full bg-opacity-5 bg-slate-400 ">
      {product.image && <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl" />}
      <div className="rounded-xl  ">
        <CardHeader className="flex flex-row justify-between items-center mb-2">
          <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
          <Badge
            className={clsx({
              'text-red-500': product.available === 'nodisponible',
              'text-green-500': product.available === 'disponible',
              'bg-transparent': true,
            })}
          >
            {product.available}
          </Badge>
        </CardHeader>
        <CardContent className="mb-4">
          <div className="flex flex-col space-y-2">
            <p className="text-xl font-semibold">${product.price}</p>
            {product.discount && (
              <p style={{ textDecoration: 'line-through', color: '#6b7280' }}>${product.discount}</p>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">Vendidos: {product.sold}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Link href={`/description/${product.id}/card`}>Detalles</Link>
          <Button
            onClick={handleAddToCart}
            className="cursor-pointer uppercase border-2 font-semibold py-2 px-4 rounded-full"
            disabled={inCart}
          >
            {inCart ? 'Agregado' : 'Agregar al carrito'}
          </Button>
        </CardFooter>
        {inCart && <span className="mt-2 text-green-500">&#10003; Artículo en el carrito</span>}
      </div>
    </Card>
  );
};

export default ProductCardHome;