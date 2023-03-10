import React from "react";
import "./SelectionPageHeader.scss";

export const SelectionPageHeader = () => {
  return (
    <div className="py-5">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-content-center">
          <img
            className="board-header-project-img"
            src={"https://via.placeholder.com/150"}
            alt="project image"
          />
          <div className="d-flex flex-column justify-content-center">
            <div className="d-flex align-items-start">
              <h3 className="m-0" data-testid="board-select-page-header">
                Boards Menu
              </h3>
            </div>
            <p className="m-0 p-0 text-secondary fst-italic">Boards</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};
