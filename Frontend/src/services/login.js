export const login = async (username, password) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: username,
        contrasena: password
      })
    })

    if (!res.ok) {
      return {
        error: "Usuario o contraseña incorrectos"
      }
    }

    const data = await res.json()

    return {
      data
    }
  } catch (error) {
    console.log(error)

    return {
      error: "Ha ocurrido un error inesperado"
    }
  }
}