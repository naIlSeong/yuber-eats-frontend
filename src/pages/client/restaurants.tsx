import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  restaurantsQuery,
  restaurantsQueryVariables,
} from "../../__generated__/restaurantsQuery";
import { Restaurant } from "../../components/restaurant";

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
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    restaurantsQuery,
    restaurantsQueryVariables
  >(RESTAURANTS, {
    variables: {
      input: {
        page,
      },
    },
  });

  const onNextClick = () => setPage((current) => current + 1);
  const onPrevClick = () => setPage((current) => current - 1);

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
        <div className="max-w-screen-2xl mx-auto my-8">
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
          <div className="grid grid-cols-3 gap-x-5 gap-y-10 mx-6 mb-8 mt-16">
            {data?.allRestaurants.restaurants?.map((restaurant) => (
              <Restaurant
                id={restaurant.id + ""}
                coverImg={restaurant.coverImg}
                restaurantName={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="flex justify-center">
            {page > 1 ? (
              <button
                className="text-2xl font-medium hover:bg-lime-400 rounded-full focus:outline-none w-8 h-8 "
                onClick={onPrevClick}
              >
                &larr;
              </button>
            ) : (
              <div className="w-8" />
            )}
            <span className="text-xl mx-3 w-32 text-center">
              Page {page} of {data?.allRestaurants.totalPages}
            </span>
            {page !== data?.allRestaurants.totalPages ? (
              <button
                className="text-2xl font-medium hover:bg-lime-400 rounded-full focus:outline-none w-8 h-8 "
                onClick={onNextClick}
              >
                &rarr;
              </button>
            ) : (
              <div className="w-8" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
