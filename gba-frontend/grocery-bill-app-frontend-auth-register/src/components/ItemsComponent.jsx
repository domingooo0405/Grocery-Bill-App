import React, { Component } from "react";
import { fetchUserData } from "../api/AuthenticationService";

import { Link } from "react-router-dom";
import grocery from "../images/grocery-logo.jpg";
import ItemService from "../api/ItemService";

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

    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.receipt = this.receipt.bind(this);
  }

  componentDidMount() {
    ItemService.getItems().then((response) => {
      this.setState({
        items: response.data,
      });
    });
    fetchUserData()
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
    this.props.history.push("/add-item/_add");
  }
  updateItem(id) {
    this.props.history.push(`/add-item/${id}`);
  }
  deleteItem(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      ItemService.deleteItem(id).then((response) => {
        this.setState({
          items: this.state.items.filter((item) => item.id !== id),
        });
      });
      const Message = document.querySelector("#msg");
      Message.innerHTML = "<h4 class='error'>Successfully deleted!<h4/>";

      setTimeout(() => document.querySelector(".error").remove(), 3000);
    }
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
    ItemService.getItems().then((response) => {
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
    fetchUserData().then((response) => {
      let user = response.data;
      

   
        let userDisplay = document.querySelector("#userFound");
        userDisplay.innerHTML = `Welcome! ${user.firstName}`;

        console.log(user.firstName);
      
      
    });
  }
  receipt() {
    this.props.history.push("/receipt");
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

          <button className="button-logout" onClick={this.logout}>
            <i className="fa fa-sign-out"></i> Logout
          </button>
          <br></br>
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
                  <button className="button-add-item" onClick={this.addItem}>
                    <i className="fa fa-cart-plus"></i> Add Item
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    className="button-print"
                    onClick={this.receipt}
                  >
                    <i className="fa fa-print"></i>
                  </button>
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
                      <button
                        style={{ marginLeft: "10px" }}
                        className="button-update"
                        onClick={() => this.updateItem(item.id)}
                      >
                        <i className="fa fa-pencil-square-o"></i>
                      </button>
                      <button
                        style={{ marginLeft: "10px" }}
                        className="button-delete"
                        onClick={() => this.deleteItem(item.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                      <button
                        style={{ marginLeft: "10px" }}
                        className="button-print"
                        onClick={() => this.viewItem(item.id)}
                      >
                        <i className="fa fa-search"></i>
                      </button>
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
