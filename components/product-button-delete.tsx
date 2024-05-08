import React from 'react'
import { Button } from './ui/button'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

function ProductButtonDelete({productId}:{productId: number}) {

    async function removeProduct(formData: FormData) {
        "use server"
        const productId = formData.get('productId')?.toString()
        
       if( !productId ) {
        return
       }
        await prisma.product.delete({
            where:{
                id: parseInt(productId)
            }
        })
        revalidatePath('/')

    }
    return (
        <form action={removeProduct}>
            <input type="hidden" name='productId' value={productId} />
            <Button variant="destructive">
                Eliminar
            </Button>
        </form>

    )
}

export default ProductButtonDelete