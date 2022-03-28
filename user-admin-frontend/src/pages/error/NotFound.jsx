import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <span className="display-1">404</span>
              <div className="mb-4 lead">
                Oops! We can't seem to find the page you are looking for.
              </div>
              <NavLink className="btn btn-link" to="/login">
                Back to Home
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
