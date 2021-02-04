import { useReducer } from "react";
import React from "react";
import { useState } from "react";

/*
 *
 */

const Checkbox = ({ val, aznumber, dispatch }) => {
  const [inputchecked, setInputChecked] = useState(false);
  console.log(inputchecked);
  //   const [checked, toggle] = useReducer((checked) => !checked, false);
  //   const [checked, dispatch] = useReducer(reducer, false);

  // function toggle(event, aznumber) {
  const handleOnChange = (value, aznumber) => {
    setInputChecked((prev) => !prev);
    if (value) {
      dispatch({ type: "ADDSUBNET", payload: [aznumber, val] });
    } else dispatch({ type: "DeleteSUBNET", payload: [aznumber, val] });
  };
  return (
    <>
      {/* <input
        type="checkbox"
        
        onChange={(event) => handleOnChange(event.target.value, aznumber)}
      /> */}
      <input
        type="checkbox"
        checked={inputchecked}
        value={inputchecked}
        onChange={(e) => handleOnChange(e.target.checked, aznumber)}
      />
      {/* {checked ? "checked" : "not checked "} */}
    </>
  );
};

export default Checkbox;
