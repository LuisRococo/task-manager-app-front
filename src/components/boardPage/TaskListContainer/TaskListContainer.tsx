import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import "./TaskListContainer.scss";
import { TaskLists } from "../../../placeholders/taskListsPlaceholders";
import { TaskList as TaskList } from "../TaskList/TaskList";
import { TaskListModal } from "../TaskListModal/TaskListModal";
import { ITaskList } from "../../../interfaces/taskList";

interface TaskListContainer {
  boardId?: number;
}

export const TaskListContainer: React.FC<TaskListContainer> = ({ boardId }) => {
  const [taskLists, setTaskLists] = useState(TaskLists);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalTaskList, setModalTaskList] = useState<ITaskList | undefined>(
    undefined
  );

  function handleModalClose() {
    setModalVisibility(false);
  }

  function handleTaskListClick(taskList: ITaskList) {
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

    for (let index = 0; index < taskLists.length; index++) {
      const taskList = taskLists[index];
      if (taskList.listId === taskListId) {
        taskList.name = name;
        taskList.priority = priority;
        taskList.color = color;
        return;
      }
    }
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
