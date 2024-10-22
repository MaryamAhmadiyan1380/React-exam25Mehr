import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import Main from "./layout/Main";
import { Home } from "./Pages/Home";
import { Add } from "./Pages/Add";
import { Exit } from "./Pages/Exit";
import { Login } from "./LoginPage/Login";
import { User } from "./Pages/User";
import { Profile } from "./Pages/Profile";
import ProtectedRoute from "./ProtectedRoot/ProtectedRoute";
import { Children } from "react";

const router = createBrowserRouter([
    
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/",
          element: <ProtectedRoute element={<Main />} />,
          children: [
            {
              index: true,
              element: <ProtectedRoute element={<Home />} />,
            },
            {
              path: "user",
              element: <ProtectedRoute element={<User />} />,
            },
            {
              path: "profile",
              element: <ProtectedRoute element={<Profile />} />,
            },
            {
              path: "add",
              element: <ProtectedRoute element={<Add />} />,
            },
            {
              path: "exit",
              element: <ProtectedRoute element={<Exit />} />,
            },
          ],
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ]);

export default router;
