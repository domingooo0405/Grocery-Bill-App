import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
 class Unauthorized extends Component {
   
  render() {
    return (
      <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <span className="display-1">401</span>
            <div className="mb-4 lead">
              Unauthorized! Access to this resource is denied.
            </div>
            <NavLink className="btn btn-link" to="/login">
              Back to Home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Unauthorized