import React from "react";
import SetupRadioOption from "./SetupRadioOption";

function SetupType({ excerciseType, handleExcerciseTypeChange }) {
  return (
    <>
      <fieldset className="setup-type">
        <SetupRadioOption
          divClass="setup-radio-form-option"
          elName="vzorce"
          id="setup-radio-form-option-1"
          value="vzorce"
          checked={excerciseType === "nazvy" ? false : true}
          handleChange={handleExcerciseTypeChange}
          title="Vzorce"
        ></SetupRadioOption>
        <SetupRadioOption
          divClass="setup-radio-form-option"
          elName="nazvy"
          id="setup-radio-form-option-2"
          value="nazvy"
          checked={excerciseType === "nazvy" ? true : false}
          handleChange={handleExcerciseTypeChange}
          title="Názvy"
        ></SetupRadioOption>
      </fieldset>
    </>
  );
}

export default SetupType;
