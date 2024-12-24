import {React, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import EventClass from "../classes/EventClass";
import { ObjectId } from 'bson';
import { StorageContext } from "../Contexts";
import EventInput from "../components/EventInput";
import EventList from "../components/EventList";
import { useAuth0 } from "@auth0/auth0-react";
/* <Link to="/AssignRides" className="btn btn-primary"> Assign Rides</Link> */
const AdminPageComponent = () => {
    const {
        user,
        isAuthenticated
    } = useAuth0();

    const StorageHandler = useContext(StorageContext); 

    const [curEvents, setEvents] = useState(StorageHandler.GetEvents())

    if (! isAuthenticated){
        <div>Please login before viewing this page</div>
    }

    if (!user){
        return (
            <div>
                Error, no user found
            </div>
        )
    }

    const curAccount = StorageHandler.GetAccount(user.name)
    if (! curAccount){
        return (
            <div>
                Error, no account found
            </div>
        );
    }

    if (curAccount.accountType !== "admin"){
        return (
            <div>
                This is not an admin account
            </div>
        );
    }

    const NewEvent = (eventName, eventDate, eventType) => {
        if (! eventName){
            alert("Please enter the name of the event");
            return;
        }
        const newEvent = StorageHandler.CreateEvent(eventName, eventDate, eventType.value);
        console.log("Added: " + eventName);
        setEvents(curEvents => [... curEvents, newEvent]);
        //setComponents(startComponents);
    }


    if (false){
        return (<div>Login first</div>)
    } //not authorized

    return (
        <div> Admin Page
            <EventInput labelText={"Input Event Name"} setEventFun={NewEvent}/> 

            <EventList eventsToDisplay={curEvents}/>
        </div>
    );
}

export default AdminPageComponent;