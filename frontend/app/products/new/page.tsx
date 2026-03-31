"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function CreateProductPage() {
    const router = useRouter();
    const { token } = useAuth();

    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // New Category State
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [creatingCategory, setCreatingCategory] = useState(false);

    const [form, setForm] = useState({
        name: "",
        price: "",
        categoryId: "",
        image_base64: "", // We will convert file to base64
    });

    useEffect(() => {
        apiRequest("/categories").then(setCategories);
    }, []);

    const handleCreateCategory = async () => {
        if (!newCategoryName) return;
        try {
            setCreatingCategory(true);
            // Assuming slug is generated from name, but backend requires it. 
            // Let's assume backend generates slug or we do it here. 
            // Checking createCategory controller... assumed name & slug required.
            const slug = newCategoryName.toLowerCase().replace(/ /g, "-");

            const newCat = await apiRequest("/categories", "POST", {
                name: newCategoryName,
                slug: slug
            }, token);

            setCategories([...categories, newCat]);
            setForm({ ...form, categoryId: newCat.id });
            setShowNewCategoryInput(false);
            setNewCategoryName("");
            toast.success("Category created!");
        } catch (err: any) {
            toast.error(err.message || "Failed to create category");
        } finally {
            setCreatingCategory(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm({ ...form, image_base64: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            toast.error("Please login first");
            return;
        }

        if (!form.name || !form.price || !form.categoryId || !form.image_base64) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            await apiRequest(
                "/products",
                "POST",
                {
                    name: form.name,
                    price: Number(form.price),
                    category_id: form.categoryId,
                    images: [form.image_base64], // Backend expects array
                },
                token
            );
            toast.success("Product created!");
            router.push("/products");
        } catch (err: any) {
            toast.error(err.message || "Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-6 py-32 max-w-xl mx-auto"
        >
            <h1 className="font-[var(--font-serif)] text-4xl mb-8">Create Product</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* NAME */}
                <div>
                    <label className="block text-sm mb-2 opacity-80">Product Name</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-[var(--color-rose)] rounded bg-white/60"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>

                {/* PRICE */}
                <div>
                    <label className="block text-sm mb-2 opacity-80">Price (₹)</label>
                    <input
                        type="number"
                        className="w-full p-3 border border-[var(--color-rose)] rounded bg-white/60"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />
                </div>

                {/* CATEGORY */}
                <div>
                    <label className="block text-sm mb-2 opacity-80">Category</label>
                    <div className="flex gap-2">
                        {!showNewCategoryInput ? (
                            <select
                                className="w-full p-3 border border-[var(--color-rose)] rounded bg-white/60"
                                value={form.categoryId}
                                onChange={(e) => {
                                    if (e.target.value === "new") {
                                        setShowNewCategoryInput(true);
                                    } else {
                                        setForm({ ...form, categoryId: e.target.value });
                                    }
                                }}
                            >
                                <option value="">Select Category</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                                <option value="new" className="font-bold text-[var(--color-accent)]">
                                    + Create New Category
                                </option>
                            </select>
                        ) : (
                            <div className="flex w-full gap-2">
                                <input
                                    type="text"
                                    placeholder="New Category Name"
                                    className="w-full p-3 border border-[var(--color-rose)] rounded bg-white/60"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={handleCreateCategory}
                                    disabled={creatingCategory}
                                    className="bg-[var(--color-accent)] text-white px-4 rounded"
                                >
                                    {creatingCategory ? "..." : "Add"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowNewCategoryInput(false)}
                                    className="text-sm opacity-60 underline"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {/* IMAGE */}
                <div>
                    <label className="block text-sm mb-2 opacity-80">Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full text-sm"
                    />
                    {form.image_base64 && (
                        <img
                            src={form.image_base64}
                            alt="Preview"
                            className="mt-4 w-32 h-32 object-cover rounded shadow"
                        />
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="
            w-full
            bg-[var(--color-accent)]
            text-white
            py-4
            rounded
            uppercase tracking-widest text-sm
            hover:opacity-90
            transition
            disabled:opacity-50
          "
                >
                    {loading ? "Creating..." : "Create Product"}
                </button>
            </form>
        </motion.main>
    );
}
