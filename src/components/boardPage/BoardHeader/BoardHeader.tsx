import React from "react";
import "./BoardHeader.scss";
import { BoardVisibilityOption } from "./BoardVisibilityOption";
import { BoardHeaderMenuBtn } from "./BoardHeaderMenuBtn";
import { BiEdit } from "react-icons/bi";
import { useModalState } from "../../../hooks/useModalState";

interface IBoardHeader {
  boardTitle: string;
  projectImage: string;
  boardVisibility: boolean;
}

const BoardHeader: React.FC<IBoardHeader> = ({
  projectImage,
  boardTitle: projectTitle,
  boardVisibility,
}) => {
  const { changeEditBoardModalVisibility } = useModalState();

  function handleBoardOptionBtnClick() {
    changeEditBoardModalVisibility(true);
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
            <div className="d-flex align-items-center">
              <h5 data-testid="board-header-title" className="m-0">
                {projectTitle}
              </h5>
              <div
                data-testid="header-edit-board-btn"
                onClick={handleBoardOptionBtnClick}
                className="edit-board-btn ms-2"
              >
                <BiEdit size={25} color="#d3451a" />
              </div>
            </div>
            <p className="m-0 p-0 text-secondary fst-italic">Board</p>
          </div>
        </div>

        <div className="d-flex">
          <BoardVisibilityOption visible={boardVisibility} />
          <BoardHeaderMenuBtn />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default BoardHeader;
