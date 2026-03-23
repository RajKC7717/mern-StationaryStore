import React, { useEffect, useState } from "react";
import { productsApi } from "../api";
import Layout from "../components/Layout";
import { useCart } from "../CartContext";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addItem, items } = useCart();

  useEffect(() => {
    let mounted = true;
    productsApi
      .list()
      .then((data) => {
        if (mounted) setProducts(data);
      })
      .catch((e) => setError(e.message || "Failed to load"))
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <Layout><div className="section">Loading...</div></Layout>;
  if (error) return <Layout><div className="section" style={{ color: "var(--danger)" }}>{error}</div></Layout>;

  return (
    <Layout>
      <h1>Products</h1>
      <div className="grid">
        {products.map((p) => {
          const inCart = items.find((x) => x._id === p._id);
          const qty = inCart?.qty || 0;
          return (
          <div key={p._id} className="card surface">
            <div className="toolbar" style={{ justifyContent: "space-between" }}>
              <h3>{p.name}</h3>
              {qty > 0 ? <span className="badge" title="Quantity in cart">{qty}</span> : null}
            </div>
            <p className="muted">{p.description || "No description"}</p>
            <div className="toolbar" style={{ justifyContent: "space-between" }}>
              <span>${p.price}</span>
              <div className="toolbar">
                <span className="muted">{p.inStock ? "In Stock" : "Out of Stock"}</span>
                {p.inStock ? (
                  <button className="btn btn-primary" onClick={() => addItem(p, 1)}>
                    {qty > 0 ? "Add More" : "Add to Cart"}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        );})}
      </div>
    </Layout>
  );
}


