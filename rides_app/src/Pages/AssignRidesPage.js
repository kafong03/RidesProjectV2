import { useAuth0 } from "@auth0/auth0-react";
import AssignRidesPageComponent from "../components/AssignRidesPageComponent";

const AssignRidesPage = ({curEvent}) =>{
   
    const {
        isAuthenticated
    } = useAuth0();
    

    if (isAuthenticated){
        return(<AssignRidesPageComponent curEvent={curEvent}/>);
    }
    else{
        <div>Please login before viewing this page</div>
    }
};

export default AssignRidesPage;