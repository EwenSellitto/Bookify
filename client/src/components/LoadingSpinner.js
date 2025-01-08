import React from "react";
import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading, please wait...</p>
    </div>
  );
}

export default LoadingSpinner;
