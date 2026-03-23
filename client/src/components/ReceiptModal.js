import React, { useMemo, useRef } from "react";

export default function ReceiptModal({ visible, onClose, items, subtotal }) {
  const receiptRef = useRef(null);
  const now = useMemo(() => new Date(), []);

  if (!visible) return null;

  const download = () => {
    const el = receiptRef.current;
    if (!el) return;
    const blob = new Blob([el.outerHTML], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const ts = now.toISOString().replace(/[:.]/g, "-");
    a.download = `payslip-${ts}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="toolbar" style={{ justifyContent: "space-between", marginBottom: 12 }}>
          <h1>Payment Receipt</h1>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
        <div ref={receiptRef} className="receipt">
          <h2>MinimalShop</h2>
          <div className="muted">{now.toLocaleString()}</div>
          <div className="divider" />
          {items.map((it) => (
            <div key={it._id} className="receipt-row">
              <div>
                {it.name} <span className="muted">x{it.qty}</span>
              </div>
              <div>${(Number(it.price) * Number(it.qty)).toFixed(2)}</div>
            </div>
          ))}
          <div className="divider" />
          <div className="receipt-row">
            <strong>Total</strong>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
        </div>
        <div className="toolbar" style={{ justifyContent: "flex-end", marginTop: 12 }}>
          <button className="btn" onClick={download}>Download Payslip</button>
        </div>
      </div>
    </div>
  );
}


