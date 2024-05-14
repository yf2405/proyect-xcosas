
import ProductCardHome from '@/components/product-card-home';
import prisma from '@/lib/prisma'

import React from 'react'

async function SettingProduct() {
  const products = await prisma.product.findMany();
  console.log(products);


  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 p-6  outline-none">
      {products.map(product => (
       <ProductCardHome product={product} key={product.id} />
      ))}
    </div>
  );
}

export default SettingProduct;
