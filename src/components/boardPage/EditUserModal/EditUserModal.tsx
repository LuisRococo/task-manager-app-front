import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import "./EditUserModal.scss";
import { Modal } from "../../common/Modal/Modal";
import { useModalState } from "../../../hooks/useModalState";
import { useUserState } from "../../../hooks/useUserState";

interface formData {
  firstName: string;
  lastName: string;
}

export const EditUserModal = () => {
  const { modalsVisibility, changeEditUserModalVisibility } = useModalState();
  const { user, patchUserData } = useUserState();
  const { id, firstName, lastName } = user.userData || {};
  const [formData, setFormData] = useState<formData>({
    firstName: "",
    lastName: "",
  });

  function handleModalClose() {
    changeEditUserModalVisibility(false);
  }

  async function handleEditUserSubmition(e: React.FormEvent) {
    try {
      e.preventDefault();
      if (id) {
        const { firstName, lastName } = formData;
        await patchUserData(id, firstName, lastName);
        changeEditUserModalVisibility(false);
      }
    } catch (error) {
      alert("There was an error, try again later");
    }
    return;
  }

  function handleInputChange(inputName: string, newValue: string) {
    setFormData({ ...formData, [inputName]: newValue });
  }

  useEffect(() => {
    if (firstName && lastName) {
      setFormData({ firstName, lastName });
    }
  }, [user.userData]);

  return (
    <>
      {ReactDOM.createPortal(
        <Modal
          visibility={modalsVisibility.userDataModal}
          onClose={handleModalClose}
        >
          <div style={{ minWidth: 700 }}>
            <h3>Edit user profile</h3>
            <p className="text-muted">
              <small>User</small>
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
