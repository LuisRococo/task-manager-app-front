import { atom } from "recoil";

export interface IModalsState {
  taskListDetailsModal: boolean;
  createTaskListModal: boolean;
}

export const modalsState = atom<IModalsState>({
  key: "modals-visibility-state",
  default: { taskListDetailsModal: false, createTaskListModal: false },
});
