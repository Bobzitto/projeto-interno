import React, { useState } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import App from "../App"; // Main App component
import Login from "./Login"; // Login component
import Home from "./Home"; // Home component
import ErrorPage from "./ErrorPage"; // Error page component
import MenuAulas from "./MenuAulas";
import Aula from "./Aula";
import MenuTurmas from "./MenuTurmas";
import Turma from "./Turma";
import EditAula from "./EditAula";
import EditTurma from "./EditTurma";
import Eventos from "./Eventos";
import GraphQL from "./GraphQL";
import EditEtapa from "./EditEtapa";

const AppRoutes = () => {
  // State to simulate authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setIsAuthenticated={setIsAuthenticated} />, 
    },
    {
      path: "/home",
      element: isAuthenticated ? (
        <App setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Navigate to="/" />
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "aulas",
          element: isAuthenticated ? <MenuAulas /> : <Navigate to="/" />,
        },
        {
          path: "turmas",
          element: isAuthenticated ? <MenuTurmas /> : <Navigate to="/" />,
        },
        {
          path: "aulas/:id/",
          element: isAuthenticated ? <Aula /> : <Navigate to="/" />,
        },
        {
          path: "eventos",
          element: isAuthenticated ? <Eventos /> : <Navigate to="/" />,
        },
        {
          path: "turmas/:id",
          element: isAuthenticated ? <Turma /> : <Navigate to="/" />,
        },
        {
          path: "aulas/0/edit",
          element: isAuthenticated ? <EditAula /> : <Navigate to="/" />,
        },
        {
          path: "aulas/:id/edit",
          element: isAuthenticated ? <EditAula /> : <Navigate to="/" />,
        },
        {
          path: "aulas/:aulaId/etapas/:etapaId/edit",
          element: isAuthenticated ? <EditEtapa /> : <Navigate to="/" />,
        },
        {
          path: "turmas/0/edit",
          element: isAuthenticated ? <EditTurma /> : <Navigate to="/" />,
        },
        {
          path: "turma/:id/edit",
          element: isAuthenticated ? <EditTurma /> : <Navigate to="/" />,
        },
        {
          path: "graphql",
          element: <GraphQL />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
