import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Index from "./routes/index";
import Create from "./routes/create";
import ErrorPage from "./error-page";
import Poll, {
  loader as pollLoader,
  action as pollAction,
} from "./routes/poll";
import Voting from "./components/poll/Voting";
import Results from "./components/poll/Results";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "/create", element: <Create /> },
      {
        path: "/p/:shortkey",
        element: <Poll />,
        loader: pollLoader,
        action: pollAction,
        children: [
          { index: true, element: <Voting /> },
          { path: "results", element: <Results /> },
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
