import React from 'react';
import CalorieCalculator from './components/CalorieCalculator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <CalorieCalculator />
      </div>
    </div>
  );
}

export default App;