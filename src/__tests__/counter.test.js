import React from "react";
import { screen } from "@testing-library/react";
import Counter from "../components/Counter";
import userEvent from "@testing-library/user-event";
import { renderWithProvider } from "../utils/test-utils";

test("counter app renders with default state", () => {
  renderWithProvider(<Counter />);
  expect(screen.getByLabelText(/count/i)).toHaveTextContent(0);
});

test("increment and decrement function", () => {
  renderWithProvider(<Counter />);
  userEvent.click(screen.getByText("+"));
  expect(screen.getByLabelText(/count/i)).toHaveTextContent(1);
  userEvent.click(screen.getByText("-"));
  expect(screen.getByLabelText(/count/i)).toHaveTextContent(0);
});

test("can render with initial state", () => {
  renderWithProvider(<Counter />, { intialState: { count: 100 } });
  expect(screen.getByLabelText(/count/i)).toHaveTextContent(100);
  userEvent.click(screen.getByText("-"));
  expect(screen.getByLabelText(/count/i)).toHaveTextContent(99);
});
