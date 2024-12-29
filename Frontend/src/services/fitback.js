export const fitback = async (userId, exerciseId, code) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/retroalimentacion-codigo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "usuario_id": userId,
        "ejercicio_id": exerciseId,
        "codigo": code
      })
    })
    const data = await response.json()

    if (!response.ok()) {
      return {
        error: "Error al obtener la retroalimentación"
      }
    }

    return { data }
  } catch (error) {
    console.error("Error al obtener la retroalimentación:", error)

    return { error: "Error en el servidor al obtener la retroalimentación" }
  }
}