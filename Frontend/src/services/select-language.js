export const selectLanguage = async (userId, language) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/seleccionar-lenguaje`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuario_id: userId,
        lenguaje: language
      })
    })
    const data = await response.json()

    if (!response.ok) {
      return {
        error: "Error al guardar el lenguaje seleccionado"
      }
    }

    return {
      data
    }
  } catch (error) {
    console.log(error)

    return {
      error: "Error al guardar el lenguaje seleccionado"
    }
  }
}