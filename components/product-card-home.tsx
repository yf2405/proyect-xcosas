import { Badge } from '@/components/ui/badge';
import { CardHeader, Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Product } from '@prisma/client';

import clsx from 'clsx';

function ProductCardHome({ product }: { product: Product }) {
    return (
        <Card key={product.id} className='rounded-lg relative overflow-hidden w-full bg-cover bg-center hover:opacity-40 border-none '>
            <div className=' inset-0 bg-gradient-to-t  from-sky-950 opacity-90'>
                {product.image && <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />}
                <CardHeader className='flex flex-row justify-between '>
                    <CardTitle className='' >
                        {product.name}
                    </CardTitle>
                    <Badge
                        className={clsx({
                            "text-red-500": product.available === "nodisponible",
                            "text-green-500": product.available === "disponible",
                            "bg-transparent": true
                        })}
                    >
                        {product.available}
                    </Badge>
                </CardHeader>
                <CardContent className='flex flex-row justify-between'>
                    <p className=' text-xl'>${product.price}</p>
                    <p>${product.discount}</p>
                </CardContent>
            </div>
        </Card>

    )
}

export default ProductCardHome