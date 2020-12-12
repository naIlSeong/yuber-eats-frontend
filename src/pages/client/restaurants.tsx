import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  restaurantsQuery,
  restaurantsQueryVariables,
} from "../../__generated__/restaurantsQuery";
import { Restaurant } from "../../components/restaurant";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragment";

const RESTAURANTS = gql`
  query restaurantsQuery($input: AllRestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    allRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${CATEGORY_FRAGMENT}
  ${RESTAURANT_FRAGMENT}
`;

interface IForm {
  searchTerm: string;
}

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
  const { register, handleSubmit, getValues } = useForm<IForm>();
  const history = useHistory();

  const onSearchTerm = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: "search",
      search: `?term=${searchTerm}`,
    });
  };

  return (
    <div>
      <Helmet>
        <title>Home | Yuber Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchTerm)}
        className="w-full flex flex-col justify-center items-center bg-gray-800 py-36"
      >
        <input
          ref={register({ required: true, min: 3 })}
          name="searchTerm"
          type="Search"
          className="input w-3/4 lg:w-5/12 rounded-sm"
          placeholder="Search Restuarant..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto my-8">
          <div className="flex justify-around max-w-screen-2xl mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <Link to={`/category/${category.slug}`}>
                <div className="cursor-pointer" key={category.id}>
                  <div
                    className="w-16 md:w-28 lg:w-40 h-16 md:h-28 lg:h-40 bg-cover rounded-full"
                    style={{
                      backgroundImage: `url(${category.coverImg})`,
                    }}
                  ></div>
                  <div className="text-center pt-2 w-16 text-sm md:w-28 md:text-lg lg:w-40 lg:text-lg">
                    {category.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid lg:grid-cols-3 gap-x-5 gap-y-10 mx-6 mb-8 mt-16">
            {data?.allRestaurants.restaurants?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
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
