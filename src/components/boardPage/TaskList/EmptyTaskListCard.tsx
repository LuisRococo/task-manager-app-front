import React from "react";
import "./EmptyTaskListCard.scss";

export const EmptyTaskListCard: React.FC = () => {
  return (
    <div className="border rounded text-center p-4">
      <p className="p-0 m-0 text-muted">
        <small data-testid="task-list-no-tasks-card-text">No Tasks</small>
      </p>
    </div>
  );
};
