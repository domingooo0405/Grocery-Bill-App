import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import userService from "../service/user.service";

class AuthGuard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { component: Component, roles } = this.props;
    const currentUser = userService.currentUserValue;
    if (!currentUser) {
      return <Redirect to={{ pathname: "/login" }}></Redirect>;
    }
    if (roles && roles.indexOf(currentUser.role) === -1) {
      return <Redirect to={{ pathname: "/401" }}></Redirect>;
    }
    return <Component />;
  }
}

export default AuthGuard;
