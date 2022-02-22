import React, { Component } from "react";
import ItemService from "../api/ItemService";

import grocery from "../images/grocery-logo.jpg";

class ViewItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      item: {},
    };
    this.cancel = this.cancel.bind(this);
  }
  componentDidMount() {
    ItemService.getItemById(this.state.id).then((response) => {
      this.setState({
        item: response.data,
      });
    });
  }
  cancel() {
    this.props.history.push("/items");
  }
  render() {
    return (
      <div>
        <br></br>
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
                          <table width="100%" cellPadding={0} cellSpacing={0}>
                            <tbody>
                              <tr>
                                <td className="content-block">
                                  <button
                                    className="button-add-item"
                                    onClick={this.cancel}
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                  
                                  <h2 className="text-center">Item <img src={grocery} className="logo-grocery-view" alt=""></img></h2>
                                </td>
                              </tr>
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
                                                <td>Product Name: </td>
                                                <td className="alignright">
                                                  {this.state.item.name}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Original Price: </td>
                                                <td className="alignright">
                                                  {this.state.item
                                                    .originalPrice + " php"}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Discounted Price:</td>
                                                <td className="alignright">
                                                  {this.state.item
                                                    .discountedPrice + " php"}
                                                </td>
                                              </tr>
                                              <tr className="total-per-item">
                                                <td
                                                  className="alignright"
                                                  width="80%"
                                                >
                                                  Total Price:
                                                </td>
                                                <td className="alignright">
                                                  {this.state.item.totalBill +
                                                    " php"}
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

                              <tr className="text-center" style={{opacity:"0.5"}}>
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
    );
  }
}

export default ViewItemComponent;
