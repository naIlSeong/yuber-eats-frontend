import React from "react";
import { gql, useQuery } from "@apollo/client";
import { meQuery } from "../__generated__/meQuery";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Restaurants } from "../pages/client/restaurants";
import { NotFound } from "../pages/404";

const ClientRoutes = () => (
  <>
    <Route path="/" exact>
      <Restaurants />
    </Route>
    <Route>
      <NotFound />
    </Route>
  </>
);

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
  if (!data || loading || error) {
    return (
      <div>
        <span className="h-screen flex justify-center items-center text-xl font-medium">
          Loading . . .
        </span>
      </div>
    );
  }

  return (
    <Router>
      <Switch>{data.me.role === "Client" && <ClientRoutes />}</Switch>
    </Router>
  );
};
