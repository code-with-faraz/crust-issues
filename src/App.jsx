import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

const LoadingModal = ({ onClose }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      fontFamily: "Segoe UI, Arial, sans-serif",
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "2.5rem 2rem",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        textAlign: "center",
        maxWidth: "400px",
        width: "90%",
        animation: "fadeIn 0.5s",
      }}
    >
      <h2 style={{ marginBottom: "1rem", color: "#c0392b" }}>Loading Notice</h2>
      <p style={{ marginBottom: "2rem", color: "#444", fontSize: "1.1rem" }}>
        Please note: Loading may take a little longer than usual.<br />
        Thank you for your patience!
      </p>
      <button
        onClick={onClose}
        style={{
          padding: "0.7rem 1.5rem",
          borderRadius: "8px",
          border: "none",
          background: "#c0392b",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "1rem",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(192,57,43,0.12)",
          transition: "background 0.2s",
        }}
      >
        OK
      </button>
    </div>
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Simulate loading (replace with your actual loading logic)
    const timer = setTimeout(() => {
      setLoading(false);
      setShowModal(true); // Show modal after loading is done
    }, 2000); // 2 seconds loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <StrictMode>
      {loading ? (
        // You can show a spinner or loading screen here
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            color: "#c0392b",
            background: "#fff",
          }}
        >
          Loading...
        </div>
      ) : (
        <>
          {showModal && <LoadingModal onClose={() => setShowModal(false)} />}
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </>
      )}
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);