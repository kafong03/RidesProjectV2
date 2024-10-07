// NotificationPage.js
import React, { useState } from 'react';
import NotificationForm from '../components/NotificationForm';
//import { useAuth0 } from '@auth0/auth0-react';

const NotificationPage = () => {

  /*const {
    isAuthenticated,
    user
    } = useAuth0();

  if (!isAuthenticated) {
    return  (<h1>Please log in</h1>);
  }*/
  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>Notifications</div>
      <p>Prepare and send your notification below!</p>

      <NotificationForm />

      <h2>Pending Notifications</h2>
    </div>
  );
};

export default NotificationPage;