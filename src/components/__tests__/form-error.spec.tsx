import React from "react";
import { render } from "@testing-library/react";
import { FormError } from "../form-error";

describe("<FormError />", () => {
  it("should render error message", () => {
    const { getByText, container } = render(
      <FormError errorMessage={"test"} />
    );
    getByText("test");
    expect(container.firstChild).toHaveClass("text-red-600");
  });
});
