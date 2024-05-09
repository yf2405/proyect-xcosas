import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button'
import { CardHeader, Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Product } from '@prisma/client';


import clsx from 'clsx';
import ProductButtonDelete from './product-button-delete';
import Link from 'next/link';

function ProductCard({ product }: { product: Product }) {
  return (

    <Card key={product.id}> {/* Agregamos la prop 'key' para ayudar a React a identificar cada elemento */}
      {product.image}
      <CardHeader className='flex flex-row justify-between'>
        <CardTitle>
          {product.name}
        </CardTitle>
        <Badge className={clsx({
          "bg-red-500 text-white": product.available === "nodisponible",
          "bg-green-500 text-white": product.available === "disponible"
        })}>
          {product.available}
        </Badge>
      </CardHeader>
      <CardContent>
        <p>Precio: {product.price}</p>
        <p>Descuento: {product.discount}</p>
        <p>Vendiidos: {product.sold}</p>
        <p>Descripcion: {product.description}</p>
        <span className='text-slate-600'>{new Date(product.createdAt).toLocaleDateString()}</span>
      </CardContent>
      <CardFooter className='flex gap-x-2 justify-end'>
        <ProductButtonDelete productId={product.id} />
        <Link href={`/products/${product.id}/edit`} className={buttonVariants({variant:"secondary"})}>
          Editar
        </Link>
      </CardFooter>
    </Card>

  )
}

export default ProductCard;