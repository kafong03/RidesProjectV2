// NavigationBar.js
import { Link, } from "react-router-dom";
import React, { useState } from 'react';
import BereanLogoPng from "../Resources/BereanLogoNoText.png";
import "../CSS/NavigationBar.css";

import '../App.css';

const NavigationBar = () => {
  return (
    <nav className={'navigation'}>
      <Link to="/" className="site-title">
        <img id ="bereanLogo" src={BereanLogoPng} alt="" className="site-title"/>
        Berean Rides
      </Link>
      <ul>
        {true ?
        <>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
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