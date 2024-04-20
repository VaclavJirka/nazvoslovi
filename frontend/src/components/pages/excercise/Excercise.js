import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fetchCompounds from "../../api/api";
import { useSpring } from "@react-spring/web";
import StandardHelmetTemplate from "../../helmet_templates/StandardHelmetTemplate";
import NoCompounds from "./components/NoCompounds";
import ExcerciseError from "./components/ExcerciseError";
import ExcerciseInput from "./components/ExcerciseInput";
import ExcerciseButtons from "./components/ExcerciseButtons";
import LoadingCompounds from "./components/LoadingCompounds";

function Excercise() {
  const location = useLocation();
  const navigate = useNavigate();
  const VZOREC = "vzorec";
  const { EXCERCISE_TYPE, wantedGroups, wantedElements } = location.state || {};
  const [compounds, setCompounds] = useState([]);
  const [availableCompounds, setAvailableCompounds] = useState(0);
  const [usedIds, setUsedIds] = useState([]);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [wrong, setWrong] = useState(false);
  const [dontKnow, setDontKnow] = useState(false);

  // prettier-ignore
  const numberToSubscript = {
    "0": String.fromCharCode(8320),
    "1": String.fromCharCode(8321),
    "2": String.fromCharCode(8322),
    "3": String.fromCharCode(8323),
    "4": String.fromCharCode(8324),
    "5": String.fromCharCode(8325),
    "6": String.fromCharCode(8326),
    "7": String.fromCharCode(8327),
    "8": String.fromCharCode(8328),
    "9": String.fromCharCode(8329),
  };

  const subscriptToNumber = {
    "₀": "0",
    "₁": "1",
    "₂": "2",
    "₃": "3",
    "₄": "4",
    "₅": "5",
    "₆": "6",
    "₇": "7",
    "₈": "8",
    "₉": "9",
  };

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
          usedIds,
          wantedGroups,
          wantedElements
        );
        setError(null);
        setCompounds([...compounds, ...response.data.data]);
        setAvailableCompounds(response.data.count);
      } catch (err) {
        setError([true, err.message]);
        setTimeout(() => {
          getCompounds();
        }, 5000);
      }
    }
  }, [compounds, wantedGroups, wantedElements, usedIds]);

  // convert numbers in formula to subscript
  const convertToFormula = (formula) => {
    if (formula.length > 1) {
      for (let i = 1; i < formula.length; i++) {
        if (
          /^[a-zA-Z]+$/.test(formula[i - 1]) ||
          formula[i - 1] === ")" ||
          formula[i - 1] === "]" ||
          (formula[i - 1].charCodeAt(0) > 8319 &&
            formula[i - 1].charCodeAt(0) < 8330)
        ) {
          if (/^[0-9]+$/.test(formula[i])) {
            formula = `${formula.slice(0, i)}${
              numberToSubscript[formula[i]]
            }${formula.slice(i + 1)}`;
          }
        }
      }
    }
    return formula;
  };

  // get the first option from the compound
  const getFirstOption = (compound) => {
    const splittedCompounds = compound.split(",");
    return splittedCompounds[0].trim();
  };

  // fetch data on the first render and theb every time the compounds array changes
  useEffect(() => {
    if (availableCompounds > 0 || compounds.length === 0) {
      getCompounds();
    }
  }, [compounds]);

  // handle the answer input
  const handleAnswer = (e) => {
    if (EXCERCISE_TYPE === VZOREC) {
      setAnswer(e.target.value);
    } else {
      setAnswer(convertToFormula(e.target.value));
    }
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
      setCompounds(compounds.slice(1));
    } else {
      let actualAnswer = answer;
      for (let i = 0; i < actualAnswer.length; i++) {
        if (subscriptToNumber[actualAnswer[i]]) {
          actualAnswer = `${actualAnswer.slice(0, i)}${
            subscriptToNumber[actualAnswer[i]]
          }${actualAnswer.slice(i + 1)}`;
        }
      }

      if (EXCERCISE_TYPE === VZOREC) {
        let splittedCompounds = compounds[0].name.split(",");
        splittedCompounds = splittedCompounds.map((compound) =>
          compound.trim()
        );
        if (splittedCompounds.includes(actualAnswer)) {
          setWrong(false);
          setUsedIds([...usedIds, compounds[0].id]);
          setCompounds(compounds.slice(1));
        } else {
          setWrong(true);
        }
      } else {
        let splittedCompounds = compounds[0].formula.split(",");
        splittedCompounds = splittedCompounds.map((compound) =>
          compound.trim()
        );
        if (splittedCompounds.includes(actualAnswer)) {
          setWrong(false);
          setUsedIds([...usedIds, compounds[0].id]);
          setCompounds(compounds.slice(1));
        } else {
          setWrong(true);
        }
      }
    }
    if (availableCompounds < 11) {
      setUsedIds([]);
    }
    setAnswer("");
  };

  // handle the dont know button
  const handleDontKnow = () => {
    setWrong(false);
    setDontKnow(true);
  };

  return (
    <>
      <StandardHelmetTemplate
        title="Procvičování"
        description="Procvičování chemických sloučenin a jejich názvů a vzorců."
      />
      {!error ? (
        compounds.length > 0 ? (
          <div className="content" id="excercise">
            <h4 className="task-label">Zadejte:</h4>
            <h2 className="task">
              {EXCERCISE_TYPE === VZOREC
                ? convertToFormula(getFirstOption(compounds[0]?.formula))
                : getFirstOption(compounds[0]?.name)}
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
              convertToFormula={convertToFormula}
              getFirstOption={getFirstOption}
            />
            <ExcerciseButtons
              handleCheck={handleCheck}
              handleDontKnow={handleDontKnow}
              dontKnow={dontKnow}
            />
          </div>
        ) : availableCompounds == 0 ? (
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
