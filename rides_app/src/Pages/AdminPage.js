import {React, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import EventClass from "../classes/EventClass";
import { ObjectId } from 'bson';
import { StorageContext } from "../Contexts";
import AssignRidesPage from "./AssignRidesPage";
import EventInput from "../components/EventInput";
import EventList from "../components/EventList";
/* <Link to="/AssignRides" className="btn btn-primary"> Assign Rides</Link> */
const AdminPage = () => {
    const StorageHandler = useContext(StorageContext); 
    const [curEvents, setEvents] = useState(StorageHandler.GetEvents())

    const NewEvent = (eventName, eventDate, eventType) => {
        const newEvent = StorageHandler.CreateEvent(eventName, eventDate, eventType.value);
        console.log("Added: " + eventName);
        setEvents(curEvents => [... curEvents, newEvent]);
        //setComponents(startComponents);
    }

    return (
        <div> Admin Page
            <EventInput labelText={"Input Event Name"} setEventFun={NewEvent}/> 

            <EventList eventsToDisplay={curEvents}/>
        </div>
    );
}

export default AdminPage;