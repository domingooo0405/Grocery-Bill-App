import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

export const ProtectedRouteAdmin = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        let user = localStorage.getItem("role");

        if (user === "ADMIN") {
          console.log(user);
          console.log("true");
          return <Component {...props} />;
        } else {
          return (
           <h1>Bawal ka dito dapat Admin ka! 😜</h1>
          );
        }
      }}
    />
  );
};
