"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const memories = [
  { id: 1, src: "/images/Crafting Memories/CM1.jpeg", alt: "Crafting Memory 1", width: "col-span-2 row-span-2" },
  { id: 2, src: "/images/Crafting Memories/CM2.jpeg", alt: "Crafting Memory 2", width: "col-span-1 row-span-1" },
  { id: 3, src: "/images/Crafting Memories/CM3.jpeg", alt: "Crafting Memory 3", width: "col-span-1 row-span-1" },
  { id: 4, src: "/images/Crafting Memories/CM4.jpeg", alt: "Crafting Memory 4", width: "col-span-2 row-span-1" },
];

export default function CraftingMemories() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-20">
          <span className="uppercase tracking-[0.3em] text-[10px] font-bold opacity-40 block mb-4">The Personal Touch</span>
          <h2 className="font-[family-name:var(--font-serif)] text-5xl lg:text-7xl mb-8">
            Crafting <span className="italic font-normal">Memories</span>
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-accent)] mx-auto mb-8" />
          <p className="max-w-2xl mx-auto text-lg opacity-60 leading-relaxed font-serif italic">
            More than just ink on paper, we create keepsakes that preserve your most precious moments 
            through the timeless art of hand-lettering and curation.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 md:grid-rows-2 gap-4 h-[800px] md:h-[600px]">
          {memories.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden group rounded-sm shadow-sm ${item.width}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 m-4 transition-all duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
