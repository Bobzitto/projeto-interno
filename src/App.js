import React, { createContext, useState } from 'react';
import './App.css'; // Tailwind CSS
import { Outlet } from 'react-router-dom';
import Topbar from './components/Topbar';
import AppRoutes from './components/AppRoutes';
import Sidemenu from './components/Sidemenu';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


  return (
    <div className="flex min-h-screen fade-in">
      <div className="flex-1 flex flex-col">
        <Topbar toggleMenu={toggleMenu}/>
        <Sidemenu isOpen={isMenuOpen} />
        <main className="p-4 flex-1">
          <Outlet context={{isMenuOpen}}/>
        </main>
      </div>
    </div>
  );
};

export default App;
