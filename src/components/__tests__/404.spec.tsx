import React from "react";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { NotFound } from "../404";

const NotFoundProps = {
  title: "title",
  notFoundText: "testPage",
  message: "page",
};

describe("<NotFound />", () => {
  it("should render OK with props", async () => {
    const { getByText, container } = render(
      <HelmetProvider>
        <Router>
          <NotFound {...NotFoundProps} />
        </Router>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.title).toEqual(`${NotFoundProps.title} | Yuber Eats`);
    });
    getByText(
      `Sorry, but the ${NotFoundProps.message} you are looking for is not found.`
    );
    expect(container.firstChild?.lastChild).toHaveAttribute("href", "/");
  });
});
