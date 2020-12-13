import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

interface INotFound {
  title: string;
  notFoundText: string;
  message: string;
}

export const NotFound: React.FC<INotFound> = ({
  title,
  notFoundText,
  message,
}) => {
  return (
    <div className="mt-24 flex flex-col justify-center items-center">
      <Helmet>
        <title>{title} | Yuber Eats</title>
      </Helmet>
      <h1 className="text-9xl font-bold tracking-wide">404</h1>
      <h4 className="text-3xl font-semibold pb-6 tracking-wide">
        {notFoundText}
      </h4>
      <h6 className="py-2">
        Sorry, but the {message} you are looking for is not found.{" "}
      </h6>
      <Link to="/" className="text-lime-600 hover:underline">
        Home &rarr;
      </Link>
    </div>
  );
};
