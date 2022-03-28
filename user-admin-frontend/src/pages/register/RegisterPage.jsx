import React, { Component } from "react";
import UserSerVice from "./../../service/user.service";
import User from "../../models/user";
import userService from "./../../service/user.service";
import { Link } from "react-router-dom";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    if (UserSerVice.currentUserValue) {
      this.props.history.push("/profile");
      return;
    }
    this.state = {
      user: new User("", ""),
      submitted: false,
      loading: false,
      errorMessage: "",
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({
      user: user,
    });
  }
  handleRegister(event) {
    event.preventDefault();
    this.setState({
      submitted: true,
    });
    const { user } = this.state;
    if (!user.name || !user.username || !user.password) {
      return;
    }
    this.setState({
      loading: true,
    });
    userService.register(user).then(
      (data) => {
        this.props.history.push("/login");
      },
      (error) => {
        console.log(error);
        if (error?.response?.status === 409) {
          this.setState({
            errorMessage: "Username exist!",
            loading: false,
          });
        } else {
          this.setState({
            errorMessage: "Unexpected error occured",
            loading: false,
          });
        }
      }
    );
  }
  render() {
    const { errorMessage, submitted } = this.state;
    return (
      <div>
        <div className="form-container">
          <div className="card custom-card">
            <div className="header-container">
              <i className="fa fa-user"></i>
            </div>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <form
              onSubmit={(event) => this.handleRegister(event)}
              noValidate
              className={submitted ? "was-validated" : ""}
            >
                     <div className="for-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  required
                  placeholder="Full Name"
                  value={this.state.user.name}
                  onChange={(event) => this.handleChange(event)}
                />
                <div className="invalid-feedback">
                  A full name is required.
                </div>
              </div>
              <div className="for-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  required
                  placeholder="Username"
                  value={this.state.user.username}
                  onChange={(event) => this.handleChange(event)}
                />
                <div className="invalid-feedback">
                  A valid username is required.
                </div>
              </div>
              <div className="for-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  required
                  placeholder="Password"
                  value={this.state.user.password}
                  onChange={(event) => this.handleChange(event)}
                />
                <div className="invalid-feedback">Password is required</div>
              </div>
              <button
                className="btn btn-success w-100 mt-3"
                disabled={this.state.loading}
              >
                Sign up
              </button>
            </form>
            <Link
              to="/login"
              className="btn btn-link"
              style={{ color: "darkgray" }}
            >
             I have an account
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
