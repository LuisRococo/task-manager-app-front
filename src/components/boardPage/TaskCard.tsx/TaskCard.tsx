import React from "react";
import "./TaskCard.scss";
import { ITask, TaskStatusEnum } from "../../../interfaces/task";
import { TaskCardStatus } from "../TaskCardStatus/TaskCardStatus";

interface TaskCard extends ITask {}

export const TaskCard: React.FC<ITask> = ({
  assignedQuantity,
  creatorName,
  status,
  taskId,
  title,
}) => {
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
        <TaskCardStatus completed={status === TaskStatusEnum.complete} />
      </div>
    </div>
  );
};
