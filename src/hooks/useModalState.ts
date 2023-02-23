import React from "react";
import { useRecoilState } from "recoil";
import { IModalsState, modalsState } from "../appState/modalsState";

export const useModalState = () => {
  const [modalsVisibility, setModalsVisibility] = useRecoilState(modalsState);

  function changeTaskListModalVisibility(visible: boolean) {
    const stateToUpdate: IModalsState = { ...modalsVisibility };
    stateToUpdate.taskListDetailsModal = visible;
    setModalsVisibility(stateToUpdate);
  }

  function changeCreateTaskListModalVisibility(visible: boolean) {
    const stateToUpdate: IModalsState = { ...modalsVisibility };
    stateToUpdate.createTaskListModal = visible;
    setModalsVisibility(stateToUpdate);
  }

  function closeTaskDataModal() {
    const stateToUpdate: IModalsState = JSON.parse(
      JSON.stringify(modalsVisibility)
    );
    stateToUpdate.taskDetailsModal.visibility = false;
    setModalsVisibility(stateToUpdate);
  }

  function openTaskDataModal() {
    const stateToUpdate: IModalsState = JSON.parse(
      JSON.stringify(modalsVisibility)
    );
    stateToUpdate.taskDetailsModal.visibility = true;

    setModalsVisibility(stateToUpdate);
  }

  return {
    changeTaskListModalVisibility,
    setModalsVisibility,
    modalsVisibility,
    changeCreateTaskListModalVisibility,
    closeTaskDataModal,
    openTaskDataModal,
  };
};
