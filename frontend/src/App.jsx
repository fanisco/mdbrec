import React, { useEffect, useState } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/test')
      .then((res) => res.json())
      .then(setData)
      .catch(setError);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ChatWindow />
    </div>
  );
}

export default App; 