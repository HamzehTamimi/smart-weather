import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "mdui/mdui.css";
import "mdui";

import { setColorScheme } from "mdui/functions/setColorScheme.js";
import { setTheme } from "mdui/functions/setTheme.js";

import "./index.css";
import App from "./App.jsx";

// Generate the full Material color scheme from one source color.
setColorScheme("#0061A4");

// Follow the user's system light/dark preference.
setTheme("auto");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);