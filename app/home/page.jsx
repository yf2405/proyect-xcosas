import { Button } from '@/components/ui/button'
import { CardHeader, Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import React from 'react'

async function SettingProduct() {
  const products = await prisma.product.findMany();
  console.log(products);
  return (
    <div className="grid grid-cols-3 gap-3 p-5">
      {products.map(product => (
        <Card key={product.id}> {/* Agregamos la prop 'key' para ayudar a React a identificar cada elemento */}
          <CardHeader>
          {product.image}
            <CardTitle>
              {product.name}
            </CardTitle>
            </CardHeader>
          <CardContent>
            <p>Precio: {product.price}</p>
            <p>Descuento: {product.discount}</p>
            <p>Vendiidos: {product.sold}</p>
            <p>Descripcion: {product.description}</p>
            <span className='text-slate-600'>{new Date(product.createdAt).toLocaleDateString()}</span>
          </CardContent>
          <CardFooter className='flex gap-x-2 justify-end'>
            <Button variant="destructive">Eliminar</Button>
            <Button>Editar</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default SettingProduct;
