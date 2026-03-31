"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
    const { token, user, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;
        if (!token || user?.role !== "admin") {
            setLoading(false);
            return;
        }

        apiRequest("/orders/admin", "GET", undefined, token)
            .then(setOrders)
            .catch((err) => toast.error(err.message))
            .finally(() => setLoading(false));
    }, [token, user, authLoading]);

    const updateStatus = async (id: string, newStatus: string) => {
        toast.promise(
            apiRequest(`/orders/admin/${id}/status`, "PUT", { status: newStatus }, token),
            {
                loading: "Updating...",
                success: "Status updated",
                error: "Failed to update",
            }
        ).then(() => {
            setOrders((prev) =>
                prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
            );
        });
    };

    if (loading) return <div className="p-24 text-center">Loading orders...</div>;

    if (user?.role !== "admin") {
        return <div className="p-24 text-center">Access Denied</div>;
    }

    return (
        <main className="px-6 py-24 max-w-6xl mx-auto">
            <h1 className="font-[var(--font-serif)] text-4xl mb-12">Admin Orders</h1>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="pb-4">Order ID</th>
                            <th className="pb-4">Customer</th>
                            <th className="pb-4">Price</th>
                            <th className="pb-4">Date</th>
                            <th className="pb-4">Status</th>
                            <th className="pb-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="py-4 font-mono text-xs opacity-70">{order.id}</td>
                                <td className="py-4">
                                    <div>{order.user_name}</div>
                                    <div className="text-xs opacity-60">{order.user_email}</div>
                                    <div className="text-xs opacity-60 mt-1">{order.shipping_address}</div>
                                </td>
                                <td className="py-4">₹{order.price}</td>
                                <td className="py-4 opacity-70">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </td>
                                <td className="py-4">
                                    <span
                                        className={`
                      px-2 py-1 rounded text-xs uppercase tracking-wider
                      ${order.status === "delivered"
                                                ? "bg-green-100 text-green-800"
                                                : order.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-gray-100"
                                            }
                    `}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-4">
                                    {order.status === "pending" && (
                                        <button
                                            onClick={() => updateStatus(order.id, "delivered")}
                                            className="text-xs bg-black text-white px-3 py-1 rounded hover:opacity-80"
                                        >
                                            Mark Delivered
                                        </button>
                                    )}
                                    {order.status === "delivered" && (
                                        <button
                                            onClick={() => updateStatus(order.id, "pending")}
                                            className="text-xs underline opacity-50 hover:opacity-100"
                                        >
                                            Revert to Pending
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
