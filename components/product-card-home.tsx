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
  const formatNumber = (value: number, decimals = 3): string => {
    return value.toFixed(decimals);
  };


  return (
    <Card key={product.id} className=" flex md:flex-col rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-none w-full bg-opacity-5 bg-slate-400">
    <Link href={`/description/${product.id}/card`}>
      {product.image && (
        <img src={product.image} alt={product.name} className="w-full md:h-48 h-full bg-cover rounded-xl cursor-pointer" />
      )}
    </Link>
    <div className="rounded-xl">
      <CardHeader className="flex flex-row justify-between items-center ">
        <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p className="text-base font-semibold">${formatNumber(product.price)}</p>
          {product.discount && (
            <p className='text-base' style={{ textDecoration: 'line-through', color: '#6b7280' }}>${formatNumber(product.discount)}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          onClick={handleAddToCart}
         
          disabled={inCart}
        >
          {inCart ? 'Agregado' : 'Agregar al carrito'}
        </Button>
      </CardFooter>
      
    </div>
  </Card>
  )  
}
export default ProductCardHome;