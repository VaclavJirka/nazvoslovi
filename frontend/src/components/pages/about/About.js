import React from "react";
import AboutCard from "./components/AboutCard";

function About() {
  return (
    <div className="content" id="content-about">
      <AboutCard
        id="about-nazvoslovi"
        header={"nazvoslovi.eu"}
        text={
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante. Nunc tincidunt ante vitae massa. Integer malesuada. Excepteur sint occaecat cupidatat non proident."
        }
        socials={[
          {
            link: "https://github.com/VaclavJirka",
            icon: "fa-brands fa-github",
            ariaLabel: "GitHub projektu",
          },
        ]}
      />
      <AboutCard
        id="about-vaclav-jirka"
        header={"Václav Jirka"}
        text={
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante. Nunc tincidunt ante vitae massa. Integer malesuada. Excepteur sint occaecat cupidatat non proident."
        }
        socials={[
          {
            link: "https://github.com/VaclavJirka",
            icon: "fa-brands fa-github",
            ariaLabel: "GitHub Václava Jirky",
          },
          {
            link: "https://linkedin.com/in/vaclavjirka/",
            icon: "fa-brands fa-linkedin",
            ariaLabel: "LinkedIn Václava Jirky",
          },
          {
            link: "https://linkedin.com/in/vaclavjirka/",
            icon: "fa-brands fa-x-twitter",
            ariaLabel: "X Václava Jirky",
          },
          {
            link: "https://linkedin.com/in/vaclavjirka/",
            icon: "fa-brands fa-instagram",
            ariaLabel: "Instagram Václava Jirky",
          },
        ]}
      />
    </div>
  );
}

export default About;
