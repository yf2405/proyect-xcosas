"use server"
import prisma from './prisma';

export const getProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};