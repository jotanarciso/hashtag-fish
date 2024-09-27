"use client";

import { useCart } from "@/context/cart-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const { id } = await response.json();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      {items.length === 0 ? (
        <div className="text-center">
          <ShoppingCart size={64} className="text-gray-400 mb-4 mx-auto" />
          <p className="mb-4">Your cart is empty.</p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.title} width={50} height={50} className="mr-4" />
                  <span>{item.title}</span>
                </div>
                <div>
                  <span className="mr-4">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </span>
                  <span className="font-bold">${(item.quantity * item.price).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-xl font-bold">
            Total: ${total.toFixed(2)}
          </div>
          <div className="mt-8 flex justify-between">
            <Button onClick={clearCart} variant="outline">
              Clear Cart
            </Button>
            <Button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-1/2"
            >
              {isLoading ? "Processing..." : "Complete Purchase"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}