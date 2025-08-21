"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCentsToBRL } from "@/helpers/money";

interface CartSummaryProps {
  subtotalInCents: number;
  totalInCents: number;
  products: Array<{
    id: string;
    name: string;
    variantName: string;
    quantity: number;
    priceInCents: number;
    imageUrl: string;
  }>;
}

const CartSummary = ({
  subtotalInCents,
  totalInCents,
  products,
}: CartSummaryProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold">Seu pedido</CardTitle>
        <Button variant="ghost" size="sm" className="text-sm font-medium">
          Editar
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <p className="text-sm">Subtotal</p>
          <p className="text-sm font-medium">
            {formatCentsToBRL(subtotalInCents)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Transporte e Manuseio</p>
          <p className="text-sm font-medium">Grátis</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Taxa Estimada</p>
          <p className="text-sm font-medium">—</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-semibold">Total</p>
          <p className="text-sm font-semibold">
            {formatCentsToBRL(totalInCents)}
          </p>
        </div>
        <Separator className="my-4" />
        <div className="space-y-4">
          {products.map((product) => (
            <div className="flex items-start justify-between" key={product.id}>
              <div className="flex items-start gap-4">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={78}
                  height={78}
                  className="rounded-lg object-cover"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">{product.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {product.variantName} | {product.quantity}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-start">
                <p className="text-sm font-semibold">
                  {formatCentsToBRL(product.priceInCents * product.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
