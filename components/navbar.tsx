import React from 'react'
import { ModeToggle } from './theme-toggle-button'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { getServerSession } from "next-auth/next";
import { authOptions } from "../src/app/api/auth/[...nextauth]/authOptions";
import { RxInstagramLogo, } from "react-icons/rx";
import  SideBar from '../SideBar'

async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className='flex justify-between py-5'>
       <h1 className='text-3x1 font-bold text-gray-800 dark:text-gray-100 pr-3' > Xcosas</h1>
       <div className='flex gap-x-2 item-center'>
        {session?.user ?(
          <>
             <Link href="/new"  className={buttonVariants({variant: "secondary"})}>
            crea un producto
        </Link>
        <Link href="/api/auth/signout"  className={buttonVariants({variant: "secondary"})}>Logout</Link>
          </>
        ):(<>
         <Link href="https://www.instagram.com/xcosasthing/"  className={buttonVariants({variant: "secondary"})}>
            < RxInstagramLogo />
        </Link>
        <Link href="https://www.facebook.com/profile.php?id=61558633610704"  className={buttonVariants({variant: "secondary"})}>
            Facebook
        </Link>
        
        </>)}
         <SideBar/>
        <ModeToggle/>
       </div>
        
       </div>
  )
}

export default Navbar