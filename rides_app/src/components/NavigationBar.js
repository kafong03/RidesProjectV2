// NavigationBar.js
import { Link, } from "react-router-dom";
import { React, useContext } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { StorageContext } from "../Contexts";
import BereanLogoPng from "../Resources/BereanLogoNoText.png";
import "../CSS/NavigationBar.css";

import '../App.css';

const NavigationBar = () => {    
  const {
    user,
    isAuthenticated
  } = useAuth0();
  const StorageHandler = useContext(StorageContext);

  const curAccount = isAuthenticated ? StorageHandler.GetAccount(user.email) : null;

    // const curDriver = StorageHandler.GetDriverById(curAccount.accountId);
    

    // if (!curDriver){
    //     return (
    //         <div>
    //             Error occured, no driver found
    //         </div>
    //     );
    // }

  return (
    <nav className={'navigation'}>
      <Link to="/" className="site-title">
        <img id ="bereanLogo" src={BereanLogoPng} alt="" className="site-title"/>
        Berean Rides
      </Link>
      <ul>
        {isAuthenticated ?
        <>
          {curAccount.accountType === "admin" ? 
          <><li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/addPeople">Add People</Link>
          </li>
          </> : ""}


          {curAccount.accountType === "driver" ? 
          <><li>
            <Link to="/driver">Driver</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          </>: ""}
        </> :
        <li>
          <Link to="/login">Login</Link>
        </li>
        }
      </ul>
    </nav>
  )
};

export default NavigationBar;