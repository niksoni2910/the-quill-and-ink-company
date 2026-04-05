import Hero from "@/components/Hero";
import HeroCarousel from "@/components/HeroCarousel";
import Services from "@/components/Services";
import ProductCarousel from "@/components/ProductCarousel";
import Link from "next/link";
import Image from "next/image";
import { Truck, ShieldCheck, Sparkles, Heart } from "lucide-react";

export default function Home() {
  return (
    <main>
      {/* 1. HERO SECTION */}
      <section className="
        min-h-screen
        px-6 pt-32 pb-10
        max-w-[1400px] mx-auto
        grid lg:grid-cols-2 gap-16 items-center
      ">
        <Hero />
        <HeroCarousel />
      </section>

      {/* TRUST SIGNAL BAR */}
      <section className="border-y border-black/5 bg-white py-12">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center gap-3">
            <Truck className="w-6 h-6 opacity-30" />
            <h3 className="text-[10px] uppercase tracking-widest font-bold">Fast Shipping</h3>
            <p className="text-[11px] opacity-50">Pan-India delivery</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <ShieldCheck className="w-6 h-6 opacity-30" />
            <h3 className="text-[10px] uppercase tracking-widest font-bold">Premium Quality</h3>
            <p className="text-[11px] opacity-50">Handpicked materials</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <Sparkles className="w-6 h-6 opacity-30" />
            <h3 className="text-[10px] uppercase tracking-widest font-bold">Unique Designs</h3>
            <p className="text-[11px] opacity-50">Every piece is original</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <Heart className="w-6 h-6 opacity-30" />
            <h3 className="text-[10px] uppercase tracking-widest font-bold">Handcrafted</h3>
            <p className="text-[11px] opacity-50">Made with passion</p>
          </div>
        </div>
      </section>

      {/* 2. QUOTE / PHILOSOPHY SECTION */}
      <section className="bg-[var(--color-paper)] py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="font-[family-name:var(--font-cursive)] text-5xl lg:text-6xl text-[var(--color-accent)] opacity-80">
            "The art of writing is the art of discovering what you believe."
          </p>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">
            - Gustave Flaubert
          </p>
          <div className="w-12 h-[1px] bg-[var(--color-rose)] mx-auto mt-8" />
          <p className="text-lg lg:text-xl leading-[1.8] opacity-60 max-w-2xl mx-auto italic font-serif">
            At The Quill & Ink Company, we believe that every stroke tells a story.
            From bespoke wedding invitations to personalized quilling art, we bring
            the timeless elegance of craft into the modern world.
          </p>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="uppercase tracking-[0.3em] text-[10px] font-bold opacity-40 block mb-3">Shop</span>
            <h2 className="font-[family-name:var(--font-serif)] text-4xl lg:text-5xl">New Arrivals</h2>
          </div>
          <Link href="/products" className="text-[11px] uppercase tracking-widest font-bold border-b border-black pb-1 hover:opacity-60 transition">
            View All →
          </Link>
        </div>
        <ProductCarousel />
      </section>

      {/* 3. FEATURED / SERVICES (Existing) */}
      <Services />

      {/* 4. GALLERY / SHOWCASE STRIP */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-serif)] text-4xl lg:text-5xl mb-6">
            Curated Collections
          </h2>
          <p className="opacity-50 max-w-xl mx-auto text-sm lg:text-base leading-relaxed">
            Explore our latest works, featuring hand-pressed paper,
            gold leaf detailing, and custom wax seals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 h-[600px]">
          <Link href="/products?category=wedding" className="relative group overflow-hidden bg-[#f0f0f0] rounded-sm shadow-sm transition-all duration-700 hover:shadow-2xl">
            <video
              src="/videos/Customised Engraving Videos/CEV1.mp4"
              className="object-cover w-full h-full transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-700" />
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-8 text-center ring-1 ring-inset ring-white/20 m-4">
              <span className="text-white uppercase tracking-[0.4em] text-[10px] font-bold mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">Explore</span>
              <p className="text-white font-[family-name:var(--font-serif)] text-3xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100 italic">Wedding Suites</p>
            </div>
            <div className="absolute bottom-8 left-8 group-hover:opacity-0 transition-opacity duration-500">
              <p className="text-white uppercase tracking-widest text-[9px] font-bold bg-black/20 backdrop-blur-sm px-3 py-1">Wedding Suites</p>
            </div>
          </Link>
          
          <Link href="/products?category=paper-art" className="relative group overflow-hidden bg-[#e5e5e5] rounded-sm shadow-sm transition-all duration-700 hover:shadow-2xl">
            <video
              src="/videos/Quilling Frame Videos/QFV1.mp4"
              className="object-cover w-full h-full transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-700" />
             <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-8 text-center ring-1 ring-inset ring-white/20 m-4">
              <span className="text-white uppercase tracking-[0.4em] text-[10px] font-bold mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">View Art</span>
              <p className="text-white font-[family-name:var(--font-serif)] text-3xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100 italic">Paper Art</p>
            </div>
            <div className="absolute bottom-8 left-8 group-hover:opacity-0 transition-opacity duration-500">
              <p className="text-white uppercase tracking-widest text-[9px] font-bold bg-black/20 backdrop-blur-sm px-3 py-1">Paper Art</p>
            </div>
          </Link>

          <Link href="/products?category=workshops" className="relative group overflow-hidden bg-[#f5f5f5] rounded-sm shadow-sm transition-all duration-700 hover:shadow-2xl">
            <Image src="/images/Quilling Frame/QF5.jpeg" alt="Workshop" fill className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-700" />
             <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-8 text-center ring-1 ring-inset ring-white/20 m-4">
              <span className="text-white uppercase tracking-[0.4em] text-[10px] font-bold mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">Join Us</span>
              <p className="text-white font-[family-name:var(--font-serif)] text-3xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100 italic">Learning</p>
            </div>
            <div className="absolute bottom-8 left-8 group-hover:opacity-0 transition-opacity duration-500">
              <p className="text-white uppercase tracking-widest text-[9px] font-bold bg-black/20 backdrop-blur-sm px-3 py-1">Learning</p>
            </div>
          </Link>
        </div>

        <div className="text-center mt-12">
          <Link href="/work" className="inline-block border-b border-black pb-1 hover:opacity-60 transition">
            View Full Portfolio →
          </Link>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="bg-[var(--color-ink)] text-[#FDF9F9] py-32 px-6 text-center">
        <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl mb-8">
          Ready to tell your story?
        </h2>
        <p className="opacity-70 max-w-xl mx-auto mb-10 text-lg">
          Whether you need a custom logo, a handwritten letter, or a full event suite,
          we are here to bring your vision to life.
        </p>
        <Link
          href="/products"
          className="
            inline-block
            bg-[var(--color-accent)]
            text-white
            px-12 py-4
            rounded-full
            uppercase tracking-widest text-sm
            hover:bg-white hover:text-[var(--color-ink)]
            transition duration-300
          "
        >
          Shop Collection
        </Link>
      </section>
    </main>
  );
}