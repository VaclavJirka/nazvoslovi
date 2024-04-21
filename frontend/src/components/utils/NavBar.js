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
              <img
                src={"/static/images/nazvoslovi_full_logo.png"}
                className="nav-logo-img"
              />
            </Link>
          </li>
          <li className="nav-list-item" id="nav-item-practice">
            <Link to="/nastaveni">Procvičování</Link>
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
              <Link to="/nastaveni" onClick={() => setOpen(!isOpen)}>
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
