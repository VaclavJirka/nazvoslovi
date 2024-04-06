import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

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
  const [scrollY, setScrollY] = useState(0);
  const fade = useSpring({ opacity: scrollY > 0 ? 0 : 1 });

  const handleScroll = (e) => {
    setScrollY(e.target.scrollTop);
  };

  return (
    <>
      <fieldset
        className={`setup-card${error ? " setup-card-error" : ""}`}
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
          className="setup-card-search-box"
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
          className="setup-card-delete-selected"
          onClick={() => deleteSelected(elType)}
        >
          Vymazat vše
        </button>
        <ul
          className={`setup-card-items-list${
            error ? " setup-card-items-list-error" : ""
          }`}
          onScroll={handleScroll}
        >
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
              <li key={item.id} className="setup-card-item-row">
                <input
                  type="checkbox"
                  name={item.name}
                  value={item.name}
                  checked={typeSet.has(item.name) ? true : false}
                  onChange={handleTypeChange}
                />
                <h5 className="setup-card-item">{item.name}</h5>
              </li>
            ))}
        </ul>
        <animated.i
          className="fa-solid fa-arrow-down"
          style={fade}
        ></animated.i>
      </fieldset>
    </>
  );
}

export default SetupCard;
