"use server";

import prisma from "@/lib/prisma";
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