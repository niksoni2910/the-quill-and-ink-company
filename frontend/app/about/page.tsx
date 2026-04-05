"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-[var(--color-paper)] min-h-screen"
    >
      {/* HERO SECTION */}
      <section className="px-6 pt-24 lg:pt-32 pb-16 lg:pb-20 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <span className="uppercase tracking-[0.4em] text-[10px] font-bold opacity-40 block mb-4 lg:mb-6">Our Story</span>
            <h1 className="font-[family-name:var(--font-serif)] text-4xl md:text-6xl lg:text-8xl leading-[1.1] mb-6 lg:mb-8">
              The Art of <br />
              <span className="italic font-normal text-[var(--color-accent)]">Personal</span> Gifting
            </h1>
            <p className="text-base lg:text-xl leading-relaxed opacity-70 font-medium max-w-xl mx-auto lg:mx-0">
              At The Quill and Ink Company, we believe gifting is an experience, not
              just an exchange. We transform everyday gifts into meaningful, 
              personalized keepsakes that tell a story.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-[4/5] bg-[var(--color-cream)] overflow-hidden rounded-sm shadow-2xl max-w-md mx-auto lg:max-w-none w-full"
          >
            <Image
              src="/images/my_pic.png" 
              alt="Tanushi Soni - Founder of The Quill and Ink Company"
              fill
              className="object-cover transition-transform duration-1000 hover:scale-105"
              priority
            />
            {/* ELEGANT FRAME EFFECT */}
            <div className="absolute inset-0 border-[16px] lg:border-[24px] border-white/10 pointer-events-none" />
            <div className="absolute inset-0 border-[1px] border-white/20 m-3 lg:m-4 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* DETAILED CONTENT */}
      <section className="px-6 py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto space-y-16 lg:space-y-24">
          
          {/* FOUNDER BLOCK */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
            <div className="md:sticky md:top-32 border-l-2 border-[var(--color-accent)]/20 pl-4 md:border-none md:pl-0">
               <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--color-accent)] mb-2 md:mb-4 italic">The Founder</h3>
               <div className="hidden md:block w-12 h-[1px] bg-[var(--color-accent)] opacity-30" />
            </div>
            <div className="space-y-6 lg:space-y-8">
               <p className="text-lg lg:text-2xl leading-relaxed font-serif italic text-[var(--color-ink)] opacity-90">
                Founded by <span className="font-bold not-italic">Tanushi Soni</span>,
                the brand is deeply rooted in her love for art, detail, and
                personalization. 
               </p>
               <p className="text-sm lg:text-lg leading-loose opacity-60">
                 Every product that leaves our studio is personally curated and finalized by her, ensuring it carries a unique signature touch. With a strong eye for aesthetics and a heart for thoughtful gifting, Tanushi blends creativity with precision to create pieces that feel truly special.
               </p>
               <div className="pt-2 lg:pt-4">
                 <p className="font-[family-name:var(--font-cursive)] text-4xl lg:text-6xl text-[var(--color-accent)] opacity-80 select-none">
                    Tanushi Soni
                 </p>
                 <p className="text-[10px] uppercase tracking-widest font-bold opacity-30 mt-1 lg:mt-2 ml-1 lg:ml-2">Founder & Creative Director</p>
               </div>
            </div>
          </div>

          {/* PHILOSOPHY BLOCK */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
            <div className="md:sticky md:top-32 border-l-2 border-[var(--color-accent)]/20 pl-4 md:border-none md:pl-0">
               <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--color-accent)] mb-2 md:mb-4 italic">Philosophy</h3>
               <div className="hidden md:block w-12 h-[1px] bg-[var(--color-accent)] opacity-30" />
            </div>
            <div className="space-y-6 lg:space-y-8">
               <p className="text-sm lg:text-lg leading-loose opacity-70">
                We specialize in curating hampers across budgets while maintaining a
                luxurious feel in every detail—because we believe luxury is not about
                price, but about presentation, thoughtfulness, and experience. 
               </p>
               <p className="text-sm lg:text-lg leading-loose opacity-70 border-l-2 border-[var(--color-rose)]/30 pl-6 lg:pl-8 italic">
                At The Quill and Ink Company, there is no concept of a &ldquo;normal gift&rdquo; with
                just basic wrapping. It&apos;s always about going the extra mile—adding those
                little details, personal touches, and finishing elements that elevate a
                gift and make the receiver feel valued, celebrated, and on cloud nine.
               </p>
               <p className="text-sm lg:text-lg leading-loose opacity-70">
                Whether it&apos;s a festive celebration, a wedding, a milestone, or a
                simple heartfelt gesture, we are here to make every moment more
                memorable with our art.
               </p>
            </div>
          </div>

        </div>
      </section>
    </motion.main>
  );
}