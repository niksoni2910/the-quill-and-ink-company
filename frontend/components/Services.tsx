"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const services = [
    {
        title: "Bespoke Calligraphy",
        tag: "Wedding & Personal",
        image: "/images/Customised Engraving/CE3.jpeg",
        description: "Elegant calligraphy for invitations, envelopes, and personlalized stationery.",
        width: "md:col-span-2"
    },
    {
        title: "Paper Quilling",
        tag: "Art & Decor",
        image: "/images/Quilling Frame/QF3.jpeg",
        description: "Intricate paper art captured in frames, bespoke for your space.",
        width: "md:col-span-1"
    },
    {
        title: "Learning Hub",
        tag: "Workshops",
        image: "/images/Quilling Frame/QF4.jpeg",
        description: "Join our intimate sessions to master the art of the nib and quilling.",
        width: "md:col-span-1"
    },
    {
        title: "Brand Lettering",
        tag: "Commercial",
        image: "/images/Customised Engraving/CE4.jpeg",
        description: "Logos and type systems that carry the warmth of the human hand.",
        width: "md:col-span-2"
    },
];

export default function Services() {
    return (
        <section className="py-32 bg-[var(--color-paper)]">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="uppercase tracking-[0.3em] text-[10px] font-bold opacity-40 block mb-4">What we do</span>
                        <h2 className="font-[family-name:var(--font-serif)] text-5xl lg:text-7xl leading-tight">
                            Crafting <br /> Handpicked <br />
                            <span className="italic font-normal">Experiences.</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-sm text-sm lg:text-base opacity-60 leading-relaxed font-medium"
                    >
                        From the first stroke of a nib to the final curl of paper,
                        we believe in slowing down to create something truly exceptional.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`group relative overflow-hidden rounded-sm h-[450px] ${service.width} cursor-pointer`}
                        >
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            {/* OVERLAY */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                            {/* CONTENT */}
                            <div className="absolute inset-0 p-10 flex flex-col justify-between text-white z-10">
                                <div className="overflow-hidden">
                                    <motion.span 
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 0.8 }}
                                        transition={{ duration: 0.5 }}
                                        className="uppercase tracking-[0.3em] text-[10px] font-bold block"
                                    >
                                        {service.tag}
                                    </motion.span>
                                </div>
                                <div>
                                    <h3 className="font-[family-name:var(--font-serif)] text-3xl lg:text-4xl mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]">{service.title}</h3>
                                    <div className="h-[2px] w-0 group-hover:w-12 bg-[var(--color-rose)] mb-6 transition-all duration-700 delay-100" />
                                    <p className="text-sm opacity-0 group-hover:opacity-70 transition-all duration-500 delay-200 leading-relaxed max-w-xs transform translate-y-2 group-hover:translate-y-0 text-white/90 font-medium">{service.description}</p>
                                </div>
                            </div>

                            {/* BORDER GLOW */}
                            <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-1000 m-4 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
