import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragment";
import {
  restaurantDetail,
  restaurantDetailVariables,
} from "../../__generated__/restaurantDetail";

const RESTAURANT_DETAIL = gql`
  query restaurantDetail($input: RestaurantDetailInput!) {
    restaurantDetail(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const Restaurant = () => {
  const params = useParams<IParams>();
  const history = useHistory();
  const { data } = useQuery<restaurantDetail, restaurantDetailVariables>(
    RESTAURANT_DETAIL,
    {
      variables: {
        input: {
          restaurantId: +params.id,
        },
      },
    }
  );

  return (
    <div>
      <div
        className="w-screen h-96 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${data?.restaurantDetail.restaurant?.coverImg})`,
        }}
      >
        <div className="bg-white w-4/12 py-10 pl-44">
          <h1 className="text-4xl font-medium pb-2">
            {data?.restaurantDetail.restaurant?.name}
          </h1>
          <span
            className="text-sm font-light opacity-40 cursor-pointer hover:underline"
            onClick={() =>
              history.push(
                `/category/${data?.restaurantDetail.restaurant?.category?.slug}`
              )
            }
          >
            {data?.restaurantDetail.restaurant?.category?.name}
          </span>
          <h3 className="text-sm font-light opacity-70 pt-5">
            {data?.restaurantDetail.restaurant?.address}
          </h3>
        </div>
      </div>
    </div>
  );
};
