import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const increment = () => dispatch({ type: "INCREMENT" });
  const decrement = () => dispatch({ type: "DECREMENT" });
  return (
    <div>
      <h2>Counter</h2>
      <div>
        <button onClick={decrement} name="decrement">
          -
        </button>
        <span aria-label="count">{count}</span>
        <button onClick={increment} name="increment">
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
