"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "./AuthContext";

interface CartItem {
    id: number;
    product_id: number;
    product_name: string;
    price: number;
    quantity: number;
    image_base64: string;
    custom_texts: string[];
}

interface CartContextType {
    cartItems: CartItem[];
    cartCount: number;
    fetchCart: () => void;
    addToCart: (productId: number, productName: string, price: number, quantity: number, customTexts: string[]) => Promise<void>;
    removeFromCart: (itemId: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { token } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const fetchCart = async () => {
        if (!token) {
            setCartItems([]);
            return;
        }
        try {
            const data = await apiRequest("/cart", "GET", null, token);
            setCartItems(data.items || []);
        } catch (err) {
            console.error("Fetch cart error:", err);
        }
    };

    const addToCart = async (productId: number, productName: string, price: number, quantity: number, customTexts: string[]) => {
        if (!token) throw new Error("Please login to add items to cart");

        try {
            await apiRequest("/cart/add", "POST", { productId, productName, price, quantity, customTexts }, token);
            await fetchCart();
        } catch (err) {
            console.error("Add to cart error:", err);
            throw err;
        }
    };

    const removeFromCart = async (itemId: number) => {
        try {
            await apiRequest(`/cart/item/${itemId}`, "DELETE", null, token);
            await fetchCart();
        } catch (err) {
            console.error("Remove item error:", err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [token]);

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, cartCount, fetchCart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
