import React, { useState } from "react";
import Layout from "../components/Layout";
import { useCart } from "../CartContext";
import ReceiptModal from "../components/ReceiptModal";

export default function CartPage() {
  const { items, setQty, removeItem, clear, subtotal } = useCart();
  const [showReceipt, setShowReceipt] = useState(false);

  return (
    <Layout>
      <h1>Cart</h1>
      {items.length === 0 ? (
        <p className="muted">Your cart is empty.</p>
      ) : (
        <div className="surface" style={{ padding: 16 }}>
          {items.map((item) => (
            <div key={item._id} className="toolbar" style={{ justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <strong>{item.name}</strong>
                <div className="muted">${item.price}</div>
              </div>
              <div className="toolbar">
                <input
                  className="input"
                  style={{ width: 80 }}
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) => setQty(item._id, Number(e.target.value))}
                />
                <button className="btn btn-danger" onClick={() => removeItem(item._id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="toolbar" style={{ justifyContent: "space-between", marginTop: 16 }}>
            <strong>Total</strong>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="toolbar" style={{ justifyContent: "flex-end", marginTop: 12 }}>
            <button className="btn" onClick={clear}>Clear Cart</button>
            <button className="btn btn-primary" onClick={() => setShowReceipt(true)}>Checkout</button>
          </div>
        </div>
      )}
      <ReceiptModal visible={showReceipt} onClose={() => setShowReceipt(false)} items={items} subtotal={subtotal} />
    </Layout>
  );
}


