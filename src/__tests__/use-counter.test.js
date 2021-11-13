import React from "react";
import { render, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useCounter } from "../customHooks/use-counter";

function setup({ initialProps } = {}) {
  const result = {};
  function TestComponent(props) {
    result.current = useCounter(props);
    return null;
  }
  return {
    ...render(<TestComponent {...initialProps} />),
    result,
  };
}

test("exposes the count and increment/decrement functions", () => {
  const { result } = setup();
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(5);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test("expose counter with initial count", () => {
  const { result } = setup({ initialProps: { initialCount: 100 } });
  expect(result.current.count).toBe(100);
  act(() => result.current.increment());
  expect(result.current.count).toBe(105);
});

test("expose counter with initial step", () => {
  const { result } = setup({ initialProps: { step: 1 } });
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});

test("step can be changed using rerender", () => {
  const { result, rerender } = renderHook(useCounter, {
    initialProps: { step: 0 },
  });
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(0);
  rerender({ step: 4 });
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(4);
});
