import { Route, Routes } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import Login from "./Pages/Login/Login";
import MainLayout from "./components/main-layout";
import Dashboard from "./Pages/Dashboard/Dashboard";

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
      </Routes>
    </ThemeProvider>
  );
}

export default App
