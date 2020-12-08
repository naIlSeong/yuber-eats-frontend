import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-9xl font-bold tracking-wide">404</h1>
      <h4 className="text-3xl font-semibold pb-6 tracking-wide">
        Not Found :(
      </h4>
      <h6 className="py-2">
        Sorry, but the page you are looking for is not found.{" "}
      </h6>
      <Link to="/" className="text-lime-600 hover:underline">
        Home &rarr;
      </Link>
    </div>
  );
};
