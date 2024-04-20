import React from "react";

function OtherContributors() {
  return (
    <div className="other-contributors-card">
      <h2 className="about-header">Podíleli se na projektu:</h2>
      <ul className="other-contributors-list">
        <li className="other-contributors-item">
          <p className="other-contributors-item-text">
            <strong className="other-contributors-item-header">
              Ondřej Havlík&nbsp;
            </strong>
            - Student na Gymnáziu Josefa Ressela. Významně pomohl k vytvoření
            databáze sloučenin.
            <a
              className="other-contributors-item-link"
              href="https://www.google.com/"
              key="x-ondrej-havlik"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Ondřeje Havlíka"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a
              className="other-contributors-item-link"
              href="https://www.google.com/"
              key="instagram-ondrej-havlik"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Ondřeje Havlíka"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </p>
        </li>
      </ul>
    </div>
  );
}

export default OtherContributors;
