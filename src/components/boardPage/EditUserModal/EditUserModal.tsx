import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import "./EditUserModal.scss";
import { Modal } from "../../common/Modal/Modal";
import { useModalState } from "../../../hooks/useModalState";

interface formData {
  firstName: string;
  lastName: string;
}

export const EditUserModal = () => {
  const { modalsVisibility, changeEditUserModalVisibility } = useModalState();
  const [formData, setFormData] = useState<formData>({
    firstName: "",
    lastName: "",
  });

  function handleModalClose() {
    changeEditUserModalVisibility(false);
  }

  function handleEditUserSubmition() {}

  function handleInputChange(inputName: string, newValue: string) {
    setFormData({ ...formData, [inputName]: newValue });
  }

  return (
    <>
      {ReactDOM.createPortal(
        <Modal
          visibility={modalsVisibility.userDataModal}
          onClose={handleModalClose}
        >
          <div style={{ minWidth: 700 }}>
            <h3>Create Task List</h3>
            <p className="text-muted">
              <small>Task List</small>
            </p>
            <hr />

            <form className="mb-3" onSubmit={handleEditUserSubmition}>
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">First name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Edit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>,
        document.getElementById("edit-user-modal") as any
      )}
    </>
  );
};
