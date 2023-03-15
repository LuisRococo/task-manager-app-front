import React, { useEffect, useState } from "react";
import { Modal } from "../../common/Modal/Modal";
import { TaskListModalData } from "./TaskListModalData";
import { ITaskListState } from "../../../interfaces/taskList";
import { useModalState } from "../../../hooks/useModalState";
import { useTaskListState } from "../../../hooks/useTaskListState";

interface TaskListModal {
  taskList?: ITaskListState;
}

interface IFormValues {
  name: string;
  priority: string;
  color: string;
}

export const TaskListModal: React.FC<TaskListModal> = ({ taskList }) => {
  const [formValues, setFormValues] = useState<IFormValues>({
    name: "",
    priority: "",
    color: "",
  });
  const { changeTaskListModalVisibility, modalsVisibility } = useModalState();
  const { findTaskList, setSingleTaskList, deleteTaskList } =
    useTaskListState();

  function handleOnCloseModal() {
    changeTaskListModalVisibility(false);
  }

  function handleDeleteBtnClick() {
    try {
      if (taskList) {
        deleteTaskList(taskList.id);
        changeTaskListModalVisibility(false);
      }
    } catch (error) {
      alert("There was an error, try later");
    }
  }

  function handleFormSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();
      if (!taskList) return;

      let taskListToUpdate = findTaskList(taskList.id);

      if (!taskListToUpdate) return;

      taskListToUpdate = { ...taskListToUpdate };

      taskListToUpdate.name = formValues.name;
      taskListToUpdate.priority = +formValues.priority;
      taskListToUpdate.color = formValues.color;

      setSingleTaskList(taskListToUpdate);
      changeTaskListModalVisibility(false);
    } catch (error) {
      alert("There was an error, try again later");
    }
  }

  function handleInputChange(inputName: string, newValue: string) {
    setFormValues({ ...formValues, [inputName]: newValue });
  }

  useEffect(() => {
    if (taskList) {
      setFormValues({
        name: taskList.name,
        priority: taskList.priority.toString(),
        color: taskList.color,
      });
    }
  }, [taskList]);

  if (!modalsVisibility.taskListDetailsModal || !taskList) return null;

  return (
    <Modal visibility={true} onClose={handleOnCloseModal}>
      <div style={{ minWidth: 700 }} data-testid="task-list-modal-container">
        <h3>{taskList.name}</h3>
        <p className="text-muted">
          <small>Task List</small>
        </p>
        <hr />

        <TaskListModalData
          color={taskList.color}
          name={taskList.name}
          priority={taskList.priority}
        />

        <hr />

        <form onSubmit={handleFormSubmit} className="mb-3">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    data-testid="task-list-modal-name-input"
                    type="text"
                    className="form-control"
                    value={formValues.name}
                    onChange={(e) => {
                      handleInputChange("name", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Priority</label>
                  <input
                    data-testid="task-list-modal-priority-input"
                    type="number"
                    className="form-control"
                    value={formValues.priority}
                    onChange={(e) => {
                      handleInputChange("priority", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Color</label>
                  <input
                    data-testid="task-list-modal-color-input"
                    type="color"
                    className="form-control"
                    value={formValues.color}
                    onChange={(e) => {
                      handleInputChange("color", e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button
                data-testid="task-list-modal-delete-btn"
                type="button"
                className="btn btn-danger me-2"
                onClick={handleDeleteBtnClick}
              >
                Delete
              </button>
              <button
                data-testid="task-list-modal-update-btn"
                type="submit"
                className="btn btn-primary"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};
