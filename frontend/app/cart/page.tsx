"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, ArrowLeft, CheckCircle2 } from "lucide-react";

type CartItem = {
  id: string;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  custom_texts: string[];
  image_base64?: string;
};

export default function CartPage() {
  const { token } = useAuth();
  const { removeFromCart, fetchCart } = useCart();

  const [cart, setCart] = useState<any>(null);
  const [userAddress, setUserAddress] = useState("");
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] =
    useState<"same" | "different">("same");
  const [loading, setLoading] = useState(true);
  const [isOrdering, setIsOrdering] = useState(false);

  const loadData = async () => {
    if (!token) return;
    try {
      const [cartData, user] = await Promise.all([
        apiRequest("/cart", "GET", undefined, token),
        apiRequest("/users/me", "GET", undefined, token),
      ]);
      setCart(cartData);
      setUserAddress(user.address || "");
      if (!address) setAddress(user.address || "");
    } catch (err) {
      console.error("Failed to load cart data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const handleRemove = async (itemId: number) => {
    try {
      await removeFromCart(itemId);
      toast.success("Item removed");
      loadData(); // Refresh local state
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const handleCheckout = async () => {
    const finalAddress =
      addressType === "same" ? userAddress : address;

    if (!finalAddress?.trim()) {
      toast.error("Delivery address is required");
      return;
    }

    setIsOrdering(true);
    try {
      await apiRequest(
        "/cart/address",
        "PUT",
        { deliveryAddress: finalAddress },
        token
      );

      await apiRequest("/cart/checkout", "POST", {}, token);
      toast.success("Order placed successfully");
      setCart({ items: [] });
      fetchCart(); // Update navbar count
    } catch (err) {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsOrdering(false);
    }
  };

  if (loading) {
    return (
      <main className="px-6 py-40 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-48 bg-black/5 mx-auto rounded" />
          <div className="h-12 w-96 bg-black/5 mx-auto rounded" />
        </div>
      </main>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <main className="px-6 py-40 text-center max-w-[1400px] mx-auto min-h-screen bg-[var(--color-paper)]">
        <ShoppingBag className="w-16 h-16 mx-auto mb-8 opacity-10" />
        <h1 className="font-[family-name:var(--font-serif)] text-4xl mb-4">Your cart is empty</h1>
        <p className="opacity-50 mb-10 max-w-sm mx-auto">Looks like you haven't added any handcrafted pieces to your collection yet.</p>
        <Link
          href="/products"
          className="inline-block bg-[var(--color-accent)] text-white px-10 py-4 uppercase tracking-widest text-xs font-bold rounded-sm hover:opacity-90 transition"
        >
          Start Shopping
        </Link>
      </main>
    );
  }

  const cartTotal = cart.items.reduce(
    (sum: number, item: CartItem) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <main className="px-6 py-32 max-w-[1400px] mx-auto bg-[var(--color-paper)] min-h-screen">
      <div className="mb-20">
        <span className="uppercase tracking-[0.3em] text-[10px] font-bold opacity-30 block mb-4 italic">Boutique Checkout</span>
        <h1 className="font-[family-name:var(--font-serif)] text-5xl lg:text-7xl">
          Shopping <span className="italic font-normal">Cart</span>
        </h1>
      </div>

      <div className="grid lg:grid-cols-[1fr_450px] gap-20 items-start">

        {/* LEFT — CART ITEMS */}
        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {cart.items.map((item: any) => {
              const itemTotal = item.price * item.quantity;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col md:flex-row gap-8 pb-12 border-b border-[#1A1A1A]/5 group"
                >
                  <Link href={`/products/${item.product_id}`} className="shrink-0">
                    <div className="w-32 h-44 bg-[var(--color-cream)] overflow-hidden rounded-sm relative">
                      {item.image_base64 && (
                        <img
                          src={item.image_base64}
                          alt={item.product_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                    </div>
                  </Link>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <Link href={`/products/${item.product_id}`}>
                          <h3 className="font-[family-name:var(--font-serif)] text-2xl group-hover:text-[var(--color-accent)] transition-colors">
                            {item.product_name}
                          </h3>
                        </Link>
                        <p className="font-bold text-[14px] tracking-tight">
                          ₹{Number(itemTotal).toLocaleString()}
                        </p>
                      </div>

                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 mb-6">
                        Unit Price: ₹{Number(item.price).toLocaleString()} • Quantity: {item.quantity}
                      </p>

                      {item.custom_texts && item.custom_texts.length > 0 && (
                        <div className="space-y-3">
                          <span className="text-[9px] uppercase tracking-widest font-bold opacity-30 italic">Personalization details</span>
                          <div className="grid gap-2">
                            {item.custom_texts.map((t: string, i: number) => (
                              <div key={i} className="bg-white/50 border border-black/5 px-4 py-3 rounded-sm text-[12px] opacity-70 italic font-serif">
                                "{t}"
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold opacity-30 hover:opacity-100 hover:text-red-500 transition w-fit mt-8"
                      onClick={() => handleRemove(item.id)}
                    >
                      <Trash2 className="w-3 h-3" /> Remove Item
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <Link
            href="/products"
            className="
              inline-flex items-center gap-3
              text-[10px] uppercase tracking-[0.3em] font-bold
              opacity-40 hover:opacity-100
              transition mt-8
            "
          >
            <ArrowLeft className="w-3 h-3" /> Continue Shopping
          </Link>
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <aside className="bg-white p-10 rounded-sm border border-[#1A1A1A]/5 shadow-sm sticky top-32">
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-10 pb-2 border-b border-black/5">
            Order Summary
          </h2>

          <div className="space-y-6 text-sm mb-10 pb-10 border-b border-black/5">
            <div className="flex justify-between">
              <span className="uppercase tracking-widest text-[11px] opacity-60">Subtotal</span>
              <span className="font-medium">₹{Number(cartTotal).toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="uppercase tracking-widest text-[11px] opacity-60">Shipping</span>
              <span className="text-[10px] font-bold text-green-600 tracking-widest">COMPLIMENTARY</span>
            </div>

            {/* ADDRESS SELECTION */}
            <div className="pt-6 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 block">Shipping Destination</span>

              <div className="space-y-3">
                <label className={`flex items-start gap-4 p-4 border rounded-sm cursor-pointer transition ${addressType === 'same' ? 'border-black bg-black/5' : 'border-[#1A1A1A]/10 hover:border-black/20'}`}>
                  <input
                    type="radio"
                    className="mt-1 accent-black"
                    checked={addressType === "same"}
                    onChange={() => {
                      setAddressType("same");
                      setAddress(userAddress);
                    }}
                  />
                  <div className="text-[12px]">
                    <p className="font-bold uppercase tracking-widest opacity-80 mb-1">Standard Address</p>
                    <p className="opacity-50 leading-relaxed italic line-clamp-2">{userAddress || "No address on file"}</p>
                  </div>
                </label>

                <label className={`flex items-start gap-4 p-4 border rounded-sm cursor-pointer transition ${addressType === 'different' ? 'border-black bg-black/10' : 'border-[#1A1A1A]/10 hover:border-black/20'}`}>
                  <input
                    type="radio"
                    className="mt-1 accent-black"
                    checked={addressType === "different"}
                    onChange={() => {
                      setAddressType("different");
                      setAddress("");
                    }}
                  />
                  <div className="text-[12px] flex-1">
                    <p className="font-bold uppercase tracking-widest opacity-80 mb-3">Custom Location</p>
                    {addressType === "different" && (
                      <textarea
                        placeholder="Please specify your delivery coordinates..."
                        className="bg-white border border-black/10 w-full p-4 text-[12px] focus:outline-none focus:border-black rounded-sm resize-none"
                        rows={4}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-baseline mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-80">Total</span>
            <span className="text-4xl font-[family-name:var(--font-serif)]">₹{Number(cartTotal).toLocaleString()}</span>
          </div>

          {/* CHECKOUT */}
          <button
            onClick={handleCheckout}
            disabled={isOrdering}
            className="
              w-full
              bg-[var(--color-ink)]
              text-white
              py-6
              text-[11px] uppercase tracking-[0.4em] font-bold
              hover:bg-[#333]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300
              flex items-center justify-center gap-3
            "
          >
            {isOrdering ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>Secure Checkout <CheckCircle2 className="w-4 h-4" /></>
            )}
          </button>

          <div className="mt-8 flex flex-col items-center gap-4 py-8 border-t border-black/5 opacity-30">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-black" />
              <p className="text-[8px] uppercase tracking-[0.3em] font-bold">Premium Experience Guaranteed</p>
              <div className="w-8 h-[1px] bg-black" />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}