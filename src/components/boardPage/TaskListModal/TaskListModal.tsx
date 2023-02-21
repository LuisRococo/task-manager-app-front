import React, { useEffect, useState } from "react";
import { Modal } from "../../common/Modal/Modal";
import { ITaskList } from "../../../interfaces/taskList";
import { TaskListModalData } from "./TaskListModalData";

interface TaskListModal {
  taskList?: ITaskList;
  visibility: boolean;
  onModalClose: () => void;
  onTaskListUpdate: (
    taskListId: number,
    name: string,
    priority: number,
    color: string
  ) => void;
}

interface IFormValues {
  name: string;
  priority: string;
  color: string;
}

export const TaskListModal: React.FC<TaskListModal> = ({
  taskList,
  visibility,
  onModalClose,
  onTaskListUpdate,
}) => {
  const [formValues, setFormValues] = useState<IFormValues>({
    name: "",
    priority: "",
    color: "",
  });

  function handleOnCloseModal() {
    onModalClose();
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    onTaskListUpdate(
      taskList!.listId,
      formValues.name,
      +formValues.priority,
      formValues.color
    );
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

  if (!visibility || !taskList) return null;

  return (
    <Modal visibility={true} onClose={handleOnCloseModal}>
      <div style={{ minWidth: 700 }}>
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
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};
