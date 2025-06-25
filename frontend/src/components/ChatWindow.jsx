import React, { useState, useRef } from 'react';
import ChatMessage from './ChatMessage';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { type: 'user', text: input }]);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input })
      });
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        setMessages((msgs) => [...msgs, { type: 'bot', error: 'No results found.' }]);
      } else {
        setMessages((msgs) => [...msgs, { type: 'bot', recommendations: data }]);
      }
    } catch (err) {
      setMessages((msgs) => [...msgs, { type: 'bot', error: 'Failed to fetch recommendations.' }]);
    }
    setLoading(false);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) handleSend();
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4 flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2" style={{ minHeight: 300 }}>
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} {...msg} />
        ))}
        {loading && (
          <div className="flex justify-end"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div></div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
          type="text"
          placeholder="Type a movie or description..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </button>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default ChatWindow; 