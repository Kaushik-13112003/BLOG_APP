import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/context.jsx";
import { LikeAndDislikeProvider } from "./context/likeAndDislikeContext.jsx";
import { SavePostProvider } from "./context/savePostContext.jsx";
import { SearchProvider } from "./context/searchContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <SavePostProvider>
        <SearchProvider>
          <LikeAndDislikeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LikeAndDislikeProvider>
        </SearchProvider>
      </SavePostProvider>
    </AppProvider>
  </React.StrictMode>
);
