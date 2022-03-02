import React, { Component } from "react";

import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import grocery from "../images/grocery-logo.jpg";
import { deleteItem, getItemList } from "../service/ItemService";
import { getUserData } from "../service/AuthenticationService";
import { getUserList } from "../service/UserService";

class ItemsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      user: [],
    };
    this.addItem = this.addItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.viewItem = this.viewItem.bind(this);
    this.discounted = this.discounted.bind(this);

    this.totalPrice = this.totalPrice.bind(this);
    this.logout = this.logout.bind(this);
    this.user = this.user.bind(this);

    this.addUser = this.addUser.bind(this);

    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.receipt = this.receipt.bind(this);
  }

  componentDidMount() {
    getItemList().then((response) => {
      this.setState({
        items: response.data,
      });
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
  addItem() {
    getUserData().then((response) => {
      let user = response.data;

      console.log(user.firstName);
      console.log(user.roles);
      if (user.roles.toUpperCase() === "ADMIN") {
        this.props.history.push("/add-item/_add");
      }
      if (user.roles.toUpperCase() === "USER") {
       
        const Message = document.querySelector("#msg");
        Message.innerHTML = "<h4 class='error'>You must be an Admin!<h4/>";

        setTimeout(() => document.querySelector(".error").remove(), 3000);
      }
    });
  }
  updateItem(id) {
    getUserData().then((response) => {
      let user = response.data;

      console.log(user.firstName);
      console.log(user.roles);
      if (user.roles.toUpperCase() === "ADMIN") {
        this.props.history.push(`/add-item/${id}`);
      }
      if (user.roles.toUpperCase() === "USER") {
       
        const Message = document.querySelector("#msg");
        Message.innerHTML = "<h4 class='error'>You must be an Admin!<h4/>";

        setTimeout(() => document.querySelector(".error").remove(), 3000);
      }
    });
  }
  deleteItem(id) {
    getUserData().then((response) => {
      let user = response.data;

      console.log(user.firstName);
      console.log(user.roles);
      if (user.roles.toUpperCase() === "ADMIN") {
        if (window.confirm("Are you sure you want to delete?")) {
          deleteItem(id).then((response) => {
            this.setState({
              items: this.state.items.filter((item) => item.id !== id),
            });
          });
          const Message = document.querySelector("#msg");
          Message.innerHTML = "<h4 class='error'>Successfully deleted!<h4/>";

          setTimeout(() => document.querySelector(".error").remove(), 3000);
        }
      }
      if (user.roles.toUpperCase() === "USER") {
      
        const Message = document.querySelector("#msg");
        Message.innerHTML = "<h4 class='error'>You must be an Admin!<h4/>";

        setTimeout(() => document.querySelector(".error").remove(), 3000);
      }
    });
  }
  discounted(discountedPrice) {
    if (discountedPrice > 0) {
      return <i style={{ color: "green" }} className="fa fa-check"></i>;
    } else {
      return <i style={{ color: "red" }} className="fa fa-xmark"></i>;
    }
  }
  viewItem(id) {
    this.props.history.push(`/view-item/${id}`);
  }

  totalPrice() {
    getItemList().then((response) => {
      let items = response.data;
      let total = 0;
      for (let foundItem of items) {
        total = total + foundItem.totalBill;
      }
      const Total = document.querySelector("#totalA");
      Total.innerHTML = `${total.toFixed(3)} pesos`;
    });
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

      console.log(user.firstName);
      console.log(user.roles);
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
  receipt() {
    this.props.history.push("/receipt");
  }

  addUser() {
    this.props.history.push("/add-user");
  }
  render() {
    return (
      <div className=" container-xxl">
        <div className="navbar navbar-default  ">
          <Link to="#" className="menu-bars">
            <i
              className="fa fa-bars fa-2x"
              style={{ color: "black" }}
              onClick={this.openNav}
            />
          </Link>
        </div>
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
          <button id="aUser" className="button-add-user" onClick={this.addUser}>
            <i className=" fa fa-user-plus"></i> Add User
          </button>
          <button id="bLogout" className="button-logout" onClick={this.logout}>
            <i className="fa fa-sign-out"></i> Logout
          </button>
          <br></br>
          <br></br>
          <footer className="credit"> © Domingo C. Macunay Jr.</footer>
        </div>

        <div>
          <table className="table table-borderless mb-0 table-item total ">
            <thead style={{ backgroundColor: "lightgray" }}>
              <tr>
                <th>Total Amount:</th>
                <th id="totalA">{this.totalPrice()}</th>
                <th>
                  <Tippy content="Add Item">
                    <button
                      id="aItem"
                      className="button-add-item"
                      onClick={this.addItem}
                    >
                      <i className="fa fa-cart-plus"></i>
                    </button>
                  </Tippy>

                  <Tippy content="Print All Items">
                    <button
                      style={{ marginLeft: "10px" }}
                      className="button-print"
                      onClick={this.receipt}
                    >
                      <i className="fa fa-print"></i>
                    </button>
                  </Tippy>
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
          <br></br>
          <img src={grocery} className="logo-grocery" alt=""></img>
          <p id="msg" className="deleted-message"></p>
          <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table table-border-secondary table-striped mb-0 table-item size-table ">
              <thead style={{ backgroundColor: "lightgray" }}>
                <tr>
                  <th>Product Name</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Discounted Price</th>
                  <th className="text-center">Discount Percentage</th>
                  <th className="text-center">Discounted</th>
                  <th className="text-center">Total Price</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td className="text-center">
                      {item.originalPrice + " "}pesos
                    </td>
                    <td className="text-center">
                      {item.discountedPrice + " "}pesos
                    </td>
                    <td className="text-center">{item.discountPercentage}%</td>
                    <td className="text-center">
                      {this.discounted(item.discountedPrice)}
                    </td>
                    <td className="text-center">{item.totalBill + " "}pesos</td>
                    <td className="text-center">
                      <Tippy content="Update Item">
                        <button
                          id="uItem"
                          style={{ marginLeft: "10px" }}
                          className="button-update"
                          onClick={() => this.updateItem(item.id)}
                        >
                          <i className="fa fa-pencil-square-o"></i>
                        </button>
                      </Tippy>
                      <Tippy content="Delete Item">
                        <button
                          id="dItem"
                          style={{ marginLeft: "10px" }}
                          className="button-delete"
                          onClick={() => this.deleteItem(item.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </Tippy>
                      <Tippy content="View Item">
                        <button
                          style={{ marginLeft: "10px" }}
                          className="button-print"
                          onClick={() => this.viewItem(item.id)}
                        >
                          <i className="fa fa-eye"></i>
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

export default ItemsComponent;
