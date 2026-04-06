import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";

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
      <div className="max-w-[1400px] mx-auto grid gap-20 lg:grid-cols-[1.5fr_1fr_1fr]">

        {/* 1. BRAND */}
        <div className="space-y-8">
          <h3 className="font-[family-name:var(--font-serif)] text-4xl leading-tight">
            The Quill <br /> & Ink Company
          </h3>
          <p className="text-base leading-relaxed opacity-50 max-w-sm font-medium">
            Handcrafted calligraphy and personalised stationery for life&apos;s most beautiful moments.
          </p>
          <div className="flex gap-8">
            <Link 
              href="https://www.instagram.com/quillandinkco._?igsh=MTlpbnFzczY2MDZu" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-accent)] transition-colors duration-500 opacity-60 hover:opacity-100"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="mailto:thequillandinkcompany@gmail.com" className="hover:text-[var(--color-accent)] transition-colors duration-500 opacity-60 hover:opacity-100"><Mail className="w-5 h-5" /></Link>
          </div>
        </div>

        {/* 2. NAVIGATION */}
        <div className="space-y-8">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 italic">Explore</h4>
          <ul className="space-y-6 text-sm font-semibold tracking-wide">
            <li><Link href="/about" className="hover:text-[var(--color-accent)] transition-colors duration-300">Our Story</Link></li>
            <li><Link href="/work" className="hover:text-[var(--color-accent)] transition-colors duration-300">Portfolio</Link></li>
            <li><Link href="/products" className="hover:text-[var(--color-accent)] transition-colors duration-300">Shop Collection</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--color-accent)] transition-colors duration-300">Contact</Link></li>
          </ul>
        </div>

        {/* 3. CONTACT */}
        <div className="space-y-8">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 italic">Get in Touch</h4>
          <div className="space-y-4 text-sm opacity-50 leading-relaxed font-medium">
            <p className="flex items-start gap-3">
              <span className="mt-1"><Mail className="w-4 h-4" /></span>
              <a href="mailto:thequillandinkcompany@gmail.com" className="hover:text-[var(--color-accent)] transition-colors">thequillandinkcompany@gmail.com</a>
            </p>
            <p className="flex items-start gap-3">
              <span className="mt-1"><Phone className="w-4 h-4" /></span>
              <span>9324580059</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              <span>Shop no 3, Yogi Smriti, D -15, Yogi Nagar Marg, Yogi Nagar, Borivali West, Mumbai, Maharashtra 400091</span>
            </p>
          </div>
          <a
            href="https://wa.me/919324580059"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-4
              bg-[var(--color-ink)] text-white
              px-8 py-4 rounded-sm
              text-[10px] uppercase tracking-[0.2em] font-bold
              hover:bg-[var(--color-accent)] transition-all duration-500
              shadow-xl
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
            WhatsApp Inquiry
          </a>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="mt-32 pt-8 border-t border-[var(--color-ink)]/5 text-center text-[10px] uppercase tracking-widest font-bold opacity-30">
        <p>© 2026 The Quill & Ink Company.</p>
      </div>
    </footer>
  );
}