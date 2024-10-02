// NotificationPage.js
import React, { useState } from 'react';
//import { useAuth0 } from '@auth0/auth0-react';

const NotificationPage = () => {
  const [notification, setNotification] = useState('');
  const [delay, setDelay] = useState('now');

  const handleSend = (event) => {
    event.preventDefault();
    if ('' === notification.trim()) {
      alert('Please enter a valid notification');
      return;
    } else {
      if (window.confirm('Do you want to send the following notification?:\n\n' + notification)) { // TODO: Replace warning with undo feature
        alert('Notification sent ' + delay + '!');
        setNotification('');
        // TODO: Figure out how to actually send text notifications to people xD
      }
    }
  };

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

      <form onSubmit={handleSend}>
        <textarea
          required
          className={'inputArea'}
          value={notification}
          rows="10"
          placeholder="Type your notification here"
          onChange={(event) => setNotification(event.target.value)}
          //isInvalid={whitespace}
        />
        <br />
        <input type="submit" value="Send Notification" />
        <select onChange={(event) => setDelay(event.target.value)}>
          <option value="now" selected>Now</option>
          <option value="later">Later</option>
        </select>
      </form>

      <h2>Pending Notifications</h2>
    </div>
  );
};

export default NotificationPage;