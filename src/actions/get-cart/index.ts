"use server";

import { inArray } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable, productVariantTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { readGuestCart } from "@/lib/guest-cart";

export const getCart = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return getGuestCart();
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
  if (!cart) {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning();
    return {
      ...newCart,
      items: [],
      totalPriceInCents: 0,
      shippingAddress: null,
    };
  }
  return {
    ...cart,
    totalPriceInCents: cart.items.reduce(
      (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
      0,
    ),
  };
};

const getGuestCart = async () => {
  const guestItems = await readGuestCart();

  if (guestItems.length === 0) {
    return {
      id: null,
      userId: null,
      shippingAddressId: null,
      shippingAddress: null,
      createdAt: null,
      items: [],
      totalPriceInCents: 0,
    };
  }

  const variants = await db.query.productVariantTable.findMany({
    where: inArray(
      productVariantTable.id,
      guestItems.map((item) => item.productVariantId),
    ),
    with: {
      product: true,
    },
  });

  const variantById = new Map(variants.map((variant) => [variant.id, variant]));

  const items = guestItems
    .map((guestItem) => {
      const variant = variantById.get(guestItem.productVariantId);
      if (!variant) return null;
      return {
        id: guestItem.productVariantId,
        cartId: null,
        productVariantId: guestItem.productVariantId,
        quantity: guestItem.quantity,
        createdAt: null,
        productVariant: variant,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const totalPriceInCents = items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );

  return {
    id: null,
    userId: null,
    shippingAddressId: null,
    shippingAddress: null,
    createdAt: null,
    items,
    totalPriceInCents,
  };
};
