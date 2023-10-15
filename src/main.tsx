import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import RecordPage from "./pages/RecordPage.tsx";
import CreateRecordPage from "./pages/CreateRecordPage.tsx";
import TeamsPage from "./pages/TeamsPage.tsx";
import SectionsPage from "./pages/SectionsPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <RecordPage />
            },
            {
                path: "/create",
                element: <CreateRecordPage />
            },
            {
                path: "/students",
                element: <p>Students</p>
            },
            {
                path: "/teams",
                element: <TeamsPage />
            },
            {
                path: "/sections",
                element: <SectionsPage />
            },
            {
                path: "/settings",
                element: <p>Settings</p>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
