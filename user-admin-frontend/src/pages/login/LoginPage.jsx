import React, { Component } from "react";
import UserSerVice from "./../../service/user.service";
import User from "../../models/user";
import "./LoginPage.css";
import { Link } from "react-router-dom";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    if (UserSerVice.currentUserValue) {
      window.location.reload();
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
  handleLogin() {
    this.setState({
      submitted: true,
    });
    const { user } = this.state;
    if (!user.username || !user.password) {
      return;
    }
    this.setState({
      loading: true,
    });
    UserSerVice.login(user).then(
      (data) => {
        this.props.history.push("/profile");
      },
      (error) => {
        console.log(error);
        this.setState({
          errorMessage: "username or password is not valid",
          loading: false,
        });
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
              onSubmit={(event) => this.handleLogin(event.preventDefault())}
              noValidate
              className={submitted ? "was-validated" : ""}
            >
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
                <div className="invalid-feedback">Password is required.</div>
              </div>
              <button
                className="btn btn-success w-100 mt-3"
                disabled={this.state.loading}
              >
                Sign in
              </button>
            </form>
            <Link
              to="/register"
              className="btn btn-link"
              style={{ color: "darkgray" }}
            >
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
