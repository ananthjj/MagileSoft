import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const runPythonScript = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/run-python', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input: 'Hello from React' }),
        });

        if (!response.ok) {
          // Handle HTTP errors
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message); // Should log: "Processed data: Hello from React"
      } catch (error) {
        console.error('Error running Python script:', error.message);
      }
    };

    runPythonScript();
  }, []);

  return (
    <div>
      <h1>Customer Page</h1>
      <p>Check the console for the backend server response!</p>
    </div>
  );
}

export default App;
