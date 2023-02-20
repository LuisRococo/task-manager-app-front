import React from "react";
import "./TaskList.scss";
import { ITaskList } from "../../../interfaces/taskList";

interface CardList {
  taskList: ITaskList;
}

export const TaskList: React.FC<CardList> = ({ taskList }) => {
  return (
    <div className="col-12 col-md-4 col-lg-3 mx-2 col-inside-scroll pb-4 h-100">
      <div className="w-100 mb-5">
        <div className="w-100 bg-light rounded-top p-3 text-center border">
          <p className="h6 m-0">{taskList.name}</p>
          <small className="text-muted">{taskList.priority}° Priority</small>
        </div>
        <div
          className="task-list-bottom rounded-bottom"
          style={{ backgroundColor: taskList.color }}
        ></div>
      </div>
    </div>
  );
};
