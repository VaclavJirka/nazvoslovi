import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./utils/NavBar";
import ExcerciseSetup from "./pages/excerciseSetup/ExcerciseSetup";
import Excercise from "./pages/excercise/Excercise";
import About from "./pages/about/About";
import NotFound from "./pages/NotFound";
import Footer from "./utils/Footer";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/procvicovani" element={<ExcerciseSetup />} />
          <Route path="/procvicovani/zacit" element={<Excercise />} />
          <Route path="/oprojektu" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
