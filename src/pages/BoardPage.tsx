import React, { useEffect, useState } from "react";
import "./BoardPage.scss";
import BoardHeader from "../components/boardPage/BoardHeader/BoardHeader";
import { TaskListContainer } from "../components/boardPage/TaskListContainer/TaskListContainer";
import { BoardMenu } from "../components/common/BoardMenu/BoardMenu";
import { useBoardState } from "../hooks/useBoardState";
import { useTaskListState } from "../hooks/useTaskListState";
import { CreateTaskListModal } from "../components/boardPage/CreateTaskListModal/CreateTaskListModal";
import { TaskModal } from "../components/boardPage/TaskModal/TaskModal";
import { CreateTaskModal } from "../components/boardPage/CreateTaskModal/CreateTaskModal";

function BoardPage() {
  const boardId = 1;
  const [projectImage] = useState("https://via.placeholder.com/150");
  const { board, fetchBoard } = useBoardState();
  const { fetchTaskLists, taskLists } = useTaskListState();

  useEffect(() => {
    fetchBoard(boardId);
    fetchTaskLists(boardId);
  }, []);

  if (!board || !taskLists)
    return <div className="page-cont full-height-cont"></div>;

  return (
    <>
      <CreateTaskListModal />
      <CreateTaskModal />
      <TaskModal />
      <BoardMenu />
      <div className="page-cont full-height-cont">
        <BoardHeader
          boardTitle={board.title}
          projectImage={projectImage}
          boardVisibility={board.isPublic}
        />
        <TaskListContainer />
      </div>
    </>
  );
}

export default BoardPage;
