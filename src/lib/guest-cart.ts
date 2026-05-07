import { cookies } from "next/headers";
import { z } from "zod";

const GUEST_CART_COOKIE = "bewear_guest_cart";
const GUEST_CART_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const guestCartItemSchema = z.object({
  productVariantId: z.uuid(),
  quantity: z.number().int().min(1),
});

const guestCartSchema = z.array(guestCartItemSchema);

export type GuestCartItem = z.infer<typeof guestCartItemSchema>;

export const readGuestCart = async (): Promise<GuestCartItem[]> => {
  const cookieStore = await cookies();
  const raw = cookieStore.get(GUEST_CART_COOKIE)?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    const result = guestCartSchema.safeParse(parsed);
    return result.success ? result.data : [];
  } catch {
    return [];
  }
};

export const writeGuestCart = async (items: GuestCartItem[]): Promise<void> => {
  const cookieStore = await cookies();
  if (items.length === 0) {
    cookieStore.delete(GUEST_CART_COOKIE);
    return;
  }
  cookieStore.set(GUEST_CART_COOKIE, JSON.stringify(items), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: GUEST_CART_MAX_AGE_SECONDS,
  });
};

export const clearGuestCart = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete(GUEST_CART_COOKIE);
};
