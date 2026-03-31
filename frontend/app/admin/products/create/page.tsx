"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const { token } = useAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    categoryId: "",
  });

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    apiRequest("/categories").then(setCategories);
  }, []);

  const createCategory = async () => {
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
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.categoryId || !images.length) {
      toast.error("All fields required");
      return;
    }

    await apiRequest(
      "/products",
      "POST",
      {
        name: form.name,
        price: Number(form.price),
        categoryId: form.categoryId,
        images,
      },
      token
    );

    toast.success("Product created");
    router.push("/products");
  };

  return (
    <main className="px-6 py-32 max-w-3xl mx-auto">
      <h1 className="text-4xl mb-10">Create Product</h1>

      <div className="space-y-6">
        <input
          placeholder="Product name"
          className="border p-3 w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-3 w-full"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        {/* CATEGORY DROPDOWN */}
        <select
          className="border p-3 w-full"
          value={form.categoryId}
          onChange={(e) =>
            setForm({ ...form, categoryId: e.target.value })
          }
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* ADD NEW CATEGORY */}
        <div className="flex gap-3">
          <input
            placeholder="Add new category"
            className="border p-3 flex-1"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            onClick={createCategory}
            className="border px-4"
          >
            Add
          </button>
        </div>

        {/* IMAGE UPLOAD (unchanged) */}
        <input
          type="file"
          multiple
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

        <button
          onClick={handleSubmit}
          className="border px-8 py-3"
        >
          Create Product
        </button>
      </div>
    </main>
  );
}