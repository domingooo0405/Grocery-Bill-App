import React, { Component } from "react";

import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";

import { getUserData } from "../../service/AuthenticationService";
import { getUserList } from "../../service/UserService";

class UserManagement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      filterData: [],
    };

    this.logout = this.logout.bind(this);
    this.user = this.user.bind(this);

    this.addUser = this.addUser.bind(this);

    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);

    this.refresh = this.refresh.bind(this);
    this.userManagement = this.userManagement.bind(this);
    this.itemManagement = this.itemManagement.bind(this);

    this.adminOrUser = this.adminOrUser.bind(this);

    this.userChange = this.userChange.bind(this);
  }

  componentDidMount() {
    getUserList().then((response) => {
      this.setState({
        users: response.data,
        filterData: response.data,
      });
      //  let users =response.data
      //   console.log(users);
    });

    getUserData()
      .then((response) => {
        this.setState({
          user: response.data,
        });
      })
      .catch((e) => {
        localStorage.clear();
        this.props.history.push("/");
      });
  }
  logout() {
    localStorage.clear();
    this.props.history.push("/");
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
  }

  user() {
    getUserData().then((response) => {
      let user = response.data;

      let userDisplay = document.querySelector("#userFound");
      userDisplay.innerHTML = `Welcome! ${user.firstName}`;

      // console.log(user.firstName);
      // console.log(user.roles);
      if (user.roles.toUpperCase() === "ADMIN") {
        document.getElementById("bLogout").style.top = "390px";
        document.getElementById("aUser").style.display = "block";
        document.getElementById("aUser").style.top = "370px";
      }
      if (user.roles.toUpperCase() === "USER") {
        document.getElementById("bLogout").style.top = "430px";
        document.getElementById("aUser").style.display = "none";
      }
    });
  }

  addUser() {
    this.props.history.push("/add-user");
  }
  // componentWillUnmount() {
  //   document.removeEventListener("click",this.addItem, this.updateItem.this.deleteItem);
  // }

  refresh() {
    window.location.reload();
  }
  userManagement() {
    this.props.history.push("/user-management");
  }

  adminOrUser() {
    getUserData().then((response) => {
      let user = response.data;
      let roleUser = localStorage.getItem("role");
      let userDisplay = document.querySelector("#userActive");
      userDisplay.innerHTML = `${roleUser.toLocaleLowerCase()}, ${
        user.firstName
      }`;

      // console.log(user.firstName);
      // console.log(user.roles);
      if (user.roles.toUpperCase() === "ADMIN") {
        document.getElementById("bLogout").style.top = "390px";
        document.getElementById("aUser").style.display = "block";
        document.getElementById("aUser").style.top = "370px";
      }
      if (user.roles.toUpperCase() === "USER") {
        document.getElementById("bLogout").style.top = "430px";
        document.getElementById("aUser").style.display = "none";
      }
    });
  }
  itemManagement() {
    this.props.history.push("/items");
  }
  userChange = (event) => {
    getUserData().then((response) => {
      if (event.target.value == "ADMIN") {
        var filteredData = this.state.users.filter((user) => {
          return user.roles == "ADMIN";
        });
        let total = 0;
        for (let foundFilteredData of filteredData) {
          total = total + foundFilteredData.totalBill;
          console.log(total);
        }

        console.log(filteredData);
        this.setState({
          filterData: filteredData,
        });
        document.getElementById("admin").style.backgroundColor = "lightgray";
        document.getElementById("user").style.backgroundColor = "ghostwhite";
      }
      if (event.target.value == "USER") {
        var filteredData = this.state.users.filter((user) => {
          return user.roles == "USER";
        });
        let total = 0;
        for (let foundFilteredData of filteredData) {
          total = total + foundFilteredData.totalBill;
          console.log(total);
        }

        console.log(filteredData);
        this.setState({
          filterData: filteredData,
        });
        document.getElementById("admin").style.backgroundColor = "ghostwhite";
        document.getElementById("user").style.backgroundColor = "lightgray";
      }
    });
  };
  render() {
    return (
      <div className=" container-xxl">
        <nav className="navbar navbar-expand-lg navbar-light nav-color">
          <div className="navbar navbar-default  ">
            <Link style={{ marginLeft: "10px" }} to="#" className="menu-bars">
              <i
                className="fa fa-bars fa-2x"
                style={{ color: "black" }}
                onClick={this.openNav}
              />
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav ">
              <div className="input-group">
                <div className="form-outline">
                  <input
                    style={{ marginLeft: "10px" }}
                    type="search"
                    id="sItem"
                    className="form-control input-search"
                    placeholder="Search user"
                  />
                </div>
                <button
                  style={{ marginLeft: "125px" }}
                  type="button"
                  className="button-search"
                >
                  <i className="fas fa-search" />
                </button>

                <button
                  style={{ marginLeft: "10px" }}
                  className="button-refresh"
                  onClick={this.refresh}
                >
                  <i className="fa fa-rotate"></i> Refresh
                </button>
                <button
                  style={{ marginLeft: "10px" }}
                  className="button-item"
                  onClick={this.itemManagement}
                >
                  <i className=" fa fa-fw fa-cart-shopping"></i> Item
                </button>
              </div>
            </ul>
          </div>
        </nav>

        <div id="mySidenav" className="sidenav">
          <Link to="#" className="closebtn">
            <i
              className="fa fa-bars"
              style={{ color: "black" }}
              onClick={this.closeNav}
            />
          </Link>

          <i className="fa fa-user fa-2x user-logo"></i>
          <label id="userFound" className="user">
            {this.user()}
          </label>

          <ul>
            <li>
              <a id="bLogout" className="sidebar" onClick={this.logout}>
                <i className="fa fa-fw fa-power-off"></i> Logout
              </a>
            </li>
          </ul>

          <footer className="credit"> © Domingo C. Macunay Jr.</footer>
        </div>
        <div id="msg" className="deleted-message"></div>
        <br></br>
        <div>
          <table className="table table-borderless mb-0 table-item total ">
            <thead style={{ backgroundColor: "lightgray" }}>
              <tr>
                <th style={{ width: "78%" }}>
                  <label
                    id="userActive"
                    style={{ textTransform: "capitalize" }}
                  >
                    {" "}
                    {this.adminOrUser()}
                  </label>
                </th>
                <th></th>
                <th>
                  <Tippy content="Add User">
                    <button
                      id="aItem"
                      className="button-add-item"
                      onClick={this.addUser}
                    >
                      <i className="fa fa-user-plus"></i>
                    </button>
                  </Tippy>

                  <div style={{ marginLeft: "10px" }} className="dropdown">
                    <button className="dropbtn">
                      <i className="fa fa-ellipsis-vertical"></i>
                    </button>
                    <div className="dropdown-content">
                      <input
                        id="all-radio"
                        className="visible-r"
                        name="flexRadioDefault"
                        type="radio"
                        onChange={this.userChange}
                        value={"ADMIN"}
                      />
                      <label
                        id="admin"
                        style={{ cursor: "pointer" }}
                        for="all-radio"
                        className=" nav-size"
                      >
                        Admin
                      </label>

                      <input
                        id="regular-radio"
                        className="visible-r"
                        name="flexRadioDefault"
                        type="radio"
                        onChange={this.userChange}
                        value={"USER"}
                      />
                      <label
                        id="regular"
                        style={{ cursor: "pointer" }}
                        for="regular-radio"
                        className=" nav-size"
                      >
                        User
                      </label>
                      <br></br>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>

          <br></br>

          <table
            style={{ borderBottom: "1px" }}
            className="table table-border-secondary table-striped mb-0 table-item size-table "
          >
            <thead style={{ backgroundColor: "lightgray" }}>
              <tr>
                <th style={{ width: "12%" }}>First Name</th>
                <th style={{ width: "12%" }} className="text-center">
                  Last Name
                </th>
                <th style={{ width: "13%" }} className="text-center">
                  Username
                </th>

                <th style={{ width: "14%" }} className="text-center">
                  Role
                </th>

                <th style={{ width: "15%" }} className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
          </table>
          <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table table-border-secondary table-striped mb-0 table-item size-table ">
              <tbody>
                {this.state.filterData.map((user) => (
                  <tr key={user.id}>
                    <td style={{ width: "12%" }}>{user.firstName}</td>
                    <td style={{ width: "12%" }} className="text-center">
                      {user.lastName}
                    </td>
                    <td style={{ width: "13%" }} className="text-center">
                      {user.userName}
                    </td>

                    <td style={{ width: "14%" }} className="text-center">
                      {user.roles}
                    </td>

                    <td style={{ width: "15%" }} className="text-center">
                      <Tippy content="Update User">
                        <button
                          id="uItem"
                          style={{ marginLeft: "10px" }}
                          className="button-update"
                        >
                          <i className="fa fa-pencil-square-o"></i>
                        </button>
                      </Tippy>
                      <Tippy content="Delete User">
                        <button
                          id="dItem"
                          style={{ marginLeft: "10px" }}
                          className="button-delete"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </Tippy>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <br></br>

            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

export default UserManagement;
