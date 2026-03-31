"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await apiRequest("/auth/login", "POST", {
        email,
        password,
      });

      login(res.token);

      toast.success("Logged in successfully");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-6 py-32 max-w-md mx-auto">
      <h1 className="font-[var(--font-serif)] text-5xl mb-12 text-center">
        Login
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm mb-2 opacity-80">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="
              w-full p-3
              border border-[var(--color-rose)]
              bg-white/60
              rounded
              focus:outline-none
              focus:border-[var(--color-accent)]
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* CTA */}
        <button
          onClick={handleLogin}
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
          {loading ? "Logging in…" : "Login"}
        </button>
      </motion.div>

      {/* REGISTER LINK */}
      <p className="mt-8 text-sm text-center opacity-80">
        Don’t have an account?{" "}
        <Link
          href="/register"
          className="text-[var(--color-accent)] hover:underline"
        >
          Register
        </Link>
      </p>
    </main>
  );
}