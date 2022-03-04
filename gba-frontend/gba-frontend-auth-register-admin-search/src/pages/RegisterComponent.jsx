import React, { Component } from "react";

import grocery from "../images/grocery-logo.jpg";
import { addUser, getUserList } from "../service/UserService";
export class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      roles: "",
    };

    this.changeFirstName = this.changeFirstName.bind(this);
    this.changeLastName = this.changeLastName.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeRoles = this.changeRoles.bind(this);
    this.cancel = this.cancel.bind(this);
    this.signup = this.signup.bind(this);
  }

  changeFirstName = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  };
  changeLastName = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };
  changeUsername = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };
  changePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  changeRoles = (event) => {
    this.setState({
      roles: event.target.value,
    });
  };
  signup = (event) => {
    event.preventDefault();
    let user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.userName,
      password: this.state.password,
      roles: this.state.roles,
    };

    const FirstName = document.querySelector("#fName");
    const LastName = document.querySelector("#lName");
    const Username = document.querySelector("#uName");
    const Password = document.querySelector("#pWord");
    const Roles = document.querySelector("#rUser");
    const Message = document.querySelector("#msg");

    if (
      FirstName.value.length === 0 ||
      LastName.value.length === 0 ||
      Username.value.length === 0 ||
      Password.value.length === 0||
      Roles.value.length===0
    ) {
      console.log(Roles.value.length);
      Message.innerHTML = "<h4 class='error'> Please complete details!<h4/>";

      setTimeout(() => document.querySelector(".error").remove(), 3000);
    } else {
      getUserList().then((response) => {
        let user = response.data;
        let inputUserName = document.getElementById("uName").value;
        for (let foundUser of user) {
          // console.log(foundUser.userName);
          if (
            foundUser.userName.toUpperCase() === inputUserName.toUpperCase()
          ) {
            Message.innerHTML = "<h4 class='error'>Username already exist<h4/>";
            setTimeout(() => document.querySelector(".error").remove(), 3000);
          }
        }
        // console.log(inputUserName);
      });

      addUser(user).then((response) => {
        alert("Successfully Register!");
        this.props.history.push("/items");
      });
    }
  };
  cancel() {
    this.props.history.push("/items");
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <form className="login">
            <p className="title">Register</p>
            <div id="msg"></div>
            <img src={grocery} className="logo-grocery-add" alt=""></img>
            <input
              id="fName"
              placeholder="First Name"
              className="form-control"
              onChange={this.changeFirstName}
              value={this.firstName}
              required
            />
            <i className="fa fa-f" />
            <input
              id="lName"
              placeholder="Last Name"
              className="form-control"
              onChange={this.changeLastName}
              value={this.lastName}
              required="required"
            />
            <i className="fa fa-l" />
            <input
              id="uName"
              placeholder="Username"
              className="form-control"
              onChange={this.changeUsername}
              value={this.userName}
              required
            />
            <i className="fa fa-user" />
            <input
              id="pWord"
              placeholder="Password"
              className="form-control"
              type="password"
              onChange={this.changePassword}
              value={this.password}
              required
            />
            <i className="fa fa-key" />
            <label for="cars">Roles:</label>{" "}
            <select id="rUser" value={this.roles} onChange={this.changeRoles}>
              <option style={{display: "none"}}/>
              
              <option>ADMIN</option>
              <option>USER</option>
            </select>
            <br></br>
            <br></br>
            <button
              style={{ marginLeft: "70px" }}
              className="button-save"
              onClick={this.signup}
            >
              Save
            </button>
            <button
              style={{ marginLeft: "20px" }}
              className="button-cancel"
              onClick={this.cancel}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterComponent;
