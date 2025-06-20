'use client'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { DoorOpen, User } from 'lucide-react'
import { Avatar, AvatarFallback} from '@/components/ui/avatar'
import { useLogoutUser } from '@/hooks/Auth/useLogoutUser'
import useUserStore from '@/store/userStore'

export const UserButton = () => {
  const { clearUser } = useUserStore();

  const { mutateAsync } = useLogoutUser()
  
  const handleOrdersUser = () => {
    window.location.href = '/orders';
  };
  
  const handleLogout = async () => {
    try {
      await mutateAsync()
      clearUser();
      window.location.href = '/login';
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none cursor-pointer">
        <Avatar>
          <AvatarFallback>W</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] mt-2">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem 
          className="hover:bg-surface-off cursor-pointer"
          onClick={handleOrdersUser}
        >
          <User height={18} />
          Historico de Compras
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="hover:bg-surface-off cursor-pointer"
          onClick={handleLogout}
        >
          <DoorOpen height={18} />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
