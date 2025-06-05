import { BrowserRouter } from "react-router"
import { Route, Routes } from "react-router"
import Auth from "./pages/Login"
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
