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


  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        bg-[#FEFAF6] lg:bg-[#FEFAF6]/90 lg:backdrop-blur-md
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
        <nav className="hidden lg:flex items-center gap-12 text-[12px] uppercase tracking-[0.3em] font-semibold opacity-70">
          <Link href="/about" className="relative group py-2">
            <span className="group-hover:text-[var(--color-ink)] transition-colors duration-300">About</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
          </Link>
          <Link href="/work" className="relative group py-2">
            <span className="group-hover:text-[var(--color-ink)] transition-colors duration-300">Work</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
          </Link>
          <Link href="/products" className="relative group py-2">
            <span className="group-hover:text-[var(--color-ink)] transition-colors duration-300">Store</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
          </Link>
          <Link href="/contact" className="relative group py-2">
            <span className="group-hover:text-[var(--color-ink)] transition-colors duration-300">Contact</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
          </Link>
          {user?.role === "admin" && (
            <Link href="/admin/products" className="relative group py-2 text-[var(--color-accent)]">
              <span className="group-hover:text-[var(--color-accent)] transition-colors duration-300">Admin</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
            </Link>
          )}
        </nav>

        {/* RIGHT ACTIONS (DESKTOP) & HAMBURGER */}
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-8">

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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
            />

            {/* DRAWER */}
            <motion.div
              initial={{ x: "100%", opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="
                fixed top-0 right-0 bottom-0
                w-[85%] max-w-sm
                bg-[#FEFAF6]
                z-[60]
                p-10
                shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.3)]
                flex flex-col
              "
            >
              <div className="flex justify-between items-center mb-16">
                <span className="font-[family-name:var(--font-cursive)] text-xl">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2"
                >
                  <X className="w-6 h-6 hover:text-[var(--color-accent)] transition" />
                </button>
              </div>

              <nav className="flex flex-col gap-8 text-2xl font-[family-name:var(--font-serif)] italic">
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[var(--color-accent)] transition-colors duration-300 flex items-center justify-between group"
                >
                  <span>About Us</span>
                  <span className="w-8 h-[1px] bg-[var(--color-accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
                </Link>
                <Link
                  href="/work"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[var(--color-accent)] transition-colors duration-300 flex items-center justify-between group"
                >
                  <span>Our Work</span>
                  <span className="w-8 h-[1px] bg-[var(--color-accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
                </Link>
                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[var(--color-accent)] transition-colors duration-300 flex items-center justify-between group"
                >
                  <span>Shop</span>
                  <span className="w-8 h-[1px] bg-[var(--color-accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[var(--color-accent)] transition-colors duration-300 flex items-center justify-between group"
                >
                  <span>Contact</span>
                  <span className="w-8 h-[1px] bg-[var(--color-accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
                </Link>
                {user?.role === "admin" && (
                  <Link
                    href="/admin/products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[var(--color-accent)] transition-colors duration-300 flex items-center justify-between group"
                  >
                    <span>Admin</span>
                    <span className="w-8 h-[1px] bg-[var(--color-accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
                  </Link>
                )}
              </nav>

              <div className="mt-auto space-y-6">
                <div className="h-[1px] bg-black/5 w-full" />
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-30 italic">Get in touch</p>
                  <p className="text-sm font-medium opacity-60">thequillandinkcompany@gmail.com</p>
                  <p className="text-sm font-medium opacity-60">+91 9324580059</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}