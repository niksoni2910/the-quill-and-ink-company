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
      <div className="max-w-[1400px] mx-auto grid gap-16 lg:grid-cols-3">

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

        {/* 3. CONTACT */}
        <div>
          <h4 className="font-serif text-lg mb-6">Contact Us</h4>
          <p className="text-sm opacity-70 mb-6">
            Have questions or need help with a custom order? We'd love to hear from you.
          </p>
          <a
            href="https://wa.me/919324580059"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-3
              bg-[#25D366] text-white
              px-6 py-3 rounded-sm
              text-xs uppercase tracking-wider font-bold
              hover:bg-[#128C7E] transition-colors
              shadow-sm
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
            Chat on WhatsApp
          </a>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="mt-20 pt-8 border-t border-[var(--color-ink)]/10 text-center text-xs opacity-50">
        © {new Date().getFullYear()} The Quill & Ink Company. All rights reserved. Designed with love.
      </div>
    </footer>
  );
}