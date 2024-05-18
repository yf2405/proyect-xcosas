import ProductCard from '@/components/product-card';
import prisma from '@/lib/prisma'

import React from 'react'

async function SettingProduct() {
  const products = await prisma.product.findMany();
  console.log(products);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-5">
      {products.map(product => (
       <ProductCard product={product} key={product.id}/>
      ))}
    </div>
  );
}

export default SettingProduct;

