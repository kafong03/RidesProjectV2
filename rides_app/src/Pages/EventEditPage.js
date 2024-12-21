import {useLocation} from 'react-router-dom';
import AssignRidesPage from "./AssignRidesPage";

const EventEditPage = () =>{
    const { state } = useLocation();
    const curEvent = state

    if (! state){
        return (
            <div>
                Error occured, no event selected
            </div>
        )
    }

    return (
        <AssignRidesPage curEvent={state}/>
    )
}

export default EventEditPage;