import React, { useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useSpring, animated } from "@react-spring/web";

function NavBar() {
  const [isOpen, setOpen] = useState(false);
  const overlayAppear = useSpring({
    from: { opacity: 0 },
    to: { opacity: isOpen ? 1 : 0 },
  });

  return (
    <>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-list-item" id="nav-item-logo">
            <Link
              to="/"
              onClick={() => {
                isOpen ? !setOpen(false) : null;
              }}
            >
              <div className="nav-logo-div">
                <img
                  src={"/static/images/beaker.png"}
                  width="30"
                  height="30"
                  className="nav-logo-img"
                />
                <h3 className="nav-logo-header">Názvosloví</h3>
              </div>
            </Link>
          </li>
          <li className="nav-list-item" id="nav-item-practice">
            <Link to="/procvicovani">Procvičování</Link>
          </li>
          <li className="nav-list-item" id="nav-item-about">
            <Link to="/oprojektu">O projektu</Link>
          </li>
          <li className="nav-list-item" id="nav-item-hamburger">
            <Hamburger
              size={30}
              color="mediumblue"
              toggled={isOpen}
              toggle={() => setOpen(!isOpen)}
            />
          </li>
        </ul>
      </nav>
      {isOpen && (
        <animated.div className="overlay-blur" style={overlayAppear}>
          <ul className="overlay-menu">
            <li className="overlay-menu-item">
              <Link to="/procvicovani" onClick={() => setOpen(!isOpen)}>
                Procvičování
              </Link>
            </li>
            <li className="overlay-menu-item">
              <Link to="/oprojektu" onClick={() => setOpen(!isOpen)}>
                O projektu
              </Link>
            </li>
          </ul>
        </animated.div>
      )}
    </>
  );
}

export default NavBar;
