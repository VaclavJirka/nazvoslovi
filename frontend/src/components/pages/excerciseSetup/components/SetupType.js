import React from "react";
import SetupRadioOption from "./SetupRadioOption";

function SetupType({ excerciseType, handleExcerciseTypeChange }) {
  return (
    <>
      <fieldset className="setup-type">
        <SetupRadioOption
          divClass="setup-radio-form-option"
          elName="vzorec"
          id="setup-radio-form-option-1"
          value="vzorec"
          checked={excerciseType === "název" ? false : true}
          handleChange={handleExcerciseTypeChange}
          title="Vzorce"
        ></SetupRadioOption>
        <SetupRadioOption
          divClass="setup-radio-form-option"
          elName="název"
          id="setup-radio-form-option-2"
          value="název"
          checked={excerciseType === "název" ? true : false}
          handleChange={handleExcerciseTypeChange}
          title="Názvy"
        ></SetupRadioOption>
      </fieldset>
    </>
  );
}

export default SetupType;
