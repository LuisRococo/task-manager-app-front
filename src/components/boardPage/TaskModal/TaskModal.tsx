import React from "react";
import * as ReactDOM from "react-dom";
import { Modal } from "../../common/Modal/Modal";
import { useModalState } from "../../../hooks/useModalState";
import { TaskCardStatus } from "../TaskCardStatus/TaskCardStatus";
import "./TaskModal.scss";
import { TaskModalData } from "./TaskModalData";
import { TaskStatusEnum } from "../../../interfaces/task";

export const TaskModal = () => {
  const { closeTaskDataModal, modalsVisibility } = useModalState();
  const { taskData } = modalsVisibility.taskDetailsModal;

  function handleModalClose() {
    closeTaskDataModal();
  }

  if (!taskData) return null;

  return (
    <>
      {ReactDOM.createPortal(
        <Modal
          onClose={handleModalClose}
          visibility={modalsVisibility.taskDetailsModal.visibility}
        >
          <div style={{ minWidth: 700 }}>
            <div className="d-flex mb-2">
              <TaskCardStatus
                completed={taskData?.status === TaskStatusEnum.complete}
              />
            </div>
            <h3>{taskData?.title}</h3>
            <p className="text-muted">
              <small>Task</small>
            </p>
            <hr />

            <TaskModalData taskData={taskData} />

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
