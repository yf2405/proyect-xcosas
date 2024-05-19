import { RxHome, } from "react-icons/rx";
import { BsCart4, BsInfoCircle, BsWhatsapp } from "react-icons/bs";
export const NavLinks = [
    {
      name: "/home",
      icon: RxHome,
      link:  "/home",
    },
    {
      name: "/cart",
      icon: BsCart4,
      link: "/cart",
    },
    {
      name: "/info",
      icon: BsInfoCircle,
      link: "/info",
    },
    {
      name: "/whats",
      icon: BsWhatsapp,
      link: "https://wa.link/m580z6",
    },
    
    
  ];
  export interface Product {
    id: number;
    name: string;
    image?: string;
    available: string;
    price: number;
    discount?: number;
    sold: number;
  }
  export interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
  }