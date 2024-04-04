import React from "react";
import SetupRadioOption from "./SetupRadioOption";

function SetupAllSome({
  fieldsetClass,
  elType,
  allState,
  handleChange,
  title,
  id,
}) {
  return (
    <>
      <fieldset className={fieldsetClass}>
        <SetupRadioOption
          divClass="setup-radio-form-option"
          elName={`all-${elType}`}
          id={`setup-radio-form-option-${id}`}
          value={allState ? true : false}
          checked={allState ? true : false}
          handleChange={handleChange}
          title={`Všechny ${title}`}
        ></SetupRadioOption>
        <SetupRadioOption
          divClass="setup-radio-form-option"
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