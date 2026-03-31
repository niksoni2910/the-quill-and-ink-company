"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
        flex
        items-center
        px-2
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <h1
          className="
            font-[family-name:var(--font-serif)]
            text-[clamp(3rem,8vw,5.5rem)]
            leading-[1.1]
            tracking-tight
          "
        >
          Capturing
          <br />
          <span className="text-[var(--color-accent)] opacity-90">
            the Soul
          </span>
          <br />
          of the Stroke
        </h1>

        <p className="mt-8 max-w-md text-sm lg:text-base leading-relaxed opacity-60 font-medium">
          A Mumbai-based calligraphy and lettering studio dedicated to
          the timeless art of the human hand. We transform ink and paper
          into bespoke narratives.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
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