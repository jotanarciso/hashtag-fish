"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartPopup } from "@/components/cart-popup";
import { SearchBar } from "@/components/search-bar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <SearchBar />
                </div>
                <nav className="flex flex-col space-y-4">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    Home
                  </Link>

                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Contact
                  </Link>
                </nav>
                <div className="mt-auto">
                  <select className="border rounded p-1 w-full">
                    <option>SGD $ | Singapore</option>
                  </select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center">
            <img src="/logotipo.webp" alt="Hashtag Fish Logo" className="h-10" />
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/">Home</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <SearchBar />
          <div className="hidden md:block relative z-20">
            <select className="hidden md:block border rounded p-1">
              <option>SGD $ | Singapore</option>
            </select>
          </div>
          <CartPopup />
        </div>
      </div>
    </header>
  );
}
