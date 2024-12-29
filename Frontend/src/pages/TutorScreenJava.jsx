import { useState } from 'react'
import './TutorScreenJava.css'
import Editor from '@monaco-editor/react'
import { useNavigate } from 'react-router'

const TutorScreenJava = () => {
  const [output, setOutput] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState("")

  const navigate = useNavigate()

  const handleExecuteCode = (value) => {
    const outputValues = []
    const regex = /System\.out\.println\("(.*?)"\)/g
    let match
    while ((match = regex.exec(value)) !== null) {
      outputValues.push(match[1])
    }
    if (outputValues.length > 0) {
      setOutput(outputValues.join('\n'))
    } else {
      setOutput("Error: Código no reconocido.")
    }
  }

  const handleSendMessage = () => {
    if (chatInput.trim() !== "") {
      setChatMessages([...chatMessages, { sender: "student", text: chatInput }])
      setChatInput("")
      // Simulate tutor response (could be replaced with AI integration)
      setTimeout(() => {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { sender: "tutor", text: "Estoy aquí para ayudarte. ¿En qué tienes dudas?" }
        ])
      }, 1000)
    }
  }

  return (
    <div className="tutor-screen-container">
      <div className="header">
        <h2 className="title">Ejercicio N°1. Tema: &ldquo;Hola mundo Java&ldquo;</h2>
        <img src="/assets/Logo.png" alt="Tutorcode AI Logo" className="tutor-logo" />
      </div>
      <h2 className="enunciado">Enunciado: Has un codigo que imprima la palabra hola mundo</h2>
      <div className="tutor-content">
        <div className="student-input-container">
          <Editor
            height="500px"
            defaultLanguage="java"
            defaultValue="// Escribe tu código de Java aquí"
            theme="vs-dark"
            options={{
              lineNumbers: 'on',
              tabSize: 4,
              minimap: { enabled: false },
              scrollbar: {
                vertical: 'auto',
                horizontal: 'auto'
              },
              fontFamily: 'monospace',
              fontSize: 14,
              cursorStyle: 'line',
              wordWrap: 'on',
              folding: true,
              autoClosingBrackets: 'always',
              matchBrackets: 'always',
              suggestOnTriggerCharacters: true,
              language: 'java'
            }}
          />
        </div>
        <div className="submit-container">
          <button className="submit-button" onClick={() => handleExecuteCode(document.querySelector('.monaco-editor textarea').value)}>&gt;</button>
        </div>
        <div className="tutor-response-container">
          <p className="tutor-window-title">Ventana del tutor:</p>
          <p>- Retroalimentación.</p>
          <p>- Sugerencias.</p>
          <p>- Correcciones.</p>
          <div className="terminal-output expanded">
            <p>Resultado de la ejecución:</p>
            <pre>{output}</pre>
          </div>
        </div>
      </div>
      <div className="navigation">
        <button className="previous-button" onClick={() => navigate("/")}>Anterior</button>
        <button className="next-button">Siguiente</button>
      </div>

      {/* Chat component */}
      <div className={`chat-container ${isChatOpen ? "open" : ""}`}>
        {isChatOpen && (
          <div className="chat-box">
            <div className="chat-header">
              Chat con el tutor
              <span className="chat-close" onClick={() => setIsChatOpen(false)}>✖</span>
            </div>
            <div className="chat-messages">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${message.sender}`}
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    margin: "5px 0",
                    backgroundColor: message.sender === "student" ? "#e1f5fe" : "#bbdefb",
                    alignSelf: message.sender === "student" ? "flex-end" : "flex-start",
                    maxWidth: "70%",
                    marginRight: message.sender === "tutor" ? "auto" : "10px"
                  }}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="chat-input-container">
              <input
                type="text"
                className="chat-input"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
              />
              <button className="chat-send-button" onClick={handleSendMessage}>
                ➤
              </button>
            </div>
          </div>
        )}
        {!isChatOpen && (
          <div className="chat-toggle" onClick={() => setIsChatOpen(true)}>
            💬
          </div>
        )}
      </div>
    </div>
  )
}

export default TutorScreenJava