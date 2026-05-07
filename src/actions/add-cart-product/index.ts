"use server";

import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable, cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { readGuestCart, writeGuestCart } from "@/lib/guest-cart";

import { AddProductToCartSchema, addProductToCartSchema } from "./schema";

export const addProductToCart = async (data: AddProductToCartSchema) => {
  addProductToCartSchema.parse(data);

  const productVariant = await db.query.productVariantTable.findFirst({
    where: (productVariant, { eq }) =>
      eq(productVariant.id, data.productVariantId),
  });
  if (!productVariant) {
    throw new Error("Product variant not found");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    const guestItems = await readGuestCart();
    const existing = guestItems.find(
      (item) => item.productVariantId === data.productVariantId,
    );
    if (existing) {
      existing.quantity += data.quantity;
    } else {
      guestItems.push({
        productVariantId: data.productVariantId,
        quantity: data.quantity,
      });
    }
    await writeGuestCart(guestItems);
    return;
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  });
  let cartId = cart?.id;
  if (!cartId) {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning();
    cartId = newCart.id;
  }
  const cartItem = await db.query.cartItemTable.findFirst({
    where: and(
      eq(cartItemTable.cartId, cartId),
      eq(cartItemTable.productVariantId, data.productVariantId),
    ),
  });
  if (cartItem) {
    await db
      .update(cartItemTable)
      .set({
        quantity: cartItem.quantity + data.quantity,
      })
      .where(eq(cartItemTable.id, cartItem.id));
    return;
  }
  await db.insert(cartItemTable).values({
    cartId,
    productVariantId: data.productVariantId,
    quantity: data.quantity,
  });
};
