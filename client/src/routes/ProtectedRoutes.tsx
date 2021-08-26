import React from "react";
import { Redirect, Route } from "react-router-dom";

interface Props {
  component: any,
  condition: boolean,
  path: string,
  redirectRoute: string;
  // location: string;
}


export const PrivateRoute: React.FC<Props> = ({
  component: Component,
  condition,
  path,
  redirectRoute,
  ...props
}) => {
  if (!condition) {
    return (
      <Redirect
        to={{
          pathname: redirectRoute,
        }}
      />
    );
  }
  return <Route exact path={path} component={Component} {...props} />;
};
