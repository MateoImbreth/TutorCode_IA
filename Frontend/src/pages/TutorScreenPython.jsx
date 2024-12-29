import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router"
import Editor from "@monaco-editor/react"
import "./TutorScreenPython.css"
import { ChatBot } from "../components/ChatBot"
import { useExercicesPythonStore } from "../stores/exercicesPython"
import { runPythonCode } from "../services/run-python-code"
import { useUserStore } from "../stores/user.store"
import { fitback } from "../services/fitback"

const TutorScreenPython = () => {
  const user = useUserStore((state) => state.user)
  const exersices = useExercicesPythonStore((state) => state.exercises)
  const fetchExercises = useExercicesPythonStore((state) => state.fetchExercises)
  const currentExercise = useExercicesPythonStore(
    (state) => state.exercises[state.currentExercise]
  )
  const nextExercise = useExercicesPythonStore((state) => state.nextExercise)
  const previousExercise = useExercicesPythonStore(
    (state) => state.previousExercise
  )

  const [messageResolved, setMessageResolved] = useState("")
  const [output, setOutput] = useState("")
  const [retroalimentacion, setRetroalimentacion] = useState("")
  const editorRef = useRef(null)

  const [chatMessages, setChatMessages] = useState([])
  const [isChatOpen, setIsChatOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    fetchExercises()
  }, [])

  useEffect(() => {
    if (currentExercise) {
      setOutput("")
      setRetroalimentacion("")
      if (editorRef.current) editorRef.current.setValue("")

      fetch(
        `${import.meta.env.VITE_API_URL}/validar-ejercicio?usuario_id=${user.user_id}&ejercicio_id=${currentExercise.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setMessageResolved(data.mensaje)
        })
        .catch((error) => {
          console.error("Error al validar ejercicio:", error)
        })
    }
  }, [currentExercise])

  const handleExecuteCode = async () => {
    try {
      const code = editorRef.current.getValue()

      const { data, error } = await runPythonCode(
        user.user_id,
        currentExercise.id,
        code
      )

      if (error) {
        setOutput(error)

        return
      }

      setOutput(data.status)

      await getFitback(code)
      setRetroalimentacion(data.retroalimentacion)
    } catch (err) {
      console.error("Error al ejecutar el código:", err)
      setOutput("Error interno al procesar el código.")
    }
  }

  const getFitback = async (code) => {
    const { data, error } = await fitback(user.user_id, currentExercise.id, code)
    console.log(code)

    setIsChatOpen(true)

    if (error) {
      setChatMessages([...chatMessages, { 
        sender: "tutor", 
        text: "Error al obtener la retroalimentación"
      }])
      return
    }

    setChatMessages([...chatMessages, { 
      sender: "tutor", 
      text: data?.retroalimentacion
    }])
  }

  return (
    <div className="tutor-screen-python-container">
      <header className="header-python">
        <h2 className="title-python">
          Ejercicio N°{currentExercise?.id}. Tema: {currentExercise?.titulo}
        </h2>
        <img
          src="/assets/Logo.png"
          alt="Tutorcode AI Logo"
          className="tutor-logo-python"
        />
      </header>
      <h2 className="enunciado-python">
        {currentExercise?.contenido}
        {<p>{messageResolved}</p>}
      </h2>
      <main className="tutor-content-python">
        <section className="student-input-container-python">
          <Editor
            height="500px"
            defaultLanguage="python"
            theme="vs-dark"
            onMount={(editor) => (editorRef.current = editor)}
            options={{
              lineNumbers: "on",
              tabSize: 4,
              minimap: { enabled: false },
              fontFamily: "monospace",
              fontSize: 14,
              cursorStyle: "line",
              wordWrap: "on",
              folding: true,
              autoClosingBrackets: "always",
              matchBrackets: "always",
              suggestOnTriggerCharacters: true
            }}
          />
        </section>
        <section className="submit-container-python">
          <button
            className="submit-button-python"
            onClick={handleExecuteCode}
            aria-label="Ejecutar código"
          >
            &gt;
          </button>
        </section>
        <section className="tutor-response-container-python">
          <h3 className="tutor-window-title-python">Ventana del tutor:</h3>
          <div className="terminal-output-python expanded">
            <p>Resultado de la ejecución:</p>
            <pre>{output}</pre>
          </div>
          {retroalimentacion && (
            <>
              <p>Retroalimentación:</p>
              <pre>{retroalimentacion}</pre>
            </>
          )}
        </section>
      </main>
      <nav className="navigation-python">
        <button
          className="previous-button-python"
          onClick={() => {
            if (currentExercise.id === 1) {
              navigate("/")
            } else {
              previousExercise()
            }
          }}
          aria-label="Volver a la página anterior"
        >
          Anterior
        </button>
        <button
          className="next-button-python"
          aria-label="Ir a la siguiente página"
          onClick={() => {
            if (currentExercise.id !== exersices.length) {
              nextExercise()
            }
          }}
        >
          Siguiente
        </button>
      </nav>

      <ChatBot
        chatMessages={chatMessages}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
      />
    </div>
  )
}

export default TutorScreenPython
