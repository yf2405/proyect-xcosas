import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { CardHeader, Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Product } from '@prisma/client';
import clsx from 'clsx';
import ProductButtonDelete from './product-button-delete';
import Link from 'next/link';

function ProductCard({ product }: { product: Product }) {
  return (

    
    <Card key={product.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out rounded-lg">
      
      {/* Imagen del producto */}
      {product.image && (
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}

      {/* Encabezado de la tarjeta */}
      <CardHeader className="flex flex-row justify-between p-4">
        <CardTitle className="text-lg font-semibold">
          {product.name}
        </CardTitle>
        <Badge 
          className={clsx('text-xs py-1 px-2 rounded-md', {
            "bg-red-500 text-white": product.available === "nodisponible",
            "bg-green-500 text-white": product.available === "disponible"
          })}
        >
          {product.available === "disponible" ? "Disponible" : "No disponible"}
        </Badge>
      </CardHeader>

      {/* Contenido de la tarjeta */}
      <CardContent className="p-4 text-sm space-y-2">
        <p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
        {product.discount && <p><strong>Descuento:</strong> {product.discount}%</p>}
        <p><strong>Vendidos:</strong> {product.sold}</p>
        <p><strong>Descripción:</strong> {product.description}</p>
        <span className="text-xs text-slate-500">
          {new Date(product.createdAt).toLocaleDateString()}
        </span>
      </CardContent>

      {/* Pie de tarjeta */}
      <CardFooter className="flex gap-x-2 justify-end p-4">
        <ProductButtonDelete productId={product.id} />
        <Link href={`/products/${product.id}/edit`} className={buttonVariants({ variant: "secondary" })}>
          Editar
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
