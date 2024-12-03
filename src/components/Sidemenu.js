import React from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as AulasIcon} from '../assets/aulas.svg'
import {ReactComponent as EventosIcon} from '../assets/eventos.svg'
import {ReactComponent as GraphIcon} from '../assets/graphql.svg'
import {ReactComponent as TurmasIcon} from '../assets/turmas.svg'
import {ReactComponent as SuporteIcon} from '../assets/suporte.svg'
import {ReactComponent as SairIcon} from '../assets/sair.svg'



const Sidemenu = ({ isOpen }) => {
    return (
      <div
        className={`z-50 w-1/6 bg-purple-700 text-white flex flex-col p-4 h-[calc(100vh-3rem)] fixed top-12 left-0 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      >
  
        {/* Navigation */}
        <nav className="flex flex-col flex-1 mt-4">
          <div className="relative flex flex-col space-y-5">
            <div className="relative group">
              <Link to="aulas" className="block p-2 relative z-10 flex items-center space-x-2">
                <AulasIcon />
                <span>Aulas</span>
              </Link>
              <div className="absolute inset-0 bg-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="relative group">
              <Link to="turmas" className="block p-2 relative z-10 flex items-center space-x-2">
                <TurmasIcon />
                <span>Turmas</span>
              </Link>
              <div className="absolute inset-0 bg-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="relative group">
              <Link to="eventos" className="block p-2 relative z-10 flex items-center space-x-2">
                <EventosIcon className="w-6 h-6"/>
                <span>Eventos</span>
              </Link>
              <div className="absolute inset-0 bg-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="relative group">
              <Link to="graphql" className="block p-2 relative z-10 flex items-center space-x-2">
                <GraphIcon />
                <span>GraphQL</span>
              </Link>
              <div className="absolute inset-0 bg-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="relative group">
              <Link to="suporte" className="block p-2 relative z-10 flex items-center space-x-2">
                <SuporteIcon />
                <span>Suporte</span>
              </Link>
              <div className="absolute inset-0 bg-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </nav>
  
        {/* "Sair" link at the bottom */}
        <div className="relative group mt-auto">
          <Link to="/" className="block p-2 relative z-10 flex items-center space-x-2">
            <SairIcon className="w-6 h-6"/>
            <span>Sair</span>
          </Link>
          <div className="absolute inset-0 bg-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    );
  };
  

export default Sidemenu;
