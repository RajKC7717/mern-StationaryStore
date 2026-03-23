import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems((curr) => {
      const i = curr.findIndex((x) => x._id === product._id);
      if (i >= 0) {
        const next = [...curr];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...curr, { ...product, qty }];
    });
  };

  const removeItem = (productId) => setItems((curr) => curr.filter((x) => x._id !== productId));
  const setQty = (productId, qty) => setItems((curr) => curr.map((x) => (x._id === productId ? { ...x, qty } : x)));
  const clear = () => setItems([]);

  const subtotal = items.reduce((sum, x) => sum + Number(x.price) * Number(x.qty), 0);

  const value = useMemo(() => ({ items, addItem, removeItem, setQty, clear, subtotal }), [items, subtotal]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}


