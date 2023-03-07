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
import { GeneralErrorMessage } from "../components/boardPage/GeneralErrorMessage/GeneralErrorMessage";
import { EditBoardModal } from "../components/boardPage/EditBoardModal/EditBoardModal";
import { BoardSelectPage } from "./BoardSelectPage";
import { useRecoilState } from "recoil";
import { selectedBoardIdState } from "../appState/selectedBoardIdState";

function BoardPage() {
  const [selectedBoard, setSelectedId] = useRecoilState(selectedBoardIdState);
  const [projectImage] = useState("https://via.placeholder.com/150");
  const { board, fetchBoard } = useBoardState();
  const { fetchTaskLists, taskLists } = useTaskListState();
  const [error, setError] = useState<boolean>(false);

  async function initData() {
    try {
      if (!selectedBoard.id) {
        return;
      }
      await fetchBoard(+selectedBoard.id);
      await fetchTaskLists(+selectedBoard.id);
    } catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    initData();
  }, [selectedBoard.id]);

  if (!selectedBoard.id) {
    return <BoardSelectPage />;
  }

  if (error) {
    return (
      <GeneralErrorMessage
        onSelectededBoardIdReset={() => {
          setSelectedId({ id: null });
        }}
      />
    );
  } else if (!board || !taskLists)
    return <div className="page-cont full-height-cont"></div>;

  return (
    <>
      <EditBoardModal />
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
