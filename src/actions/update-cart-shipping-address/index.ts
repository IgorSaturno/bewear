"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  UpdateCartShippingAddressSchema,
  updateCartShippingAddressSchema,
} from "./schema";

export const updateCartShippingAddress = async (
  data: UpdateCartShippingAddressSchema,
) => {
  updateCartShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    const [updatedCart] = await db
      .update(cartTable)
      .set({
        shippingAddressId: data.shippingAddressId,
      })
      .where(eq(cartTable.userId, session.user.id))
      .returning();

    return updatedCart;
  } catch (error) {
    console.error("Error updating cart shipping address", error);
    throw new Error("Failed to update cart shipping address");
  }
};
