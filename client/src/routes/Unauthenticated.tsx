import { Switch } from 'react-router-dom';
import { EditProfile } from 'pages/EditProfile';
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
      <Route path='/edit-profile' exact component={(props: any) => <EditProfile setAuthenticated={setAuthenticated} {...props} />} />
      <Redirect path='*' to='/' />
    </Switch>
  );
};
