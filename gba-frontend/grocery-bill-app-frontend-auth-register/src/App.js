import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import RegisterComponent from "./pages/RegisterComponent";
import ItemsComponent from "./components/ItemsComponent";
import AddItemComponent from "./components/AddItemComponent";
import ViewItemComponent from "./components/ViewItemComponent";
import ReceiptComponent from "./components/ReceiptComponent";
import LoginComponent from "./pages/LoginComponent";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginComponent} />
        <Route path="/signup" component={RegisterComponent}></Route>
        <Route path="/items" component={ItemsComponent}></Route>
        <Route path="/add-item/:id" component={AddItemComponent}></Route>
        <Route path={"/view-item/:id"} component={ViewItemComponent}></Route>
        <Route path={"/receipt"} component={ReceiptComponent}></Route>
      </Switch>
    </Router>
  );
}

export default App;
