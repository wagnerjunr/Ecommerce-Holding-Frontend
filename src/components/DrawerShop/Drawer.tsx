"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import useDrawerStore from "@/store/drawerStore";
import useCartStore from "@/store/cartStore";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@/lib/utils";

export default function CartDrawer() {
  const navigate = useNavigate();
  const { isCartDrawerOpen, closeCartDrawer } = useDrawerStore();
  const { items, total, removeFromCart, updateQuantity, clearCart } =
    useCartStore();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleCheckout = () => {
    closeCartDrawer();
    navigate("/checkout");
  };

  return (
    <Drawer
      direction={isDesktop ? "right" : "bottom"}
      open={isCartDrawerOpen}
      onOpenChange={closeCartDrawer}
    >
      <DrawerContent className="md:inset-x-auto md:right-0 md:mt-0 md:h-screen md:w-[500px]">
        <DrawerHeader className="flex justify-between px-6 pb-7">
          <DrawerTitle className="text-lg font-semibold">
            Items no carrinho ({items.length})
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 px-6 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  {item.image && (
                    <img
                      src="/ImagemTeste.webp"
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}

                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    {item.discountValue ? (
                      <p className="text-sm text-gray-500">
                        R$ {item.price * (1 - item.discountValue)}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">R$ {item.price}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(0, item.quantity - 1)
                          )
                        }
                      >
                        -
                      </Button>
                      <span className="px-3 py-1 bg-gray-100 rounded">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto"
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">
                    Total: R$ {total}
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full mb-2"
                >
                  Limpar carrinho
                </Button>
              </div>
            </div>
          )}
        </div>

        <DrawerFooter className="flex md:flex-row md:justify-end md:items-center gap-4 md:px-6">
          <Button
            className="rounded-[8px] px-4 py-2 h-fit"
            variant="secondary"
            onClick={closeCartDrawer}
          >
            Continuar comprando
          </Button>
          {items.length > 0 && (
            <Button
              className="rounded-[8px] px-4 py-2 h-fit bg-blue-600/80 hover:bg-blue-700"
              onClick={handleCheckout}
            >
              Finalizar compra
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
