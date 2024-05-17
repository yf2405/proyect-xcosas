import { Button } from '@/components/ui/button'
import React from 'react'

function RegisterPage() {
  return (
    <div>
        <form action="">
            <input type="text" />
            <input type="email" />
            <input type="password" />
            <input type="confirmPassword" />

            <Button>
                Register
            </Button>
        </form>
    </div>
  )
}

export default RegisterPage