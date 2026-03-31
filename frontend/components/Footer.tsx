import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="
        bg-[#FEFAF6]
        text-[var(--color-ink)]
        pt-32 pb-16
        px-6
        border-t border-[#1A1A1A]/5
      "
    >
      <div className="max-w-[1400px] mx-auto grid gap-16 lg:grid-cols-4">

        {/* 1. BRAND */}
        <div className="lg:col-span-1">
          <h3 className="font-[family-name:var(--font-cursive)] text-3xl mb-6">
            The Quill & Ink Company
          </h3>
          <p className="text-sm leading-relaxed opacity-70 mb-8">
            Handcrafted calligraphy and bespoke stationery for life's most beautiful moments.
          </p>
          <div className="flex gap-4 opacity-60">
            <Link href="#" className="hover:text-[var(--color-accent)] transition"><Instagram className="w-5 h-5" /></Link>
            <Link href="#" className="hover:text-[var(--color-accent)] transition"><Facebook className="w-5 h-5" /></Link>
            <Link href="#" className="hover:text-[var(--color-accent)] transition"><Twitter className="w-5 h-5" /></Link>
            <Link href="mailto:hello@example.com" className="hover:text-[var(--color-accent)] transition"><Mail className="w-5 h-5" /></Link>
          </div>
        </div>

        {/* 2. NAVIGATION */}
        <div>
          <h4 className="font-serif text-lg mb-6">Explore</h4>
          <ul className="space-y-4 text-sm opacity-70">
            <li><Link href="/about" className="hover:text-[var(--color-accent)]">Our Story</Link></li>
            <li><Link href="/work" className="hover:text-[var(--color-accent)]">Portfolio</Link></li>
            <li><Link href="/products" className="hover:text-[var(--color-accent)]">Shop</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--color-accent)]">Contact</Link></li>
          </ul>
        </div>

        {/* 3. CUSTOMER CARE */}
        <div>
          <h4 className="font-serif text-lg mb-6">Support</h4>
          <ul className="space-y-4 text-sm opacity-70">
            <li><Link href="#" className="hover:text-[var(--color-accent)]">FAQ</Link></li>
            <li><Link href="#" className="hover:text-[var(--color-accent)]">Shipping & Returns</Link></li>
            <li><Link href="#" className="hover:text-[var(--color-accent)]">Care Guide</Link></li>
            <li><Link href="#" className="hover:text-[var(--color-accent)]">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* 4. NEWSLETTER */}
        <div>
          <h4 className="font-serif text-lg mb-6">Join the community</h4>
          <p className="text-sm opacity-70 mb-4">
            Receive updates on new collections and workshops.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="
                        bg-white/50 border border-[var(--color-rose)] 
                        px-4 py-2 rounded-sm text-sm w-full
                        focus:outline-none focus:border-[var(--color-accent)]
                    "
            />
            <button
              type="button"
              className="bg-[var(--color-ink)] text-white px-4 py-2 text-xs uppercase tracking-wider rounded-sm hover:opacity-90"
            >
              Sign Up
            </button>
          </form>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="mt-20 pt-8 border-t border-[var(--color-ink)]/10 text-center text-xs opacity-50">
        © {new Date().getFullYear()} The Quill & Ink Company. All rights reserved. Designed with love.
      </div>
    </footer>
  );
}