import React from "react";

function SetupCard({
  allState,
  error,
  handleAllChange,
  elType,
  setSearch,
  typeSearch,
  dataType,
  typeSet,
  deleteSelected,
  handleTypeChange,
}) {
  return (
    <>
      <fieldset
        className={`setup-card${error ? "-error" : ""}`}
        disabled={allState ? true : false}
        onClick={() => {
          if (allState) {
            handleAllChange();
          }
        }}
      >
        <h3 className="setup-card-title">
          {elType === "groups" ? "Skupiny" : "Prvky"}
        </h3>
        <input
          className="setup-search-box"
          placeholder="Hledat..."
          name={`search-${elType}`}
          onChange={(e) => setSearch(e.target.value)}
        />
        {error && (
          <h5 className="setup-card-error-title">
            Vyberte alespoň jednu možnost
          </h5>
        )}
        <button
          className="setup-delete-selected"
          onClick={() => deleteSelected(elType)}
        >
          Vymazat vše
        </button>
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
