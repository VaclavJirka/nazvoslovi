import React from "react";
import { Link } from "react-router-dom";
import StandardHelmetTemplate from "../../helmet_templates/StandardHelmetTemplate";
function HomePage() {
  return (
    <>
      <StandardHelmetTemplate
        title="Procvič si názvosloví!"
        description="Procvič si názvosloví chemických prvků a sloučenin. Na této stránce si můžeš vybrat z hromady chemických prvků a sloučenin a procvičit si jejich názvy a vzorce. Staň se mistrem názvosloví!"
      />
      <div className="content" id="home">
        <h1 className="home-header">Procvič si názvosloví</h1>
        <p className="home-paragraph">
          Nejde ti chemické názvosloví? Potřebuješ si procvičit anorganické
          názvosloví před písemkou? Pak je tenhle web právě pro tebe. Vyber si z
          více než 30 skupin a procvič si více než 1300 sloučenin. Staň se
          mistrem názvosloví! &#x1F9EA;
        </p>
        <Link to="/nastaveni">
          <button className="blue-glow-button" id="go-to-practice">
            Procvičovat
          </button>
        </Link>
      </div>
    </>
  );
}

export default HomePage;
