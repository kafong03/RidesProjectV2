import './App.css';
import AssignRidesPage from './Pages/AssignRidesPage';
import { StorageContext } from './Contexts';
import StorageHandler from './classes/StorageHandler';

function App() {
  const storageHandler = new StorageHandler();

  return (
    <StorageContext.Provider value = {storageHandler}>
    <div className="App">
      <AssignRidesPage/>
    </div>
    </StorageContext.Provider>
  );
}

export default App;
