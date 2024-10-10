import React, { useState } from 'react';
import './App.css'; // Tailwind CSS
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import Topbar from './components/Topbar';
import AppRoutes from './components/AppRoutes';

const App = ({setJwtToken, jwtToken}) => {

  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none")
  
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track if user is authenticated



  return (
    <div className="flex h-screen fade-in">
      {/* Sidebar */}
      <div className="w-1/5 bg-purple-700 text-white flex flex-col p-4 h-screen">
        {/* Logo */}
        <div className="flex flex-col justify-start items-center mb-2">
          <img
            src={`${process.env.PUBLIC_URL}/odisseia_novo.png`}
            alt="Logo"
            className="w-250 h-auto" // Adjust the size of the logo as needed
          />
        </div>

        {/* Horizontal line directly below the logo */}
        <hr className="border-t-2 border-gray-300 w-full mt-2" />

        {/* Navigation */}
        <nav className="flex flex-col justify-between flex-1 mt-4">
          <div className="relative flex flex-col space-y-5">
          <div className="relative group">
            <Link to="aulas" className="block p-2 relative z-10 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              <span>Aulas</span>
            </Link>
            <div className="absolute inset-0 bg-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="relative group">
            <Link to="turmas" className="block p-2 relative z-10 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span>Turmas</span>
            </Link>
            <div className="absolute inset-0 bg-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="relative group">
            <Link to="eventos" className="block p-2 relative z-10 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
            </svg>

              <span>Eventos</span>
            </Link>
            <div className="absolute inset-0 bg-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="relative group">
            <Link to="graphql" className="block p-2 relative z-10 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
              <span>GraphQL</span>
            </Link>
            <div className="absolute inset-0 bg-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="relative group">
            <Link to="suporte" className="block p-2 relative z-10 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              <span>Suporte</span>
            </Link>
            <div className="absolute inset-0 bg-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* "Sair" link at the bottom */}
          <div className="relative group mt-auto">
            <Link to="/" className="block p-2 relative z-10 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>

              <span>Sair</span>
            </Link>
            <div className="absolute inset-0 bg-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />
        

        {/* Content Area */}
        <div className="flex-1 p-4">
          <div>
            {/*<AppRoutes jwtToken={jwtToken} setJwtToken={setJwtToken} />*/}
            <Outlet context={{jwtToken, setJwtToken, setAlertClassName, setAlertMessage}} /> {/* Render nested routes here */}
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
