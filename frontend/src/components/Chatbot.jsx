import { useEffect, useRef, useState } from "react"
import "./Chatbot.css"
import { askChatbot } from "../services/api"

/**
 * Floating AI advisory chatbot.
 * Talks to POST /chatbot/. If a `context` prop (the feasibility
 * object from a prior /assessment/ call) is passed in, the backend
 * gives grounded answers about that specific business. Otherwise it
 * falls back to a generic reply.
 */
function Chatbot({ context = null }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm your Gram-Biz AI advisor. Ask me about your revenue, expenses, EMI, market or risk once you've completed an assessment.",
    },
  ])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, open])

  const sendMessage = async (e) => {
    e.preventDefault()

    const trimmed = input.trim()
    if (!trimmed || sending) return

    setMessages((prev) => [...prev, { role: "user", text: trimmed }])
    setInput("")
    setSending(true)

    try {
      const result = await askChatbot(trimmed, context)
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: result.reply },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `Sorry, I couldn't reach the server. (${error.message})`,
        },
      ])
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="chatbot-widget">

      {open && (

        <div className="chatbot-panel">

          <div className="chatbot-header">

            <div>
              <strong>Gram-Biz AI Advisor</strong>
              <span>
                {context
                  ? "Answering based on your assessment"
                  : "Complete an assessment for grounded answers"}
              </span>
            </div>

            <button
              className="chatbot-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>

          </div>

          <div className="chatbot-messages" ref={scrollRef}>

            {messages.map((m, i) => (
              <div
                key={i}
                className={`chatbot-bubble ${m.role === "user" ? "chatbot-bubble-user" : "chatbot-bubble-bot"}`}
              >
                {m.text}
              </div>
            ))}

            {sending && (
              <div className="chatbot-bubble chatbot-bubble-bot chatbot-typing">
                Thinking…
              </div>
            )}

          </div>

          <form className="chatbot-input-row" onSubmit={sendMessage}>

            <input
              type="text"
              placeholder="Ask about revenue, EMI, risk…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={sending}
            />

            <button type="submit" disabled={sending || !input.trim()}>
              Send
            </button>

          </form>

        </div>

      )}

      <button
        className="chatbot-fab"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle Gram-Biz AI chat"
      >
        {open ? "×" : "💬"}
      </button>

    </div>
  )
}

export default Chatbot
