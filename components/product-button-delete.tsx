import React from 'react'
import { Button } from './ui/button'
import { removeProduct } from '@/src/actions/products.actions'

function ProductButtonDelete({productId}:{productId: number}) {

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