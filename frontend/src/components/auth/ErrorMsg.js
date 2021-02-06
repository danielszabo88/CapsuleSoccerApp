import React from "react";

const ErrorMsg = (props) => {
  return (
    <div>
      <span className="ErrorMsg">
        <b>{props.msg}</b>
      </span>
    </div>
  );
};

export default ErrorMsg;
