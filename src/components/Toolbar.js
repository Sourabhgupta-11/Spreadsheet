import React from 'react';

const Toolbar = () => {
  return (
    <div className="flex justify-between items-center mb-4 px-2">
      {/* Left side */}
      <div className="flex items-center gap-4 text-sm text-gray-700">
        <span className="font-medium">Tool bar</span>
        <button className="hover:underline">🔽 Hide fields</button>
        <button className="hover:underline">↕ Sort</button>
        <button className="hover:underline">⛃ Filter</button>
        <button className="hover:underline">📑 Cell view</button>
        <span className="text-blue-500 bg-blue-100 px-2 py-1 rounded text-xs ml-4">
          Q3 Financial Overview
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => console.log('Import clicked')}
          className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
        >
          ⬇ Import
        </button>
        <button
          onClick={() => console.log('Export clicked')}
          className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
        >
          ⬆ Export
        </button>
        <button
          onClick={() => console.log('Share clicked')}
          className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
        >
          📤 Share
        </button>
        <button
          onClick={() => console.log('New Action clicked')}
          className="text-sm bg-green-700 text-white px-4 py-1.5 rounded hover:bg-green-800"
        >
          ➕ New Action
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
