import "react-toastify/dist/ReactToastify.css";

import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import { router } from "./Router.tsx"; // Import your router correctly.
import { AuthProvider } from "./context/authContext/index.tsx";
import i18n from "./i18n.ts";
import { persistor, store } from "./lib/index.ts";

// import { PersistGate } from "redux-persist/integration/react";


const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}>
          <React.Suspense fallback="loading...">
            <I18nextProvider i18n={i18n}>
              <AuthProvider>
                <RouterProvider router={router} />
                <ToastContainer />
              </AuthProvider>
            </I18nextProvider>
          </React.Suspense>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}
