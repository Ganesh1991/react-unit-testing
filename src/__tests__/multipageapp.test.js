import React from "react";
import { render, screen } from "@testing-library/react";
import { MultiPageApp } from "../components/MultiPageApp";
import { submitForm as mockSubmitForm } from "../utils/api";
import userEvent from "@testing-library/user-event";

jest.mock("../utils/api");

// beforeAll(() => {});
// afterEach(() => jest.clearAllMocks());
// afterAll(() => jest.mockRestore());

test("can fill out from across multiple pages", async () => {
  mockSubmitForm.mockResolvedValueOnce({ success: true });
  const testData = { food: "Pizza", drink: "Coke" };
  render(<MultiPageApp />);

  expect(screen.getByRole("heading")).toHaveTextContent(/welcome home/i);

  userEvent.click(screen.getByText(/Fill out the form/i));

  expect(screen.getByRole("heading")).toHaveTextContent(/page 1/i);

  userEvent.type(screen.getByLabelText(/food/i), testData.food);

  userEvent.click(screen.getByText(/next/i));

  expect(screen.getByRole("heading")).toHaveTextContent(/page 2/i);

  userEvent.type(screen.getByLabelText(/drink/i), testData.drink);

  userEvent.click(screen.getByText(/next/i));

  expect(screen.getByRole("heading")).toHaveTextContent(/Confirm/i);

  expect(screen.getByLabelText(/food/i)).toHaveTextContent(testData.food);
  expect(screen.getByLabelText(/drink/i)).toHaveTextContent(testData.drink);

  userEvent.click(screen.getByRole("button", { name: /confirm/i }));

  expect(mockSubmitForm).toHaveBeenCalledWith(testData);
  expect(mockSubmitForm).toHaveBeenCalledTimes(1);

  userEvent.click(await screen.findByText(/go home/i));

  expect(screen.getByText(/welcome home/i)).toBeInTheDocument();
});
