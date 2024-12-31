import {React, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import EventClass from "../classes/EventClass";
import { ObjectId } from 'bson';
import { StorageContext } from "../Contexts";
import EventInput from "../components/EventInput";
import EventList from "../components/EventList";
import AdminPageComponent from "../components/AdminPageComponent";
import { useAuth0 } from "@auth0/auth0-react";
/* <Link to="/AssignRides" className="btn btn-primary"> Assign Rides</Link> */
const AdminPage = () => {
    const {
        isAuthenticated
    } = useAuth0();
    
    
    // useEffect(() => {

    // }, [])

    // const initializePage = async () => {
        
    //     try{
    //         StorageHandler.GetEvents()
    //             .then(response => response.json())
    //             .then(json => {
    //                 return (json.map(curEvent => {
    //                     const newEvent = new EventClass();
    //                     newEvent.FromJSON(curEvent);
    //                     return newEvent;
    //                 }))
    //             }).catch(error => (<h1>Could not retrieve events, please refresh</h1>));
    //     }
    //     catch{
    //         return (<h1>Could not retrieve events, please refresh</h1>)
    //     }
    // };

    if (isAuthenticated){
        return(<AdminPageComponent/>);
    }
    else{
        <div>Please login before viewing this page</div>
    }
}

export default AdminPage;