import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Auth from './Auth';
import reportWebVitals from './reportWebVitals';
import HomePage from './HomePage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);

const AppContainer = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
