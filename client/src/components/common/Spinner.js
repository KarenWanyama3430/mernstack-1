import React from "react";
import spinner from "./spinner.gif";

function Spinner() {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        style={{ display: "block", margin: "auto", width: "200px" }}
      />
    </div>
  );
}

export default Spinner;
