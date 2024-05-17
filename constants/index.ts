import { RxHome, RxPerson, RxDashboard, RxClipboard } from "react-icons/rx";
export const NavLinks = [
    {
      name: "/home",
      icon: RxHome,
      link:  "/home",
    },
    {
      name: "/cart",
      icon: RxPerson,
      link: "/cart",
    },
    {
      name: "/info",
      icon: RxDashboard,
      link: "/info",
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