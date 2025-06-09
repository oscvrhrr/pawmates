import { useContext } from "react"
import { AuthContext } from "@/components/context/AuthContext"
import { Outlet, Navigate } from "react-router"

const RouteGuard = () => {
  const { isAuthenticated } = useContext(AuthContext)


  return (
    isAuthenticated ? <Outlet/> : <Navigate to="/"/>
  )
}

export default RouteGuard


