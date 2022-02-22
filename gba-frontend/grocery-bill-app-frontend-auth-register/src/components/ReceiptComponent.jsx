import React, { Component } from "react";



import grocery from "../images/grocery-logo.jpg";
import ItemService from "../api/ItemService";

class ReceiptComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    ItemService.getItems().then((response) => {
      this.setState({
        items: response.data,
      });
    });
  }

  totalPrice() {
    ItemService.getItems().then((response) => {
      let items = response.data;
      let total = 0;
      let totalDiscount = 0;
      for (let foundItem of items) {
        total = total + foundItem.totalBill;
        totalDiscount = totalDiscount + foundItem.discountedPrice;
      }
      const Total = document.querySelector("#totalA");
      Total.innerHTML = `${total.toFixed(3)} php`;
      const Discount = document.querySelector("#totalD");
      Discount.innerHTML = `${totalDiscount.toFixed(3)} php`;
    });
  }
  cancel() {
    this.props.history.push("/items");
  }
  render() {
    return (
      <div>
        <div>
          <br></br>

          <div>
            <table className="body-wrap1">
              <tbody>
                <tr>
                  <td />
                  <td className="container1" width={600}>
                    <div className="content">
                      <table
                        className="main"
                        width="100%"
                        cellPadding={0}
                        cellSpacing={0}
                      >
                        <tbody>
                          <tr>
                            <td className="content-wrap aligncenter">
                              <table
                                width="100%"
                                cellPadding={0}
                                cellSpacing={0}
                              >
                                <tbody>
                                  <button
                                    className="button-add-item"
                                    onClick={this.cancel}
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                  <tr>
                                    <td className="content-block"></td>
                                  </tr>

                                  <h2 className="text-center">
                                    Receipt
                                    <img
                                      src={grocery}
                                      className="logo-grocery-receipt"
                                      alt=""
                                    ></img>
                                  </h2>
                                  <tr>
                                    <td className="content-block">
                                      <table className="invoice">
                                        <tbody>
                                          <tr>
                                            <td>
                                              <table
                                                className="invoice-items"
                                                cellPadding={0}
                                                cellSpacing={0}
                                              >
                                                <tbody>
                                                  <tr>
                                                    <th>Product Name</th>
                                                    <th>Price</th>
                                                  </tr>

                                                  {this.state.items.map(
                                                    (item) => (
                                                      <tr key={item.id}>
                                                        <td>{item.name}</td>
                                                        <td className="alignright">
                                                          {item.totalBill + " "}
                                                          php
                                                        </td>
                                                      </tr>
                                                    )
                                                  )}
                                                  <tr>
                                                    <th
                                                      className="alignright"
                                                      width="80%"
                                                    >
                                                      Total Discount
                                                    </th>
                                                    <th id="totalD">
                                                      {this.totalPrice()}
                                                    </th>
                                                  </tr>
                                                  <tr className="total-per-item">
                                                    <td
                                                      className="alignright"
                                                      width="80%"
                                                    >
                                                      Total Bill
                                                    </td>
                                                    <td
                                                      id="totalA"
                                                      className="alignright"
                                                    >
                                                      {this.totalPrice()}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>

                                  <tr
                                    className="text-center"
                                    style={{ opacity: "0.5" }}
                                  >
                                    © Created by Domingo C. Macunay Jr.
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ReceiptComponent;
