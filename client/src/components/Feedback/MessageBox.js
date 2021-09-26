import React from "react";
import "./MessageBox.css";

const MessageBox = (props) => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={`alert alert-${props.variant || "info"}`}>
        {props.children}
      </div>
    </div>
  );
};

export default MessageBox;
