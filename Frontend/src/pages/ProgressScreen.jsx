import { useEffect, useState } from 'react'
import './ProgressScreen.css'
import { useUserStore } from '../stores/user.store'

const ProgressScreen = () => {
  const [progressPython, setProgressPython] = useState()
  const user = useUserStore((state) => state.user)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/obtener-progreso?usuario_id=${user.user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setProgressPython(data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div className="progress-screen-container">
      <div className="progress-header">
        <h2>PROGRESO</h2>
      </div>
      <div className="progress-content">
        <div className="progress-graph">
          <img src="/assets/Progreso.png" alt="Gráfico de Progreso" className="progress-graph-image" />
        </div>
        <div className="progress-details">
          <p><span className="progress-indicator java"></span> JAVA</p>
          <p><span className="progress-indicator python"></span> PYTHON - {progressPython?.cantidad_ejercicios_resueltos}/{progressPython?.cantidad_ejercicios}</p>
          <p><span className="progress-indicator cpp"></span> C++</p>
        </div>
      </div>
    </div>
  )
}

export default ProgressScreen
