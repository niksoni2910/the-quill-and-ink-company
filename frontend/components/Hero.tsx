"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
        min-h-[80vh] flex
        items-center
        px-6 lg:px-12
        max-w-[1400px] mx-auto
      "
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.1
            },
          },
        }}
        className="max-w-3xl"
      >
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
            },
          }}
          className="
            font-[family-name:var(--font-serif)]
            text-[clamp(3rem,8vw,5.5rem)]
            leading-[1.1]
            tracking-tight
          "
        >
          Capturing
          <br />
          <motion.span 
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="text-[var(--color-accent)] opacity-90"
          >
            the Soul
          </motion.span>
          <br />
          of the Stroke
        </motion.h1>

        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { duration: 0.8 } 
            },
          }}
          className="mt-8 max-w-md text-sm lg:text-base leading-relaxed opacity-60 font-medium"
        >
          A Mumbai-based calligraphy and lettering studio dedicated to
          the timeless art of the human hand. We transform ink and paper
          into personalised narratives.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { duration: 0.8 } 
            },
          }}
          className="mt-12"
        >
          <Link
            href="/products"
            className="
              inline-flex items-center gap-4
              bg-[var(--color-ink)] text-white
              px-10 py-5
              text-[11px] uppercase tracking-[0.4em] font-bold
              hover:bg-[var(--color-accent)]
              transition-all duration-500
              group
              shadow-xl
            "
          >
            Shop Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}