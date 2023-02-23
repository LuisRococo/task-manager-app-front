import React from "react";
import * as ReactDOM from "react-dom";
import { Modal } from "../../common/Modal/Modal";
import { useModalState } from "../../../hooks/useModalState";
import { TaskCardStatus } from "../TaskCardStatus/TaskCardStatus";
import "./TaskModal.scss";
import { TaskModalData } from "./TaskModalData";

export const TaskModal = () => {
  const { closeTaskDataModal, modalsVisibility } = useModalState();

  function handleModalClose() {
    closeTaskDataModal();
  }

  return (
    <>
      {ReactDOM.createPortal(
        <Modal
          onClose={handleModalClose}
          visibility={modalsVisibility.taskDetailsModal.visibility}
        >
          <div style={{ minWidth: 700 }}>
            <div className="d-flex mb-2">
              <TaskCardStatus completed={true} />
            </div>
            <h3>Finish project requirements</h3>
            <p className="text-muted">
              <small>Task</small>
            </p>
            <hr />

            <TaskModalData />

            <div className="d-flex justify-content-end">
              <button className="btn btn-danger">Delete</button>
            </div>
          </div>
        </Modal>,
        document.getElementById("task-option-modal") as any
      )}
    </>
  );
};
