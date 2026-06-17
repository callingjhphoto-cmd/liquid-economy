import React, { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'
import { api } from '../lib/api'

export default function ChatPanel({ isOpen, onClose }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await api.sendChatMessage(userMessage)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.response,
        sources: response.sources
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        sources: []
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Chat Panel */}
      <div
        className={`fixed right-0 top-0 h-screen w-96 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-out flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="bg-white p-4 flex items-center justify-between border-b border-gray-200">
          <h2 className="font-display text-lg text-navy">Intelligence Analyst</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-center text-gray-500">
              <div>
                <p className="text-sm font-medium mb-2">Liquid Economy Intelligence Analyst</p>
                <p className="text-xs">Ask questions about market data, valuations, arbitrage signals, or brand pricing</p>
              </div>
            </div>
          )}

          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-navy text-white rounded-br-none'
                    : 'bg-gray-100 text-navy rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.sources && message.sources.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-current/20">
                    <p className={`text-xs font-medium ${message.role === 'user' ? 'text-white/70' : 'text-navy/70'}`}>
                      Sources:
                    </p>
                    <ul className="text-xs space-y-1 mt-1">
                      {message.sources.map((source, i) => (
                        <li key={i} className={message.role === 'user' ? 'text-white/60' : 'text-navy/60'}>
                          • {source}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-navy px-4 py-2 rounded-lg rounded-bl-none">
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              disabled={loading}
              rows="2"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none resize-none text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-navy text-white px-3 py-2 rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50 flex items-center justify-center h-12"
            >
              <Send size={18} />
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">Enter to send {'•'} Shift+Enter for new line</p>
        </div>
      </div>
    </>
  )
}
