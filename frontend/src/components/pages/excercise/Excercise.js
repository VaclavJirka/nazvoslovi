import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fetchCompounds from "../../api/api";
import { useSpring } from "@react-spring/web";
import NoCompounds from "./components/NoCompounds";
import ExcerciseError from "./components/ExcerciseError";
import ExcerciseInput from "./components/ExcerciseInput";
import ExcerciseButtons from "./components/ExcerciseButtons";
import LoadingCompounds from "./components/LoadingCompounds";

function Excercise() {
  const location = useLocation();
  const navigate = useNavigate();
  const VZOREC = "vzorec";
  const count = 10; // pak vymazat
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
    } else {
      if (EXCERCISE_TYPE === VZOREC) {
        if (compounds[1].name === answer) {
          setWrong(false);
          setUsedIds([...usedIds, compounds[0].id]);
        } else {
          setWrong(true);
        }
      } else {
        if (compounds[1].formula === answer) {
          setWrong(false);
          setUsedIds([...usedIds, compounds[0].id]);
        } else {
          setWrong(true);
        }
      }
    }
    setCompounds(compounds.slice(1));
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
          <div className="content" id="excercise">
            <h4 className="task-label">Zadejte:</h4>
            <h2 className="task">
              {EXCERCISE_TYPE === VZOREC ? "lol" : compounds[0]?.name}
            </h2>
            <ExcerciseInput
              wrong={wrong}
              dontKnow={dontKnow}
              answer={answer}
              handleAnswer={handleAnswer}
              handleEnter={handleEnter}
              wrongAnimation={wrongAnimation}
              compounds={compounds}
              VZOREC={VZOREC}
              EXCERCISE_TYPE={EXCERCISE_TYPE}
            />
            <ExcerciseButtons
              handleCheck={handleCheck}
              handleDontKnow={handleDontKnow}
              dontKnow={dontKnow}
            />
          </div>
        ) : count === 0 ? ( // tady se to musí vylepšit
          <NoCompounds />
        ) : (
          <LoadingCompounds />
        )
      ) : (
        <ExcerciseError error={error} />
      )}
    </>
  );
}

export default Excercise;
