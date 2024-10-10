import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import MenuAulas from './components/MenuAulas';
import MenuTurmas from './components/MenuTurmas';
import Home from './components/Home';
import Aula from './components/Aula';
import Turma from './components/Turma';
import EditAula from './components/EditAula';
import EditTurma from './components/EditTurma';
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';
import AppRoutes from './components/AppRoutes';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRoutes /> 
  </React.StrictMode>
);
