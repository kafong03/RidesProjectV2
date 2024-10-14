import './App.css';
import AssignRidesPage from './Pages/AssignRidesPage';
import { StorageContext } from './Contexts';
import StorageHandler from './classes/StorageHandler';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AdminPage from './Pages/AdminPage';
import HomePage from './Pages/HomePage';

function App() {
  const storageHandler = new StorageHandler();

  return (
    <StorageContext.Provider value = {storageHandler}>
    <div className="App">
      <Router>
        <Routes>
          
          <Route path="/" element={<HomePage/>}/>
          <Route path="/AdminPage" element={<AdminPage/>}/>
        </Routes>
      </Router>
      
    </div>
    </StorageContext.Provider>
  );
}

export default App;
