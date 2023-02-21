import React from "react";

interface TaskCardStatus {
  completed: boolean;
}

export const TaskCardStatus: React.FC<TaskCardStatus> = ({ completed }) => {
  const textContent = completed ? "Completed" : "Incomplete";
  const backgroundClass = completed ? "bg-success" : "bg-secondary";
  return (
    <div className={`${backgroundClass} rounded px-2 py-1 text-white`}>
      <p className="p-0 m-0">
        <small>{textContent}</small>
      </p>
    </div>
  );
};
