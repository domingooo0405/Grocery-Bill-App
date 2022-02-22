import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import grocery from "../images/grocery-logo.jpg";

function MenuComponent() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const loginUser = localStorage.getItem("loginUser");

  const history = useHistory();
  const handleHistory = () => {
    localStorage.removeItem('loginUser')
    history.push("/");
  };

  return (
    <div>
      <div className="navbar navbar-default navbar-static-top  ">
        <Link to="#" className="menu-bars">
          <i
            className="fa fa-bars "
            style={{ color: "black" }}
            onClick={showSidebar}
          />
        </Link>

      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
        <img src={grocery}  alt=""></img>
          <li className="navbar-toggle">
           
          </li>
          <li>
            <br></br>
            <br></br>
            <i className="fa fa-user fa-2x"></i>
            
            <span className="user-active">{loginUser}</span> 
            <br></br>
            <br></br>
            <br></br>
          </li>

          <li>
            <button
              style={{ marginTop: "250px" }}
              className="button-logout"
              onClick={handleHistory}
            >
              <i className="fa fa-sign-out fa-lg"></i> Logout
            </button>
          </li>
          <br></br>
          <footer className="credit"> © Domingo C. Macunay Jr.</footer>
        </ul>
      </nav>
     
    </div>
  );
}

export default MenuComponent;
