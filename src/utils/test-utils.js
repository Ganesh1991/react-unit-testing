import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { reducer } from "../redux/reducer";

export const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test Page", route);
  return render(ui, { wrapper: BrowserRouter });
};

export function renderWithProvider(
  ui,
  { intialState, store = createStore(reducer, intialState), ...options } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
}
