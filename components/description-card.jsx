'use client'
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { CardHeader, Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import clsx from 'clsx';
import { Button } from './ui/button';

function DescriptionCard({ product }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!product) {
    console.log('No product');
    return <div>No se encontró el producto</div>;
  }


  return (
    <Card key={product?.id} className='overflow-hidden  opacity-90 rounded-xl w-full'>
      <div className={`flex ${isClient && window.innerWidth > 768 ? 'flex-row' : 'flex-col'}`}>
        <div>
            <img 
          src={product?.image} 
          alt={product?.name} 
          className={`object-cover rounded-xl ${isClient && window.innerWidth > 768 ? 'w-1/3 h-auto' : 'w-full h-full'}`} 
        />

        </div>
      
        <div className='flex flex-col justify-between p-2 w-full'>
          <CardHeader className='flex justify-between items-center '>
            <CardTitle className='text-2xl font-bold'>
              {product?.name}
            </CardTitle>
            <Badge
              className={clsx({
                "text-red-500": product?.available === "nodisponible",
                "text-green-500": product?.available === "disponible",
                "bg-transparent": true
              })}
            >
              {product?.available}
            </Badge>
          </CardHeader>

          <CardContent className='flex flex-col '>
            <p className="text-gray-300">Descripción: {product.description}</p>
          </CardContent>

          <CardFooter className="flex justify-between text-center">
            <div className="flex flex-col space-y-2">
              <p className="text-xl font-semibold">${product.price}</p>
              {product.discount && (
                <p style={{ textDecoration: 'line-through', color: '#6b7280' }}>${product.discount}</p>
              )}
            </div>
            <div className="flex flex-col items-end  space-y-2">
              <p className="text-gray-300  flex justify-center">Vendidos: {product.sold}</p>
              <Button className="cursor-pointer uppercase border-2 font-semibold py-2 px-4 rounded-full">Agregar al carrito</Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

export default DescriptionCard;