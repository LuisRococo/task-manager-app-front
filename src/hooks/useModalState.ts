import { useRecoilState } from "recoil";
import { IModalsState, modalsState } from "../appState/modalsState";
import { ITask } from "../interfaces/task";

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

  function changeCreateTaskModalVisibility(visible: boolean) {
    const stateToUpdate: IModalsState = { ...modalsVisibility };
    stateToUpdate.createTaskModal = visible;
    setModalsVisibility(stateToUpdate);
  }

  function changeEditBoardModalVisibility(visible: boolean) {
    const stateToUpdate: IModalsState = { ...modalsVisibility };
    stateToUpdate.boardEditModal = visible;
    setModalsVisibility(stateToUpdate);
  }

  function changeEditUserModalVisibility(visible: boolean) {
    const stateToUpdate: IModalsState = { ...modalsVisibility };
    stateToUpdate.userDataModal = visible;
    setModalsVisibility(stateToUpdate);
  }

  function closeTaskDataModal() {
    const stateToUpdate: IModalsState = JSON.parse(
      JSON.stringify(modalsVisibility)
    );
    stateToUpdate.taskDetailsModal.visibility = false;
    setModalsVisibility(stateToUpdate);
  }

  function openTaskDataModal(taskData: ITask) {
    const stateToUpdate: IModalsState = JSON.parse(
      JSON.stringify(modalsVisibility)
    );
    stateToUpdate.taskDetailsModal = {
      visibility: true,
      taskData,
    };

    setModalsVisibility(stateToUpdate);
  }

  return {
    changeTaskListModalVisibility,
    setModalsVisibility,
    modalsVisibility,
    changeCreateTaskListModalVisibility,
    closeTaskDataModal,
    openTaskDataModal,
    changeCreateTaskModalVisibility,
    changeEditBoardModalVisibility,
    changeEditUserModalVisibility,
  };
};
