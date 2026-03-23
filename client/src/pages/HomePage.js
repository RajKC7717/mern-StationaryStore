import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function HomePage() {
  return (
    <Layout>
      <section className="hero surface" style={{ borderRadius: 16 }}>
        <h1>TheOnly StationaryStore</h1>
        <p className="muted">Get all your stationary products here.</p>
        <div className="toolbar" style={{ marginTop: 16 }}>
          <Link to="/products" className="btn btn-primary">Explore Stationary</Link>
          <Link to="/manage" className="btn">Add your products</Link>
        </div>
      </section>
      <section className="section">
        <div className="grid">
          <div className="card surface"><h3>Fast</h3><p className="muted">Vite/CRA React frontend, Node/Express backend.</p></div>
          <div className="card surface"><h3>Secure</h3><p className="muted">JWT auth guarding product management.</p></div>
          <div className="card surface"><h3>Modern</h3><p className="muted">Minimal palette and subtle depth.</p></div>
        </div>
      </section>
    </Layout>
  );
}


