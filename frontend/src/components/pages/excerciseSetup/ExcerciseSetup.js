import React, { useEffect, useState } from "react";
import { elements, groups } from "../../data";
import { useNavigate } from "react-router-dom";
import SetupType from "./components/SetupType";
import SetupAllSome from "./components/SetupAllSome";
import SetupCard from "./components/SetupCard";

function ExcerciseSetup() {
  const [excerciseType, setExcerciseType] = useState("vzorce");
  const [allGroups, setAllGroups] = useState(true);
  const [allElements, setAllElements] = useState(true);
  const [groupSearch, setGroupSearch] = useState("");
  const [elementSearch, setElementSearch] = useState("");
  const [groupsSet, setGroupsSet] = useState(
    new Set(groups.map((item) => item.name))
  );
  const [elementsSet, setElementsSet] = useState(
    new Set(elements.map((item) => item.name))
  );
  const navigate = useNavigate();

  const handleExcerciseTypeChange = () => {
    if (excerciseType === "vzorce") {
      setExcerciseType("nazvy");
    } else {
      setExcerciseType("vzorce");
    }
  };

  const handleAllGroupsChange = () => {
    setAllGroups(!allGroups);
  };

  useEffect(() => {
    if (allGroups) {
      setGroupsSet(new Set(groups.map((item) => item.name)));
    } else {
      setGroupsSet(new Set());
    }
  }, [allGroups]);

  const handleAllElementsChange = () => {
    setAllElements(!allElements);
  };

  useEffect(() => {
    if (allElements) {
      setElementsSet(new Set(elements.map((item) => item.name)));
    } else {
      setElementsSet(new Set());
    }
  }, [allElements]);

  const handleGroupChange = (event) => {
    if (event.target.checked) {
      setGroupsSet(new Set([...groupsSet, event.target.value]));
    } else {
      const newGroupsSet = new Set(groupsSet);
      newGroupsSet.delete(event.target.value);
      setGroupsSet(newGroupsSet);
    }
  };

  const handleElementChange = (event) => {
    if (event.target.checked) {
      setElementsSet(new Set([...elementsSet, event.target.value]));
    } else {
      const newElementsSet = new Set(elementsSet);
      newElementsSet.delete(event.target.value);
      setElementsSet(newElementsSet);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const groupsList = Array.from(groupsSet);
    const elementsList = Array.from(elementsSet);
    if (elementsList.length === 0 || groupsList.length === 0) {
      alert("Vyberte alespoň jeden prvek a jednu skupinu.");
      return;
    }
    navigate("/procvicovani/zacit", {
      state: {
        EXCERCISE_TYPE: excerciseType,
        wantedGroups: groupsList,
        wantedElements: elementsList,
      },
    });
  };

  return (
    <form className="content" id="content-excercise-setup" onSubmit={onSubmit}>
      <h2 className="setup-header">Nastavení procvičování</h2>
      <SetupType
        fieldsetClass="setup-type"
        excerciseType={excerciseType}
        handleExcerciseTypeChange={handleExcerciseTypeChange}
      />
      <div className="setup-div">
        <fieldset className="setup-set-div">
          <SetupAllSome
            fieldsetClass="setup-radio-form"
            elType="groups"
            allState={allGroups}
            handleChange={handleAllGroupsChange}
            title="skupiny"
            id="3"
          />
          <SetupCard
            allState={allGroups}
            handleAllChange={handleAllGroupsChange}
            elType="groups"
            setSearch={setGroupSearch}
            typeSearch={groupSearch}
            dataType={groups}
            typeSet={groupsSet}
            handleTypeChange={handleGroupChange}
          />
        </fieldset>
        <fieldset className="setup-set-div">
          <SetupAllSome
            fieldsetClass="setup-radio-form"
            elType="elements"
            allState={allElements}
            handleChange={handleAllElementsChange}
            title="prvky"
            id="5"
          />
          <SetupCard
            allState={allElements}
            handleAllChange={handleAllElementsChange}
            elType="elements"
            setSearch={setElementSearch}
            typeSearch={elementSearch}
            dataType={elements}
            typeSet={elementsSet}
            handleTypeChange={handleElementChange}
          />
        </fieldset>
      </div>
      <button
        className="normal-start-button"
        id="excercise-start-button"
        type="submit"
      >
        Začít
      </button>
    </form>
  );
}

export default ExcerciseSetup;
