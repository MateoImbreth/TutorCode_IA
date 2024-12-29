import { toast } from 'sonner'
import { selectLanguage } from '../services/select-language'
import { useUserStore } from '../stores/user.store'
import './HomeScreen.css'
import { NavLink } from 'react-router'

function HomeScreen() {
  const user = useUserStore((state) => state.user)

  const handleLanguageSelection = async (language) => {
    const { error } = await selectLanguage(user?.user_id || -1, language)

    if (error) {
      toast.error(error)
    }
  }

  const handleJavaSelection = () => {
    handleLanguageSelection("Java")
  }

  const handleCppSelection = () => {
    handleLanguageSelection("Cpp")
  }

  const handlePythonSelection = () => {
    handleLanguageSelection("Python")
  }

  return (
    <div className="selection-container">
      <h2>SELECCIONE EL LENGUAJE DE PROGRAMACIÓN QUE DESEA PRACTICAR</h2>
      <div className="languages">
        <NavLink className="language-option" to="java" onClick={handleJavaSelection}>
          <img src="/assets/javalogo.png" alt="Java Logo" />
        </NavLink>
        <NavLink className="language-option" to="cpp" onClick={handleCppSelection}>
          <img src="/assets/clogo.png" alt="C++ Logo" />
        </NavLink>
        <NavLink className="language-option" to="python" onClick={handlePythonSelection}>
          <img src="/assets/Pythonlogo.png" alt="Python Logo" />
        </NavLink>
      </div>
    </div>
  )
}

export default HomeScreen
