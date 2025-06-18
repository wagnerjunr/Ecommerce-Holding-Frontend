import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { MessageCircleMore } from 'lucide-react'

export const Navbar = () => {
   const user = false

  return (
    <nav className="min-h-[80px] max-h-[80px] min-w-full border-b flex items-center justify-center fixed top-0 bg-background backdrop-blur-xl z-30">
      {/* <SyncAuthStore user={user || null} /> */}
      <div className="flex w-full max-w-[1324px] items-center justify-between md:px-0 px-4">
        <div className="flex gap-4">
          <Input
            id="partySearch"
            placeholder="Procurar por Produto"
            className="h-9 w-[450px] hidden md:block rounded-[41px]"
          />
        </div>
         {user ? (
          <div className="flex items-center gap-6">
            <a href="/direct">
              <Button className='h-fit rounded-2xl'>
              <MessageCircleMore />
                Mensagens
                </Button>
            </a>
            {/* <UserButton user={user} /> */}
          </div>
        ) : (
          <>
            <a href="/login">Entrar</a>
          </>
        )} 
      </div>
    </nav>
  )
}
