import React, { Component } from "react";
import UserService from "../service/UserService";
import grocery from "../images/grocery-logo.jpg";
class LoginUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
    };
    this.login = this.login.bind(this);
  }
  login = (event) => {
    event.preventDefault();

    UserService.getUser().then((response) => {
      let user = response.data;
      let Username = document.getElementById("userN").value;
      let Password = document.getElementById("passW").value;
      let UserN = document.querySelector("#userN");
      let PassW = document.querySelector("#passW");
      let Message = document.querySelector("#msg");

      for (let foundUser of user) {
        if (UserN.value.length === 0 || PassW.value.length === 0) {
          Message.innerHTML =
            "<h4 class='error'> Please complete details!<h4/>";

          setTimeout(() => document.querySelector(".error").remove(), 3000);
        } else {
          if (
            Username === foundUser.userName &&
            Password === foundUser.password
          ) {
            localStorage.setItem("loginUser", foundUser.userName);
            alert("Login Successful");
            this.props.history.push("/items");
          } else {
            Message.innerHTML =
              "<h4 class='error'> Username or Password is incorrect!<h4/>";

            setTimeout(() => document.querySelector(".error").remove(), 3000);
          }
        }
      }
    });
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <form className="login">
            <img src={grocery} className="logo-grocery-login" alt=""></img>
            <p className="title">Login</p>
            <div id="msg"></div>
            <input
              type="text"
              placeholder="username"
              id="userN"
              name="userName"
              autofocus
            />
            <i className="fa fa-user" />
            <input
              type="password"
              placeholder="password"
              id="passW"
              name="password"
            />
            <i className="fa fa-key" />
            <br></br>
            <button className="button-login" onClick={this.login}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginUserComponent;
