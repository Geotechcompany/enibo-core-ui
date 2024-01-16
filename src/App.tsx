import { Route, Routes } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import MainLayout from "./components/main-layout";

function App() {

  return (
    <ThemeProvider>
      <Routes>
          <Route path="/" element={
            <MainLayout>
              
            </MainLayout>
          } />
      </Routes>
    </ThemeProvider>
  )
}

export default App
