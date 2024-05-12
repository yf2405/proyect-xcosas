"use server"
import { storage, uploadFile } from "@/firebase/firebase";
import { ref, deleteObject } from "firebase/storage";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData, imageUrl: string | null) {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const discount = parseFloat(formData.get("discount") as string);
  const available = formData.get("available") as string;
  const sold = parseInt(formData.get("sold") as string);
  const description = formData.get("description") as string;

  if (!name || isNaN(price) || isNaN(discount) || !available || isNaN(sold)) {
    throw new Error("Los datos del producto son inválidos.");
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        name: name,
        price: price,
        sold: sold,
        discount: discount,
        available: available,
        description: description,
        image: imageUrl,
      },
    });
    console.log("Nuevo producto creado:", newProduct);
    redirect('/');
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
}

export async function removeProduct(formData: FormData) {
  const productId = formData.get('productId')?.toString();

  if (!productId) {
    return;
  }

  try {
    // Obtener el producto a eliminar
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
    });

    if (product && product.image) {
      // Eliminar la imagen asociada al producto en Firebase Storage
      await deleteImageFromFirebase(product.image);
    }

    // Eliminar el producto de la base de datos
    await prisma.product.delete({
      where: {
        id: parseInt(productId),
      },
    });

    // Revalidar la ruta
    revalidatePath('/');
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
  }
}

async function deleteImageFromFirebase(imageUrl: string) {
  try {
    // Obtener una referencia al archivo en Firebase Storage
    const imageRef = ref(storage, imageUrl);

    // Eliminar el archivo de Firebase Storage
    await deleteObject(imageRef);
    console.log("Imagen eliminada correctamente");
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
  }
}

export async function updateProduct(formData: FormData, currentImageUrl: string | null) {
  const id = formData.get('id')?.toString();
  const name = formData.get("name")?.toString();
  const price = parseFloat(formData.get("price")?.toString() || '0');
  const discount = parseFloat(formData.get("discount")?.toString() || '0');
  const available = formData.get("available")?.toString() || null;
  const sold = parseInt(formData.get("sold")?.toString() || '0');
  const description = formData.get("description")?.toString() || null;
  const newImageUrl = await handleImageUpload(formData, currentImageUrl);

  if (!id || !name || isNaN(price) || isNaN(discount) || !available || isNaN(sold) || !description) {
    return;
  }

  const editedProduct = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: name,
      price: price,
      sold: sold,
      discount: discount,
      available: available,
      description: description,
      image: newImageUrl,
    }
  });
  console.log(editedProduct);
  redirect('/');
}

async function handleImageUpload(formData: FormData, currentImageUrl: string | null): Promise<string | null> {
  const imageFile = formData.get("image");
  if (imageFile instanceof File) {
    // Upload the image file and return the URL
    const imageUrl = await uploadImage(imageFile);
    return imageUrl;
  }
  return currentImageUrl;
}

async function uploadImage(file: File): Promise<string> {
  // Implement your image upload logic here
  // This is an example using a hypothetical "uploadFile" function
  const imageUrl = await uploadFile(file);
  console.log('hlo'+imageUrl);
  return imageUrl;
}