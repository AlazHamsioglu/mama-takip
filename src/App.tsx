import { useEffect } from 'react';
import './App.css';
import { initializeStorage } from './utils/storage';

function App() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <main className="app">
      <h1>Mama Takip</h1>
      <p>Evcil hayvanlarının günlük beslenmesini takip et.</p>
    </main>
  );
}

export default App;