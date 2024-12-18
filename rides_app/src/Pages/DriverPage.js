import { StorageContext } from "../Contexts";
import {React, useContext, useState} from "react";

const DriverPage = () => {
    const StorageHandler = useContext(StorageContext); 
    const curDriver = StorageHandler.GetDriverById("1");
    const eventList = StorageHandler.GetEvents();
    const [displayedEvent, setDisplayedEvent] = useState(null)

    const changeDisplayedEvent = (nextEvent) =>{
        const passengers = nextEvent.driverToPassenger.get(curDriver._id)
        const passengerData = [... passengers].map(passengerId => StorageHandler.GetPassengerById(passengerId))
        console.log(passengerData)
        if (passengers){
            setDisplayedEvent(
                <div>
                    {passengerData.map(passenger =>{
                        return(
                            passenger.name
                        )
                    })}
                </div>
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