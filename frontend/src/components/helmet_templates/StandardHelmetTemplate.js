import React from "react";
import { Helmet } from "react-helmet-async";
const keywords =
  "názvosloví, chemie, sloučeniny, názvy, názvosloví organické chemie, názvosloví anorganické chemie, názvosloví neorganické chemie, názvosloví organických sloučenin, názvosloví anorganických sloučenin, názvosloví neorganických sloučenin";

function StandardHelmetTemplate({ title, description }) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} /> {/*nahradit */}
      <meta name="author" content="Václav Jirka" />
      {/* Facebook tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://metatags.io/" /> {/*nahradit */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="cs_CZ" />
      <meta property="og:image" content={"/static/images/beaker.png"} />
      {/*nahradit */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content="Václav Jirka" />
      <meta name="twitter:url" content="https://metatags.io/" /> {/*nahradit */}
      <meta name="twitter:card" content="website" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="twitter:image" content={"/static/images/beaker.png"} />
      {/*nahradit */}
    </Helmet>
  );
}

export default StandardHelmetTemplate;
