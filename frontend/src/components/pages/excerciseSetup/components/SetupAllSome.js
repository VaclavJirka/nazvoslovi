import React from "react";
import SetupRadioOption from "./SetupRadioOption";

function SetupAllSome({ elType, allState, handleChange, title, id }) {
  return (
    <>
      <fieldset className="setup-all-some">
        <SetupRadioOption
          className="setup-radio-form-option"
          elName={`all-${elType}`}
          id={`setup-radio-form-option-${id}`}
          value={allState ? true : false}
          checked={allState ? true : false}
          handleChange={handleChange}
          title={`Všechny ${title}`}
        ></SetupRadioOption>
        <SetupRadioOption
          className="setup-radio-form-option"
          elName={`some-${elType}`}
          id={`setup-radio-form-option-${Number(id) + 1}`}
          value={allState ? false : true}
          checked={allState ? false : true}
          handleChange={handleChange}
          title={`Vybrané ${title}`}
        ></SetupRadioOption>
      </fieldset>
    </>
  );
}

export default SetupAllSome;
