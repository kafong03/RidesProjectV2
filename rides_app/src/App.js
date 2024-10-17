import './App.css';
import { StorageContext } from './Contexts';
import StorageHandler from './classes/StorageHandler';
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import AdminPage from './Pages/AdminPage';
import HomePage from './Pages/HomePage';
import RootPage from './Pages/RootPage';
import ErrorPage from './Pages/ErrorPage';

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
