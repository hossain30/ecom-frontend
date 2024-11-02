import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { AuthProvider } from "./context/AuthContext";
import { CIDProvider } from "./context/CategoryIdContext";
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CIDProvider>
      <SearchProvider>
        <CartProvider>
          <BrowserRouter>
            <Toaster />

            <App />
          </BrowserRouter>
        </CartProvider>
      </SearchProvider>
    </CIDProvider>
  </AuthProvider>
);
