import React from "react";
import { Link } from "react-router-dom";
import StandardHelmetTemplate from "../../helmet_templates/StandardHelmetTemplate";

function NotFound() {
  return (
    <>
      <StandardHelmetTemplate
        title="Stránka nenalezena"
        description="Stránka nenalezena"
      />
      <div className="content" id="not-found">
        <h2 className="not-found-header">Stránka nenalezena</h2>
        <p className="notfound-text">Bohužel, tuto stránku jsme nenašli...</p>
        <Link to="/nastaveni">
          <button className="blue-glow-button" id="go-to-practice">
            Procvičovat
          </button>
        </Link>
      </div>
    </>
  );
}

export default NotFound;
