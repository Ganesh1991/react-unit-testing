import React from "react";

function useCounter({ initialCount = 0, step = 5 } = {}) {
  const [count, setCount] = React.useState(initialCount);
  const increment = () => setCount((c) => c + step);
  const decrement = () => setCount((c) => c - step);
  return { count, increment, decrement };
}

export { useCounter };
