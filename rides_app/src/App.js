import React, { useState } from 'react';
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';

import './App.css';

import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import HomePage from './routes/HomePage';
import LoginPage from './routes/LoginPage';
import ContactPage from './routes/ContactPage';
import NotificationPage from './routes/NotificationPage';

// import { useAuth0 } from '@auth0/auth0-react';
// TODO: Reimplement authentification (once Connor figures that all out lol) 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "notifications",
        element: <NotificationPage />,
      },
    ],
  },
])

const App = () => {
  return (
    <RouterProvider router={router} />
  );
  
}

/*function PrivateRoute({ children }) {
  const isAuthenticated = checkUserAuthentication();
  return isAuthenticated ? children : <Navigate to="/login" />;
}*/

export default App;
