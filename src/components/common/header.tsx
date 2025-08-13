"use client";

import {
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/db/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Cart from "./cart";

export const Header = () => {
  const { data: session } = authClient.useSession();
  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>
      <div className="flex items-center gap-3">
        <Cart />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="rounded-l-3xl">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-5">
              {session?.user ? (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={session?.user?.image as string | undefined}
                      />
                      <AvatarFallback>
                        {session?.user?.name?.split(" ")?.[0]?.[0]}
                        {session?.user?.name?.split(" ")?.[1]?.[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="truncate font-semibold">
                        {session?.user?.name}
                      </h3>
                      <span className="text-muted-foreground block truncate text-xs">
                        {session?.user?.email}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => authClient.signOut()}
                    className="w-full"
                  >
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Olá. Faça seu login!</h2>
                  <Button size="icon" asChild variant="outline">
                    <Link href="/authentication">
                      <LogInIcon />
                    </Link>
                  </Button>
                </div>
              )}
              <Separator className="my-6" />
              <div className="flex flex-col space-y-4 text-sm font-medium">
                <Link href="/" className="flex items-center gap-2">
                  <HomeIcon size={20} />
                  <span>Início</span>
                </Link>
                <Link href="/my-orders" className="flex items-center gap-2">
                  <Truck size={20} />
                  <span>Meus pedidos</span>
                </Link>
                <Link
                  href="/cart/identification"
                  className="flex items-center gap-2"
                >
                  <ShoppingBag size={20} />
                  <span>Sacola</span>
                </Link>
              </div>
              <Separator className="my-6" />
              <div className="flex flex-col space-y-4 text-sm font-medium">
                <Link href="/category/camisetas">Camisetas</Link>
                <Link href="/category/bermuda-shorts">Bermuda & Shorts</Link>
                <Link href="/category/calas">Calças</Link>
                <Link href="/category/jaquetas-moletons">
                  Jaquetas & Moletons
                </Link>
                <Link href="/category/tnis">Tênis</Link>
                <Link href="/category/acessrios">Acessórios</Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
