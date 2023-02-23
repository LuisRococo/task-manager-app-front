import { atom } from "recoil";

export interface ITaskDetailModal {
  visibility: boolean;
  taskData: undefined;
}
export interface IModalsState {
  taskListDetailsModal: boolean;
  createTaskListModal: boolean;
  taskDetailsModal: ITaskDetailModal;
}

export const modalsState = atom<IModalsState>({
  key: "modals-visibility-state",
  default: {
    taskListDetailsModal: false,
    createTaskListModal: false,
    taskDetailsModal: { visibility: false, taskData: undefined },
  },
});
