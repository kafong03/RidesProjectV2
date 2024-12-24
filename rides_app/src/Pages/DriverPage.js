import { StorageContext } from "../Contexts";
import {React, useContext, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import DriverPageComponent from "../components/DriverPageComponent";

const DriverPage = () => {
    const {
        isAuthenticated
    } = useAuth0();
    

    if (isAuthenticated){
        return(<DriverPageComponent/>);
    }
    else{
        <div>Please login before viewing this page</div>
    }
}

export default DriverPage;