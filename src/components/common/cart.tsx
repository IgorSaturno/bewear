import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

const Cart = () => {
  const { data: cart } = useCart();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShoppingBagIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="rounded-l-3xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBagIcon size={20} className="text-gray-500" />
            Sacola
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <div className="flex h-full flex-col px-5 pb-5">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex h-full flex-col gap-8">
                {/* {cartIsLoading && <div>Carregando...</div>} */}
                {cart?.items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    productName={item.productVariant.product.name}
                    productVariantId={item.productVariant.id}
                    productVariantName={item.productVariant.name}
                    productVariantImageUrl={item.productVariant.imageUrl}
                    productVariantPriceInCents={
                      item.productVariant.priceInCents
                    }
                    quantity={item.quantity}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
          {cart?.items && cart.items.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs">
                <p className="text-sm font-medium">Subtotal</p>
                <p className="text-sm font-medium text-gray-500">
                  {formatCentsToBRL(cart?.totalPriceInCents ?? 0)}
                </p>
              </div>

              <Separator />

              <Button className="rounded-full" asChild size="lg">
                <Link href="/cart/identification">Finalizar a Compra</Link>
              </Button>
              <SheetClose asChild>
                <p className="text-center underline">Continuar comprando</p>
              </SheetClose>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
