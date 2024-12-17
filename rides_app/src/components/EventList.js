import { Link } from "react-router-dom";

const EventList = ({eventsToDisplay}) =>{
    
    return (
        eventsToDisplay.map(curEvent => {
            return(
            
            <Link to={ "/EditEvent" } state = {curEvent} >
                <button  key={curEvent._id}>
                    {curEvent.eventName}
                </button>
            </Link>
            )
        })
    )
}

export default EventList;