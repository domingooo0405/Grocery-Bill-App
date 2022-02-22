import React, { Component } from "react";

class HeaderComponent extends Component {
  render() {
    return (
      <div>
        <header>
       
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <p>Grocery Bill Application</p>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;
