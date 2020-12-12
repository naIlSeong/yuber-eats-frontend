import { render, waitFor } from "@testing-library/react";
import React from "react";
import { isLoggedInVar } from "../../apollo";
import { App } from "../app";

const LOGGED_OUT_TEXT = "logged-out";
const LOGGED_IN_TEXT = "logged-in";

jest.mock("../../routers/logged-out-router", () => {
  return {
    LoggedOutRouter: () => <span>{LOGGED_OUT_TEXT}</span>,
  };
});

jest.mock("../../routers/logged-in-router", () => {
  return {
    LoggedInRouter: () => <span>{LOGGED_IN_TEXT}</span>,
  };
});

describe("<App />", () => {
  it("renders LoggedOutRouter", () => {
    const { getByText } = render(<App />);
    getByText(LOGGED_OUT_TEXT);
  });

  it("renders LoggedInRouter", async () => {
    const { getByText } = render(<App />);
    await waitFor(() => {
      isLoggedInVar(true);
    });
    getByText(LOGGED_IN_TEXT);
  });
});
