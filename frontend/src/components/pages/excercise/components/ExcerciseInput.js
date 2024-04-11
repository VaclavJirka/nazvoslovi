import React from "react";
import { animated } from "@react-spring/web";

function ExcerciseInput({
  wrong,
  dontKnow,
  answer,
  handleAnswer,
  handleEnter,
  wrongAnimation,
  compounds,
  VZOREC,
  EXCERCISE_TYPE,
}) {
  return (
    <>
      <animated.input
        className="excercise-entry"
        placeholder={`Zadejte ${EXCERCISE_TYPE}...`}
        autoFocus
        disabled={dontKnow ? true : false}
        value={
          dontKnow
            ? EXCERCISE_TYPE === VZOREC
              ? compounds[1]?.name
              : "lol"
            : answer
            ? answer
            : ""
        }
        onChange={handleAnswer}
        onKeyDown={handleEnter}
        style={{
          transform: wrongAnimation
            .to({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [0, 20, -20, 20, -20, 20, -20, 0],
            })
            .to(
              (wrongAnimation) => `translate3d(${wrongAnimation}px, 0px, 0px)`
            ),
          border: wrong ? "2px solid red" : "2px solid black",
          backgroundColor: wrong ? "rgba(255, 0, 0, 0.2)" : "white",
        }}
      />
    </>
  );
}

export default ExcerciseInput;
