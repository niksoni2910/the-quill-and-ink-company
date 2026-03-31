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
      <h1 className="font-[var(--font-serif)] text-5xl mb-10">
        About
      </h1>

      <p className="leading-loose mb-10">
        The Quill & Ink Company is a creative studio rooted in traditional
        lettering, modern typography, and handcrafted storytelling. Every piece
        we create is guided by patience, precision, and a deep respect for the
        written form.
      </p>

      {/* VALUES / POINTS */}
      <ul className="space-y-6 text-sm leading-relaxed">
        <li>
          <span className="font-medium">Handcrafted over automated</span> — we
          believe the human hand brings warmth, character, and intention that
          no digital shortcut can replace.
        </li>

        <li>
          <span className="font-medium">Tradition meets modern design</span> —
          drawing from classical calligraphy while embracing contemporary
          aesthetics and layouts.
        </li>

        <li>
          <span className="font-medium">Purposeful typography</span> — every
          stroke, curve, and composition is designed to tell a story, not just
          decorate a surface.
        </li>

        <li>
          <span className="font-medium">Thoughtful materials</span> — from paper
          textures to ink flow, we care deeply about the tactile experience of
          each piece.
        </li>

        <li>
          <span className="font-medium">Workshops & learning</span> — beyond
          creating, we love sharing knowledge through workshops that welcome
          beginners and practicing artists alike.
        </li>
      </ul>

      {/* CLOSING */}
      <p className="leading-loose mt-12 opacity-80">
        Whether it’s a personal keepsake, a commissioned piece, or a shared
        learning experience, The Quill & Ink Company exists to slow things down
        and bring meaning back to the written word.
      </p>
    </motion.main>
  );
}