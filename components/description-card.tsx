"use client"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CartContext } from '../src/context/context';
import { Product } from '@/constants/index';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import '../src/styles/descriptionsCart.css'
import { useContext } from 'react';

interface CardProps {
  product: Product;
  inCart: boolean;
}
const DescriptionCard: React.FC<CardProps> = ({ product }) => {
  const { cart } = useContext(CartContext) || { cart: [] };
  const inCart = cart.some((cartItem) => cartItem.id === product.id)
  const cartContext = useContext(CartContext);

  const handleAddToCart = () => {
    if (cartContext) {
      cartContext.addToCart(product);
    }
  };

  return (
    <Card key={product?.id} className="product-card">
      <div className="product-card-container">
        <div className="product-image-wrapper">
          <img
            src={product?.image}
            alt={product?.name}
            className="product-image"
          />
        </div>
        <div className="product-details">
          <CardHeader className="product-header">
            <CardTitle className="product-title">
              {product?.name}
            </CardTitle>
            <Badge
              className={`product-badge ${product?.available === "nodisponible" ? 'badge-unavailable' : 'badge-available'}`}
            >
              {product?.available}
            </Badge>
          </CardHeader>
          <CardContent className="product-description">
            <p>
              Descripción
              <br />
              {product.description}
            </p>
          </CardContent>
          <CardFooter className="product-footer">
            <div className="product-pricing">
              <p className="product-price">${product.price}</p>
              {product.discount && (
                <p className="product-discount">${product.discount}</p>
              )}
            </div>
            <div className="product-sold">
              <p>Vendidos: {product.sold}</p>
              <Button
          onClick={handleAddToCart}
         
          disabled={inCart}
        >
          {inCart ? 'Agregado' : 'Agregar al carrito'}
        </Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

export default DescriptionCard;