// LoginComponent.js
import {React} from 'react';
//import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// BCCT3st@cc
const LoginPage = (props) => {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
    } = useAuth0();

  const logIn = () => {
    loginWithRedirect();
  }

  const logOut = () => {
    logout({ 
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  return (
    <div className={'inputContainer'}>
      {!isAuthenticated ?
      <>
      <p>Log in below!</p>
        <input
          type="button"
          className={'inputButton'}
          onClick={logIn}
          value={'Log In'}
        />
      </>
        :
      <>
        <p>You are already logged in as <b>{user.name}</b>!</p>
        <input
          type="button"
          className={'inputButton'}
          onClick={logOut}
          value={'Log Out'}
        />
      </>
        
      }
    </div>
  );
};

export default LoginPage
