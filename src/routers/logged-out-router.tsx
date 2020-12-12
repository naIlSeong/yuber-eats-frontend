import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound } from "../components/404";
import { CreateAccount } from "../pages/create-account";
import { Login } from "../pages/login";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route>
          <NotFound
            title="Not Found"
            notFoundText="Not Found :("
            message="page"
          />
        </Route>
      </Switch>
    </Router>
  );
};
