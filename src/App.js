import React from 'react';
import Spreadsheet from './components/Spreadsheet';
import Toolbar from './components/Toolbar';

const App = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">📊 Spreadsheet</h1>
      <Toolbar />
      <Spreadsheet />
    </div>
  );
};

export default App;

