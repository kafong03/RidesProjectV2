import './App.css';
import { StorageContext } from './Contexts';
import StorageHandler from './classes/StorageHandler';
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import AdminPage from './Pages/AdminPage';
import DriverPage from './Pages/DriverPage';
import HomePage from './Pages/HomePage';
import RootPage from './Pages/RootPage';
import ErrorPage from './Pages/ErrorPage';
import EventEditPage from './Pages/EventEditPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "admin",
            element: <AdminPage />,
          },
          {
            path: "EditEvent",
            element: <EventEditPage />,
          },
          {
            path: "driver",
            element: <DriverPage />,
          },
        ],
      },
      
    ],
  },
])

function App() {
  const storageHandler = new StorageHandler();

  return (
    <StorageContext.Provider value = {storageHandler}>
    <div className="App">
      <RouterProvider router={router} />
    </div>
    </StorageContext.Provider>
  );
}

export default App;
