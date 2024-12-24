import { StorageContext } from "../Contexts";
import {React, useContext, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";

const DriverPageComponent = () => {
    const {
        user,
        isAuthenticated
    } = useAuth0();


    const StorageHandler = useContext(StorageContext);
    const eventList = StorageHandler.GetEvents();
    const [displayedEvent, setDisplayedEvent] = useState(null)
    
    if (! isAuthenticated){
        <div>Please login before viewing this page</div>
    }

    const curAccount = StorageHandler.GetAccount(user.email); 
    
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
    const curDriver = StorageHandler.GetDriverById(curAccount.accountId);

    if (!curDriver){
        return (
            <div>
                Error occured, no driver found
            </div>
        );
    }


    const changeDisplayedEvent = (nextEvent) =>{
        const passengers = nextEvent.driverToPassenger.get(curDriver._id)
        const passengerData = [... passengers].map(passengerId => StorageHandler.GetPassengerById(passengerId))
        console.log(passengerData)
        if (passengers){
            setDisplayedEvent(
                <ul>
                    {passengerData.map(passenger =>{
                        return(
                            <li>
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