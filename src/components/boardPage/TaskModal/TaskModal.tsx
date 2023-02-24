import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { Modal } from "../../common/Modal/Modal";
import { useModalState } from "../../../hooks/useModalState";
import { TaskCardStatus } from "../TaskCardStatus/TaskCardStatus";
import "./TaskModal.scss";
import { TaskModalData } from "./TaskModalData";
import { TaskStatusEnum } from "../../../interfaces/task";
import { useTaskListState } from "../../../hooks/useTaskListState";

export const TaskModal = () => {
  const { closeTaskDataModal, modalsVisibility } = useModalState();
  const { taskData } = modalsVisibility.taskDetailsModal;
  const { deleteTask, moveTaskToOtherList, taskLists } = useTaskListState();
  const [selectedTaskList, setSelectedTaskList] = useState(0);

  function handleModalClose() {
    closeTaskDataModal();
  }

  function handleDeleteBtnClick() {
    if (!taskData) return;
    deleteTask(taskData.taskId);
    closeTaskDataModal();
  }

  function handleTaskListChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedTaskList(+e.target.value);
  }

  function handleFormSubmition(e: React.FormEvent) {
    e.preventDefault();
    if (taskData) {
      moveTaskToOtherList(taskData.taskId, +selectedTaskList);
      closeTaskDataModal();
    }
  }

  useEffect(() => {
    if (taskData) {
      setSelectedTaskList(taskData.taskList.listId);
    }
  }, []);

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

            <hr />
            <h4>Change Task List</h4>
            <form onSubmit={handleFormSubmition}>
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Task List</label>
                      <select
                        className="form-select"
                        value={selectedTaskList}
                        onChange={handleTaskListChange}
                      >
                        {taskLists.map((taskList) => (
                          <option key={taskList.listId} value={taskList.listId}>
                            {taskList.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  onClick={handleDeleteBtnClick}
                  className="btn btn-danger me-1"
                >
                  Delete
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </Modal>,
        document.getElementById("task-option-modal") as any
      )}
    </>
  );
};
