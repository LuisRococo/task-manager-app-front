import React, { useState } from "react";
import "./BoardPage.scss";
import BoardHeader from "../components/boardPage/BoardHeader/BoardHeader";
import { TaskListContainer } from "../components/boardPage/TaskListContainer/TaskListContainer";
import { IBoard } from "../interfaces/board";
import { board as boardPlaceholder } from "../placeholders/boardsPlaceholders";

function BoardPage() {
  const boardId = 1;
  const [projectImage, setProjectImage] = useState(
    "https://via.placeholder.com/150"
  );
  const [board, setBoard] = useState<IBoard>(boardPlaceholder);

  function handleBoardVisibilityChange() {
    setBoard((previousValue) => {
      return { ...previousValue, visibility: !previousValue.visibility };
    });
  }

  if (!board) return <div className="page-cont full-height-cont"></div>;

  return (
    <div className="page-cont full-height-cont">
      <BoardHeader
        boardTitle={board.title}
        projectImage={projectImage}
        boardVisibility={board.visibility}
        onBoardVisibilityChange={handleBoardVisibilityChange}
      />
      <TaskListContainer boardId={boardId} />
    </div>
  );
}

export default BoardPage;
