import { BrowserRouter } from "react-router";
import { Route, Routes } from "react-router";
import Auth from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DogSearchContextProvider from "./components/context/DogSearchContext";
import { AuthContextProvider } from "./components/context/AuthContext";
import RouteGuard from "./lib/RouteGuard";
import { FavoritesContextProvider } from "./components/context/FavoritesContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
            <Routes>
              <Route element={ <RouteGuard/>}>
                <Route path="/dashboard" element={
                  <DogSearchContextProvider>
                    <FavoritesContextProvider>
                      <Dashboard />
                    </FavoritesContextProvider>
                  </DogSearchContextProvider>
                  } 
                />
              </Route>
              <Route path="/" element={<Auth />} />
            </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
