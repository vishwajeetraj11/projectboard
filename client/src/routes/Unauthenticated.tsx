import { Landing } from 'pages/Landing';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface Props {

}

export const UnauthenticatedRoutes: React.FC<Props> = () => {
  return (
    <>
      <Route path='/' exact component={Landing} />
      <Redirect path='*' to='/' />
    </>
  );
};
