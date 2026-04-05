"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { getProductPricing } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { token } = useAuth();

  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [customTexts, setCustomTexts] = useState<string[]>([""]);
  
  // UX Enhancements
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    apiRequest(`/products/${id}`).then((data) => {
      setProduct(data);
      if (data?.images?.length > 0) {
        setSelectedImage(data.images[0]);
      }
    });
  }, [id]);

  useEffect(() => {
    setCustomTexts(Array.from({ length: quantity }, () => ""));
  }, [quantity]);

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please login first");
      return;
    }

    setIsAdding(true);
    try {
      await apiRequest(
        "/cart/add",
        "POST",
        {
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity,
          customTexts,
        },
        token
      );
      toast.success("Added to cart");
    } catch (err) {
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  if (!product) {
    return (
      <main className="px-6 py-32 min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-[var(--color-accent)]/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--color-accent)] animate-spin" />
        </div>
        <p className="text-[11px] uppercase tracking-[0.3em] font-bold opacity-40 animate-pulse">Loading product details...</p>
      </main>
    );
  }

  const pricing = getProductPricing(product.id, product.price);

  return (
    <main className="px-6 py-32 max-w-[1400px] mx-auto bg-[var(--color-paper)] min-h-screen">
      <Link href="/products" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 hover:opacity-100 transition mb-20 group">
        <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back to Collection
      </Link>

      <div className="grid lg:grid-cols-2 gap-20 items-start">

        {/* LEFT — IMAGES */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] bg-[var(--color-cream)] overflow-hidden rounded-sm relative"
          >
            {pricing.discountPercentage > 0 && (
              <div className="absolute top-6 left-6 bg-[var(--color-accent)] text-white text-xs font-bold px-4 py-2 uppercase tracking-widest z-10 shadow-sm">
                -{pricing.discountPercentage}% OFF
              </div>
            )}
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                src={selectedImage || "/placeholder.jpg"}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </motion.div>

          <div className="grid grid-cols-4 gap-4">
            {product?.images?.map((img: string, i: number) => (
              <div 
                key={i} 
                className={`aspect-square bg-[var(--color-cream)] overflow-hidden rounded-sm cursor-pointer transition-all duration-300 ${selectedImage === img ? 'opacity-100 ring-2 ring-[var(--color-accent)] ring-offset-2' : 'opacity-50 hover:opacity-100'}`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — DETAILS */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12"
        >
          <div>
            <span className="uppercase tracking-[0.3em] text-[10px] font-bold opacity-30 block mb-4">Handcrafted Piece</span>
            <h1 className="font-[family-name:var(--font-serif)] text-5xl lg:text-7xl mb-6">
              {product.name}
            </h1>
            <div className="flex items-end gap-4 mb-2">
              <p className="text-3xl font-bold text-[var(--color-accent)] uppercase tracking-widest">
                ₹{pricing.salePrice.toLocaleString()}
              </p>
              {pricing.discountPercentage > 0 && (
                <p className="text-xl font-bold uppercase tracking-widest opacity-40 line-through pb-1">
                  ₹{pricing.originalPrice.toLocaleString()}
                </p>
              )}
            </div>
            {pricing.discountPercentage > 0 && (
              <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--color-accent)] opacity-80 mt-2">
                Limited Time Offer Applied
              </p>
            )}
          </div>

          {product.description && (
            <p className="text-sm lg:text-base opacity-60 leading-relaxed font-medium max-w-lg font-serif whitespace-pre-wrap">
              {product.description}
            </p>
          )}

          {/* CTA */}
            <button
              onClick={() => {
                window.open(`https://wa.me/919324580059?text=${encodeURIComponent(`Hi, I'm interested in the product: ${product.name}`)}`, '_blank');
              }}
              className="
                w-full lg:w-fit
                bg-[#25D366]
                text-white
                min-w-[240px]
                px-20 py-5
                uppercase tracking-[0.2em] text-[10px] font-bold
                hover:bg-[#128C7E]
                transition-all duration-500
                shadow-xl
                flex justify-center items-center gap-3
              "
            >
              Contact on WhatsApp
            </button>

          <div className="pt-12 grid grid-cols-2 gap-8 border-t border-[#1A1A1A]/5">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80 mb-3">Authenticity</h4>
              <p className="text-[11px] opacity-40 leading-relaxed">Each piece comes with a certificate of authenticity from the artist.</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80 mb-3">Shipping</h4>
              <p className="text-[11px] opacity-40 leading-relaxed">Sustainably packaged and delivered within 7-10 working days.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}