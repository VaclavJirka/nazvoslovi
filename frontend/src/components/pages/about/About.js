import React from "react";
import AboutCard from "./components/AboutCard";
import OtherContributors from "./components/OtherContributors";
import StandardHelmetTemplate from "../../helmet_templates/StandardHelmetTemplate";

function About() {
  return (
    <>
      <StandardHelmetTemplate
        title="O projektu"
        description="O projektu a autorech nazvoslovi.eu"
      />
      <div className="content" id="about">
        <AboutCard
          id="about-nazvoslovi"
          header={"nazvoslovi.eu"}
          text={
            "nazvoslovi.eu je webová aplikace, která slouží k procvičování chemických názvů a vzorců. Byla vytvořena, protože autor na internetu nenašel žádnou stránku, která by mu na procvičování úplně vyhovovala. Proto vytvořil tuto, přesně podle jeho představ. Také slouží k procvičení znalostí programování a tvoření webových stránek."
          }
          socials={[
            {
              key: "github-nazvoslovi",
              link: "https://github.com/VaclavJirka",
              icon: "fa-brands fa-github",
              ariaLabel: "GitHub projektu",
            },
          ]}
        />
        <div className="about-card">
          <h2 className="about-header">Kontakt</h2>
          <ul>
            <li key="email-kontakt">
              Email: <a href="mailto:info@nazvoslovi.eu">info@nazvoslovi.eu</a>
            </li>
          </ul>
        </div>
        <AboutCard
          id="about-vaclav-jirka"
          header={"Václav Jirka"}
          text={
            "Autor tohoto projektu. Student na Gymnáziu Josefa Ressla v Chrudimi a také Power Platform AG student v Studentském trenérském centru. Zajímá se o programování, letecké modelářství a rád cestuje vlakem."
          }
          socials={[
            {
              key: "github-vaclav-jirka",
              link: "https://github.com/VaclavJirka",
              icon: "fa-brands fa-github",
              ariaLabel: "GitHub Václava Jirky",
            },
            {
              key: "linkedin-vaclav-jirka",
              link: "https://linkedin.com/in/vaclavjirka/",
              icon: "fa-brands fa-linkedin",
              ariaLabel: "LinkedIn Václava Jirky",
            },
            {
              key: "x-vaclav-jirka",
              link: "https://linkedin.com/in/vaclavjirka/",
              icon: "fa-brands fa-x-twitter",
              ariaLabel: "X Václava Jirky",
            },
            {
              key: "instagram-vaclav-jirka",
              link: "https://linkedin.com/in/vaclavjirka/",
              icon: "fa-brands fa-instagram",
              ariaLabel: "Instagram Václava Jirky",
            },
          ]}
        />
        <OtherContributors />
      </div>
    </>
  );
}

export default About;
