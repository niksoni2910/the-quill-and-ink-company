"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("Name, email, and password are required");
      return;
    }

    try {
      setLoading(true);

      await apiRequest("/auth/register", "POST", form);

      toast.success("Registered successfully");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-6 py-32 max-w-md mx-auto">
      <h1 className="font-[var(--font-serif)] text-5xl mb-12 text-center">
        Register
      </h1>

      {/* FORM CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          bg-[var(--color-blush)]
          border border-[var(--color-rose)]
          rounded-xl
          p-8
          space-y-6
        "
      >
        {/* NAME */}
        <div>
          <label className="block text-sm mb-2 opacity-80">
            Name
          </label>
          <input
            placeholder="Your full name"
            className="
              w-full p-3
              border border-[var(--color-rose)]
              bg-white/60
              rounded
              focus:outline-none
              focus:border-[var(--color-accent)]
            "
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm mb-2 opacity-80">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="
              w-full p-3
              border border-[var(--color-rose)]
              bg-white/60
              rounded
              focus:outline-none
              focus:border-[var(--color-accent)]
            "
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm mb-2 opacity-80">
            Password
          </label>
          <input
            type="password"
            placeholder="Create a password"
            className="
              w-full p-3
              border border-[var(--color-rose)]
              bg-white/60
              rounded
              focus:outline-none
              focus:border-[var(--color-accent)]
            "
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="block text-sm mb-2 opacity-80">
            Phone number (optional)
          </label>
          <input
            placeholder="+91 XXXXX XXXXX"
            className="
              w-full p-3
              border border-[var(--color-rose)]
              bg-white/60
              rounded
              focus:outline-none
              focus:border-[var(--color-accent)]
            "
            value={form.phoneNumber}
            onChange={(e) =>
              setForm({ ...form, phoneNumber: e.target.value })
            }
          />
        </div>

        {/* ADDRESS */}
        <div>
          <label className="block text-sm mb-2 opacity-80">
            Address (optional)
          </label>
          <textarea
            rows={3}
            placeholder="Your delivery address"
            className="
              w-full p-3
              border border-[var(--color-rose)]
              bg-white/60
              rounded
              focus:outline-none
              focus:border-[var(--color-accent)]
            "
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />
        </div>

        {/* CTA */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            w-full
            bg-[var(--color-accent)]
            text-white
            py-3
            uppercase tracking-widest text-sm
            hover:opacity-90
            transition
            disabled:opacity-50
          "
        >
          {loading ? "Registering…" : "Register"}
        </button>
      </motion.div>

      {/* LOGIN LINK */}
      <p className="mt-8 text-sm text-center opacity-80">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[var(--color-accent)] hover:underline"
        >
          Login
        </Link>
      </p>
    </main>
  );
}