import React from 'react'
import { ModeToggle } from './theme-toggle-button'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

function Navbar() {
  return (
    <div className='flex justify-between py-5'>
       <h1 className='text-3x1 font-bold text-gray-800 dark:text-gray-100'> Nextaction</h1>
       <div className='flex gap-x-2 item-center'>
        <Link href="/new"  className={buttonVariants({variant: "secondary"})}>
            crea un producto
        </Link>
        <ModeToggle/>
       </div>
        
       </div>
  )
}

export default Navbar