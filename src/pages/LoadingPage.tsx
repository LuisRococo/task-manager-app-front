import React from "react";
import "./LoadingPage.scss";
import loadingGif from "../assets/loading.gif";

export const LoadingPage = () => {
  return (
    <div className="loading-page">
      <img src={loadingGif} alt="loading indicator" />
    </div>
  );
};
