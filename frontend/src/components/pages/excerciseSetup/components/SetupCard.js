import React from "react";

function SetupCard({
  allState,
  handleAllChange,
  elType,
  setSearch,
  typeSearch,
  dataType,
  typeSet,
  handleTypeChange,
}) {
  return (
    <>
      <fieldset
        className="setup-card"
        disabled={allState ? true : false}
        onClick={() => {
          if (allState) {
            handleAllChange();
          }
        }}
      >
        <input
          className="setup-search-box"
          placeholder="Hledat..."
          name={`search-${elType}`}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul className="setup-items-list">
          {dataType
            .filter((item) => {
              return typeSearch.toLowerCase() === ""
                ? item
                : elType === "groups"
                ? item.name.toLowerCase().includes(typeSearch.toLowerCase())
                : item.name.toLowerCase().includes(typeSearch.toLowerCase()) ||
                  item.formula.toLowerCase().includes(typeSearch.toLowerCase());
            })
            .map((item) => (
              <li key={item.id} className="setup-row">
                <input
                  type="checkbox"
                  name={item.name}
                  value={item.name}
                  checked={typeSet.has(item.name) ? true : false}
                  onChange={handleTypeChange}
                />
                <h5 className="setup-item">{item.name}</h5>
                {/* <label
                className="setup-item-label"
                htmlFor={`element-${elType}-${element.id}`}
              >
                {element.name}
              </label> */}
              </li>
            ))}
        </ul>
      </fieldset>
    </>
  );
}

export default SetupCard;
