import React, { Component } from "react";

import { Spinner } from "react-bootstrap";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import grocery from "../../images/grocery-logo.jpg";
import {
  deleteItem,
  getItemById,
  getItemList,
} from "../../service/ItemService";
import { getUserData } from "../../service/AuthenticationService";

class ItemsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      user: [],
      filterData: [],
      loading: false,
      modalIsOpen: false,
    };
    this.addItem = this.addItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.viewItem = this.viewItem.bind(this);
    this.discounted = this.discounted.bind(this);

    this.logout = this.logout.bind(this);
    this.user = this.user.bind(this);

    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.receipt = this.receipt.bind(this);

    this.filterItem = this.filterItem.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.refresh = this.refresh.bind(this);
    this.discountChange = this.discountChange.bind(this);

    this.addUser = this.addUser.bind(this);
    this.userManagement = this.userManagement.bind(this);
    this.itemManagement = this.itemManagement.bind(this);

    this.sortNewerItem = this.sortNewerItem.bind(this);
    this.sortOlderItem = this.sortOlderItem.bind(this);

    this.openModal = this.openModal.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  filterItem = (event) => {
    this.setState({
      value: event.target.value,
    });
  };
  componentDidMount() {
    getItemList().then((response) => {
      let items = response.data;

      items.sort((a, b) => {
        return b.id - a.id;
      });
      // console.log(items);

      this.setState({
        items: response.data,
        filterData: response.data,
      });
      let total = 0;
      for (let foundItem of items) {
        total = total + foundItem.totalBill;
        console.log(total);
      }
      const Total = document.querySelector("#totalA");

      Total.innerHTML = `${total.toFixed(3)} pesos`;
    });
    // getItemList().then((response) => {

    //   this.setState({
    //     items: response.data,
    //     filterData: response.data,
    //   });
    // });
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

    setTimeout(() => {
      this.setState({
        loading: true,
      });
    });
  }
  logout() {
    localStorage.clear();
    this.props.history.push("/");
  }
  addItem() {
    getUserData().then((response) => {
      let user = response.data;

      // console.log(user.firstName);
      // console.log(user.roles);
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

      // console.log(user.firstName);
      // console.log(user.roles);
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

      // console.log(user.firstName);
      // console.log(user.roles);
      if (user.roles.toUpperCase() === "ADMIN") {
        deleteItem(id).then((response) => {
          this.setState({
            filterData: this.state.items.filter((item) => item.id == id),
          });
        });

        this.setState({
          modalIsOpen: false,
        });

        const Message = document.querySelector("#msg");
        Message.innerHTML = "<h4 class='error'>Successfully deleted!<h4/>";

        setTimeout(() => document.querySelector(".error").remove(), 3000);
        setTimeout(() => window.location.reload(), 1000);
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
        localStorage.setItem("role", user.roles);
        document.getElementById("aUser").style.display = "block";
      }
      if (user.roles.toUpperCase() === "USER") {
        document.getElementById("aUser").style.display = "none";
      }
    });
    // getItemList().then((response) => {
    //   let items= response.data;
    //   let total = 0;
    //   for (let foundItem of items) {
    //     total = total + foundItem.totalBill;
    //     console.log(total);
    //   }
    //   const Total = document.querySelector("#totalA");

    //   Total.innerHTML = `${total.toFixed(3)} pesos`;
    // });
  }
  receipt() {
    this.props.history.push("/receipt");
  }

  addUser() {
    this.props.history.push("/add-user");
  }
  // componentWillUnmount() {
  //   document.removeEventListener("click",this.addItem, this.updateItem.this.deleteItem);
  // }

  searchItem() {
    getItemList().then((response) => {
      let items = response.data;

      // console.log(items);
      let SearchItem = document.getElementById("sItem").value;

      for (let foundProductName of items) {
        if (SearchItem.toLowerCase() === foundProductName.name.toLowerCase()) {
          // console.log(SearchItem.toUpperCase())
          // console.log(foundProductName.name.toUpperCase())
          var filteredData = this.state.items.filter((item) => {
            return item.name === foundProductName.name.toLowerCase();
          });
          console.log(filteredData);
          this.setState({
            filterData: filteredData,
          });
        }
        // if (SearchItem.toLowerCase() === "") {
        //   console.log(SearchItem)
        //   console.log(foundProductName.name)
        //   const Message = document.querySelector("#msg");
        //   Message.innerHTML = "<h4 class='error'>Input product name!<h4/>";

        //   setTimeout(() => document.querySelector(".error").remove(), 3000);
        // }
        // if (SearchItem.toLowerCase() !== foundProductName.name.toLowerCase()) {
        //   console.log(SearchItem)
        //   console.log(foundProductName.name)
        //   const Message = document.querySelector("#msg");
        //   Message.innerHTML = "<h4 class='error'>Item not found!<h4/>";

        //   setTimeout(() => document.querySelector(".error").remove(), 3000);
        // }
      }
    });
  }
  refresh() {
    window.location.reload();
  }
  discountChange = (event) => {
    getItemList().then((response) => {
      let items = response.data;

      console.log(items);

      // console.log(foundItem.discounted);
      if (event.target.value == 0) {
        var filteredData = this.state.items.filter((item) => {
          return item.discountPercentage == 0;
        });
        let total = 0;
        for (let foundFilteredData of filteredData) {
          total = total + foundFilteredData.totalBill;
          console.log(total);
        }
        const Total = document.querySelector("#totalA");

        Total.innerHTML = `${total.toFixed(3)} pesos`;

        console.log(filteredData);
        this.setState({
          filterData: filteredData,
        });
        document.getElementById("regular").style.backgroundColor = "lightgray";
        document.getElementById("all").style.backgroundColor = "ghostwhite";
        document.getElementById("discounted").style.backgroundColor =
          "ghostwhite";
      }
      if (event.target.value == 100) {
        var filteredData = this.state.items.filter((item) => {
          return item.discountPercentage > 0;
        });
        let total = 0;
        for (let foundFilteredData of filteredData) {
          total = total + foundFilteredData.totalBill;
          console.log(total);
        }
        const Total = document.querySelector("#totalA");

        Total.innerHTML = `${total.toFixed(3)} pesos`;

        console.log(filteredData);
        this.setState({
          filterData: filteredData,
        });

        document.getElementById("discounted").style.backgroundColor =
          "lightgray";
        document.getElementById("all").style.backgroundColor = "ghostwhite";
        document.getElementById("regular").style.backgroundColor = "ghostwhite";
      }
      if (event.target.value == 1) {
        var filteredData = this.state.items.filter((item) => {
          return item.id >= 1;
        });
        let total = 0;
        for (let foundFilteredData of filteredData) {
          total = total + foundFilteredData.totalBill;
          console.log(total);
        }
        const Total = document.querySelector("#totalA");

        Total.innerHTML = `${total.toFixed(3)} pesos`;
        console.log(filteredData);
        this.setState({
          filterData: filteredData,
        });

        document.getElementById("all").style.backgroundColor = "lightgray";
        document.getElementById("discounted").style.backgroundColor =
          "ghostwhite";
        document.getElementById("regular").style.backgroundColor = "ghostwhite";
      }
    });
  };
  userManagement() {
    this.props.history.push("/user-management");
  }
  itemManagement() {
    this.props.history.push("/items");
  }

  sortOlderItem() {
    try {
      getItemList().then((response) => {
        let items = response.data;

        items.sort((a, b) => {
          return a.id - b.id;
        });
        // console.log(items);

        this.setState({
          filterData: items,
          loading: false,
        });
        let total = 0;
        for (let foundItem of items) {
          total = total + foundItem.totalBill;
          console.log(total);
        }
        const Total = document.querySelector("#totalA");

        Total.innerHTML = `${total.toFixed(3)} pesos`;
      });
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      this.setState({
        loading: true,
      });
    }, 500);
  }
  sortNewerItem() {
    try {
      getItemList().then((response) => {
        let items = response.data;

        items.sort((a, b) => {
          return b.id - a.id;
        });
        // console.log(items);

        this.setState({
          filterData: items,
          loading: false,
        });
        let total = 0;
        for (let foundItem of items) {
          total = total + foundItem.totalBill;
          console.log(total);
        }
        const Total = document.querySelector("#totalA");

        Total.innerHTML = `${total.toFixed(3)} pesos`;
      });
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      this.setState({
        loading: true,
      });
    }, 500);
  }
  openModal(id) {
    let user = localStorage.getItem("role");
    if (user.toUpperCase() === "ADMIN") {
      this.setState({
        filterData: this.state.items.filter((item) => item.id == id),
        modalIsOpen: true,
      });

    
    }

    if (user.toUpperCase() === "USER") {
      const Message = document.querySelector("#msg");
      Message.innerHTML = "<h4 class='error'>You must be an Admin!<h4/>";

      setTimeout(() => document.querySelector(".error").remove(), 3000);
    }
  }
  cancel() {
    this.setState({
      modalIsOpen: false,
    });
    window.location.reload();
  }

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
                    placeholder="Search product name"
                    value={this.state.value}
                    onChange={this.filterItem}
                    required
                  />
                </div>
                <button
                  style={{ marginLeft: "125px" }}
                  type="button"
                  className="button-search"
                  onClick={this.searchItem}
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
                  id="aUser"
                  style={{ marginLeft: "10px" }}
                  className="button-item"
                  onClick={this.userManagement}
                >
                  <i className=" fa fa-fw fa-user"></i> User
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
                <th> Total Amount:</th>
                <th style={{ width: "50%" }}>
                  <label id="totalA" className="total-color"></label>
                </th>
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
                        onChange={this.discountChange}
                        value={1}
                      />
                      <label
                        id="all"
                        style={{ cursor: "pointer" }}
                        for="all-radio"
                        className=" nav-size"
                      >
                        All
                      </label>

                      <input
                        id="regular-radio"
                        className="visible-r"
                        name="flexRadioDefault"
                        type="radio"
                        onChange={this.discountChange}
                        value={0}
                      />
                      <label
                        id="regular"
                        style={{ cursor: "pointer" }}
                        for="regular-radio"
                        className=" nav-size"
                      >
                        Regular
                      </label>
                      <input
                        id="discount-radio"
                        className="visible-r"
                        name="flexRadioDefault"
                        type="radio"
                        onChange={this.discountChange}
                        value={100}
                      />
                      <label
                        id="discounted"
                        style={{ cursor: "pointer" }}
                        for="discount-radio"
                        className=" nav-size"
                      >
                        Discounted
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
            id="item"
            style={{ borderBottom: "1px" }}
            className="table table-border-secondary table-striped mb-0 table-item size-table "
          >
            <thead style={{ backgroundColor: "lightgray" }}>
              <tr>
                <th style={{ width: "12%" }}>
                  Product Name
                  <div style={{ marginLeft: "10px" }} className="dropdown">
                    <button className="dropbtn">
                      <i className="fa fa-sort"></i>
                    </button>
                    <div className="dropdown-content">
                      <a onClick={this.sortOlderItem}>Older to Newer</a>
                      <a onClick={this.sortNewerItem}>Newer to older</a>
                    </div>
                  </div>
                </th>
                <th style={{ width: "12%" }} className="text-center">
                  Price
                </th>
                <th style={{ width: "13%" }} className="text-center">
                  Discounted Price
                </th>
                <th style={{ width: "14%" }} className="text-center">
                  Discount Percentage
                </th>
                <th style={{ width: "14%" }} className="text-center">
                  Discounted
                </th>
                <th style={{ width: "14%" }} className="text-center">
                  Total Price
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
                {this.state.loading ? (
                  this.state.filterData.map((item) => (
                    <tr key={item.id}>
                      <td style={{ width: "12%" }}>{item.name}</td>
                      <td style={{ width: "12%" }} className="text-center">
                        {item.originalPrice + " "}pesos
                      </td>
                      <td style={{ width: "13%" }} className="text-center">
                        {item.discountedPrice + " "}pesos
                      </td>
                      <td style={{ width: "14%" }} className="text-center">
                        {item.discountPercentage}%
                      </td>
                      <td style={{ width: "14%" }} className="text-center">
                        {this.discounted(item.discountedPrice)}
                      </td>
                      <td style={{ width: "14%" }} className="text-center">
                        {item.totalBill + " "}pesos
                      </td>
                      <td style={{ width: "15%" }} className="text-center">
                      
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
                            style={{ marginLeft: "10px" }}
                            className="button-delete"
                            onClick={() => this.openModal(item.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </Tippy>

                        {this.state.modalIsOpen && (
                         
                            <div className="modal-dialog modal-design">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title">
                                    Delete Item{" "}
                                    <i className="fa fa-trash"></i>
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={this.cancel}
                                  />
                                </div>
                                <div className="modal-body">
                                  <p>
                                    Are you sure you want to delete this {item.name}?
                                   
                                  </p>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    id="dItem"
                                    style={{ marginLeft: "10px" }}
                                    className="button-delete"
                                    onClick={() =>
                                      this.deleteItem(item.id)
                                    }
                                  >
                                    <i className="fa fa-trash"></i> Delete
                                  </button>
                                  <button
                                    style={{ marginLeft: "10px" }}
                                    className="button-delete"
                                    onClick={this.cancel}
                                  >
                                    <i className="fa fa-cancel"></i> Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                         
                        )}

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
                  ))
                ) : (
                  <Spinner
                    className="loader"
                    style={{ position: "absolute" }}
                    as="span"
                    animation="border"
                    size="m"
                    role="status"
                    aria-hidden="true"
                  />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemsComponent;
