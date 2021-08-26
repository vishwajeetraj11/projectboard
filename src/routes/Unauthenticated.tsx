import { Switch } from 'react-router-dom';
import { CreateProfile } from 'pages/CreateProfile';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Landing } from 'pages/Landing';

interface Props {
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UnauthenticatedRoutes: React.FC<Props> = ({ setAuthenticated }) => {

  return (
    <Switch>
      <Route path='/' exact component={Landing} />
      <Route path='/create-profile' exact component={(props: any) => <CreateProfile setAuthenticated={setAuthenticated} {...props} />} />
      <Redirect path='*' to='/' />
    </Switch>
  );
};
