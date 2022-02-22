import React, { Component } from "react";


import grocery from "../images/grocery-logo.jpg";
import ItemService from "../api/ItemService";

class AddItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: "",
      originalPrice: "",
      discountPercentage: "",
    };

    this.changeName = this.changeName.bind(this);
    this.changeOriginalPrice = this.changeOriginalPrice.bind(this);
    this.changeDiscountPercentage = this.changeDiscountPercentage.bind(this);

    this.addOrUpdate = this.addOrUpdate.bind(this);

    this.cancel = this.cancel.bind(this);
  }
  changeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  changeOriginalPrice = (event) => {
    this.setState({
      originalPrice: event.target.value,
    });
  };
  changeDiscountPercentage = (event) => {
    this.setState({
      discountPercentage: event.target.value,
    });
  };

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      ItemService.getItemById(this.state.id).then((response) => {
        let item = response.data;
        this.setState({
          name: item.name,
          originalPrice: item.originalPrice,
          discountPercentage: item.discountPercentage,
        });
      });
    }
  }

  addOrUpdate = (event) => {
    event.preventDefault();

    let item = {
      name: this.state.name,
      originalPrice: this.state.originalPrice,
      discountPercentage: this.state.discountPercentage,
    };
    const Name = document.querySelector("#pName");
    const OPrice = document.querySelector("#oPrice");
    const dPercent = document.querySelector("#dPercentage");
    const Message = document.querySelector("#msg");

    if (
      Name.value.length === 0 ||
      OPrice.value.length === 0 ||
      dPercent.value.length === 0
    ) {
      Message.innerHTML = "<h4 class='error'> Please complete details!<h4/>";

      setTimeout(() => document.querySelector(".error").remove(), 3000);
    } else {
      if (this.state.id === "_add") {
        let DiscountPercentage = document.getElementById("dPercentage").value;
        let Price = document.getElementById("oPrice").value;
        if (DiscountPercentage > 100) {
          Message.innerHTML =
            "<h4 class='error'>Not more than 100% discount!<h4/> ";

          setTimeout(() => document.querySelector(".error").remove(), 3000);
        } else if (DiscountPercentage < 0) {
          Message.innerHTML =
            "<h4 class='error'>Not less than 0% discount!<h4/> ";

          setTimeout(() => document.querySelector(".error").remove(), 3000);
        } else if (Price <= 0) {
          Message.innerHTML =
            "<h4 class='error'>Not less than or equal 0 price!<h4/> ";

          setTimeout(() => document.querySelector(".error").remove(), 3000);
        } else {
          alert("Successfully Added!");

          ItemService.insertItem(item).then((response) => {
            this.props.history.push("/items");
          });
        }
      } else {
        let DiscountPercentage = document.getElementById("dPercentage").value;
        let Price = document.getElementById("oPrice").value;
        if (
          Name.value.length === 0 ||
          OPrice.value.length === 0 ||
          dPercent.value.length === 0
        ) {
          Message.innerHTML =
            "<h4 class='error'> Please complete details!<h4/>";

          setTimeout(() => document.querySelector(".error").remove(), 3000);
        } else if (Price <= 0) {
          Message.innerHTML =
            "<h4 class='error'>Not less than or equal 0 price!<h4/> ";

          setTimeout(() => document.querySelector(".error").remove(), 3000);
        } else if (DiscountPercentage > 100) {
          Message.innerHTML =
            "<h4 class='error'>Not more than 100% discount!<h4/> ";

          setTimeout(() => document.querySelector(".error").remove(), 3000);
        } else if (DiscountPercentage < 0) {
          Message.innerHTML =
            "<h4 class='error'>Not less than 0% discount!<h4/> ";

          setTimeout(() => document.querySelector(".error").remove(), 3000);
        } else {
          alert("Successfully Updated!");
          ItemService.updateItem(item, this.state.id).then((response) => {
            this.props.history.push("/items");
          });
        }
      }
    }
  };

  cancel() {
    this.props.history.push("/items");
  }
  getTitle() {
    if (this.state.id === "_add") {
      return <h3> Add Item</h3>;
    } else {
      return <h3> Update Item</h3>;
    }
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <form className="login">
            <p className="title">{this.getTitle()}</p>
            <div id="msg"></div>
            <img src={grocery} className="logo-grocery-add" alt=""></img>
            <input
              id="pName"
              placeholder="Product Name"
              className="form-control"
              value={this.state.name}
              onChange={this.changeName}
              autofocus
              required
              
            />
            <i className="fa fa-shopping-cart" />
            <input
              id="oPrice"
              placeholder="Price"
              className="form-control"
              value={this.state.originalPrice}
              onChange={this.changeOriginalPrice}
              type="number"
              required
            />
            <i className="fa fa-dollar" />
            <input
              id="dPercentage"
              placeholder="Discount Percentage"
              className="form-control"
              value={this.state.discountPercentage}
              onChange={this.changeDiscountPercentage}
              type="number"
              required
            />
            <i className="fa fa-percent" />
            <br></br>
            <button
              style={{ marginLeft: "70px" }}
              className="button-save"
              onClick={this.addOrUpdate}
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

export default AddItemComponent;
