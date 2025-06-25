import React, { useEffect, useState } from 'react';
import './App.css';

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
    <div style={{ padding: 32 }}>
      <h1>Vite + React + Express + Postgres</h1>
      {error && <pre style={{ color: 'red' }}>{error.message}</pre>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App; 