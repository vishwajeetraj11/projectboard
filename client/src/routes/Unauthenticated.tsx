import { Landing } from 'pages/Landing';
import React from 'react';
import { Route } from 'react-router-dom';

interface Props {

}

export const UnauthenticatedRoutes: React.FC<Props> = () => {
  return (
    <>
      <Route path='/home' exact component={Landing} />
    </>
  );
};
