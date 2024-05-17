"use client";
import { NavLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";


const Navigation = () => {
    const [ isRouting, setIsRouting] = useState(false)
    const path = usePathname()
    const [prevPath, setPrevPath] = useState("/") 

    useEffect(() => {

        if(prevPath !== path) {
            setIsRouting(true)
        }
    },[path, prevPath])

    useEffect(() =>{
        if(isRouting) {
            setPrevPath(path);
            const timeout = setTimeout(() =>{
                setIsRouting(false);
            },1200)
            return() => clearTimeout(timeout)
        }
    },[isRouting])
    return (
      <div className="mt-16">
         <div
          
          className="fixed z-[50] bottom-0 w-[100%] md:w-[20%] max-h-[50px]  flex justify-between   rounded-t-3xl items-center border  bg-gray-800  bg-opacity-30  px-4 py-7 "
        >
    
          {isRouting }
          {NavLinks.map((nav) => (
            <Link key={nav.name} href={nav.link} className=" pl-2 min-w-[20%]">
              <nav.icon
                className={`w-[24px] h-[24px] ${
                  path === nav.name ? "text-sky-800" : "text-white"
                }`}
              />
            </Link>
          ))}
        </div>
      </div>
       
      );
    };
    
    export default Navigation;