import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute(props) {
  const { path, component, signedIn } = props;
  return (
    <>
      {signedIn.userStatus ? (
        <Route exact path={path} component={component}></Route>
      ) : (
        <Redirect to="/" exact></Redirect>
      )}
    </>
  );
}

export default PrivateRoute;
