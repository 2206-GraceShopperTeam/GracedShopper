import React from "react";

const Error = ({ setError }) => {
  return (
    <div className="errorMessage">
      Incorrect User Name or Password, Please try again!
      <button
        onClick={() => {
          setError(false);
        }}
      >
        Okay
      </button>
    </div>
  );
};

export default Error;
