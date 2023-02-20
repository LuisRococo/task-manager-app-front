import React from "react";
import logoImg from "../../../assets/logo.png";

export const Navigation: React.FC = () => {
  return (
    <nav className="navbar bg-dark navbar-expand-lg navbar-dark">
      <div className="page-cont py-2">
        <div className="d-flex align-items-center text-white">
          <img src={logoImg} alt="Project logo" className="logo" />
          GreatBoard
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav"></ul>
        </div>
      </div>
    </nav>
  );
};
