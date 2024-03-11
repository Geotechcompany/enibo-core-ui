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
import LedgerProvider from "./store/ledger.tsx";
import BranchProvider from "./store/branchstate.tsx";
import ProductTypeProvider from "./store/productTypeState.tsx";
import TransactionTypeProvider from "./store/transactionTypesState.tsx";
import KycProvider from "./store/kyc.tsx";
import FeeProvider from "./store/feestate.tsx";
import MandateProvider from "./store/mandatestate.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <UserProvider>
        <BranchTypeProvider>
          <BranchProvider>
            <ProductTypeProvider>
              <TransactionTypeProvider>
                <LedgerProvider>
                <KycProvider>
                  <FeeProvider>
                    <MandateProvider>
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
                  </MandateProvider>
                  </FeeProvider>
                 </KycProvider>
                </LedgerProvider>
              </TransactionTypeProvider>
            </ProductTypeProvider>
          </BranchProvider>
        </BranchTypeProvider>
      </UserProvider>
    </AppProvider>
  </React.StrictMode>
);
