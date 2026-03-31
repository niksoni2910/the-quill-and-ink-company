"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProfilePage() {
  const { token, user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) return;

    apiRequest("/users/me", "GET", undefined, token)
      .then((data) => {
        setForm({
          name: data.name,
          email: data.email,
          phoneNumber: data.phone_number || "",
          address: data.address || "",
        });
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (!token) {
    return (
      <main className="px-6 py-32 text-center opacity-70">
        Please login to view your profile.
      </main>
    );
  }

  if (loading) {
    return (
      <main className="px-6 py-32 text-center opacity-70">
        Loading profile…
      </main>
    );
  }

  const handleSave = async () => {
    try {
      setSaving(true);
      await apiRequest("/users/me", "PUT", {
        name: form.name,
        phoneNumber: form.phoneNumber,
        address: form.address,
      }, token);
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="px-6 py-32 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-[var(--font-serif)] text-5xl">
          My Account
        </h1>
        {token && (
          <button
            onClick={logout}
            className="text-sm opacity-60 hover:text-[var(--color-accent)] underline"
          >
            Logout
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-12">
        {/* SIDEBAR TABS */}
        <aside className="space-y-1">
          <button
            onClick={() => setActiveTab("profile")}
            className={`block w-full text-left px-4 py-2 rounded ${activeTab === "profile" ? "bg-[var(--color-blush)] font-medium" : "opacity-60 hover:opacity-100"}`}
          >
            Profile Details
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`block w-full text-left px-4 py-2 rounded ${activeTab === "orders" ? "bg-[var(--color-blush)] font-medium" : "opacity-60 hover:opacity-100"}`}
          >
            Order History
          </button>
          {/* Admin Link */}
          {user?.role === "admin" && (
            <Link
              href="/admin/orders"
              className="block w-full text-left px-4 py-2 opacity-60 hover:opacity-100 hover:text-[var(--color-accent)]"
            >
              Admin Dashboard →
            </Link>
          )}
        </aside>

        {/* CONTENT AREA */}
        <section>
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-medium mb-6">Profile Details</h2>
              {/* NAME */}
              <div>
                <label className="block text-sm mb-2 opacity-80">Name</label>
                <input
                  className="w-full p-3 border border-[var(--color-rose)] bg-white/60 rounded focus:border-[var(--color-accent)] outline-none"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              {/* EMAIL */}
              <div>
                <label className="block text-sm mb-2 opacity-80">Email</label>
                <input
                  className="w-full p-3 border border-[var(--color-rose)] bg-black/5 rounded opacity-70"
                  value={form.email}
                  disabled
                />
              </div>
              {/* PHONE */}
              <div>
                <label className="block text-sm mb-2 opacity-80">Phone number</label>
                <input
                  className="w-full p-3 border border-[var(--color-rose)] bg-white/60 rounded focus:border-[var(--color-accent)] outline-none"
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                />
              </div>
              {/* ADDRESS */}
              <div>
                <label className="block text-sm mb-2 opacity-80">Address</label>
                <textarea
                  rows={3}
                  className="w-full p-3 border border-[var(--color-rose)] bg-white/60 rounded focus:border-[var(--color-accent)] outline-none"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[var(--color-accent)] text-white px-8 py-3 rounded hover:opacity-90 transition disabled:opacity-50 mt-4"
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          )}

          {activeTab === "orders" && <MyOrdersList />}
        </section>
      </div>
    </main>
  );
}

function MyOrdersList() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest("/orders/my", "GET", undefined, token)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="opacity-60">Loading orders...</div>;
  if (orders.length === 0) return <div className="opacity-60">No orders found.</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-6">Order History</h2>
      {orders.map((order) => (
        <div key={order.id} className="border border-[var(--color-rose)] rounded-lg p-6 bg-white/60">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-mono text-xs opacity-50 mb-1">#{order.id.slice(0, 8)}</p>
              <p className="text-sm opacity-70">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`
                px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide
                ${order.status === "delivered"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
                }
              `}
            >
              {order.status}
            </span>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-60 mb-1">Total Amount</p>
              <p className="font-medium text-lg">₹{order.price}</p>
            </div>
            {order.status === "delivered" ? (
              <span className="text-xs text-green-600 font-medium">✓ Completed</span>
            ) : (
              <span className="text-xs text-yellow-600 font-medium">◷ In Progress</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}