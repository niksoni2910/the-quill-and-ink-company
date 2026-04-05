"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="px-6 py-32 max-w-3xl mx-auto"
    >
      <span className="uppercase tracking-[0.3em] text-[10px] font-bold opacity-40 block mb-4">Our Story</span>
      <h1 className="font-[family-name:var(--font-serif)] text-5xl lg:text-6xl mb-12">
        About Us
      </h1>

      <p className="text-base lg:text-lg leading-loose mb-10 opacity-80">
        At The Quill and Ink Company, we believe gifting is an experience, not
        just an exchange. What started as a passion for calligraphy and creative
        expression has evolved into a brand that transforms everyday gifts into
        meaningful, personalized keepsakes. From elegant name engravings and gold
        foiling to thoughtfully curated hampers, every creation is designed to
        capture emotions and tell a story.
      </p>

      {/* FOUNDER */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="border-l-2 border-[var(--color-accent)] pl-8 py-4 my-12"
      >
        <p className="text-base lg:text-lg leading-loose opacity-80">
          Founded by <span className="font-semibold italic">Tanushi Soni</span>,
          the brand is deeply rooted in her love for art, detail, and
          personalization. Every product that leaves our studio is personally
          curated and finalized by her, ensuring it carries a unique signature
          touch. With a strong eye for aesthetics and a heart for thoughtful
          gifting, Tanushi blends creativity with precision to create pieces that
          feel truly special.
        </p>
      </motion.div>

      {/* PHILOSOPHY */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <p className="text-base lg:text-lg leading-loose mb-10 opacity-80">
          We specialize in curating hampers across budgets while maintaining a
          luxurious feel in every detail—because we believe luxury is not about
          price, but about presentation, thoughtfulness, and experience. At The
          Quill and Ink Company, there is no concept of a &ldquo;normal gift&rdquo; with
          just basic wrapping. It&apos;s always about going the extra mile—adding those
          little details, personal touches, and finishing elements that elevate a
          gift and make the receiver feel valued, celebrated, and on cloud nine.
        </p>

        <p className="text-base lg:text-lg leading-loose opacity-80">
          Whether it&apos;s a festive celebration, a wedding, a milestone, or a
          simple heartfelt gesture, we are here to make every moment more
          memorable with our art.
        </p>
      </motion.div>
    </motion.main>
  );
}