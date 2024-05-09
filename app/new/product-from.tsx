import * as React from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createProduct, updateProduct } from "@/src/actions/products.actions"
import { Product } from "@prisma/client"
import Link from "next/link"

export  function CardProductForm({product}: {product?: Product}) { 
  
  const functionActon = product?.id ? updateProduct : createProduct
    
  
  
  return (
  <form action={functionActon}>
     <input type="hidden" name="id" value={product?.id} />
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{product?.id?  "Edita producto" : "Nuevo producto"}</CardTitle>
        <CardDescription>Llena todos los campos para crear nuevo producto</CardDescription>
      </CardHeader>
      <CardContent>
        
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input name="name" id="name" placeholder="Nombre de producto"
              defaultValue={product?.name} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Precio</Label>
              <Input name="price" id="price"  placeholder="Precio de producto"
              defaultValue={product?.price} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="discount">descuento</Label>
              <Input name="discount" id="discount"  placeholder="descuento de producto" 
              defaultValue={product?.discount || ""}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="sold">vendidos</Label>
              <Input name="sold" id="sold" placeholder="descuento de producto" 
              defaultValue={product?.sold}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Descripcion</Label>
              <Textarea name="description" id="description" placeholder="descripcion de tu producto"
              defaultValue={product?.description || ""}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="available">Disponibilidad</Label>
              <Select name="available" defaultValue={product?.available}>
                <SelectTrigger id="available">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="disponible">Disponible</SelectItem>
                  <SelectItem value="Nodisponible">No disponible</SelectItem>
               
                </SelectContent>
              </Select>
            </div>
          </div>
        
      </CardContent>
      <CardFooter className="flex justify-between">
      <Link href="/" className={buttonVariants({ variant: "secondary" })}>
            Cancelar
      </Link>
        <Button type="submit">{product?.id?  "Edita producto" : "Crea producto"}</Button>
      </CardFooter>
    </Card>
    </form>
  )
}
