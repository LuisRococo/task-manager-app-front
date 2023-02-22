import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import "./CreateTaskListModal.scss";
import { Modal } from "../../common/Modal/Modal";
import { useModalState } from "../../../hooks/useModalState";

export const CreateTaskListModal = () => {
  const { changeCreateTaskListModalVisibility, modalsVisibility } =
    useModalState();

  function handleModalClose() {
    changeCreateTaskListModalVisibility(false);
  }

  return (
    <>
      {ReactDOM.createPortal(
        <Modal
          visibility={modalsVisibility.createTaskListModal}
          onClose={handleModalClose}
        >
          <div style={{ minWidth: 700 }}>
            <h3>Create Task List</h3>
            <p className="text-muted">
              <small>Task List</small>
            </p>
            <hr />

            <form className="mb-3">
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Priority</label>
                      <input type="number" className="form-control" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Color</label>
                      <input type="color" className="form-control" />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>,
        document.getElementById("create-task-list-modal") as any
      )}
    </>
  );
};
