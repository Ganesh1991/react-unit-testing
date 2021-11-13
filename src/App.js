import "./App.css";
// import Main from "./components/Main";
import { BrowserRouter as Router } from "react-router-dom";
import Counter from "./components/Counter";
import { Provider } from "react-redux";
import { store } from "./redux/redux-store";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Main /> */}
        <Provider store={store}>
          <Counter />
        </Provider>
      </Router>
    </div>
  );
}

export default App;
