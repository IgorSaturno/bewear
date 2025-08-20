"use client";

import {
  ChevronDownIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ShoppingBag,
  Truck,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { authClient } from "@/db/auth-client";
import { useCart } from "@/hooks/queries/use-cart";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
  const { data: cart } = useCart();

  const handleCartClick = (e: React.MouseEvent) => {
    if (!cart?.items || cart.items.length === 0) {
      e.preventDefault();
      toast.error("Seu carrinho está vazio!");
      return;
    }
  };

  return (
    <header className="container mx-auto">
      {/* Desktop Header */}
      <div className="hidden items-center justify-between p-5 lg:flex">
        {/* Left - User greeting */}
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-auto items-center gap-2 p-0"
              >
                <UserIcon className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Olá, {session.user.name?.split(" ")[0]}!
                </span>
                <ChevronDownIcon className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/" className="flex items-center gap-2">
                  <HomeIcon className="h-4 w-4" />
                  Início
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/my-orders" className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Meus pedidos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/cart/identification"
                  className="flex items-center gap-2"
                  onClick={handleCartClick}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Sacola
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  authClient.signOut();
                  window.location.href = "/";
                }}
                className="flex items-center gap-2"
              >
                <LogOutIcon className="h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="ghost"
            asChild
            className="flex h-auto items-center gap-2 p-0"
          >
            <Link href="/authentication">
              <UserIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Olá, visitante!</span>
            </Link>
          </Button>
        )}

        {/* Center - Logo */}
        <Link href="/" className="flex flex-1 justify-center">
          <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
        </Link>

        {/* Right - Search and Cart */}
        <div className="flex items-center gap-4">
          <button className="flex h-6 w-6 items-center justify-center">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <Cart />
        </div>
      </div>

      {/* Desktop Categories */}
      <div className="hidden justify-center pb-4 lg:flex">
        <nav className="flex items-center gap-24 text-sm text-gray-600">
          <Link
            href="/category/camisetas"
            className="transition-colors hover:text-gray-900"
          >
            Camisetas
          </Link>
          <Link
            href="/category/bermuda-shorts"
            className="transition-colors hover:text-gray-900"
          >
            Bermuda & Shorts
          </Link>
          <Link
            href="/category/calas"
            className="transition-colors hover:text-gray-900"
          >
            Calças
          </Link>
          <Link
            href="/category/jaquetas-moletons"
            className="transition-colors hover:text-gray-900"
          >
            Jaquetas & Moletons
          </Link>
          <Link
            href="/category/tnis"
            className="transition-colors hover:text-gray-900"
          >
            Tênis
          </Link>
          <Link
            href="/category/acessrios"
            className="transition-colors hover:text-gray-900"
          >
            Acessórios
          </Link>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="flex items-center justify-between p-5 lg:hidden">
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
                    <Button className="gap-4 rounded-full" asChild>
                      <Link href="/authentication">
                        Login <LogInIcon />
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
                    onClick={handleCartClick}
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
      </div>
    </header>
  );
};
