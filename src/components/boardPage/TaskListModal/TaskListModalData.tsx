import React from "react";

interface TaskListModalData {
  name: string;
  color: string;
  priority: number;
}

export const TaskListModalData: React.FC<TaskListModalData> = ({
  color,
  name,
  priority,
}) => {
  return (
    <div>
      <p className="mb-2">Data:</p>
      <p className="m-0">
        <strong>Name: </strong>
        <span data-testid="list-modal-list-name">{name}</span>
      </p>
      <p className="m-0">
        <strong>Color: </strong>
        <span data-testid="list-modal-list-color">{color}</span>
      </p>
      <p className="m-0">
        <strong>Priority: </strong>
        <span data-testid="list-modal-list-priority">{priority}</span>
      </p>
    </div>
  );
};
