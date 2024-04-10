import React from "react";

function ExcerciseButtons({ handleCheck, handleDontKnow, dontKnow }) {
  return (
    <>
      <div id="excercise-buttons">
        <button
          className="blue-glow-button"
          id="excercise-next"
          onClick={handleCheck}
          type="button"
        >
          {dontKnow ? "Další" : "Zkontrolovat"}
        </button>
        <button
          className="grey-button"
          id="excercise-skip"
          onClick={handleDontKnow}
          type="button"
          style={dontKnow ? { display: "none" } : null}
        >
          Nevím
        </button>
      </div>
    </>
  );
}

export default ExcerciseButtons;
