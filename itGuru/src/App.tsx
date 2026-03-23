import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./pages/Login";
import { Products } from "./pages/Products";
import React from "react";
import { useAuth } from "./hooks/useAuth";

const PrivateRoute = ({ children }: { children: React.JSX.Element }) => {
  const { token } = useAuth();

  return token ? children : <Navigate to="/login" replace />;
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
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
