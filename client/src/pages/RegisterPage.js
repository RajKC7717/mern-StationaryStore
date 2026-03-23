import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../api";
import Layout from "../components/Layout";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authApi.register(form);
      navigate("/login");
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1>Register</h1>
      <form onSubmit={onSubmit} className="form">
        <input className="input" name="name" placeholder="Name" value={form.name} onChange={onChange} />
        <input className="input" name="email" placeholder="Email" value={form.email} onChange={onChange} />
        <input className="input" name="password" placeholder="Password" type="password" value={form.password} onChange={onChange} />
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
        {error ? <div style={{ color: "var(--danger)" }}>{error}</div> : null}
      </form>
      <p className="muted" style={{ marginTop: 8 }}>
        Have an account? <Link to="/login">Login</Link>
      </p>
    </Layout>
  );
}


