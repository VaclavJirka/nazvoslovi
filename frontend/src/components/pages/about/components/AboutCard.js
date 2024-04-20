import React from "react";

function AboutCard({ id, header, text, socials }) {
  return (
    <div className="about-card" id={id}>
      <h2 className="about-header">{header}</h2>
      <p className="about-paragraph">{text}</p>
      <div className="links">
        {socials.map((social) => (
          <a
            href={social.link}
            key={social.key}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.ariaLabel}
          >
            <i className={social.icon}></i>
          </a>
        ))}
      </div>
    </div>
  );
}

export default AboutCard;
