import * as React from "react"

import { Button } from "@/components/ui/button"
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
import { createProduct } from "@/src/actions/products.actions"

export  function CardProductForm() { 
  
  
  return (
  <form action={createProduct}>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Nuevo producto</CardTitle>
        <CardDescription>Llena todos los campos para crear nuevo producto</CardDescription>
      </CardHeader>
      <CardContent>
        
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input name="name" id="name" placeholder="Nombre de producto" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Precio</Label>
              <Input name="price" id="price"  placeholder="Precio de producto" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="discount">descuento</Label>
              <Input name="discount" id="discount"  placeholder="descuento de producto" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="sold">vendidos</Label>
              <Input name="sold" id="sold" placeholder="descuento de producto" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Descripcion</Label>
              <Textarea name="description" id="description" placeholder="descripcion de tu producto"/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="available">Disponibilidad</Label>
              <Select name="available">
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
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Crear producto</Button>
      </CardFooter>
    </Card>
    </form>
  )
}
