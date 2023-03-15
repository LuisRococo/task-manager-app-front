import React from "react";
import { ITaskListState } from "../../../interfaces/taskList";

interface IChangeTaskListForm {
  onFormSubmition: (e: React.FormEvent) => void;
  selectedTaskList: number;
  onTaskListChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  taskLists: ITaskListState[];
}

export const ChangeTaskListForm: React.FC<IChangeTaskListForm> = ({
  onFormSubmition,
  selectedTaskList,
  onTaskListChange,
  taskLists,
}) => {
  return (
    <>
      <h4>Change Task List</h4>
      <form onSubmit={onFormSubmition}>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">Task List</label>
                <select
                  data-testid="task-modal-list-input"
                  className="form-select"
                  value={selectedTaskList}
                  onChange={onTaskListChange}
                >
                  {taskLists.map((taskList) => (
                    <option key={taskList.id} value={taskList.id}>
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
            data-testid="task-moda-update-list-btn"
            type="submit"
            className="btn btn-primary"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
};
