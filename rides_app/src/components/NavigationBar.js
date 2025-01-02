// NavigationBar.js
import { Link, } from "react-router-dom";
import { React, useContext, useEffect, useState } from 'react';
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


  const initialize = async () => {
      await StorageHandler.GetAccount(user.email).then(response => {
        setComponents(pagecomponents(response));
      });
    
    // try{
    //   // const response = await StorageHandler.GetAccount(user.email);
    //   //   console.log(response)
    //   //   setAccount(response);
    //   //   setComponents(pagecomponents(response));   
    //   await StorageHandler.GetAccount(user.email).then(response => {
    //     setComponents(pagecomponents(response));
    //   });

    // }
    // catch{
    //   setComponents (<h1>Could not retrieve events, please refresh</h1>)
    // }
};

  useEffect(() => {
    if(user && isAuthenticated){
      initialize();
    }
            
    }, [user])

  const [pageComponents, setComponents] = useState(
    <ul>
    <li>
      <Link to="/login">Login</Link>
    </li>
    </ul>);
  const StorageHandler = useContext(StorageContext);
  const [curAccount, setAccount] = useState(null);

    // const curDriver = StorageHandler.GetDriverById(curAccount.accountId);
    

    // if (!curDriver){
    //     return (
    //         <div>
    //             Error occured, no driver found
    //         </div>
    //     );
    // }

    const pagecomponents = (curAccount) => { return( 
    <ul>
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
      </> 
    </ul>)};

  return (
    <nav className={'navigation'}>
    <Link to="/" className="site-title">
      <img id ="bereanLogo" src={BereanLogoPng} alt="" className="site-title"/>
      Berean Rides
    </Link>
      {pageComponents}
    </nav>
  )
};

export default NavigationBar;