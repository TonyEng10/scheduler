import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";


import Application from "components/Application";
import Form from "components/Appointment/Form";

afterEach(cleanup);



it("renders without crashing", () => {
  render(<Application />);
});

