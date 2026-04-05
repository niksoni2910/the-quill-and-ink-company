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
        description: "",
        images_base64: [] as string[], // Store multiple images
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

    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 1200;
                    const MAX_HEIGHT = 1200;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(img, 0, 0, width, height);
                    // Compress to 0.7 quality JPEG to save space
                    resolve(canvas.toDataURL("image/jpeg", 0.7));
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setLoading(true); // Show a loading state while compressing
            try {
                const promises = files.map((file) => compressImage(file));
                const compressedImages = await Promise.all(promises);
                
                setForm(prev => ({ 
                    ...prev, 
                    images_base64: [...prev.images_base64, ...compressedImages] 
                }));
            } catch (err) {
                toast.error("Error processing images");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        {/* Token check removed since login is disabled */}

        if (!form.name || !form.price || !form.categoryId || form.images_base64.length === 0) {
            toast.error("Please fill all fields and upload at least one image");
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
                    description: form.description,
                    images: form.images_base64, // Pass the entire array
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

                {/* DESCRIPTION */}
                <div>
                    <label className="block text-sm mb-2 opacity-80">Description</label>
                    <textarea
                        rows={4}
                        className="w-full p-3 border border-[var(--color-rose)] rounded bg-white/60"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
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
                    <label className="block text-sm mb-2 opacity-80">Product Images</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="w-full text-sm"
                    />
                    <div className="flex gap-4 flex-wrap mt-4">
                        {form.images_base64.map((img, idx) => (
                            <div key={idx} className="relative group">
                                <img
                                    src={img}
                                    alt="Preview"
                                    className="w-24 h-24 object-cover rounded shadow"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newImages = [...form.images_base64];
                                        newImages.splice(idx, 1);
                                        setForm({ ...form, images_base64: newImages });
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
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
