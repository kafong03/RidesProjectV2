import { StorageContext } from "../Contexts";
import {React, useContext, useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";

const DriverPageComponent = () => {
    const {
        user,
        isAuthenticated
    } = useAuth0();


    const StorageHandler = useContext(StorageContext);
    const [displayedEvent, setDisplayedEvent] = useState(null)
    const [curAccount, setAccount] = useState(null);
    const [curDriver, setDriver] = useState(null);
    const [eventList, setEvents] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const initializePage = async () => {
        const account = await StorageHandler.GetAccount(user.email);
        setAccount(account);
        const response = await StorageHandler.GetEvents(false);
        setEvents(response);
        const driver = await StorageHandler.GetDriverById(account.accountId, true, false);
        setDriver(driver);
        setLoaded(true);   
        // try{
        //     const account = await StorageHandler.GetAccount(user.email);
        //     setAccount(account);
        //     const response = await StorageHandler.GetEvents(false);
        //     setEvents(response);
        //     const driver = await StorageHandler.GetDriverById(account.accountId, true, false);
        //     setLoaded(true);      
        // }
        // catch{
        //     return (<h1>Could not retrieve driver, please refresh</h1>)
        // }
    };

    useEffect(() => {
        if (user){
            initializePage();
        }
            
    }, [user])
    
    if (! isAuthenticated){
        <div>Please login before viewing this page</div>
    }

    if (! isLoaded){
        return (<h1>Loading</h1>)
    }
    
    if (! curAccount){
        return (
            <div>
                No account found
            </div>
        );
    }

    if (curAccount.accountType !== "driver"){
        return (
            <div>
                This is not a driver account
            </div>
        );
    }


    if (!curDriver){
        return (
            <div>
                Error occured, no driver found
            </div>
        );
    }


    const changeDisplayedEvent = async (nextEvent) =>{
        const passengers = nextEvent.driverToPassenger.get(curDriver._id)
        if (! passengers){
            setDisplayedEvent( <h1>No passengers to drive for this event</h1>)
            return;
        }
        const passengerData = await Promise.all([... passengers].map(async (passengerId) => { 
            //try catch
            return await StorageHandler.GetPassengerById(passengerId)})
        )
        if (passengers){
            setDisplayedEvent(
                <ul>
                    {passengerData.map(passenger =>{
                        return(
                            <li key={passenger._id}>
                                <div>{passenger.name}</div>
                            <ul>
                                <li> {passenger.address} </li>
                                <li> {passenger.location} </li>
                            </ul>
                            </li>
                        )
                    })}
                </ul>
            );
        }
    }

    return(
        <div>
            {curDriver.name}
            {displayedEvent}
            <div>
                {eventList.map(curEvent => {
                    return(
                    <button key={curEvent._id} onClick={() => changeDisplayedEvent(curEvent)}>
                        {curEvent.eventName}
                    </button>)
                })}
            </div>
        </div>
    );
}

export default DriverPageComponent;