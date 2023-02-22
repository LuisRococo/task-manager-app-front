import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import "./TaskListContainer.scss";
import { TaskList as TaskList } from "../TaskList/TaskList";
import { TaskListModal } from "../TaskListModal/TaskListModal";
import { useTaskListState } from "../../../hooks/useTaskListState";
import { ITaskListState } from "../../../interfaces/taskList";

interface TaskListContainer {}

export const TaskListContainer: React.FC<TaskListContainer> = () => {
  const { taskLists, setSingleTaskList, findTaskList } = useTaskListState();
  const [modalVisibility, setModalVisibility] = useState(false);
  //! Fix modal as well
  const [modalTaskList, setModalTaskList] = useState<
    ITaskListState | undefined
  >(undefined);

  function handleModalClose() {
    setModalVisibility(false);
  }

  function handleTaskListClick(taskList: ITaskListState) {
    setModalTaskList(taskList);
    setModalVisibility(true);
  }

  function handleTaskListUpdate(
    taskListId: number,
    name: string,
    priority: number,
    color: string
  ) {
    setModalVisibility(false);

    let taskListToUpdate = findTaskList(taskListId);

    if (!taskListToUpdate) return;

    taskListToUpdate = { ...taskListToUpdate };

    taskListToUpdate.name = name;
    taskListToUpdate.priority = priority;
    taskListToUpdate.color = color;

    setSingleTaskList(taskListToUpdate);
  }

  return (
    <>
      {ReactDOM.createPortal(
        <TaskListModal
          onModalClose={handleModalClose}
          taskList={modalTaskList}
          visibility={modalVisibility}
          onTaskListUpdate={handleTaskListUpdate}
        />,
        document.getElementById("task-list-option-modal") as any
      )}

      <div className="overflow-auto">
        <div className="row-fluid row-fluid-scroll d-flex">
          {taskLists.map((taskList) => {
            return (
              <TaskList
                key={taskList.listId}
                taskList={taskList}
                onClick={handleTaskListClick}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
