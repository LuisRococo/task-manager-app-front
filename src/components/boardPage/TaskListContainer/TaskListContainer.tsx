import React, { useState } from "react";
import "./TaskListContainer.scss";
import { TaskLists } from "../../../placeholders/taskListsPlaceholders";
import { TaskList as TaskList } from "../TaskList/TaskList";

interface TaskListContainer {
  boardId: number;
}

export const TaskListContainer: React.FC<TaskListContainer> = ({ boardId }) => {
  const [taskLists, setTaskLists] = useState(TaskLists);
  return (
    <div className="overflow-auto">
      <div className="row-fluid row-fluid-scroll d-flex">
        {taskLists.map((taskList) => {
          return <TaskList taskList={taskList} />;
        })}
      </div>
    </div>
  );
};
