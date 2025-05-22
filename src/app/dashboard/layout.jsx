"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Navbar from "@/components/navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoutes";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirecionar se não estiver autenticado
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  // Enquanto carrega, não renderiza nada
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#0a0a0a",
          color: "#f5f5f5",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid rgba(90, 200, 250, 0.2)",
            borderRadius: "50%",
            borderTopColor: "#5ac8fa",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // Usar o componente ProtectedRoute para proteger esta rota
  return (
    <ProtectedRoute>
      <Navbar />
      <main>{children}</main>
    </ProtectedRoute>
  );
}
