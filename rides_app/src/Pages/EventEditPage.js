import {useLocation} from 'react-router-dom';
import AssignRidesPage from "./AssignRidesPage";

const EventEditPage = () =>{
    const { state } = useLocation();
    const curEvent = state
    return (
        <AssignRidesPage curEvent={state}/>
    )
}

export default EventEditPage;