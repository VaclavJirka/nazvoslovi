import React from "react";

function SetupRadioOption({
  divClass,
  elName,
  id,
  value,
  checked,
  handleChange,
  title,
}) {
  return (
    <>
      <div className={divClass}>
        <input
          type="radio"
          name={elName}
          className="radio-button"
          id={id}
          value={value}
          checked={checked}
          onChange={handleChange}
        ></input>
        <label className="radio-button-label" htmlFor={id}>
          {title}
        </label>
      </div>
    </>
  );
}

export default SetupRadioOption;
