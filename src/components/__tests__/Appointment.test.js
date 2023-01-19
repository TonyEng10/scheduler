import React from "react";
import { render } from "@testing-library/react";

import Application from "components/Application";

describe("Appointment", () => {

  it("renders without crashing", () => {
    render(<Application />);
  });

  it("uses the mock implementation", () => {
    const fn = jest.fn((a, b) => 42);
    fn(1, 2);
    expect(fn).toHaveReturnedWith(42);
  });
});