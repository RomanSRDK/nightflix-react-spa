import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

// Supports weights 100-900
import "@fontsource-variable/inter";
import "modern-normalize/modern-normalize.css";
import "./global.css";
import App from "./components/App/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
