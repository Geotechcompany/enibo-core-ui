import { Route, Routes } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import Login from "./Pages/Login/Login";
import MainLayout from "./components/main-layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Administration from "./Pages/Administration/Administration";
import Branches from "./Pages/Branches/Branches";
import NewBranch from "./Pages/Branches/NewBranch";
import Customers from "./Pages/Customers/Customers";
import ProductTypes from "./Pages/Products/ProductTypes";
import NewProductType from "./Pages/Products/NewProductType";
import TransactionTypes from "./Pages/Transactions/TransactionTypes";
import NewTransactionType from "./Pages/Transactions/NewTransactionType";
import LedgerAccounts from "./Pages/LedgerAccounts/LedgerAccounts";
import NewLedgerAccount from "./Pages/LedgerAccounts/NewLedgerAccount";
import FeeTypes from "./Pages/FeeTypes/FeeTypes";
import BranchDetailsPage from "./Pages/Branches/BranchDetailsPage";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/administration"
          element={
            <MainLayout>
              <Administration />
            </MainLayout>
          }
        />
        <Route
          path="administration/branches"
          element={
            <MainLayout>
              <Branches />
            </MainLayout>
          }
        />
        <Route
          path="/administration/branch-details"
          element={
            <MainLayout>
              <BranchDetailsPage />
            </MainLayout>
          }
        />
        <Route
          path="administration/branches/new-branch"
          element={
            <MainLayout>
              <NewBranch />
            </MainLayout>
          }
        />
        
        <Route
          path="administration/products/product-types"
          element={
            <MainLayout>
              <ProductTypes />
            </MainLayout>
          }
        />
        <Route
          path="administration/products/product-types/new-product-type"
          element={
            <MainLayout>
              <NewProductType />
            </MainLayout>
          }
        />
         <Route
          path="administration/static-data/fee-types"
          element={
            <MainLayout>
              <FeeTypes />
            </MainLayout>
          }
        />
        <Route
          path="administration/static-data/transaction-types"
          element={
            <MainLayout>
              <TransactionTypes />
            </MainLayout>
          }
        />
        <Route
          path="administration/static-data/transaction-types/new-transaction-type"
          element={
            <MainLayout>
              <NewTransactionType />
            </MainLayout>
          }
        />
        <Route
          path="administration/ledger-management/ledger-accounts"
          element={
            <MainLayout>
              <LedgerAccounts />
            </MainLayout>
          }
        />
        <Route
          path="administration/ledger-management/ledger-accounts/new-ledger-account"
          element={
            <MainLayout>
              <NewLedgerAccount />
            </MainLayout>
          }
        />
        <Route
          path="customers"
          element={
            <MainLayout>
              <Customers />
            </MainLayout>
          }
        />
        
      </Routes>
    </ThemeProvider>
  );
}

export default App
