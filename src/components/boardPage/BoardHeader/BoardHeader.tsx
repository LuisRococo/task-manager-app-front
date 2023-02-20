import React from "react";
import "./BoardHeader.scss";

interface IBoardHeader {
  boardTitle: string;
  projectImage: string;
}

const BoardHeader: React.FC<IBoardHeader> = ({
  projectImage,
  boardTitle: projectTitle,
}) => {
  return (
    <div className="py-5">
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
      <hr />
    </div>
  );
};

export default BoardHeader;
