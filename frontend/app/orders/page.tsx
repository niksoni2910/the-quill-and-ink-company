"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function OrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    apiRequest("/orders/my", "GET", undefined, token)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <main className="px-6 py-32 text-center opacity-70">
        Loading orders…
      </main>
    );
  }

  return (
    <main className="px-6 py-32 max-w-4xl mx-auto">
      <h1 className="font-[var(--font-serif)] text-5xl mb-12">
        My Orders
      </h1>

      {orders.length === 0 && (
        <p className="opacity-70">
          You haven’t placed any orders yet.
        </p>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="
              bg-[var(--color-blush)]
              border border-[var(--color-rose)]
              rounded-xl
              p-6
              space-y-2
            "
          >
            <div className="flex justify-between items-center">
              <p className="font-medium text-lg">
                ₹{order.price}
              </p>

              <span
                className={`
                  text-xs uppercase tracking-widest px-3 py-1 rounded-full
                  ${
                    order.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {order.completed ? "Completed" : "Pending"}
              </span>
            </div>

            <p className="text-sm opacity-80">
              {order.shipping_address}
            </p>

            <p className="text-xs opacity-60">
              Order ID: {order.id}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}