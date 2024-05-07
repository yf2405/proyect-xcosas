import React from 'react'
import { ModeToggle } from './theme-toggle-button'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

function Navbar() {
  return (
    <div className='flex justify-between'>
       <h1> Nextaction</h1>
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