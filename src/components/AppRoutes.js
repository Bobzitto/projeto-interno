// AppRoutes.js
import React, { useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from '../App'; // Import your main App component
import Login from './Login'; // Import your Login component
import Home from './Home'; // Import your Home component
import ErrorPage from './ErrorPage'; // Import your ErrorPage component if you have one
import MenuAulas from './MenuAulas';
import Aula from './Aula';
import MenuTurmas from './MenuTurmas';
import Turma from './Turma';
import EditAula from './EditAula';
import EditTurma from './EditTurma';
import Eventos from './Eventos';
import GraphQL from './GraphQL';

  const AppRoutes = () => {
    const [jwtToken, setJwtToken] = useState("");

    const router = createBrowserRouter([
      {
        path: "/",
        element: <Login setJwtToken={setJwtToken} />, // Login component is the default
      },
      {
        path: "/home",
        element: jwtToken ? <App setJwtToken={setJwtToken} jwtToken={jwtToken} /> : <Navigate to="/" />, // Redirect to Login if not authenticated
        errorElement: <ErrorPage />,
        children: [
      
        {
          path: "aulas",
          element: jwtToken ? <MenuAulas /> : <Navigate to="/" />,
        },
      {
        path: "turmas",
        element: jwtToken ? <MenuTurmas /> : <Navigate to="/" />,
      },
      {
        path: "aulas/:id/",
        element: jwtToken ? <Aula /> : <Navigate to="/" />,
      },
      {
        path:"eventos",
        element: jwtToken ? <Eventos /> : <Navigate to ="/" />,
      },
      {
        path: "turmas/:id",
        element: jwtToken ? <Turma /> : <Navigate to="/" />,
      },
      {
        path: "aulas/0/edit",
        element: jwtToken ? <EditAula /> : <Navigate to="/" />,
      },
      {
        path: "aulas/:id/edit",
        element: jwtToken ? <EditAula /> : <Navigate to="/" />,
      },
      {
        path: "turmas/0/edit",
        element: jwtToken ? <EditTurma /> : <Navigate to="/" />,
      },
      {
        path: "turma/:id/edit",
        element: jwtToken ? <EditTurma /> : <Navigate to="/" />,
      },
      {
        path: "graphql",
        element: <GraphQL /> ,
      },
      ]}])

  return <RouterProvider router={router} />;
};

export default AppRoutes;
