import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../__generated__/searchRestaurant";
import { RESTAURANT_FRAGMENT } from "../../fragment";
import { Restaurant } from "../../components/restaurant";
import { NotFound } from "../../components/404";

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

  const [callQuery, { data }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);

  const [_, query] = location.search.split("?term=");
  useEffect(() => {
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
  }, [history]);

  return (
    <div>
      <Helmet>
        <title>Search | Yuber Eats</title>
      </Helmet>
      <div className="max-w-screen-2xl my-8 mx-6">
        <div className="text-gray-800 text-3xl w-full">
          Result of <span className="font-semibold">{query}</span>
        </div>
        {data?.searchRestaurant.restaurants?.length !== 0 ? (
          <div className="grid lg:grid-cols-3 gap-x-5 gap-y-10  mb-8 mt-16">
            {data?.searchRestaurant.restaurants?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id + ""}
                coverImg={restaurant.coverImg}
                restaurantName={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
        ) : (
          <NotFound
            title="Search"
            notFoundText={`"${query}" Not Found :(`}
            message="restaurant"
          />
        )}
      </div>
    </div>
  );
};
