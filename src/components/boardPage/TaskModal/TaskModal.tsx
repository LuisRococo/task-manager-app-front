import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { Modal } from "../../common/Modal/Modal";
import { useModalState } from "../../../hooks/useModalState";
import { TaskCardStatus } from "../TaskCardStatus/TaskCardStatus";
import "./TaskModal.scss";
import { TaskModalData } from "./TaskModalData";
import { useTaskListState } from "../../../hooks/useTaskListState";
import { ChangeTaskListForm } from "./ChangeTaskListForm";
import { useTaskState } from "../../../hooks/useTaskState";
import { ITask } from "../../../interfaces/task";

interface IFormData {
  title: string;
  points: number;
  description: string;
}

export const TaskModal = () => {
  const { closeTaskDataModal, modalsVisibility } = useModalState();
  const { taskData } = modalsVisibility.taskDetailsModal;
  const { taskLists } = useTaskListState();
  const { deleteTask, moveTaskToOtherList, editTaskData } = useTaskState();
  const [selectedTaskList, setSelectedTaskList] = useState(0);
  const [editFormData, setEditFormData] = useState<IFormData>({
    description: "",
    points: 0,
    title: "",
  });

  function handleModalClose() {
    resetFormData();
    closeTaskDataModal();
  }

  async function handleDeleteBtnClick() {
    try {
      if (!taskData) return;
      deleteTask(taskData.id);
      resetFormData();
      closeTaskDataModal();
    } catch (error) {
      alert("There was an error, try later");
    }
  }

  function handleTaskListChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedTaskList(+e.target.value);
  }

  function handleChangeListFormSubmition(e: React.FormEvent) {
    e.preventDefault();
    if (taskData) {
      moveTaskToOtherList(taskData.id, +selectedTaskList);
      resetFormData();
      closeTaskDataModal();
    }
  }

  function handleInputChange(fieldName: string, newValue: string) {
    setEditFormData({ ...editFormData, [fieldName]: newValue });
  }

  function resetFormData() {
    setEditFormData({
      description: "",
      points: 0,
      title: "",
    });
  }

  async function handleEditFormSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();
      const editedTask: ITask = JSON.parse(JSON.stringify(taskData));
      editedTask.title = editFormData.title;
      editedTask.points = +editFormData.points;
      editedTask.description = editFormData.description;
      editTaskData(editedTask);
      resetFormData();
      closeTaskDataModal();
    } catch (error) {
      alert("There was an error, try later");
    }
  }

  useEffect(() => {
    if (taskData) {
      setSelectedTaskList(taskData.taskList.id);
      setEditFormData({
        description: taskData.description,
        points: taskData.points,
        title: taskData.title,
      });
    }
  }, [taskData]);

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
              <TaskCardStatus completed={taskData?.completed === true} />
            </div>
            <h3>{taskData?.title}</h3>
            <p className="text-muted">
              <small>Task</small>
            </p>
            <hr />

            <TaskModalData taskData={taskData} />

            <hr />
            <ChangeTaskListForm
              onFormSubmition={handleChangeListFormSubmition}
              onTaskListChange={handleTaskListChange}
              selectedTaskList={selectedTaskList}
              taskLists={taskLists}
            />

            <hr />
            <h4>Edit Data</h4>
            <form className="mb-3" onSubmit={handleEditFormSubmit}>
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editFormData.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Points</label>
                      <input
                        type="number"
                        className="form-control"
                        value={editFormData.points}
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
                        value={editFormData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={handleDeleteBtnClick}
                  >
                    Delete
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Edit Data
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>,
        document.getElementById("task-option-modal") as any
      )}
    </>
  );
};
