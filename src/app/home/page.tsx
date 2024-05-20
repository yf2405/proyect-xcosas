'use client';
import React, { useContext, useEffect, useState } from 'react';
import ProductCardHome from '@/components/product-card-home';
import { getProducts } from '@/lib/getproducts';
import { Product } from '@/constants/index';
import { CartContext } from '../../context/context';

const SettingProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { cart } = useContext(CartContext) || { cart: [] };

 
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();

      // Transformar los datos para que coincidan con el tipo Product
      const transformedProducts: Product[] = products.map((product: any) => ({
        ...product,
        image: product.image ?? null, // Asegurarse de que image sea `string | null`
      }));

      setProducts(transformedProducts);
    };

    fetchProducts();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 outline-none">
        {products.map((product) => (
          <ProductCardHome
            product={product}
            key={product.id}
            inCart={cart.some((cartItem) => cartItem.id === product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SettingProduct;


