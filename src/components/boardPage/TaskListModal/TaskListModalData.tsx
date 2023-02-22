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
        {name}
      </p>
      <p className="m-0">
        <strong>Color: </strong>
        {color}
      </p>
      <p className="m-0">
        <strong>Priority: </strong>
        {priority}
      </p>
    </div>
  );
};
