// NavigationBar.js
import { Link, } from "react-router-dom";
import React, { useState } from 'react';
import logo from '../resources/logo.bmp'

import '../App.css';

const NavigationBar = () => {
  return (
    <nav className={'navigation'}>
      <Link to="/" className="site-title">
        <img id ="bereanLogo" src={logo}></img>
        Berean Rides
      </Link>
      <ul>
        {true ?
        <>
          <li>
            <Link to="/notifications">Notifications</Link>
          </li>
          <li>
            <Link to="/ridelist">All Rides</Link>
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