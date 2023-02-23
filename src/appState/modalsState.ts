import { atom } from "recoil";
import { ITask } from "../interfaces/task";

export interface ITaskDetailModal {
  visibility: boolean;
  taskData: undefined | ITask;
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
