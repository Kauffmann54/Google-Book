import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {  
  return (
    <div className="grid-container">
      <main>
        <Routes>
          <Route path="*" element={
              <></>
          } />
          <Route path="/" element={
            <></>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
