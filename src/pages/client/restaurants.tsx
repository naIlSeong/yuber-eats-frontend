import React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  restaurantsQuery,
  restaurantsQueryVariables,
} from "../../__generated__/restaurantsQuery";

const RESTAURANTS = gql`
  query restaurantsQuery($input: AllRestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        countRestaurant
      }
    }
    allRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  const { data, loading } = useQuery<
    restaurantsQuery,
    restaurantsQueryVariables
  >(RESTAURANTS, {
    variables: {
      input: {
        page: 1,
      },
    },
  });

  return <h1>Restaurants</h1>;
};
