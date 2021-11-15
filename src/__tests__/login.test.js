import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../components/Login";
import userEvent from "@testing-library/user-event";

test("login form submit", () => {
  const handleSubmit = jest.fn();
  render(<Login handleSubmit={handleSubmit} />);
  const username = "ganeshd";
  const password = "Abcd@1234";

  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(handleSubmit).toBeCalledWith(username, password);
  expect(handleSubmit).toBeCalledTimes(1);
});
