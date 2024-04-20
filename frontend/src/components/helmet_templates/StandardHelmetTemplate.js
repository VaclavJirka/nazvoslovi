import React from "react";
import { Helmet } from "react-helmet-async";
const keywords =
  "názvosloví, chemické názvosloví, chemické názvosloví procvičování, procvičování názvů prvků, procvičování názvosloví sloučenin, anorganické názvosloví, názvosloví anorganických sloučenin, procvičování názvosloví, nazvoslovi, procvičování názvosloví";

function StandardHelmetTemplate({ title, description }) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Václav Jirka" />
      {/* Facebook tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://nazvoslovi.eu/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="cs_CZ" />
      <meta
        property="og:image"
        content={"/static/images/nazvoslovi_og_logo.png"}
      />
      {/* Twitter tags */}
      <meta name="twitter:creator" content="Václav Jirka" />
      <meta name="twitter:url" content="https://nazvoslovi.eu/" />
      <meta name="twitter:card" content="website" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        property="twitter:image"
        content={"/static/images/nazvoslovi_og_logo.png"}
      />
    </Helmet>
  );
}

export default StandardHelmetTemplate;
