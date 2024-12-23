import { Link } from "react-router-dom";

const EventList = ({eventsToDisplay}) =>{
    
    return (
        eventsToDisplay.map(curEvent => {
            return(
            
            <Link to={ "/EditEvent" } state = {curEvent} key={curEvent._id} >
                <button>
                    {curEvent.eventName}
                </button>
            </Link>
            )
        })
    )
}

export default EventList;