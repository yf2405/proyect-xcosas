"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
    "use server"
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const discount = parseFloat(formData.get("discount") as string);
    const available = formData.get("available") as string;
    const sold = parseInt(formData.get("sold") as string); 
    const description = formData.get("description") as string;

    if (!name || isNaN(price) || isNaN(discount) || !available || isNaN(sold)) {
        return;
    }

       const newProduct = await prisma.product.create({
        data: {
          name: name,
          price: price, 
          sold:sold,
          discount: discount,
          available: available,
          description: description,
        }
       })
       console.log(newProduct)
        redirect('/')
    }

    export async function removeProduct(formData: FormData) {
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

  export async function updateProduct(formData: FormData){
    
    const id = formData.get('id')?.toString() 
    const name = formData.get("name")?.toString() 
    const price = parseFloat(formData.get("price")?.toString() || '0');
    const discount = parseFloat(formData.get("discount")?.toString() || '0');
    const available = formData.get("available")?.toString() || null;
    const sold = parseInt(formData.get("sold")?.toString() || '0');
    const description = formData.get("description")?.toString() || null;

    if (!id || !name || isNaN(price) || isNaN(discount) || !available || isNaN(sold) || !description) {
      return;
  }
  
    const editProduct =  await prisma.product.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: name,
          price: price, 
          sold:sold,
          discount: discount,
          available: available,
          description: description,
        }
       })
       console.log(editProduct)
       redirect('/') 
       
    }
