import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import HeaderAside from './components/header/HeaderAside';

function App() {  
  const [isToOpenMenu, setIsToOpenMenu] = useState<boolean>(true);

  return (
    <div className="grid-container">
      <header>
        <Header 
          setOpenMenu={(open: boolean) => {
            setIsToOpenMenu(!open);
          }} />
      </header>
      <aside>
        <div className={isToOpenMenu ? "HeaderAside-close" : "HeaderAside primaryColor_background"}>
          <HeaderAside 
            isToClose={(open: boolean) => {
                setIsToOpenMenu(open);
            }} />
        </div>
        <div 
          className={isToOpenMenu ? 'HeaderAsideBackground-close' : 'HeaderAsideBackground'}
          onClick={() => setIsToOpenMenu(true)} />
      </aside>
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
