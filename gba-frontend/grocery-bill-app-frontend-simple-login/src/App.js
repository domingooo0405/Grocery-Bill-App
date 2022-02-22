import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ItemsComponent from "./components/ItemsComponent";
import AddItemComponent from "./components/AddItemComponent";
import LoginUserComponent from "./components/LoginUserComponent";
import ViewItemComponent from "./components/ViewItemComponent";
import ReceiptComponent from "./components/ReceiptComponent";

function App() {
  return (
    <div>
      <Router>
        {/* <HeaderComponent /> */}

        <Switch>
          <Route exact path="/" component={LoginUserComponent}></Route>
          <Route path="/items" component={ItemsComponent}></Route>
          <Route
            exactl
            path="/add-item/:id"
            component={AddItemComponent}
          ></Route>
          <Route path={"/view-item/:id"} component={ViewItemComponent}></Route>
          <Route path={"/receipt"} component={ReceiptComponent}></Route>
        </Switch>

        {/* <FooterComponent /> */}
      </Router>
    </div>
  );
}

export default App;
