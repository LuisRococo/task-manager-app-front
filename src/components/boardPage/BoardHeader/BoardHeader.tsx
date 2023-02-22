import React from "react";
import "./BoardHeader.scss";
import { BoardVisibilityOption } from "./BoardVisibilityOption";
import { BoardHeaderMenuBtn } from "./BoardHeaderMenuBtn";

interface IBoardHeader {
  boardTitle: string;
  projectImage: string;
  boardVisibility: boolean;
  onBoardVisibilityChange: () => void;
}

const BoardHeader: React.FC<IBoardHeader> = ({
  projectImage,
  boardTitle: projectTitle,
  boardVisibility,
  onBoardVisibilityChange,
}) => {
  function handleVisibilityChange() {
    onBoardVisibilityChange();
  }

  return (
    <div className="py-5">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-content-center">
          <img
            className="board-header-project-img"
            src={projectImage}
            alt="project image"
          />
          <div className="d-flex flex-column justify-content-center">
            <h5>{projectTitle}</h5>
            <p className="m-0 p-0 text-secondary fst-italic">Board</p>
          </div>
        </div>

        <div className="d-flex">
          <BoardVisibilityOption
            onClick={handleVisibilityChange}
            visible={boardVisibility}
          />
          <BoardHeaderMenuBtn />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default BoardHeader;
