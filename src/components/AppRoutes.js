import React, { useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "../App"; 
import Login from "./Login"; 
import ErrorPage from "./ErrorPage"; 
import MenuAulas from "./MenuAulas";
import Aula from "./Aula";
import EditAula from "./EditAula";
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
          element: isAuthenticated ? <ErrorPage /> : <Navigate to="/" />,
        },
        {
          path: "aulas/:id/",
          element: isAuthenticated ? <Aula /> : <Navigate to="/" />,
        },
        {
          path: "eventos",
          element: isAuthenticated ? <ErrorPage /> : <Navigate to="/" />,
        },
        {
          path: "turmas/:id",
          element: isAuthenticated ? <ErrorPage /> : <Navigate to="/" />,
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
          element: isAuthenticated ? <ErrorPage /> : <Navigate to="/" />,
        },
        {
          path: "turma/:id/edit",
          element: isAuthenticated ? <ErrorPage /> : <Navigate to="/" />,
        },
        {
          path: "graphql",
          element: <ErrorPage />,
        },
        {
          path: "suporte",
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
