import { Route, Routes } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import Login from "./Pages/Login/Login";
import MainLayout from "./components/main-layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Administration from "./Pages/Administration/Administration";
import Branches from "./Pages/Branches/Branches";
import NewBranch from "./Pages/Branches/NewBranch";
import Customers from "./Pages/Customers/Customers";

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
          path="administration/branches/new-branch"
          element={
            <MainLayout>
              <NewBranch />
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
