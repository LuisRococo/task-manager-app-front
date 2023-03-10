import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import "./TaskListContainer.scss";
import { TaskList as TaskList } from "../TaskList/TaskList";
import { TaskListModal } from "../TaskListModal/TaskListModal";
import { useTaskListState } from "../../../hooks/useTaskListState";
import { ITaskListState } from "../../../interfaces/taskList";
import { useModalState } from "../../../hooks/useModalState";

export const TaskListContainer: React.FC = () => {
  const { taskLists } = useTaskListState();
  const { changeTaskListModalVisibility } = useModalState();
  const [modalTaskList, setModalTaskList] = useState<
    ITaskListState | undefined
  >(undefined);

  function handleTaskListClick(taskList: ITaskListState) {
    setModalTaskList(taskList);
    changeTaskListModalVisibility(true);
  }

  return (
    <div className="task-lists-container">
      {ReactDOM.createPortal(
        <TaskListModal taskList={modalTaskList} />,
        document.getElementById("task-list-option-modal") as any
      )}

      <div className="row-fluid row-fluid-scroll d-flex">
        {taskLists.map((taskList) => {
          return (
            <TaskList
              key={taskList.id}
              taskList={taskList}
              onClick={handleTaskListClick}
            />
          );
        })}
      </div>
    </div>
  );
};
