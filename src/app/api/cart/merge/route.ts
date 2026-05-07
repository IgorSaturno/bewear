import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import { auth } from "@/lib/auth";
import { mergeGuestCartIntoUser } from "@/lib/cart-merge";

export const GET = async (request: NextRequest) => {
  const redirectTo =
    request.nextUrl.searchParams.get("redirectTo") ?? "/";

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.id) {
    await mergeGuestCartIntoUser(session.user.id);
  }

  redirect(redirectTo);
};
