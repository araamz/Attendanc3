import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import RecordsPage from "./pages/RecordsPage.tsx";
import CreateRecordPage from "./pages/CreateRecordPage.tsx";
import GroupsPage from "./pages/GroupsPage.tsx";
import StudentsPage from "./pages/StudentsPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <RecordsPage />
            },
            {
                path: "/create",
                element: <CreateRecordPage />
            },
            {
                path: "/students",
                element: <StudentsPage />
            },
            {
                path: "/groups",
                element: <GroupsPage />
            },
            {
                path: "/settings",
                element: <SettingsPage />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
