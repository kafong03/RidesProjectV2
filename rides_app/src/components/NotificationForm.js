// NotificationForm.js
import React, { useState } from 'react';

const NotificationForm = () => {
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

  return (
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
      <select defaultValue="now" onChange={(event) => setDelay(event.target.value)}>
        <option value="now">Now</option>
        <option value="later">Later</option>
      </select>
    </form>
  );
}

export default NotificationForm;