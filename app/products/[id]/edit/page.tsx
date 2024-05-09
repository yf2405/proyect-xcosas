import { CardProductForm } from '@/app/new/product-from'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

 async function ProductPageEdit({params}:{
    params : {
        id:string,
    }
 }) {
 
    const product = await prisma.product.findFirst({
        where:{
            id: parseInt(params.id,)
        }
    })
    console.log(product)
    if(!product) {
        redirect('/')
    }
  return (
    <div className='flex justify-center item-center'>
        <CardProductForm product={product}/>
    </div>
  )
}

export default ProductPageEdit