import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import "./CreateTaskModa.scss";
import { Modal } from "../../common/Modal/Modal";
import { useModalState } from "../../../hooks/useModalState";
import { useTaskListState } from "../../../hooks/useTaskListState";

interface IFormData {
  title: string;
  points: number;
  description: string;
  idTaskList: number;
}

export const CreateTaskModal = () => {
  const { changeCreateTaskModalVisibility, modalsVisibility } = useModalState();
  const { taskLists, createTask } = useTaskListState();
  const [formData, setFormData] = useState<IFormData>({
    description: "",
    points: 0,
    title: "",
    idTaskList: 0,
  });

  function resetFormData() {
    setFormData({
      description: "",
      points: 0,
      title: "",
      idTaskList: 0,
    });
  }

  function handleModalClose() {
    changeCreateTaskModalVisibility(false);
  }

  function handleInputChange(inputName: string, value: string) {
    setFormData({ ...formData, [inputName]: value });
  }

  function handleCreateSubmition() {
    try {
      createTask(
        +formData.idTaskList,
        formData.description,
        +formData.points,
        formData.title
      );
      resetFormData();
      changeCreateTaskModalVisibility(false);
    } catch (error) {
      alert("There was an error, try later");
    }
    return false;
  }

  useEffect(() => {
    if (taskLists.length > 0) {
      setFormData({ ...formData, idTaskList: taskLists[0].id });
    }
  }, [taskLists]);

  return (
    <>
      {ReactDOM.createPortal(
        <Modal
          onClose={handleModalClose}
          visibility={modalsVisibility.createTaskModal}
        >
          <div style={{ minWidth: 700 }}>
            <div>
              <h3>Create Task</h3>
              <p className="text-muted">
                <small>Task</small>
              </p>
              <hr />

              <form className="mb-3" onSubmit={handleCreateSubmition}>
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
                            handleInputChange("title", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">Task List</label>
                        <select
                          className="form-select"
                          value={formData.idTaskList}
                          onChange={(e) => {
                            handleInputChange("idTaskList", e.target.value);
                          }}
                        >
                          {taskLists.map((taskList) => (
                            <option key={taskList.id} value={taskList.id}>
                              {taskList.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">Points</label>
                        <input
                          type="number"
                          className="form-control"
                          value={formData.points}
                          onChange={(e) =>
                            handleInputChange("points", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          value={formData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                        ></textarea>
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
          </div>
        </Modal>,
        document.getElementById("create-task-modal") as any
      )}
    </>
  );
};
