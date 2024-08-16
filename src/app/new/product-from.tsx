"use client"
import React, { useState } from 'react';
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createProduct, updateProduct } from "@/src/actions/products.actions";
import { Product } from "@prisma/client";
import Link from "next/link";
import ImageUpload from "./upliadImage";

function formatNumber(value: string): string {
  const cleanedValue = value.replace(/[^0-9.]/g, '');
  return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function CardProductForm({ product }: { product?: Product }) {
  const [imageUrl, setImageUrl] = useState<string | null>(
    product?.image || null
  );

  const handleImageUploaded = (url: string) => {
    setImageUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      if (product?.id) {
        await updateProduct(formData, imageUrl);
        setImageUrl(formData.get("image")?.toString() || imageUrl);
      } else {
        await createProduct(formData, imageUrl);
      }
    } catch (error) {
      console.error("Error al crear/actualizar el producto:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (['price', 'discount', 'sold'].includes(name)) {
      event.target.value = formatNumber(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="hidden"
        name="id"
        value={product?.id}
      />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            {product?.id ? "Editar producto" : "Nuevo producto"}
          </CardTitle>
          <CardDescription>
            Llena todos los campos para crear nuevo producto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                id="name"
                placeholder="Nombre de producto"
                defaultValue={product?.name}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Precio</Label>
              <Input
                name="price"
                id="price"
                placeholder="Precio de producto"
                defaultValue={product?.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="discount">Descuento</Label>
              <Input
                name="discount"
                id="discount"
                placeholder="Descuento de producto"
                defaultValue={product?.discount || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="sold">Vendidos</Label>
              <Input
                name="sold"
                id="sold"
                placeholder="Vendidos de producto"
                defaultValue={product?.sold}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Descripcion</Label>
              <Textarea
                name="description"
                id="description"
                placeholder="Descripcion de tu producto"
                defaultValue={product?.description || ""}
              />
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
          <ImageUpload onImageUploaded={handleImageUploaded} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/" className={buttonVariants({ variant: "secondary" })}>
            Cancelar
          </Link>
          <Button type="submit">
            {product?.id ? "Edita producto" : "Crea producto"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}