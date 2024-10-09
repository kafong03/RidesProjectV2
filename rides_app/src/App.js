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

function App() {
  const storageHandler = new StorageHandler();

  return (
    <StorageContext.Provider value = {storageHandler}>
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<AdminPage/>}/>
        <Route path="/AssignRides" element={<AssignRidesPage curEvent={ storageHandler.GetEvents()[0]}/>}/>
      </Routes>
      </Router>
      
    </div>
    </StorageContext.Provider>
  );
}

export default App;
