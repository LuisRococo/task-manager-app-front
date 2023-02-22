import React, { useEffect, useState } from "react";
import "./TaskList.scss";
import { ITaskListState } from "../../../interfaces/taskList";
import { EmptyTaskListCard } from "./EmptyTaskListCard";
import { TaskCard } from "../TaskCard.tsx/TaskCard";

interface ITaskList {
  taskList: ITaskListState;
  onClick: (taskList: ITaskListState) => void;
}

export const TaskList: React.FC<ITaskList> = ({ taskList, onClick }) => {
  const { tasks, color, name, priority, listId } = taskList;

  return (
    <div className="task-list mx-2 col-inside-scroll pb-4 h-100">
      <div
        className="w-100 mb-5"
        style={{ cursor: "pointer" }}
        onClick={() => {
          onClick(taskList);
        }}
      >
        <div className="w-100 bg-light rounded-top p-3 text-center border">
          <p className="h6 m-0">{name}</p>
          <small className="text-muted">{priority}° Priority</small>
        </div>
        <div
          className="task-list-bottom rounded-bottom"
          style={{ backgroundColor: color }}
        ></div>
      </div>

      <div>
        {tasks.length == 0 && <EmptyTaskListCard />}
        {tasks.length != 0 &&
          tasks.map((task) => {
            return <TaskCard key={task.taskId} {...task} />;
          })}
      </div>
    </div>
  );
};
