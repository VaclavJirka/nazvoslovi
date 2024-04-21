import React, { useEffect, useState } from "react";
import { elements, groups } from "../../jsondata/data";
import { useNavigate } from "react-router-dom";
import SetupType from "./components/SetupType";
import SetupCard from "./components/SetupCard";
import StandardHelmetTemplate from "../../helmet_templates/StandardHelmetTemplate";

function ExcerciseSetup() {
  const excerciseTypeStorage = localStorage.getItem("EXCERCISE_TYPE");
  const groupsList = JSON.parse(localStorage.getItem("WANTED_GROUPS"));
  const elementsList = JSON.parse(localStorage.getItem("WANTED_ELEMENTS"));
  const [excerciseType, setExcerciseType] = useState(
    excerciseTypeStorage ? excerciseTypeStorage : "vzorec"
  );
  const [allGroups, setAllGroups] = useState(
    groupsList ? groupsList.length === groups.length : true
  );
  const [allElements, setAllElements] = useState(
    elementsList ? elementsList.length === elements.length : true
  );
  const [groupSearch, setGroupSearch] = useState("");
  const [groupsError, setGroupsError] = useState(false);
  const [elementSearch, setElementSearch] = useState("");
  const [elementsError, setElementsError] = useState(false);
  const [groupsSet, setGroupsSet] = useState(() => {
    if (groupsList) {
      return new Set(groupsList);
    }
    return new Set(groups.map((item) => item.name));
  });
  const [elementsSet, setElementsSet] = useState(() => {
    if (elementsList) {
      return new Set(elementsList);
    }
    return new Set(elements.map((item) => item.name));
  });
  const navigate = useNavigate();

  // Function to handle the change of excercise type
  const handleExcerciseTypeChange = () => {
    if (excerciseType === "vzorec") {
      setExcerciseType("název");
    } else {
      setExcerciseType("vzorec");
    }
  };

  // Function to handle the change the change of radio buttons to select all or some groups
  const handleAllGroupsChange = () => {
    if (!allGroups && groupsError) {
      setGroupsError(false);
    }
    setAllGroups(!allGroups);
  };

  // Function that sets GroupsSet to all groups if allGroups is true, otherwise sets it to groupsList
  useEffect(() => {
    if (allGroups) {
      setGroupsSet(new Set(groups.map((item) => item.name)));
      localStorage.setItem("WANTED_GROUPS", JSON.stringify([]));
    } else {
      if (groupsList) {
        setGroupsSet(new Set(groupsList));
      } else {
        setGroupsSet(new Set());
      }
    }
  }, [allGroups]);

  // Function to handle the change the change of radio buttons to select all or some elements
  const handleAllElementsChange = () => {
    if (!allElements && elementsError) {
      setElementsError(false);
    }
    setAllElements(!allElements);
  };

  // Function that sets ElementsSet to all elements if allElements is true, otherwise sets it to elementsList
  useEffect(() => {
    if (allElements) {
      setElementsSet(new Set(elements.map((item) => item.name)));
      localStorage.setItem("WANTED_ELEMENTS", JSON.stringify([]));
    } else {
      if (elementsList) {
        setElementsSet(new Set(elementsList));
      } else {
        setElementsSet(new Set());
      }
    }
  }, [allElements]);

  // Function to handle the change of groups in card
  const handleGroupChange = (event) => {
    if (event.target.checked) {
      setGroupsSet(new Set([...groupsSet, event.target.value]));
      setGroupsError(false);
    } else {
      const newGroupsSet = new Set(groupsSet);
      newGroupsSet.delete(event.target.value);
      setGroupsSet(newGroupsSet);
    }
  };

  // Function to handle the change of elements in card
  const handleElementChange = (event) => {
    if (event.target.checked) {
      setElementsSet(new Set([...elementsSet, event.target.value]));
      setElementsError(false);
    } else {
      const newElementsSet = new Set(elementsSet);
      newElementsSet.delete(event.target.value);
      setElementsSet(newElementsSet);
    }
  };

  // Function to delete all selected groups or elements
  const deleteSelected = (elType) => {
    if (elType === "groups") {
      setGroupsSet(new Set());
    } else {
      setElementsSet(new Set());
    }
  };

  // Function to handle the submit of the form
  const onSubmit = (event) => {
    event.preventDefault();
    const groupsList = Array.from(groupsSet);
    const elementsList = Array.from(elementsSet);
    if (groupsList.length === 0 || elementsList.length === 0) {
      if (groupsList.length === 0) {
        setGroupsError(true);
      }
      if (elementsList.length === 0) {
        setElementsError(true);
      }
      return;
    }
    localStorage.setItem("EXCERCISE_TYPE", excerciseType);
    localStorage.setItem("WANTED_GROUPS", JSON.stringify(groupsList));
    localStorage.setItem("WANTED_ELEMENTS", JSON.stringify(elementsList));
    navigate("/procvicovani", {
      state: {
        EXCERCISE_TYPE: excerciseType,
        wantedGroups: groupsList,
        wantedElements: elementsList,
      },
    });
  };

  return (
    <>
      <StandardHelmetTemplate
        title="Nastavení procvičování"
        description="Nastavení procvičování názvů a vzorců chemických prvků a sloučenin."
      />
      <form className="content" id="excercise-setup-form" onSubmit={onSubmit}>
        <h2 className="excercise-setup-header">Nastavení procvičování</h2>
        <SetupType
          excerciseType={excerciseType}
          handleExcerciseTypeChange={handleExcerciseTypeChange}
        />
        <fieldset className="setup-div">
          <SetupCard
            allState={allGroups}
            error={groupsError}
            handleAllChange={handleAllGroupsChange}
            elType="groups"
            setSearch={setGroupSearch}
            typeSearch={groupSearch}
            dataType={groups}
            typeSet={groupsSet}
            deleteSelected={deleteSelected}
            handleTypeChange={handleGroupChange}
          />
          <SetupCard
            allState={allElements}
            error={elementsError}
            handleAllChange={handleAllElementsChange}
            elType="elements"
            setSearch={setElementSearch}
            typeSearch={elementSearch}
            dataType={elements}
            typeSet={elementsSet}
            deleteSelected={deleteSelected}
            handleTypeChange={handleElementChange}
          />
        </fieldset>
        <button
          className="blue-glow-button"
          id="excercise-start-button"
          type="submit"
        >
          Začít
        </button>
      </form>
    </>
  );
}

export default ExcerciseSetup;
