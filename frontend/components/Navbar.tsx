"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { token, user } = useAuth();
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        bg-[#FEFAF6]/90 backdrop-blur-md
        border-b border-[#1A1A1A]/5
      "
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4 text-[var(--color-ink)]">

        {/* LOGO */}
        <Link
          href="/"
          className="
            font-[family-name:var(--font-cursive)]
            text-2xl lg:text-3xl
            tracking-wide
            hover:text-[var(--color-rose)]
            transition-colors duration-500
          "
        >
          The Quill & Ink Company
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-12 text-[13px] uppercase tracking-[0.2em] font-medium opacity-80">
          <Link href="/about" className="hover:text-[var(--color-rose)] transition">
            About
          </Link>
          <Link href="/work" className="hover:text-[var(--color-rose)] transition">
            Work
          </Link>
          <Link href="/products" className="hover:text-[var(--color-rose)] transition">
            Store
          </Link>
          {user?.role === "admin" && (
            <Link href="/admin/orders" className="hover:text-[var(--color-rose)] transition text-[var(--color-accent)]">
              Orders
            </Link>
          )}
        </nav>

        {/* RIGHT ACTIONS (DESKTOP) & HAMBURGER */}
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-8">
            {/* SEARCH */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearch}
                    className="absolute right-8"
                  >
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="
                        w-full bg-transparent border-b border-[var(--color-ink)]/20
                        px-2 py-1 text-xs outline-none focus:border-[var(--color-accent)]
                      "
                    />
                  </motion.form>
                )}
              </AnimatePresence>
              <Search
                className="w-4 h-4 cursor-pointer hover:text-[var(--color-rose)] transition opacity-60"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              />
            </div>

            {/* CART */}
            {/* <Link href="/cart" aria-label="Cart" className="relative">
              <ShoppingCart className="w-5 h-5 hover:text-[var(--color-accent)] transition" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="
                    absolute -top-2 -right-2
                    bg-[var(--color-accent)] text-white
                    text-[9px] font-bold
                    w-4 h-4 flex items-center justify-center
                    rounded-full
                  "
                >
                  {cartCount}
                </motion.span>
              )}
            </Link> */}

            {/* AUTH */}
            {/* {token ? (
              <Link href="/profile" aria-label="Profile">
                <User className="w-5 h-5 cursor-pointer hover:text-[var(--color-accent)] transition" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="
                  border border-[var(--color-accent)]
                  text-[var(--color-accent)]
                  px-4 py-1.5
                  text-sm
                  rounded-sm
                  hover:bg-[var(--color-accent)]
                  hover:text-white
                  transition
                "
              >
                Login
              </Link>
            )} */}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="lg:hidden flex items-center gap-4"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            {/* <Link href="/cart" aria-label="Cart" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="
                    absolute -top-2 -right-2
                    bg-[var(--color-accent)] text-white
                    text-[9px] font-bold
                    w-4 h-4 flex items-center justify-center
                    rounded-full
                  "
                >
                  {cartCount}
                </motion.span>
              )}
            </Link> */}
            <Menu className="w-6 h-6 hover:text-[var(--color-accent)] transition" />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* DRAWER */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="
                fixed top-0 right-0 bottom-0
                w-[80%] max-w-sm
                bg-[#FDF9F9]
                z-50
                p-8
                shadow-2xl
                flex flex-col
              "
            >
              <button
                className="self-end mb-8"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-6 h-6 hover:text-[var(--color-accent)] transition" />
              </button>

              <nav className="flex flex-col gap-6 text-lg font-medium">
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[var(--color-accent)] transition"
                >
                  About
                </Link>
                <Link
                  href="/work"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[var(--color-accent)] transition"
                >
                  Our Work
                </Link>
                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[var(--color-accent)] transition"
                >
                  Shop
                </Link>
                <hr className="border-[var(--color-rose)] opacity-50 my-2" />

                {/* {token ? (
                  <>
                    <Link
                      href="/cart"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="hover:text-[var(--color-accent)] transition flex items-center gap-2 group"
                    >
                      <div className="relative">
                        <ShoppingCart className="w-5 h-5" />
                        {cartCount > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="
                              absolute -top-2 -right-2
                              bg-[var(--color-accent)] text-white
                              text-[8px] font-bold
                              w-3.5 h-3.5 flex items-center justify-center
                              rounded-full
                            "
                          >
                            {cartCount}
                          </motion.span>
                        )}
                      </div>
                      Cart
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="hover:text-[var(--color-accent)] transition flex items-center gap-2"
                    >
                      <User className="w-5 h-5" /> Profile
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-[var(--color-accent)] transition"
                  >
                    Login
                  </Link>
                )} */}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}