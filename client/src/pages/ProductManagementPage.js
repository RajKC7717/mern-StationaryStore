import React, { useEffect, useState } from "react";
import { productsApi } from "../api";
import { useAuth } from "../AuthContext";
import Layout from "../components/Layout";

const empty = { name: "", description: "", price: 0, inStock: true };

export default function ProductManagementPage() {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  async function refresh() {
    try {
      const data = await productsApi.list();
      setProducts(data);
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editingId) {
        await productsApi.update(editingId, { ...form, price: Number(form.price) });
      } else {
        await productsApi.create({ ...form, price: Number(form.price) });
      }
      setForm(empty);
      setEditingId(null);
      await refresh();
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    }
  };

  const onEdit = (p) => {
    setEditingId(p._id);
    setForm({ name: p.name, description: p.description || "", price: p.price, inStock: !!p.inStock });
  };

  const onDelete = async (id) => {
    try {
      await productsApi.remove(id);
      await refresh();
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    }
  };

  return (
    <Layout>
      <div className="toolbar" style={{ justifyContent: "space-between" }}>
        <h1>Product Management</h1>
        <button className="btn btn-ghost" onClick={logout}>Logout</button>
      </div>
      {error ? <div style={{ color: "var(--danger)" }}>{error}</div> : null}
      <form onSubmit={onSubmit} className="form" style={{ marginBottom: 24 }}>
        <input className="input" name="name" placeholder="Name" value={form.name} onChange={onChange} required />
        <input className="input" name="description" placeholder="Description" value={form.description} onChange={onChange} />
        <input className="input" name="price" type="number" min="0" step="0.01" placeholder="Price" value={form.price} onChange={onChange} required />
        <label className="row">
          <input name="inStock" type="checkbox" checked={form.inStock} onChange={onChange} /> <span className="muted">In stock</span>
        </label>
        <div className="toolbar">
          <button className="btn btn-primary" type="submit">{editingId ? "Update" : "Create"}</button>
          {editingId ? <button className="btn" type="button" onClick={() => { setEditingId(null); setForm(empty); }}>Cancel</button> : null}
        </div>
      </form>
      <div className="grid">
        {products.map((p) => (
          <div key={p._id} className="card surface">
            <div className="toolbar" style={{ justifyContent: "space-between" }}>
              <strong>{p.name}</strong>
              <span className="muted">${p.price}</span>
            </div>
            <p className="muted">{p.description || "No description"}</p>
            <div className="toolbar" style={{ justifyContent: "space-between" }}>
              <span className="muted">{p.inStock ? "In Stock" : "Out of Stock"}</span>
              <div className="toolbar">
                <button className="btn" onClick={() => onEdit(p)}>Edit</button>
                <button className="btn btn-danger" onClick={() => onDelete(p._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}


