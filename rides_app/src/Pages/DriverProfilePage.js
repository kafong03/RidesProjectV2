import DriverProfilePageComponent from "../components/DriverProfilePageComponent";
import { StorageContext } from "../Contexts";
import {React, useContext, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";

const DriverProfilePage = () => {
    const {
        isAuthenticated
    } = useAuth0();
    

    if (isAuthenticated){
        return(<DriverProfilePageComponent/>);
    }
    else{
        <div>Please login before viewing this page</div>
    }
};

export default DriverProfilePage;