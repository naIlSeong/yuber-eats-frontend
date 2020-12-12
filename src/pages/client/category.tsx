import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragment";
import {
  findCategoryBySlug,
  findCategoryBySlugVariables,
} from "../../__generated__/findCategoryBySlug";
import { useParams } from "react-router-dom";
import { Restaurant } from "../../components/restaurant";
import { NotFound } from "../../components/404";

const FIND_CATEGORY = gql`
  query findCategoryBySlug($input: CategoryInput!) {
    findCategoryBySlug(input: $input) {
      ok
      error
      totalPages
      totalResults
      category {
        ...CategoryParts
      }
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${CATEGORY_FRAGMENT}
  ${RESTAURANT_FRAGMENT}
`;

interface IParams {
  slug: string;
}

export const Category = () => {
  const params = useParams<IParams>();

  const [callQuery, { data }] = useLazyQuery<
    findCategoryBySlug,
    findCategoryBySlugVariables
  >(FIND_CATEGORY);

  useEffect(() => {
    callQuery({
      variables: {
        input: {
          page: 1,
          slug: params.slug,
        },
      },
    });
  }, [params]);

  return (
    <div>
      <Helmet>
        <title>Category | Yuber Eats</title>
      </Helmet>
      <div className="max-w-screen-2xl my-8 mx-6">
        <div className="text-gray-800 text-3xl w-full">
          Category of{" "}
          <span className="font-semibold">
            {data?.findCategoryBySlug.category?.name}
          </span>
        </div>
        {data?.findCategoryBySlug.restaurants?.length !== 0 ? (
          <div className="grid lg:grid-cols-3 gap-x-5 gap-y-10  mb-8 mt-16">
            {data?.findCategoryBySlug.restaurants?.map((restaurant) => (
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
            title="Category"
            notFoundText={`"${data.findCategoryBySlug.category?.name}" Not Found :(`}
            message="restaurant of category"
          />
        )}
      </div>
    </div>
  );
};
