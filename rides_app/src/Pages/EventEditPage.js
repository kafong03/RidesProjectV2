import {useLocation, useNavigate} from 'react-router-dom';
import AssignRidesPage from "./AssignRidesPage";

const EventEditPage = () =>{
    const { state } = useLocation();    
    const navigate = useNavigate();
    
    const curEvent = state

    if (! state){
        // navigate("/admin");
        return <h1>No event selected</h1>
    }

    return (
        <AssignRidesPage curEvent={state}/>
    )
}

export default EventEditPage;