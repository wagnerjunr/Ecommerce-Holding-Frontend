import { Button } from "../../ui/button"
import { ShoppingCart } from "lucide-react"
import logo from "./logo.png"
import useCartStore from "@/store/cartStore"
import useDrawerStore from "@/store/drawerStore"
import useUserStore from "@/store/userStore"
import { UserButton } from "@/components/User/UserButton"
import { ProductSearchPopover } from "@/components/Search/ProductSearchPopover"

export const Navbar = () => {
  const { user, isAuthenticated } = useUserStore()
  const { itemCount } = useCartStore()
  const { openCartDrawer } = useDrawerStore()

  return (
    <nav className="min-h-[80px] max-h-[80px] min-w-full border-b flex items-center justify-center fixed top-0 bg-background backdrop-blur-xl z-30">
      <div className="flex w-full max-w-[1324px] items-center justify-between md:px-0 px-4">
        <div className="flex items-center gap-10">
          <div className="flex gap-4 items-center">
            <a href="/" className="cursor-pointer flex items-center">
              <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
              <h1 className="font-semibold text-3xl">SHOPPER</h1>
            </a>
          </div>
          
          <ProductSearchPopover 
            placeholder="Procurar por Produto"
            className="h-9 w-[550px] hidden md:block"
          />
        </div>
        
        <div className="flex items-center gap-8">
          <div className="md:hidden">
            <ProductSearchPopover 
              placeholder="Pesquisar..."
              className="h-9 w-[200px]"
            />
          </div>
          
          <div className="relative">
            <Button
              className="h-fit rounded-2xl p-3 cursor-pointer"
              variant="ghost"
              onClick={openCartDrawer}
            >
              <ShoppingCart size={24} className="text-black" />
            </Button>

            <span className="absolute -top-0 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-semibold">
              {itemCount}
            </span>
          </div>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-6">
              <UserButton />
            </div>
          ) : (
            <>
              <a href="/login">Entrar</a>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
