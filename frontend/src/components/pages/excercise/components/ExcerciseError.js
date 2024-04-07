import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

function ExcerciseError({ error }) {
  return (
    <div className="content" id="excercise-error">
      <h2 className="excercise-error-header">Chyba s připojením k serveru</h2>
      <p className="excercise-error-text">
        Při odesílání požadavku se vyskytla chyba s připojením k serveru
      </p>
      <p className="excercise-error-text">{error}</p>
      <h3 className="trying-to-reconnect">Zkouším znovu odeslat požadavek</h3>
      <BeatLoader color="mediumblue" loading={true} size={16} />
    </div>
  );
}

export default ExcerciseError;
