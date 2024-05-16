
import DescriptionCard from '../../../../components/description-card';
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

async function ProductDescription({ params }) {
    const { id } = params;
  
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    

    return (
        <div className="flex items-center justify-center p-6 outline-none">
            <DescriptionCard product={product} />
           
        </div>
    );
}

export default ProductDescription;