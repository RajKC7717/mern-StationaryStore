import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductManagementPage from "./pages/ProductManagementPage";
import ProtectedRoute from "./ProtectedRoute";
import CartPage from "./pages/CartPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/manage"
            element={
              <ProtectedRoute>
                <ProductManagementPage />
              </ProtectedRoute>
            }
          />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
