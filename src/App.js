import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import MainPage from "./pages/MainPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import FindCalendar from "./pages/FindCalendar";
import AdminPage from "./pages/AdminPage";
import DataService from "./DataService";

function App() {
  const roles = DataService.getCurrentUserRole();
  let checker = false;

  if(roles) {
      checker = roles.includes("ROLE_ADMIN");
  }


  return (
    <div>

      <Switch>
        <Route exact path="/main" component={MainPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegistrationPage} />
      </Switch>
      {!checker ? (
        <Switch>
          <Route exact path="/user" component={UserPage} />
          <Route exact path="/findCalendar" component={FindCalendar} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/admin" component={AdminPage} />
        </Switch>
      )}
    </div>
  );
}

export default App;
