import { Route, Routes } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import Login from "./Pages/Login/Login";
import MainLayout from "./components/main-layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Administration from "./Pages/Administration/Administration";
import Branches from "./Pages/Branches/Branches";
import FeeTypes from "./Pages/FeeTypes/FeeTypes";

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
          path="administration/countries"
          element={
            <MainLayout>
              <Branches />
            </MainLayout>
          }
        />
         <Route
          path="administration/fee-types"
          element={
            <MainLayout>
              <FeeTypes />
            </MainLayout>
          }
        />
        <Route
          path="administration/transaction"
          element={
            <MainLayout>
              <Branches />
            </MainLayout>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App
