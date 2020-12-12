import React from "react";
import { Link } from "react-router-dom";

interface IRestaurantProps {
  id: string;
  coverImg: string;
  restaurantName: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  coverImg,
  restaurantName,
  categoryName,
}) => (
  <Link to={`/restaurant/${id}`}>
    <div>
      <div
        className="py-28 bg-cover bg-center"
        style={{ backgroundImage: `url(${coverImg})` }}
      ></div>
      <h3 className="text-xl my-3">{restaurantName}</h3>
      <div className="border-t-2 opacity-50 font-light text-sm">
        {categoryName}
      </div>
    </div>
  </Link>
);
