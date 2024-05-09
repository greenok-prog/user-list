import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserList from "./routes/UserList";
import UserAdd from "./routes/UserAdd";
import UserChange from "./routes/UserChange";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserList />,
  },
  {
    path: "/add",
    element: <UserAdd />,
  },
  {
    path: "/:userId",
    element: <UserChange />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
