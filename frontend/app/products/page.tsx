"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, SlidersHorizontal, Search as SearchIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { getProductPricing } from "@/lib/utils";

function ProductsContent() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    apiRequest("/categories").then(setCategories);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (search) params.append("search", search);
    params.append("minPrice", String(minPrice));
    params.append("maxPrice", String(maxPrice));

    apiRequest(`/products?${params.toString()}`).then(setProducts);
  }, [minPrice, maxPrice, category, search]);

  const handleAddToCart = async (e: React.MouseEvent, p: any) => {
    e.preventDefault();
    try {
      await addToCart(p.id, p.name, p.price, 1, ["Standard"]);
      toast.success(`${p.name} added to cart!`);
    } catch (err: any) {
      toast.error(err.message || "Please login to add items");
    }
  };

  return (
    <main className="px-6 py-32 max-w-[1400px] mx-auto bg-[var(--color-paper)] min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <span className="uppercase tracking-[0.3em] text-[10px] font-bold opacity-40 block mb-3">Shop</span>
          <h1 className="font-[family-name:var(--font-serif)] text-5xl lg:text-7xl">
            Our Collections
          </h1>
        </div>
        <div className="flex flex-col items-end gap-4 w-full md:w-auto">
          <div className="flex items-center gap-6 text-[10px] uppercase font-bold tracking-widest opacity-40">
            <span>{products.length} Items Found</span>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center gap-2 text-black opacity-100"
            >
              <SlidersHorizontal className="w-3 h-3" /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-16">

        {/* FILTERS */}
        <aside className={`${isFilterOpen ? "block" : "hidden lg:block"} space-y-12`}>
          {/* ADMIN ACTION */}
          {user?.role === "admin" && (
            <Link
              href="/products/new"
              className="
                block w-full text-center
                bg-[var(--color-accent)] text-white
                py-4 mb-8
                rounded-sm
                text-[10px] uppercase tracking-[0.2em] font-bold
                hover:opacity-90 transition shadow-sm
              "
            >
              + Create Product
            </Link>
          )}

          {/* SEARCH IN FILTERS */}
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 mb-6 underline underline-offset-8">Search</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/5 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-[var(--color-accent)] outline-none rounded-sm transition"
              />
              <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20" />
            </div>
          </section>

          {/* CATEGORY */}
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 mb-6 underline underline-offset-8">Categories</h3>
            <ul className="space-y-4 text-[13px] font-medium tracking-wide">
              <li
                className={`cursor-pointer transition flex items-center gap-2 ${!category ? "text-[var(--color-accent)]" : "opacity-60 hover:opacity-100"}`}
                onClick={() => setCategory("")}
              >
                {!category && <div className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />}
                All Works
              </li>

              {categories.map((c) => (
                <li
                  key={c.id}
                  className={`cursor-pointer transition flex items-center gap-2 ${category === (c.slug || c.name.toLowerCase()) ? "text-[var(--color-accent)]" : "opacity-60 hover:opacity-100"}`}
                  onClick={() => setCategory(c.slug || c.name.toLowerCase())}
                >
                  {category === (c.slug || c.name.toLowerCase()) && <div className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />}
                  {c.name}
                </li>
              ))}
            </ul>
          </section>

          {/* PRICE FILTER */}
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 mb-6 underline underline-offset-8">Price Range</h3>
            <div className="space-y-6 px-1">
              <div className="flex justify-between text-[11px] font-bold opacity-60">
                <span>₹{minPrice}</span>
                <span>₹{maxPrice}</span>
              </div>
              <div className="space-y-8 relative pb-4">
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={100}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full accent-[var(--color-accent)] h-1 bg-black/5 rounded-full appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[var(--color-accent)] h-1 bg-black/5 rounded-full appearance-none cursor-pointer"
                />
                <p className="text-[10px] opacity-40 italic mt-8">* Filter by budget</p>
              </div>
            </div>
          </section>
        </aside>

        {/* PRODUCTS GRID */}
        <section className="flex-1">
          {products.length === 0 ? (
            <div className="py-20 text-center opacity-40 italic">No products found for this selection.</div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <AnimatePresence mode="popLayout">
                {products.map((p) => {
                  const pricing = getProductPricing(p.id, p.price);
                  return (
                    <motion.div
                      key={p.id}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                      }}
                      layout
                    >
                      <Link href={`/products/${p.id}`} className="block group">
                        <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-[var(--color-cream)]">
                          <motion.img
                            src={p.image_base64}
                            alt={p.name}
                            className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                          
                          {/* SALE BADGE */}
                          {pricing.discountPercentage > 0 && (
                            <div className="absolute top-4 left-4 bg-[var(--color-accent)] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10">
                              -{pricing.discountPercentage}%
                            </div>
                          )}

                          {/* ADD TO CART ACTION */}
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 w-[80%] z-20">
                            <button
                              onClick={(e) => handleAddToCart(e, p)}
                              className="bg-white text-[10px] uppercase font-bold tracking-widest py-3 px-4 shadow-xl hover:bg-black hover:text-white transition w-full flex items-center justify-center gap-2"
                            >
                              <Plus className="w-3 h-3" /> Add to Cart
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h2 className="font-[family-name:var(--font-serif)] text-xl group-hover:text-[var(--color-accent)] transition-colors duration-300 truncate">{p.name}</h2>
                          <div className="flex items-center gap-3">
                            <p className="text-[13px] font-bold uppercase tracking-widest">
                              ₹{pricing.salePrice.toLocaleString()}
                            </p>
                            {pricing.discountPercentage > 0 && (
                              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 line-through">
                                ₹{pricing.originalPrice.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="py-40 text-center opacity-50">Loading collection...</div>}>
      <ProductsContent />
    </Suspense>
  );
}