import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Index from "./routes/index";
import Create from "./routes/create";
import ErrorPage from "./error-page";
import Poll, { loader as pollLoader } from "./routes/poll";
import Vote, { action as voteAction } from "./routes/vote";
import Result from "./routes/result";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/p/:shortkey",
        element: <Poll />,
        loader: pollLoader,
        children: [
          {
            index: true,
            element: <Vote />,
            action: voteAction,
          },
          {
            path: "results",
            element: <Result />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
