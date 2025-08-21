import { headers } from "next/headers";
import { redirect } from "next/navigation";

import MainLayout from "@/components/layouts/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import { formatAddress } from "../helpers/address";
import FinishOrderButton from "./components/finish-order-button";

const ConfirmationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    redirect("/");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }

  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );

  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">
                  Confirmação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-sm font-semibold">Contato</h3>
                    <p className="text-muted-foreground text-sm">
                      {session.user.email}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold">Endereço</h3>
                    <p className="text-muted-foreground text-sm">
                      {formatAddress(cart.shippingAddress)}
                    </p>
                  </div>
                </div>
                <FinishOrderButton />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <CartSummary
              subtotalInCents={cartTotalInCents}
              totalInCents={cartTotalInCents}
              products={cart.items.map((item) => ({
                id: item.id,
                name: item.productVariant.product.name,
                variantName: item.productVariant.name,
                quantity: item.quantity,
                priceInCents: item.productVariant.priceInCents,
                imageUrl: item.productVariant.imageUrl,
              }))}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConfirmationPage;
