"use client";

import { useEffect, useState, use } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2, X, Plus } from "lucide-react";
import Link from "next/link";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { token } = useAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    categoryId: "",
    badge: "",
    description: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [product, cats] = await Promise.all([
          apiRequest(`/products/${id}`),
          apiRequest("/categories")
        ]);
        
        setForm({
          name: product.name,
          price: product.price.toString(),
          categoryId: product.category_id || "",
          badge: product.badge || "",
          description: product.description || "",
        });
        setImages(product.images || []);
        setCategories(cats);
      } catch (err) {
        toast.error("Failed to load product data");
        router.push("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  const handleSubmit = async () => {
    if (!form.name || !form.price) {
      toast.error("Name and Price are required");
      return;
    }

    try {
      await apiRequest(
        `/products/${id}`,
        "PUT",
        {
          name: form.name,
          price: Number(form.price),
          category_id: form.categoryId || null,
          badge: form.badge || null,
          description: form.description || null,
          images, // Replaces existing images
        },
        token
      );

      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) return <div className="pt-32 text-center opacity-50 font-medium">Preparing the atelier...</div>;

  return (
    <main className="px-6 py-24 max-w-4xl mx-auto min-h-screen">
      <div className="mb-12">
        <Link href="/admin/products" className="text-xs uppercase tracking-widest opacity-40 hover:opacity-100 flex items-center gap-2 mb-6">
          <ArrowLeft className="w-3 h-3" /> Back to Products
        </Link>
        <h1 className="font-[family-name:var(--font-serif)] text-5xl italic">Edit Product</h1>
      </div>

      <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start">
        <div className="space-y-8 bg-white p-10 border border-black/5 rounded-sm shadow-sm">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-30 italic">Product Name</label>
            <input
              placeholder="e.g. Personalized Gold Foil Journal"
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
                placeholder="2500"
                className="w-full border-b border-black/10 py-3 font-medium outline-none focus:border-[var(--color-accent)] transition-colors"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-30 italic">Category</label>
              <select
                className="w-full border-b border-black/10 py-3 font-medium outline-none focus:border-[var(--color-accent)] transition-colors bg-transparent appearance-none"
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              >
                <option value="">No Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-30 italic">Badge (Optional)</label>
            <input
              placeholder="Best Seller / Handcrafted / Gold Edition"
              className="w-full border-b border-black/10 py-3 font-medium outline-none focus:border-[var(--color-accent)] transition-colors text-xs"
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-30 italic">Description</label>
            <textarea
              placeholder="Tell the story of this product..."
              className="w-full border border-black/5 p-4 rounded-sm min-h-[200px] text-sm leading-relaxed outline-none focus:border-[var(--color-accent)] transition-colors bg-gray-50/30"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-8">
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
              * The first image in the gallery will be used as the primary display image.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[var(--color-ink)] text-white py-5 rounded-sm text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[var(--color-accent)] transition-all shadow-xl"
          >
            Save Masterpiece
          </button>
        </div>
      </div>
    </main>
  );
}
