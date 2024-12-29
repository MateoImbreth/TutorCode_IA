import { useState } from 'react'
import './Login.css'
import { NavLink, useNavigate } from 'react-router'
import { useUserStore } from '../stores/user.store'
import { login } from '../services/login'
import { toast } from 'sonner'

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setUser, setIsLoggedIn } = useUserStore()
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const onLoginSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    const form = event.target
    const username = form.username.value
    const password = form.password.value

    const { error, data } = await login(username, password)

    console.log({
      ...data,
      email: username
    })

    if (error || !data) {
      toast.error(error || 'Ha ocurrido un error inesperado')
      setLoading(false)
      return
    }

    setUser({
      ...data,
      email: username
    })
    setIsLoggedIn(true)

    setLoading(false)
    navigate('/')
  }

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={onLoginSubmit}>
        <img src="/assets/Logo.png" alt="Tutorcode AI" className="login-logo" />
        <h2>INICIAR SESIÓN</h2>
        <div className="input-container">
          <input type="email" name='username' placeholder="@Username" className="input-field" />
        </div>
        <div className="input-container" style={{ position: 'relative' }}>
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="••••••••"
            name='password'
            className="input-field"
          />
          <span
            className="password-toggle"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? '🙈' : '👁️'}
          </span>
        </div>
        <button
          className="login-button"
          type='submit'
        >
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
        <div className="register-link">
          ¿No tienes cuenta? <NavLink href="#">Regístrate aquí</NavLink>
        </div>
      </form>
    </div>
  )
}

export default Login
