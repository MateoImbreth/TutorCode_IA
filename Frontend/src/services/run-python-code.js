export const runPythonCode = async (userId, exerciseId, code) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/evaluar-codigo-python`, {
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

    console.log(data, code)

    if (response.status !== 200) {
      return {
        error: "Error al ejecutar el código"
      }
    }

    return { data }
  } catch (error) {
    console.log(error)

    return { error: "Error al ejecutar el código" }
  }
}