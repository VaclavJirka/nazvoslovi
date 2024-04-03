import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fetchCompounds from "../../api/api";
import { useSpring, animated } from "@react-spring/web";

function Excercise() {
  const location = useLocation();
  const navigate = useNavigate();
  const VZORCE = "vzorce";
  const { EXCERCISE_TYPE, wantedGroups, wantedElements } = location.state || {};
  const [compounds, setCompounds] = useState([]);
  const [availableCompounds, setAvailableCompounds] = useState(null);
  const [usedIds, setUsedIds] = useState([]);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [wrong, setWrong] = useState(false);
  const [dontKnow, setDontKnow] = useState(false);

  // check if data got passed into the location state
  useEffect(() => {
    if (!location.state) {
      try {
        navigate("/procvicovani");
      } catch (err) {
        console.log(err);
      }
    }
  }, [location, navigate]);

  // control for the animations
  const { wrongAnimation } = useSpring({
    from: { wrongAnimation: 0 },
    to: { wrongAnimation: wrong ? 1 : 0 },
    reset: true,
    config: { mass: 1, tension: 500, friction: 10 },
  });

  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  // fetch data from the API
  const getCompounds = useCallback(async () => {
    if (compounds.length < 10) {
      try {
        const response = await fetchCompounds(
          10,
          [],
          wantedGroups,
          wantedElements
        );
        setError(null);
        setCompounds([...compounds, ...response.data.data]);
      } catch (err) {
        setError([true, err.message]);
        setTimeout(() => {
          getCompounds();
        }, 5000);
        // tady vylepšit chybové hlášení
      }
    }
  }, [compounds, wantedGroups, wantedElements]);

  // fetch data on the first render and theb every time the compounds array changes
  useEffect(() => {
    getCompounds();
  }, [compounds]);

  // handle the answer input
  const handleAnswer = (e) => {
    setAnswer(e.target.value);
    setWrong(false);
  };

  // handle the enter key
  const handleEnter = (e) => {
    if (e.code === "Enter") {
      handleCheck();
    }
  };

  // handle the check button
  const handleCheck = () => {
    if (dontKnow) {
      setDontKnow(false);
      setAnswer("");
      setCompounds(compounds.slice(1));
    } else {
      if (EXCERCISE_TYPE === VZORCE) {
        if (compounds[1].name === answer) {
          setWrong(false);
          setCompounds(compounds.slice(1));
          setUsedIds([...usedIds, compounds[1].id]);
        } else {
          setWrong(true);
        }
      } else {
        if (compounds[1].formula === answer) {
          setWrong(false);
          setCompounds(compounds.slice(1));
          setUsedIds([...usedIds, compounds[1].id]);
        } else {
          setWrong(true);
        }
      }
    }
  };

  // handle the dont know button
  const handleDontKnow = () => {
    setWrong(false);
    setDontKnow(true);
  };

  return (
    <>
      {!error ? (
        compounds.length > 0 ? (
          <div className="content" id="content-excercise">
            <h2 className="task">
              {
                EXCERCISE_TYPE === VZORCE
                  ? "lol"
                  : compounds[1]?.name /*podívat se na to číslo */
              }
            </h2>
            <animated.input
              id={wrong ? "excercise-entry-true" : "excercise-entry-true"}
              className="excercise-entry"
              placeholder="Zadejte vzorec.."
              autoFocus
              disabled={dontKnow ? true : false}
              value={
                dontKnow
                  ? EXCERCISE_TYPE === VZORCE
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
                    (wrongAnimation) =>
                      `translate3d(${wrongAnimation}px, 0px, 0px)`
                  ),
                border: wrong ? "2px solid red" : "2px solid black",
                backgroundColor: wrong ? "rgba(255, 0, 0, 0.2)" : "white",
              }}
            />
            <div id="excercise-buttons">
              <button
                className="normal-start-button"
                id="excercise-next"
                onClick={handleCheck}
                type="button"
              >
                {dontKnow ? "Další" : "Zkontrolovat"}
              </button>
              <button
                className="normal-start-button"
                id="excercise-skip"
                onClick={handleDontKnow}
                type="button"
                style={dontKnow ? { display: "none" } : null}
              >
                Nevím
              </button>
            </div>
          </div>
        ) : null
      ) : (
        <p>Problem with fetching data. Trying to reconnect.</p>
      )}
    </>
  );
}

export default Excercise;
