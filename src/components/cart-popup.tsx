"use client";

import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export function CartPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={cartRef}>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <span className="sr-only">Cart</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        {items.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {items.length}
          </span>
        )}
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-lg z-10 overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">My Cart</h3>
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6">
                <ShoppingCart size={64} className="text-gray-400 mb-4" />
                <p className="mt-2 text-gray-500">Your cart is empty</p>
                <Link href="/" passHref>
                  <Button className="mt-4">Start Shopping</Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-4 pb-4 border-b"
                    >
                      <div className="flex items-center">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            width={50}
                            height={50}
                            className="rounded-md mr-3"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-md mr-3 flex items-center justify-center">
                            <ShoppingCart size={24} className="text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold">Total:</p>
                    <p className="font-bold text-lg">${total.toFixed(2)}</p>
                  </div>
                  <Link href="/checkout" passHref>
                    <Button className="w-full" onClick={() => setIsOpen(false)}>
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
