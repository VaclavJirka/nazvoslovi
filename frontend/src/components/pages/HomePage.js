import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="content" id="home">
      <h1 className="home-header">Procvič si názvosloví</h1>
      <p className="home-paragraph">
        Nejde ti názvosloví? Potřebuješ si procvičit názvosloví před písemkou?
        Pak je tenhle web právě pro tebe. Vyber si z více než 30 skupin a
        procvič si více než 2000 sloučenin. Staň se mistrem názvosloví!
        &#x1F9EA;
      </p>
      <Link to="/procvicovani">
        <button className="blue-glow-button" id="go-to-practice">
          Procvičovat
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
