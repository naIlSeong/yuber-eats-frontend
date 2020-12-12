import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragment";
import {
  findCategoryBySlug,
  findCategoryBySlugVariables,
} from "../../__generated__/findCategoryBySlug";
import { useHistory, useLocation, useParams } from "react-router-dom";

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
  const location = useLocation();
  const params = useParams<IParams>();
  const history = useHistory();

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
  console.log(data);

  return (
    <div>
      <Helmet>
        <title>Category | Yuber Eats</title>
      </Helmet>
      {data?.findCategoryBySlug.category?.name}
    </div>
  );
};
