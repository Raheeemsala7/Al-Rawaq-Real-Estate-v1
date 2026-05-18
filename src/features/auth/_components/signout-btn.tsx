"use client"
import { DropdownMenuItem } from '@/shared/components/ui/dropdown-menu'
import { LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'

const SignOutButton = () => {
    return (
        <DropdownMenuItem className='text-red-600' onClick={() => signOut({callbackUrl :"/auth/login"})}>
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
                    <span>Logout</span>
        </DropdownMenuItem>
    )
}

export default SignOutButton