import React from "react";
import { Routes, Route, Link } from "react-router-dom";

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);
const About = () => (
  <div>
    <h1>About</h1>
  </div>
);
const NoMatch = () => (
  <div>
    <h1>No Match</h1>
  </div>
);

const Main = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default Main;
