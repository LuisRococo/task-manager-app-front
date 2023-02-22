import React, { useEffect, useState } from "react";
import "./BoardPage.scss";
import BoardHeader from "../components/boardPage/BoardHeader/BoardHeader";
import { TaskListContainer } from "../components/boardPage/TaskListContainer/TaskListContainer";
import { board as boardPlaceholder } from "../placeholders/boardsPlaceholders";
import { BoardMenu } from "../components/common/BoardMenu/BoardMenu";
import { useBoardState } from "../hooks/useBoardState";
import { useTaskListState } from "../hooks/useTaskListState";

function BoardPage() {
  const boardId = 1;
  const [projectImage] = useState("https://via.placeholder.com/150");
  const { board, fetchBoard } = useBoardState();
  const { fetchTaskLists } = useTaskListState();

  useEffect(() => {
    fetchBoard(boardId);
    fetchTaskLists(boardId);
  }, []);

  if (!board) return <div className="page-cont full-height-cont"></div>;

  return (
    <>
      <BoardMenu />
      <div className="page-cont full-height-cont">
        <BoardHeader
          boardTitle={board.title}
          projectImage={projectImage}
          boardVisibility={board.visibility}
        />
        <TaskListContainer />
      </div>
    </>
  );
}

export default BoardPage;
