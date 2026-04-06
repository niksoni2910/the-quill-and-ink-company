"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ArrowLeft, X, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CreateProductPage() {
  const { token } = useAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<any[]>([]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
    categoryId: "",
    badge: "",
    description: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await apiRequest("/categories");
        setCategories(cats);
      } catch (err) {
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    if (!newCategory) return;
    try {
      const slug = newCategory.toLowerCase().replace(/\s+/g, "-");
      const category = await apiRequest(
        "/categories",
        "POST",
        { name: newCategory, slug },
        token
      );
      setCategories((prev) => [...prev, category]);
      setForm({ ...form, categoryId: category.id });
      setNewCategory("");
      setShowNewCategoryInput(false);
      toast.success("New category created");
    } catch (err) {
      toast.error("Failed to create category");
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.categoryId) {
      toast.error("Please fill in Name, Price, and Category");
      return;
    }

    if (images.length === 0) {
      toast.error("At least one image is required");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest(
        "/products",
        "POST",
        {
          name: form.name,
          price: Number(form.price),
          category_id: form.categoryId,
          badge: form.badge || null,
          description: form.description || null,
          images,
        },
        token
      );

      toast.success("New masterpiece added to the collection");
      router.push("/admin/products");
    } catch (err) {
      toast.error("Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) return <div className="pt-32 text-center opacity-50 font-medium">Preparing the atelier...</div>;

  return (
    <main className="px-6 py-24 max-w-4xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <Link href="/admin/products" className="text-xs uppercase tracking-widest opacity-40 hover:opacity-100 flex items-center gap-2 mb-6 transition-all">
          <ArrowLeft className="w-3 h-3" /> Back to Products
        </Link>
        <div className="flex items-center gap-4">
          <h1 className="font-[family-name:var(--font-serif)] text-5xl italic">New Creation</h1>
          <Sparkles className="w-6 h-6 text-[var(--color-rose)] opacity-50" />
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-8 bg-white p-10 border border-black/5 rounded-sm shadow-sm"
        >
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-30 italic">Product Name</label>
            <input
              placeholder="e.g. Personalized Greeting Set"
              className="w-full border-b border-black/10 py-3 font-medium outline-none focus:border-[var(--color-accent)] transition-colors text-lg"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-30 italic">Price (₹)</label>
              <input
                type="number"
                placeholder="1500"
                className="w-full border-b border-black/10 py-3 font-medium outline-none focus:border-[var(--color-accent)] transition-colors"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-30 italic">Category</label>
              <div className="relative">
                <select
                  className="w-full border-b border-black/10 py-3 font-medium outline-none focus:border-[var(--color-accent)] transition-colors bg-transparent appearance-none pr-8"
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                >
                  <option value="">Select a category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                   <Plus className="w-3 h-3" />
                </div>
              </div>
              
              {!showNewCategoryInput ? (
                <button 
                  onClick={() => setShowNewCategoryInput(true)}
                  className="text-[9px] uppercase tracking-widest font-bold text-[var(--color-rose)] mt-2 hover:opacity-70 transition"
                >
                  + Add New Category
                </button>
              ) : (
                <div className="flex gap-2 mt-4 animate-in slide-in-from-top-2 duration-300">
                  <input
                    placeholder="Category Name"
                    className="flex-1 border-b border-black/10 py-1 text-xs outline-none focus:border-[var(--color-rose)]"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <button onClick={handleCreateCategory} className="text-[10px] font-bold text-[var(--color-ink)] uppercase">Save</button>
                  <button onClick={() => setShowNewCategoryInput(false)} className="text-[10px] font-bold opacity-30 uppercase">Cancel</button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-30 italic">Badge (Optional)</label>
            <input
              placeholder="Limited Edition / New Arrival / Best Seller"
              className="w-full border-b border-black/10 py-3 font-medium outline-none focus:border-[var(--color-accent)] transition-colors text-xs"
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-30 italic">Description</label>
            <textarea
              placeholder="Describe the soul of this product..."
              className="w-full border border-black/5 p-4 rounded-sm min-h-[200px] text-sm leading-relaxed outline-none focus:border-[var(--color-accent)] transition-colors bg-gray-50/30"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="bg-white p-8 border border-black/5 rounded-sm shadow-sm space-y-6">
            <h3 className="text-[10px] uppercase tracking-widest font-bold opacity-40 italic">Gallery</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative group aspect-square rounded-sm overflow-hidden border border-black/5 bg-gray-50">
                  <img src={img} alt="Product" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-white/90 p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-red-500" />
                  </button>
                </div>
              ))}
              
              <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-black/5 rounded-sm cursor-pointer hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/5 transition-all">
                <Plus className="w-5 h-5 opacity-20" />
                <span className="text-[8px] uppercase tracking-widest font-bold opacity-30 mt-2">Add Image</span>
                <input
                  type="file"
                  multiple
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    Array.from(e.target.files || []).forEach((file) => {
                      const reader = new FileReader();
                      reader.onloadend = () =>
                        setImages((prev) => [...prev, reader.result as string]);
                      reader.readAsDataURL(file);
                    });
                  }}
                />
              </label>
            </div>
            
            <p className="text-[9px] opacity-40 italic leading-relaxed">
              * The first image will be the primary visual for the shop pages.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-[var(--color-ink)] text-white py-5 rounded-sm text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[var(--color-accent)] transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isSubmitting ? "Creating..." : (
              <span className="flex items-center justify-center gap-2">
                Release Masterpiece <Sparkles className="w-3 h-3 group-hover:animate-pulse" />
              </span>
            )}
          </button>
        </motion.div>
      </div>
    </main>
  );
}