import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "remixicon/fonts/remixicon.css";
import { ApolloProvider } from "@apollo/client";
import client from "./store/index.ts";
import { UserProvider } from "./types/userContext.tsx";
import BranchProvider from "./store/branch.tsx";
import { AppProvider } from "./store/state.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <UserProvider>
        <BranchProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/*"
                element={
                  <ApolloProvider client={client}>
                    <App />
                  </ApolloProvider>
                }
              />
            </Routes>
          </BrowserRouter>
        </BranchProvider>
      </UserProvider>
    </AppProvider>
  </React.StrictMode>
);
