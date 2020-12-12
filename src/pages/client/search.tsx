import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../__generated__/searchRestaurant";
import { RESTAURANT_FRAGMENT } from "../../fragment";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();

  const [callQuery, { data, loading }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);

  useEffect(() => {
    const [_, query] = location.search.split("?term=");
    if (!query) {
      return history.replace("/");
    }
    callQuery({
      variables: {
        input: {
          query,
          page: 1,
        },
      },
    });
  }, [history, location]);
  console.log(data);

  return (
    <div>
      <Helmet>
        <title>Search | Yuber Eats</title>
      </Helmet>
      Search!!!
    </div>
  );
};
