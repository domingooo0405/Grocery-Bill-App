import React, { Component } from "react";
import ItemService from "../service/ItemService";

import MenuComponent from "./MenuComponent";
import grocery from "../images/grocery-logo.jpg";

class ItemsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
    this.addItem = this.addItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.viewItem = this.viewItem.bind(this);
    this.discounted = this.discounted.bind(this);
    this.logout = this.logout.bind(this);
    this.totalPrice = this.totalPrice.bind(this);
    this.receipt = this.receipt.bind(this);
  }

  componentDidMount() {
    ItemService.getItems().then((response) => {
      this.setState({
        items: response.data,
      });
    });
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
      return <i style={{ color: "red" }} className="fa fa-times"></i>;
    }
  }
  viewItem(id) {
    this.props.history.push(`/view-item/${id}`);
  }
  logout() {
    localStorage.removeItem("loginUser");
    this.props.history.push("/");
  }
  totalPrice() {
    ItemService.getItems().then((response) => {
      let items = response.data;
      let total = 0;
      for (let foundItem of items) {
        total = total + foundItem.totalBill;
      }
      const Total = document.querySelector("#totalA");
     
      Total.innerHTML = `${(total.toFixed(3))} pesos`;
    });
  }
  receipt() {
    this.props.history.push("/receipt");
  }
  render() {
    return (
      <div>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <MenuComponent />
          </nav>
        </div>
        <br></br>

        <div>
          <br></br>
          <br></br>
          <table className="table table-borderless mb-0 table-item total ">
            <thead style={{ backgroundColor: "lightgray" }}>
              <tr>
                <th>Total Amount:</th>
                <th id="totalA">{this.totalPrice()}</th>
                <th>
                  <button
                    className="button-add-item add-position"
                    onClick={this.addItem}
                  >
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
          <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table table-border-secondary  mb-0 table-item size-table ">
              <thead style={{ backgroundColor: "lightgray" }}>
                <tr>
                  <th style={{ width: "15%" }}>Product Name</th>
                  <th style={{ width: "12%" }}>Price</th>
                  <th>Discounted Price</th>
                  <th style={{ width: "18%" }}>Discount Percentage</th>
                  <th>Discounted</th>
                  <th>Total Price</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.originalPrice + " "}pesos</td>
                    <td>{item.discountedPrice + " "}pesos</td>
                    <td>{item.discountPercentage}%</td>
                    <td>{this.discounted(item.discountedPrice)}</td>
                    <td>{item.totalBill + " "}pesos</td>
                    <td>
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

            <p id="msg" className="deleted-message"></p>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemsComponent;
