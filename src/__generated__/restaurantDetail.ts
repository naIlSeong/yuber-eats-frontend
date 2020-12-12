/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantDetailInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantDetail
// ====================================================

export interface restaurantDetail_restaurantDetail_restaurant_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface restaurantDetail_restaurantDetail_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: restaurantDetail_restaurantDetail_restaurant_category | null;
  address: string;
  isPromoted: boolean;
}

export interface restaurantDetail_restaurantDetail {
  __typename: "RestaurantDetailOutput";
  ok: boolean;
  error: string | null;
  restaurant: restaurantDetail_restaurantDetail_restaurant | null;
}

export interface restaurantDetail {
  restaurantDetail: restaurantDetail_restaurantDetail;
}

export interface restaurantDetailVariables {
  input: RestaurantDetailInput;
}
