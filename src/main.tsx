import "react-toastify/dist/ReactToastify.css";

import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { router } from "./Router.tsx"; // Import your router correctly.
import { AuthProvider } from "./context/authContext/index.tsx";
import i18n from "./i18n.ts";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <React.Suspense fallback="loading...">
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <RouterProvider router={router} />
            <ToastContainer />
          </AuthProvider>
        </I18nextProvider>
      </React.Suspense>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}
