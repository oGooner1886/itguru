import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Login } from "./pages/Login";
import { Products } from "./pages/Products";
import React from "react";

const PrivateRoute = ({ children }: { children: React.JSX.Element }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/products" />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
