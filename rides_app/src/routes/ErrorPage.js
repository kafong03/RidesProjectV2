// ErrorPage.js
import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <h1>{error.status}</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p>how did you even get here lol</p>
    </>
  );
};

export default ErrorPage;