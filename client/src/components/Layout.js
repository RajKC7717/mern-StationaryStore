import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useCart } from "../CartContext";

export default function Layout({ children }) {
  const { user, token, logout } = useAuth();
  const { items } = useCart();
  return (
    <div>
      <div className="nav">
        <div className="nav-inner">
          <div className="brand">StationaryShop</div>
          <div className="links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/cart">Cart ({items.length})</NavLink>
            {token ? (
              <>
                <NavLink to="/manage">Manage</NavLink>
                <button className="btn btn-ghost" onClick={logout} title={user?.name || "Logout"}>Logout</button>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
      <main className="container">{children}</main>
    </div>
  );
}


