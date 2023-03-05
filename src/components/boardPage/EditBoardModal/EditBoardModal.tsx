import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { Modal } from "../../common/Modal/Modal";
import { useModalState } from "../../../hooks/useModalState";
import { useBoardState } from "../../../hooks/useBoardState";
import { IBoardState } from "../../../interfaces/board";

export const EditBoardModal = () => {
  const { changeEditBoardModalVisibility, modalsVisibility } = useModalState();
  const { board, changeBoardData } = useBoardState();
  const [formData, setFormData] = useState({ title: "" });

  function handleModalClose() {
    changeEditBoardModalVisibility(false);
  }

  function handleInputchange(fieldName: string, value: any) {
    setFormData({ ...formData, [fieldName]: value });
  }

  async function handleBoardSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();
      if (!board) return;
      const newBoardData: IBoardState = { ...board, title: formData.title };
      await changeBoardData(newBoardData);
      changeEditBoardModalVisibility(false);
    } catch (error) {
      alert("There was an error, try again later");
    }
    return;
  }

  if (!board) return null;

  useEffect(() => {
    setFormData({ ...formData, title: board.title });
  }, [modalsVisibility]);

  return (
    <>
      {ReactDOM.createPortal(
        <Modal
          visibility={modalsVisibility.boardEditModal}
          onClose={handleModalClose}
        >
          <div style={{ minWidth: 700 }}>
            <h3>{board.title}</h3>
            <p className="text-muted">
              <small>Board</small>
            </p>
            <hr />

            <form className="mb-3" onSubmit={handleBoardSubmit}>
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.title}
                        onChange={(e) =>
                          handleInputchange("title", e.target.value)
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
        document.getElementById("edit-board-modal") as any
      )}
    </>
  );
};
