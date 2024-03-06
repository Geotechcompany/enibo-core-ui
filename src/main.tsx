import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "remixicon/fonts/remixicon.css";
import { ApolloProvider } from "@apollo/client";
import client from "./store/index.ts";
import { UserProvider } from "./types/userContext.tsx";
import BranchTypeProvider from "./store/branchType.tsx";
import { AppProvider } from "./store/state.tsx";
import LedgerProvider  from "./store/ledger.tsx";
import BranchProvider from "./store/branchstate.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <UserProvider>
        <BranchTypeProvider>
        <BranchProvider>
        <LedgerProvider>
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
          </LedgerProvider>
          </BranchProvider>
        </BranchTypeProvider>
      </UserProvider>
    </AppProvider>
  </React.StrictMode>
);
