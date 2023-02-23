import React from "react";
import { AiFillFilePdf } from "react-icons/ai";

export const TaskModalData = () => {
  return (
    <div>
      <p className="mb-2">Data:</p>
      <p className="m-0">
        <strong>Author: </strong>
        Francisco Peralta
      </p>

      <p className="m-0">
        <strong>Points: </strong>
        12
      </p>

      <p className="m-0">
        <strong>Task List: </strong>
        Completed
      </p>

      <p className="mt-3 m-0">
        <strong className="">Description: </strong>
      </p>
      <p className="m-0">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem,
        voluptatibus?
      </p>

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
