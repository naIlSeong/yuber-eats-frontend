import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";
import { Header } from "../header";
import { MockedProvider } from "@apollo/client/testing";
import { ME } from "../../hooks/useMe";

describe("<Header />", () => {
  it("should render OK with verify banner", async () => {
    await waitFor(async () => {
      const { getByText, container } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "",
                    role: "",
                    verified: false,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));

      getByText("Please verify your email");
      expect(container.firstChild).toHaveClass("bg-red-500");
    });
  });

  it("should render OK without verify banner", async () => {
    await waitFor(async () => {
      const { queryByText, container } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "",
                    role: "",
                    verified: true,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(queryByText("Please verify your email")).toBeNull();
    });
  });
});
