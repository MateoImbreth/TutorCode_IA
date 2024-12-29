import clsx from "clsx"
import "./ChatBot.css"

export const ChatBot = ({ chatMessages, isChatOpen, setIsChatOpen }) => {

  return (
    <div className={clsx("chat-container", { "open": isChatOpen })}>
      {isChatOpen ? (
        <div className="chat-box">
          <header className="chat-header">
            Retroalimentación del tutor
            <button
              className="chat-close"
              onClick={() => setIsChatOpen(false)}
              aria-label="Cerrar chat"
            >
              ✖
            </button>
          </header>
          <div className="chat-messages">
            {chatMessages.map((message, index) => (
              <div key={index} className={clsx("chat-message", message.sender)}>
                {message.text}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <button
          className="chat-toggle"
          onClick={() => setIsChatOpen(true)}
          aria-label="Abrir chat"
        >
          💬
        </button>
      )}
    </div>
  )
}