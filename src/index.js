import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './Global.css';
import App from './App';
import Banner from './view/Banner';
import Dashboard from './view/Dashboard';
import Posting from './view/Posting';
import Users from './view/Users';
import { Provider } from 'react-redux';
import store from './store/store';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '',
        element: <Dashboard/>
      },
      {
        path: '/banner',
        element: <Banner/>,
      },
      {
        path: '/posting',
        element: <Posting />,
      },
      {
        path: '/users',
        element: <Users/>,
      },
    ]
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>
);

