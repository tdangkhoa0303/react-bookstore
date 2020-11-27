import React, { Fragment, useContext } from "react";

import Context from "../Context";

import { Redirect } from "react-router";

function PrivateRoute({ Component }) {
  const {
    auth: { isAuth },
  } = useContext(Context);

  return (
    <Fragment>
      {isAuth !== null && (isAuth ? <Redirect to="/" /> : <Component />)}
    </Fragment>
  );
}

export default PrivateRoute;
