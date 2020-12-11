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

  return (
    <div>
      <form className="w-full flex flex-col justify-center items-center bg-gray-800 py-36">
        <input
          type="Search"
          className="input w-5/12 rounded-sm"
          placeholder="Search Restuarant..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto mt-8">
          <div className="flex justify-around max-w-screen-2xl mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <div className="cursor-pointer">
                <div
                  className="w-40 h-40 bg-cover rounded-full"
                  style={{
                    backgroundImage: `url(${category.coverImg})`,
                  }}
                ></div>
                <div className="text-center pt-2 text-lg">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
