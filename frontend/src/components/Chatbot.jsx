// src/components/Chatbot.jsx
import React, { useState } from 'react';
import { chatbotResponses } from '../data/chatbotResponses';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false); // Empieza cerrado

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botResponse = getBotResponse(input);
    if (botResponse) {
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }

    setInput('');
  };

  const getBotResponse = (userInput) => {
    const responseText = chatbotResponses[userInput.toLowerCase()] || 
      "Lo siento, no tengo información sobre eso. Intenta preguntar sobre citas o soporte.";
    
    return { text: responseText, sender: 'bot' };
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg z-50"
      >
        {isOpen ? '-' : '+'}
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
          <h2 className="text-lg font-bold">Chatbot</h2>
          <div className="h-60 overflow-auto border border-gray-300 p-2 mb-2">
            {messages.map((message, index) => (
              <div key={index} className={`my-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Escribe un mensaje..."
          />
          <button onClick={handleSend} className="w-full bg-blue-500 text-white rounded-lg p-2 mt-2">
            Enviar
          </button>
        </div>
      )}
    </>
  );
};

export default Chatbot;
