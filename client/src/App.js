import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Auth from "./pages/Auth/";
import { AuthContext, AuthContextProvider } from "./Context/AuthContext";
import UserProfile from "./pages/UserProfile";
import EditUser from "./pages/EditUser";
import { Link, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import Admin from "./pages/Admin";
import UserPage from "./pages/UserPage";

function App() {
  const [userId, setUserid] = useState("");
  return (
    <AuthContextProvider>
      <div className="App">
        <Switch>
          <Route
            path="/"
            exact
            component={Auth}
          />
          <Route
            path="/profile"
            exact
            render={() => <UserProfile userId={userId} />}
          />
          <Route path="/edituser" render={() => <EditUser userId={userId} />} />
          <Route path="/admin" component={Admin} />
          <Route path="/user" component={UserPage} />
        </Switch>
      </div>
    </AuthContextProvider>
  );
}

export default App;
