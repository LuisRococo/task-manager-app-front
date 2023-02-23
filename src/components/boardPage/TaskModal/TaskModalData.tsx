import React from "react";
import { AiFillFilePdf } from "react-icons/ai";
import { ITask } from "../../../interfaces/task";

interface TaskModelData {
  taskData: ITask;
}

export const TaskModalData: React.FC<TaskModelData> = ({ taskData }) => {
  const { taskList, creatorName, description, points } = taskData;

  return (
    <div>
      <p className="mb-2">Data:</p>
      <p className="m-0">
        <strong>Author: </strong>
        {creatorName}
      </p>

      <p className="m-0">
        <strong>Points: </strong>
        {points}
      </p>

      <p className="m-0">
        <strong>Task List: </strong>
        {taskList.title}
      </p>

      <p className="mt-3 m-0">
        <strong className="">Description: </strong>
      </p>
      <p className="m-0">{description}</p>

      <p className="mt-3 m-0">
        <strong className="">Attachments: </strong>
      </p>

      <div className="d-flex">
        <div className="attachment rounded border me-2">
          <AiFillFilePdf size={25} color="#cc1c1c" />
          <p className="m-0">Attachment1.pdf</p>
        </div>
        <div className="attachment rounded border me-2">
          <AiFillFilePdf size={25} color="#cc1c1c" />
          <p className="m-0">Diagrams.pdf</p>
        </div>
      </div>
    </div>
  );
};
