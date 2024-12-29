import { Outlet, useNavigate } from "react-router"
import { useUserStore } from "../stores/user.store"
import { useEffect } from "react"

const ProtectedRoutes = () => {
  const { user, isLoggedIn } = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate('/login')
    }
  }, [isLoggedIn, user])

  if (!isLoggedIn || !user) {
    return null
  }

  return (
    <Outlet />
  )
}

export { ProtectedRoutes }
