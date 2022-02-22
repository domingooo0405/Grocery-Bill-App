import react, { useState } from "react";
import { connect } from "react-redux";
import { authenticate, authFailure, authSuccess } from "../redux/authActions";

import { userLogin } from "../api/AuthenticationService";
import { Alert, Spinner } from "react-bootstrap";
import grocery from "../images/grocery-logo.jpg";

const LoginPage = ({ loading, error, ...props }) => {
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.authenticate();

    userLogin(values)
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          const user = document.getElementById("username").value;

          props.setUser(response.data);
          props.history.push("/items");
        } else {
          props.loginFailure("Something Wrong!Please Try Again");
        }
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 401:
              console.log("401 status");
              props.loginFailure("Authentication Failed.Bad Credentials");
              break;
            default:
              props.loginFailure("Something Wrong!Please Try Again");
          }
        } else {
          props.loginFailure("Something Wrong!Please Try Again");
        }
      });
    //console.log("Loading again",loading);
  };

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  console.log("Loading ", loading);
  function signup() {
    props.history.push("/signup");
  }
  return (
    <div>
      <div className="wrapper">
        <form className="login" onSubmit={handleSubmit} noValidate={false}>
          <img src={grocery} className="logo-grocery-login" alt=""></img>
          <p className="title">Login</p>

          <div className="form-group">
            <input
              id="username"
              type="text"
              className="form-control"
              placeholder="username"
              value={values.userName}
              onChange={handleChange}
              name="userName"
              required
              autofocus
            />
            <i className="fa fa-user" />
            <div className="invalid-feedback">UserId is invalid</div>
          </div>

          <div className="form-group">
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="password"
              value={values.password}
              onChange={handleChange}
              name="password"
              required
            />
            <i className="fa fa-key" />
            <div className="invalid-feedback">Password is required</div>
          </div>

          <div className="form-group"></div>

          <div className="form-group m-0">
            <br></br>
            <button type="submit" className="button-login">
              Login
              {loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
            </button>
            <a className="signup" onClick={signup}>
              Not a user? Sign up
            </a>
          </div>
          {error && (
            <Alert style={{ marginTop: "20px" }} variant="danger">
              {error}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  console.log("state ", auth);
  return {
    loading: auth.loading,
    error: auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => dispatch(authenticate()),
    setUser: (data) => dispatch(authSuccess(data)),
    loginFailure: (message) => dispatch(authFailure(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
