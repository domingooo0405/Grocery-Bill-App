import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "tippy.js/dist/tippy.css";

import RegisterComponent from "./components/user/RegisterComponent";
import ItemsComponent from "./components/items/ItemsComponent";
import AddItemComponent from "./components/items/AddItemComponent";
import ViewItemComponent from "./components/items/ViewItemComponent";
import ReceiptComponent from "./components/items/ReceiptComponent";
import LoginComponent from "./components/user/LoginComponent";
import UserManagement from "./components/user/UserManagement";

import { ProtectedRouteAdmin } from "./route/ProtectedRoute";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginComponent} />
        <Route path="/items" component={ItemsComponent}></Route>
        <Route path={"/view-item/:id"} component={ViewItemComponent}></Route>
        <Route path={"/receipt"} component={ReceiptComponent}></Route>

        <ProtectedRouteAdmin
          path="/add-user"
          component={RegisterComponent}
        ></ProtectedRouteAdmin>
        <ProtectedRouteAdmin
          path="/add-item/:id"
          component={AddItemComponent}
        ></ProtectedRouteAdmin>
        <ProtectedRouteAdmin
          path={"/user-management"}
          component={UserManagement}
        ></ProtectedRouteAdmin>
        <Route
          path={"*"}
          component={() => <h1>Walang laman HAHAHA! 😂</h1>}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
