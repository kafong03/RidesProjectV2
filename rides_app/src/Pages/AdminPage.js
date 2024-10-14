import {React, useContext, useState} from "react";
import { Link } from "react-router-dom";
import { StorageContext } from "../Contexts";
import AssignRidesPage from "./AssignRidesPage";
/* <Link to="/AssignRides" className="btn btn-primary"> Assign Rides</Link> */
const AdminPage = () => {
    const StorageHandler = useContext(StorageContext); 
    const [currentComponents, setComponents] = useState(
    <div>Admin Page
        <div>
            {StorageHandler.GetEvents().map(curEvent => {
                return(
                <button onClick={() => CreateAssignRidesComponent(curEvent  )}>
                    {curEvent.eventName}
                </button>)
            })}
            
        </div>
    </div>)

    const CreateAssignRidesComponent = (curEvent) =>{
        setComponents(<AssignRidesPage curEvent={curEvent}/>);
    }

    return (
        <div>
            {currentComponents}
        </div>
    );
}

export default AdminPage;