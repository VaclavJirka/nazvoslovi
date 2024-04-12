import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Stránka nenalezena</title>
      </Helmet>
      <div className="content" id="not-found">
        <h2 className="not-found-header">Stránka nenalezena</h2>
        <p className="notfound-text">Bohužel, tuto stránku jsme nenašli...</p>
        <Link to="/procvicovani">
          <button className="blue-glow-button" id="go-to-practice">
            Procvičovat
          </button>
        </Link>
      </div>
    </>
  );
}

export default NotFound;
