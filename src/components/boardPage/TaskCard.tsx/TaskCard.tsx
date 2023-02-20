import React from "react";
import "./TaskCard.scss";
import { ITask, TaskStatusEnum } from "../../../interfaces/task";

interface TaskCard extends ITask {}

export const TaskCard: React.FC<ITask> = ({
  assignedQuantity,
  creatorName,
  status,
  taskId,
  title,
}) => {
  const statusComponent = () => {
    if (status === TaskStatusEnum.complete) {
      return (
        <div className="bg-success rounded px-2 py-1 text-white">
          <p className="p-0 m-0">
            <small>Completed</small>
          </p>
        </div>
      );
    } else {
      return (
        <div className="bg-secondary rounded px-2 py-1 text-white">
          <p className="p-0 m-0">
            <small>Incomplete</small>
          </p>
        </div>
      );
    }
  };

  return (
    <div className="rounded border px-2 py-3 mb-3 bg-light">
      <small className="text-muted fst-italic">Task</small>
      <p>{title}</p>
      <hr />
      <p>
        <strong>Author: </strong>
        {creatorName}
      </p>

      <div className="d-flex justify-content-between">
        <p className="p-0 m-0">{assignedQuantity} people</p>
        {statusComponent()}
      </div>
    </div>
  );
};
