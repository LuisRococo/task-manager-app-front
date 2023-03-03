import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { Modal } from "../../common/Modal/Modal";
import { useModalState } from "../../../hooks/useModalState";
import { TaskCardStatus } from "../TaskCardStatus/TaskCardStatus";
import "./TaskModal.scss";
import { TaskModalData } from "./TaskModalData";
import { useTaskListState } from "../../../hooks/useTaskListState";
import { ChangeTaskListForm } from "./ChangeTaskListForm";

export const TaskModal = () => {
  const { closeTaskDataModal, modalsVisibility } = useModalState();
  const { taskData } = modalsVisibility.taskDetailsModal;
  const { deleteTask, moveTaskToOtherList, taskLists } = useTaskListState();
  const [selectedTaskList, setSelectedTaskList] = useState(0);

  function handleModalClose() {
    closeTaskDataModal();
  }

  //TODO add delete btn
  function handleDeleteBtnClick() {
    if (!taskData) return;
    deleteTask(taskData.id);
    closeTaskDataModal();
  }

  function handleTaskListChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedTaskList(+e.target.value);
  }

  function handleFormSubmition(e: React.FormEvent) {
    e.preventDefault();
    if (taskData) {
      moveTaskToOtherList(taskData.id, +selectedTaskList);
      closeTaskDataModal();
    }
  }

  useEffect(() => {
    if (taskData) {
      setSelectedTaskList(taskData.taskList.id);
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
              onFormSubmition={handleFormSubmition}
              onTaskListChange={handleTaskListChange}
              selectedTaskList={selectedTaskList}
              taskLists={taskLists}
            />
          </div>
        </Modal>,
        document.getElementById("task-option-modal") as any
      )}
    </>
  );
};
