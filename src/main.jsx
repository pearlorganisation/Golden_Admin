import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import { Toaster } from "sonner";
import store, { persistor } from "./features/store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster richColors />
      </PersistGate>
    </Provider>
  </StrictMode>
);
