import "./App.css";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ProfilePage from "./pages/profile/ProfilePage";
import HomePage from "./pages/home/HomePage";
import NotFound from "./pages/error/NotFound";
import Unauthorized from "./pages/error/Unauthorized";
import { Redirect } from "react-router-dom";
import AuthGuard from "./guards/AuthGuard";
import Role from "./models/role";
import logo from "./logo.svg";
import { NavLink } from "react-router-dom";
import { Component } from "react";
import userService from "./service/user.service";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      errorMessage: "",
    };
  }
  componentDidMount() {
    userService.currentUser.subscribe((data) => {
      this.setState({
        currentUser: data,
      });
    });
  }
  logout() {
    userService.logOut().then(
      (data) => {
        this.props.history.push("/login");
      },
      (error) => {
        console.log(error);
        this.setState({
          errorMessage: "Unexpected error occured.",
        });
      }
    );
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <BrowserRouter>
          <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a href="https://reactjs.org" className="navbar-brand ms-1">
                <img src={logo} alt="logo" className="App-logo" /> React
              </a>
              <div className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/home"
                    activeClassName="active"
                  >
                    <span className="fa fa-home fw"> Home</span>
                  </NavLink>
                </li>
              </div>
              {!currentUser && (
                <div className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/register"
                      activeClassName="active"
                    >
                      <span className="fa fa-user-plus fw"> Sign up</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/login"
                      activeClassName="active"
                    >
                      <span className="fa fa-sign-in fw"> Sign in</span>
                    </NavLink>
                  </li>
                </div>
              )}
              {currentUser && (
                <div className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/profile"
                      activeClassName="active"
                    >
                      <span
                        className="fa fa-user fw"
                        style={{ textTransform: "capitalize" }}
                      >
                        {" "}
                        {currentUser.name}
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={() => this.logout()}>
                      <span className="fa fa-sign-out fw"></span>
                      Logout
                    </a>
                  </li>
                </div>
              )}
            </nav>
          </div>

          <Switch>
            <Route exact path={"/"} component={LoginPage}></Route>
            <Route exact path={"/login"} component={LoginPage}></Route>
            <Route exact path={"/register"} component={RegisterPage}></Route>
            <AuthGuard
              exact
              path={"/profile"}
              roles={[Role.ADMIN, Role.USER]}
              component={ProfilePage}
            ></AuthGuard>
            <AuthGuard
              exact
              path="/home"
              roles={[Role.ADMIN]}
              component={HomePage}
            ></AuthGuard>

            <Route exact path={"/404"} component={NotFound}></Route>
            <Route exact path={"/401"} component={Unauthorized}></Route>
            <Redirect from="*" to="/404"></Redirect>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
