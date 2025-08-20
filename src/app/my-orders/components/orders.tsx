"use client";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCentsToBRL } from "@/helpers/money";

interface OrdersProps {
  orders: Array<{
    id: string;
    totalPriceInCents: number;
    status: string;
    createdAt: Date;
    items: Array<{
      id: string;
      productName: string;
      productVariantName: string;
      priceInCents: number;
      quantity: number;
      imageUrl: string;
    }>;
  }>;
}

const Orders = ({ orders }: OrdersProps) => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="border-0 shadow-sm">
          <CardContent className="p-0">
            <Accordion type="single" collapsible key={order.id}>
              <AccordionItem value="item-1" className="border-0">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold">
                          Pedido feito em{" "}
                          {new Date(order.createdAt).toLocaleDateString(
                            "pt-BR",
                          )}
                        </p>
                      </div>

                      <div className="hidden sm:flex sm:items-center sm:gap-6">
                        {order.status === "paid" && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Pago
                          </Badge>
                        )}
                        {order.status === "pending" && (
                          <Badge variant="outline">Pagamento pendente</Badge>
                        )}
                        {order.status === "canceled" && (
                          <Badge variant="destructive">Cancelado</Badge>
                        )}

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">
                            Pagamento:
                          </span>
                          <span className="text-sm">Cartão</span>
                        </div>
                      </div>
                    </div>

                    <span className="hidden text-sm font-medium text-purple-600 sm:block">
                      Detalhes do Pedido
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-6">
                  <Separator className="mb-6" />

                  <div className="space-y-4">
                    {order.items.map((product) => (
                      <div
                        className="flex items-start justify-between"
                        key={product.id}
                      >
                        <div className="flex items-start gap-4">
                          <Image
                            src={product.imageUrl}
                            alt={product.productName}
                            width={78}
                            height={78}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold">
                              {product.productName}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {product.productVariantName}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {product.productVariantName} | {product.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-start">
                          <p className="text-sm font-semibold">
                            {formatCentsToBRL(
                              product.priceInCents * product.quantity,
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <p className="text-sm">Subtotal</p>
                      <p className="text-sm font-medium">
                        {formatCentsToBRL(order.totalPriceInCents)}
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
                        {formatCentsToBRL(order.totalPriceInCents)}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
