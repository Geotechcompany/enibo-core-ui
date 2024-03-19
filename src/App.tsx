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
import LedgerAccountsSummary from "./Pages/LedgerAccounts/LedgerAccountsSummary";
import NewFeeTypes from "./Pages/FeeTypes/NewFeeTypes";
import BranchDetailsPage from "./Pages/Branches/BranchDetailsPage";
import NewCustomerMandateType from "./Pages/Customers/NewCustomerMandateType";
import CustomerMandateTypes from "./Pages/Customers/CustomerMandateTypes";
import NewKYCType from "./Pages/Customers/NewKYCType";
import KYCTypes from "./Pages/Customers/KYCTypes";
import NewCustomerKYC from "./Pages/Customers/NewCustomerKYC";
import CustomerKYCS from "./Pages/Customers/CustomerKYCS";
import CustomerSummary from "./Pages/Customers/CustomerSummary";
import NewCustomer from "./Pages/Customers/NewCustomer";
import NewLedgerAccountCategory from "./Pages/LedgerAccounts/NewLedgerAccountCategory";
import LedgerAccountCategories from "./Pages/LedgerAccounts/LedgerAccountCategories";
import NewLedgerRule from "./Pages/LedgerAccounts/NewLedgerRule";
import LedgerRules from "./Pages/LedgerAccounts/LedgerRules";
import NewBranchTypes from "./Pages/Branches/NewBranchTypes";
import Approvals from "./Pages/Approval Rules/Approvals";
import CountriesList from "./Pages/Countries/CountryList";
import CountryDetails from "./Pages/Countries/CountryDetailsPage";
import CurrenciesList from "./Pages/Currencies/CurrenciesList";
import CalendarList from "./Pages/Calendar/CalendarPage";
import CalendarDetail from "./Pages/Calendar/CalendarDetails";
import CurrenciesDetail from "./Pages/Currencies/CurrenciesDetails";
import UserProfile from "./Pages/Users.tsx/UserProfileList";
import NewProfile from "./Pages/Users.tsx/NewProfile";
import Users from "./Pages/Users.tsx/UserDetailsPage";
import NewUser from "./Pages/Users.tsx/NewUser";
import AppSettingsList from "./Pages/AppSettings/AppSettingsList";
import AppSettingsDetails from "./Pages/AppSettings/AppSettingsDetails";
import NewKYCIndividualForm from "./components/new-KYC-individual-form";
import NewKYCBusinessForm from "./components/new-KYC-business-form";
import Signup from "./Pages/SignUp/SignUp";
import BranchType from "./Pages/Branches/BranchTypes";
import NewTransfer from "./Pages/Transfer/NewTransfer";
import Wizard from "./components/customer-wizard";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/new-transfer"
          element={
            <MainLayout>
              <NewTransfer />
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
          path="administration/branches/:branchId"
          element={
            <MainLayout>
              <NewBranch />
            </MainLayout>
          }
        />
        <Route
          path="/administration/branches/branch-types"
          element={
            <MainLayout>
              <BranchType />
            </MainLayout>
          }
        />
        <Route
          path="/edit-branch-type/:branchTypeId"
          element={
            <MainLayout>
              <NewBranchTypes />
            </MainLayout>
          }
        />
        <Route
          path="administration/branches/new-branch-type"
          element={
            <MainLayout>
              <NewBranchTypes />
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
          path="/edit-product-type/:productTypeId"
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
          path="administration/static-data/fee-types/new-fee-type"
          element={
            <MainLayout>
              <NewFeeTypes />
            </MainLayout>
          }
        />
          <Route
          path="/edit-fee-type/:feeTypeId"
          element={
            <MainLayout>
              <NewFeeTypes />
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
          path="/edit-transaction-type/:transactionTypeId"
          element={
            <MainLayout>
              <NewTransactionType />
            </MainLayout>
          }
        />
          <Route
          path="/edit-ledger-account-category/:id"
          element={
            <MainLayout>
              <NewLedgerAccountCategory />
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
          path="administration/ledger-management/ledger-rules"
          element={
            <MainLayout>
              <LedgerRules />
            </MainLayout>
          }
        />
        <Route
          path="administration/ledger-management/ledger-rules/new-ledger-rule"
          element={
            <MainLayout>
              <NewLedgerRule />
            </MainLayout>
          }
        />
        <Route
          path="administration/ledger-management/ledger-rules/:id"
          element={
            <MainLayout>
              <NewLedgerRule />
            </MainLayout>
          }
        />
        <Route
          path="administration/ledger-management/ledger-accounts/:accountId"
          element={
            <MainLayout>
              <LedgerAccountsSummary />
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
          path="administration/ledger-management/ledger-accounts/ledger-account/:id"
          element={
            <MainLayout>
              <NewLedgerAccount />
            </MainLayout>
          }
        />
        <Route
          path="administration/ledger-management/ledger-account-categories"
          element={
            <MainLayout>
              <LedgerAccountCategories />
            </MainLayout>
          }
        />
        <Route
          path="administration/ledger-management/ledger-account-categories/new-ledger-account-category"
          element={
            <MainLayout>
              <NewLedgerAccountCategory />
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
        <Route
          path="customers/new-customer"
          element={
            <MainLayout>
              <NewCustomer />
            </MainLayout>
          }
        />
        <Route
          path="customers/:customerId"
          element={
            <MainLayout>
              <CustomerSummary />
            </MainLayout>
          }
        />
        <Route
          path="customers/customer-kycs"
          element={
            <MainLayout>
              <CustomerKYCS />
            </MainLayout>
          }
        />
        <Route
          path="customers/customer-kycs/new-kyc"
          element={
            <MainLayout>
              <NewCustomerKYC />
            </MainLayout>
          }
        />
        <Route
          path="customers/kyc-types"
          element={
            <MainLayout>
              <KYCTypes />
            </MainLayout>
          }
        />
        <Route
          path="customers/kyc-types/individual-form"
          element={
            <MainLayout>
              <NewKYCIndividualForm />
            </MainLayout>
          }
        />
        <Route
          path="customers/kyc-types/business-form"
          element={
            <MainLayout>
              <NewKYCBusinessForm />
            </MainLayout>
          }
        />
        <Route
          path="customers/kyc-types/business-form/:businessKYCId"
          element={
            <MainLayout>
              <NewKYCBusinessForm />
            </MainLayout>
          }
        />
        <Route
          path="customers/kyc-types/new-kyc-type"
          element={
            <MainLayout>
              <NewKYCType />
            </MainLayout>
          }
        />
        <Route
          path="/edit-kyc-type/:kycTypeId"
          element={
            <MainLayout>
              <NewKYCType />
            </MainLayout>
          }
        />
        <Route
          path="customers/account-mandate-types"
          element={
            <MainLayout>
              <CustomerMandateTypes />
            </MainLayout>
          }
        />
        <Route
          path="customers/account-mandate-types/new-mandate-type"
          element={
            <MainLayout>
              <NewCustomerMandateType />
            </MainLayout>
          }
        />
         <Route
          path="/edit-mandate-types/:mandateTypeId"
          element={
            <MainLayout>
              <NewCustomerMandateType />
            </MainLayout>
          }
        />
        <Route
          path="administration/approvals"
          element={
            <MainLayout>
              <Approvals />
            </MainLayout>
          }
        />
        <Route
          path="/administration/countries-list"
          element={
            <MainLayout>
              <CountriesList />
            </MainLayout>
          }
        />
        <Route
          path="/administration/countries-list/countries-details-form"
          element={
            <MainLayout>
              <CountryDetails />
            </MainLayout>
          }
        />
        <Route
          path="/administration/currencies-list"
          element={
            <MainLayout>
              <CurrenciesList />
            </MainLayout>
          }
        />
        <Route
          path="/administration/currencies-list/currencies-details-form"
          element={
            <MainLayout>
              <CurrenciesDetail />
            </MainLayout>
          }
        />
        <Route
          path="/administration/static-data/calendar-list"
          element={
            <MainLayout>
              <CalendarList />
            </MainLayout>
          }
        />
        <Route
          path="/administration/static-data/calendar-list/calendar-details-form"
          element={
            <MainLayout>
              <CalendarDetail />
            </MainLayout>
          }
        />
        <Route
          path="/administration/user-management/profile-list"
          element={
            <MainLayout>
              <UserProfile />
            </MainLayout>
          }
        />
        <Route
          path="/administration/user-management/profile-list/profile-form"
          element={
            <MainLayout>
              <NewProfile />
            </MainLayout>
          }
        />
        <Route
          path="/administration/user-management/profile-list/:id"
          element={
            <MainLayout>
              <NewProfile />
            </MainLayout>
          }
        />
        <Route
          path="/administration/user-details"
          element={
            <MainLayout>
              <Users />
            </MainLayout>
          }
        />
        <Route
          path="/administration/user-details/user-details-form"
          element={
            <MainLayout>
              <NewUser />
            </MainLayout>
          }
        />
        <Route
          path="/administration/user-details/:id"
          element={
            <MainLayout>
              <NewUser />
            </MainLayout>
          }
        />
        <Route
          path="/administration/app-settings"
          element={
            <MainLayout>
              <AppSettingsList />
            </MainLayout>
          }
        />
        <Route
          path="/administration/app-settings/app-details"
          element={
            <MainLayout>
              <AppSettingsDetails />
            </MainLayout>
          }
        />
        <Route
          path="/administration/app-settings/:id"
          element={
            <MainLayout>
              <AppSettingsDetails />
            </MainLayout>
          }
        />
        <Route
          path="/customers/customer-wizard/*"
          element={
            <MainLayout>
              <Wizard />
            </MainLayout>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
