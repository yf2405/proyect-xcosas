import { Badge } from '@/components/ui/badge';
import { CardHeader, Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import {  buttonVariants } from '@/components/ui/button'
import { Product } from '@prisma/client';

import clsx from 'clsx';
import Link from 'next/link';

function ProductCardHome({ product }: { product: Product }) {
    return (
        <Card key={product?.id} className='rounded-xl overflow-hidden bg-cover bg-center border-none w-100 '>
  <div className='inset-0 bg-gradient-to-t from-sky-950 opacity-90'>
    {product?.image && <img src={product?.image} alt={product?.name} className="w-full h-48 object-cover" />}
    <CardHeader className='flex flex-row justify-between'>
      <CardTitle className=''>
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
 
    <CardFooter className="flex justify-between text-center">
      <div className="flex flex-col space-y-2 mr-8">
        <p className="text-xl">${product.price}</p>
        <p style={{ textDecoration: 'line-through', color: '#6b7280' }}>${product?.discount}</p>
      </div>
      <div className="flex flex-col items-end space-y-2 ml-8">
        <p>Vendidos: {product.sold}</p>
        <Link href={`/description/${product.id}/card`} className={buttonVariants({variant:"ghost"})}>
         Detalles
        </Link>
      </div>
    </CardFooter>
  </div>
</Card>


    )
}

export default ProductCardHome