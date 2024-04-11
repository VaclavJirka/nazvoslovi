import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

function LoadingCompounds() {
  return (
    <>
      <div className="content" id="excercise-loading">
        <h2 className="excercise-loading-header">Načítání úloh</h2>
        <BeatLoader color="mediumblue" loading={true} size={16} />
      </div>
    </>
  );
}

export default LoadingCompounds;
