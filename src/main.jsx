import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layout/Main.jsx';
import Home from './component/Home/Home.jsx';
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,

    children: [

      {
        path: '/',
        element: <Home></Home>
      },

      {

        path: 'login',
        element: <Login></Login>,

      },

      {
        path: 'register',
        element: <Register></Register>


      }


    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>

<RouterProvider router={router} />

  </StrictMode>,
)
