import React from "react";
import { useNavigate } from "react-router-dom";

function NoCompounds() {
  const navigate = useNavigate();

  const handleBackButton = () => {
    try {
      navigate("/nastaveni");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="content" id="no-compounds">
        <h2 className="no-compounds-header">Žádné odpovídající výsledky</h2>
        <p className="no-compounds-text">
          Bohužel nejsou v naší databázi žádné prvky nebo sloučeniny
          odpovídající vaším kritériím. Změňte prosím vaše kritéria na stránce
          nastavení procvičování.
        </p>
        <button
          className="blue-glow-button"
          id="no-compounds-button"
          onClick={handleBackButton}
        >
          Nastavení procvičování
        </button>
      </div>
    </>
  );
}

export default NoCompounds;
