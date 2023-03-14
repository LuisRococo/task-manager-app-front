import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import "./CreateTaskListModal.scss";
import { Modal } from "../../common/Modal/Modal";
import { useModalState } from "../../../hooks/useModalState";
import { useTaskListState } from "../../../hooks/useTaskListState";

interface IFormValues {
  name: string;
  priority: string;
  color: string;
}

export const CreateTaskListModal = () => {
  const [formValues, setFormValues] = useState<IFormValues>({
    name: "",
    priority: "",
    color: "#000000",
  });
  const { createTaskLists } = useTaskListState();

  const { changeCreateTaskListModalVisibility, modalsVisibility } =
    useModalState();

  function handleModalClose() {
    changeCreateTaskListModalVisibility(false);
  }

  function handleCreateSubmition(e: React.FormEvent) {
    try {
      e.preventDefault();
      createTaskLists({ ...formValues, priority: +formValues.priority });
      changeCreateTaskListModalVisibility(false);
    } catch (error) {
      alert("There was an error, try later");
    }
  }

  function handleInputChange(inputName: string, newValue: string) {
    setFormValues({ ...formValues, [inputName]: newValue });
  }

  return (
    <>
      {ReactDOM.createPortal(
        <Modal
          visibility={modalsVisibility.createTaskListModal}
          onClose={handleModalClose}
        >
          <div
            data-testid="create-task-modal-container"
            style={{ minWidth: 700 }}
          >
            <h3>Create Task List</h3>
            <p className="text-muted">
              <small>Task List</small>
            </p>
            <hr />

            <form className="mb-3" onSubmit={handleCreateSubmition}>
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        data-testid="create-list-modal-input-title"
                        type="text"
                        className="form-control"
                        value={formValues.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Priority</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formValues.priority}
                        onChange={(e) =>
                          handleInputChange("priority", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Color</label>
                      <input
                        type="color"
                        className="form-control"
                        value={formValues.color}
                        onChange={(e) =>
                          handleInputChange("color", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    data-testid="task-list-modal-submit-btn"
                    type="submit"
                    className="btn btn-primary"
                  >
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
