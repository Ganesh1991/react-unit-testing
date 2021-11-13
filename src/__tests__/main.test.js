import React from "react";
import { screen } from "@testing-library/react";
import Main from "../components/Main";
import userEvent from "@testing-library/user-event";
import { renderWithRouter } from "../utils/test-utils";

test("main renders home and about and navigate to thsose pages", () => {
  //   render(
  //     <Router>
  //       <Main />
  //     </Router>
  //   );
  renderWithRouter(<Main />);
  expect(screen.getByRole("heading")).toHaveTextContent("Home");
  userEvent.click(screen.getByText(/about/i));
  expect(screen.getByRole("heading")).toHaveTextContent("About");
});

test("landing on bad page shows no match component", () => {
  renderWithRouter(<Main />, { route: "/something-that-does-not-match" });
  expect(screen.getByRole("heading")).toHaveTextContent("No Match");
});
