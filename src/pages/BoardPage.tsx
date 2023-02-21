import React, { useState } from "react";
import "./BoardPage.scss";
import BoardHeader from "../components/boardPage/BoardHeader/BoardHeader";
import { TaskListContainer } from "../components/boardPage/TaskListContainer/TaskListContainer";

function BoardPage() {
  const [boardId, setBoardId] = useState(1);
  const [boardTitle, setProjectTitle] = useState("My Task Manager");
  const [projectImage, setProjectImage] = useState(
    "https://via.placeholder.com/150"
  );

  function handleBoardVisibilityChange() {}

  return (
    <div className="page-cont full-height-cont">
      <BoardHeader
        boardTitle={boardTitle}
        projectImage={projectImage}
        boardVisibility={true}
        onBoardVisibilityChange={handleBoardVisibilityChange}
      />
      <TaskListContainer boardId={boardId} />
    </div>
  );
}

export default BoardPage;
