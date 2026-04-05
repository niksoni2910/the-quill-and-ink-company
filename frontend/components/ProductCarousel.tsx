"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "react-hot-toast";

export default function ProductCarousel() {
    const [products, setProducts] = useState<any[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        apiRequest("/products?limit=4").then((data) => {
            setProducts(data.slice(0, 4));
        });
    }, []);

    const handleAddToCart = async (e: React.MouseEvent, p: any) => {
        e.preventDefault();
        try {
            await addToCart(p.id, p.name, p.price, 1, ["Standard"]);
            toast.success(`${p.name} added to cart!`);
        } catch (err: any) {
            toast.error(err.message || "Failed to add to cart");
        }
    };

    if (products.length === 0) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p, idx) => (
                <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                >
                    <Link href={`/products/${p.id}`} className="block">
                        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream)] mb-4">
                            <Image
                                src={p.image_base64}
                                alt={p.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />

                            {/* WHATSAPP ACTION */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open(`https://wa.me/919324580059?text=${encodeURIComponent(`Hi, I'm interested in the product: ${p.name}`)}`, '_blank');
                                }}
                                className="
                  absolute bottom-4 right-4
                  w-10 h-10 bg-[#25D366] text-white
                  flex items-center justify-center
                  rounded-full shadow-lg
                  opacity-0 translate-y-2
                  group-hover:opacity-100 group-hover:translate-y-0
                  transition-all duration-300
                  hover:bg-[#128C7E]
                "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
                            </button>
                        </div>

                        <div className="space-y-1">
                            <h3 className="font-[family-name:var(--font-serif)] text-lg group-hover:text-[var(--color-accent)] transition-colors">
                                {p.name}
                            </h3>
                            <p className="text-[12px] opacity-40 font-bold tracking-widest uppercase">
                                ₹{Number(p.price).toLocaleString()}
                            </p>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
