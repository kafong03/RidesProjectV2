// NotificationPage.js
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Notification = () => {
    const [notification, setNotification] = useState('');
    const [notificationError, setNotificationError] = useState('');
    const [notificationSuccess, setNotificationSuccess] = useState('');
  
    const onSendButtonClick = () => {
      setNotificationError('');
      setNotificationSuccess('');
      if ('' === notification) {
          setNotificationError('Please enter your notification');
          return;
      } else {
          setNotificationSuccess('Notification sent!');
          fetch('/api/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(notification)
          })
            .then(res => res.json());
          setNotification('');
          // TODO: Figure out how to actually send text notifications to people
      }
    };

  const {
    isAuthenticated,
    user
    } = useAuth0();

  if (!isAuthenticated) {
    return  (<h1>Please log in</h1>);
  }
  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        Notifications
      <p>Prepare and send your notification below!</p>
      <div className={'inputContainer'}>
        <textarea
            className={'inputArea'}
            value={notification}
            rows="10"
            placeholder="write your notification here"
            onChange={(ev) => setNotification(ev.target.value)}
        />
        <label className="errorLabel">{notificationError}</label>
        <label className="successLabel">{notificationSuccess}</label>
        <br />
        <div className={'inputContainer'}>
          <input
            type="button"
            className={'inputButton'}
            onClick={onSendButtonClick}
            value={'Send Notification'}
          />
        </div>
      </div>
    </div>
    </div>
  );
};