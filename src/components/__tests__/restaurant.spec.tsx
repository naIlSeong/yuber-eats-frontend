import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { Restaurant } from "../restaurant";

describe("<Restaurant />", () => {
  it("should render OK with props", () => {
    const { getByText, container } = render(
      <Router>
        <Restaurant
          id="1"
          coverImg="http://"
          restaurantName="testRestaurant"
          categoryName="testCategory"
        />
      </Router>
    );
    getByText("testRestaurant");
    getByText("testCategory");
    expect(container.firstChild).toHaveAttribute("href", "/restaurant/1");
  });
});
