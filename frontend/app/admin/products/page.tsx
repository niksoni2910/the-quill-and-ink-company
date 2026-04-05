"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import Link from "next/link";
import { Trash2, Edit2, Plus, ArrowLeft } from "lucide-react";

export default function AdminProductsPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const data = await apiRequest("/products");
      setProducts(data);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await apiRequest(`/products/${id}`, "DELETE", null, token);
      toast.success("Product deleted");
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  if (loading) return <div className="pt-32 text-center opacity-50">Loading products...</div>;

  return (
    <main className="px-6 py-24 max-w-6xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
        <div>
          <Link href="/admin/orders" className="text-xs uppercase tracking-widest opacity-40 hover:opacity-100 flex items-center gap-2 mb-4">
            <ArrowLeft className="w-3 h-3" /> Dashboard
          </Link>
          <h1 className="font-[family-name:var(--font-serif)] text-5xl italic">Products</h1>
        </div>
        
        <Link 
          href="/admin/products/create"
          className="bg-[var(--color-ink)] text-white px-8 py-4 rounded-sm text-[10px] uppercase tracking-widest font-bold hover:bg-[var(--color-accent)] transition-all flex items-center gap-3"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </Link>
      </div>

      <div className="bg-white border border-black/5 shadow-sm rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f9f9f9] border-b border-black/5">
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">Product</th>
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">Category</th>
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">Price</th>
              <th className="p-6 text-right text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-12 text-center opacity-30 italic">No products found</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      {product.image_base64 ? (
                        <img 
                          src={product.image_base64} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded-sm border border-black/5"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-sm border border-black/5 opacity-20">
                          ?
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        {product.badge && (
                          <span className="text-[9px] uppercase tracking-tighter text-[var(--color-accent)] font-bold">{product.badge}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-xs opacity-60">{product.category_name || 'Uncategorized'}</span>
                  </td>
                  <td className="p-6">
                    <span className="text-sm font-medium">₹{Number(product.price).toLocaleString()}</span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-3 text-[var(--color-ink)]">
                      <Link 
                        href={`/admin/products/edit/${product.id}`}
                        className="p-2 hover:text-[var(--color-accent)] transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-2 hover:text-red-500 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
