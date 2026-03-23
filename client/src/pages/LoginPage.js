import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../api";
import { useAuth } from "../AuthContext";
import Layout from "../components/Layout";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token, user } = await authApi.login(form);
      login(token, user);
      navigate("/manage");
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1>Login</h1>
      <form onSubmit={onSubmit} className="form">
        <input className="input" name="email" placeholder="Email" value={form.email} onChange={onChange} />
        <input className="input" name="password" placeholder="Password" type="password" value={form.password} onChange={onChange} />
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        {error ? <div style={{ color: "var(--danger)" }}>{error}</div> : null}
      </form>
      <p className="muted" style={{ marginTop: 8 }}>
        No account? <Link to="/register">Register</Link>
      </p>
    </Layout>
  );
}


