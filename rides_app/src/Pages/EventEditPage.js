import {useLocation} from 'react-router-dom';

const EventEditPage = () =>{
    const { state } = useLocation();
    const curEvent = state
    return (
        <div>
            {curEvent.eventName}
        </div>
    )
}

export default EventEditPage;