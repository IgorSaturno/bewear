import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { cartItemTable, cartTable } from "@/db/schema";

import { clearGuestCart, readGuestCart } from "./guest-cart";

export const mergeGuestCartIntoUser = async (userId: string): Promise<void> => {
  const guestItems = await readGuestCart();
  if (guestItems.length === 0) return;

  const existingCart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, userId),
  });

  let cartId = existingCart?.id;
  if (!cartId) {
    const [newCart] = await db
      .insert(cartTable)
      .values({ userId })
      .returning();
    cartId = newCart.id;
  }

  for (const guestItem of guestItems) {
    const existingItem = await db.query.cartItemTable.findFirst({
      where: and(
        eq(cartItemTable.cartId, cartId),
        eq(cartItemTable.productVariantId, guestItem.productVariantId),
      ),
    });

    if (existingItem) {
      await db
        .update(cartItemTable)
        .set({ quantity: existingItem.quantity + guestItem.quantity })
        .where(eq(cartItemTable.id, existingItem.id));
    } else {
      await db.insert(cartItemTable).values({
        cartId,
        productVariantId: guestItem.productVariantId,
        quantity: guestItem.quantity,
      });
    }
  }

  await clearGuestCart();
};
