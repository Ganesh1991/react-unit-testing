import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  MultiPageFormProvider,
  useMultiPageForm,
} from "../customHooks/use-multi-page-form";
import { submitForm } from "../utils/api";
import { useNavigate } from "react-router-dom";

export const MultiPageApp = () => {
  return (
    <MultiPageFormProvider initialValues={{ food: "", drink: "" }}>
      <Router>
        <Routes>
          <Route path="/page-1" element={<Page1 />} />
          <Route path="/page-2" element={<Page2 />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error" element={<Error />} />
          <Route path="/home" element={<Main />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </Router>
    </MultiPageFormProvider>
  );
};

const Page1 = ({ history }) => {
  const { form, setFormValues } = useMultiPageForm();
  return (
    <>
      <h1>Page 1</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          history.push("/page-2");
        }}
      >
        <label htmlFor="food">Favorite Food</label>
        <input
          id="food"
          onChange={(e) => setFormValues({ food: e.target.value })}
          value={form.food}
        />
      </form>
      <Link to="/home">Go Home </Link> || <Link to="/page-2">Next </Link>
    </>
  );
};

const Page2 = ({ history }) => {
  const { form, setFormValues } = useMultiPageForm();
  return (
    <>
      <h1>Page 2</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          history.push("/confirm");
        }}
      >
        <label htmlFor="drink">Favorite Drink</label>
        <input
          id="drink"
          onChange={(e) => setFormValues({ drink: e.target.value })}
          value={form.drink}
        />
      </form>
      <Link to="/page-1">Go Home </Link> || <Link to="/confirm">Next </Link>
    </>
  );
};

function Confirm() {
  const navigate = useNavigate();
  const { form, resetForm } = useMultiPageForm();
  function handleConfirmClick() {
    submitForm(form).then(
      () => {
        resetForm();
        navigate("/success");
      },
      (error) => {
        navigate("/error", { state: { error } });
      }
    );
  }
  return (
    <>
      <h2>Confirm</h2>
      <div>
        <strong>Please confirm your choices</strong>
      </div>
      <div>
        <strong id="food-label">Favorite Food</strong>:{" "}
        <span aria-labelledby="food-label">{form.food}</span>
      </div>
      <div>
        <strong id="drink-label">Favorite Drink</strong>:{" "}
        <span aria-labelledby="drink-label">{form.drink}</span>
      </div>
      <Link to="/page-2">Go Back</Link> |{" "}
      <button onClick={handleConfirmClick}>Confirm</button>
    </>
  );
}

function Success() {
  return (
    <>
      <h2>Congrats. You did it.</h2>
      <div>
        <Link to="/">Go home</Link>
      </div>
    </>
  );
}

function Error({
  location: {
    state: { error },
  },
}) {
  return (
    <>
      <div>Oh no. There was an error.</div>
      <pre>{error.message}</pre>
      <Link to="/">Go Home</Link>
      <Link to="/confirm">Try again</Link>
    </>
  );
}

function Main() {
  return (
    <>
      <h1>Welcome home</h1>
      <Link to="/page-1">Fill out the form</Link>
    </>
  );
}
