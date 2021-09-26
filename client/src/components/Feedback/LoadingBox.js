import React from "react";

const LoadingBox = () => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <i className="fa fa-spinner fa-spin"></i>Loading...
    </div>
  );
};

export default LoadingBox;
