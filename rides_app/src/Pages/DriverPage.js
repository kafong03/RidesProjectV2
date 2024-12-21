import { StorageContext } from "../Contexts";
import {React, useContext, useState} from "react";

const DriverPage = () => {
    const StorageHandler = useContext(StorageContext); 
    const curDriver = StorageHandler.GetDriverById("1");


    const eventList = StorageHandler.GetEvents();
    const [displayedEvent, setDisplayedEvent] = useState(null)

    
    if (! curDriver){
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

export default DriverPage;