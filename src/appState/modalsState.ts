import { atom } from "recoil";
import { ITask } from "../interfaces/task";

export interface ITaskDetailModal {
  visibility: boolean;
  taskData: undefined | ITask;
}
export interface IModalsState {
  taskListDetailsModal: boolean;
  createTaskListModal: boolean;
  createTaskModal: boolean;
  taskDetailsModal: ITaskDetailModal;
  boardEditModal: boolean;
}

export const modalsState = atom<IModalsState>({
  key: "modals-visibility-state",
  default: {
    taskListDetailsModal: false,
    createTaskListModal: false,
    createTaskModal: false,
    taskDetailsModal: { visibility: false, taskData: undefined },
    boardEditModal: false,
  },
});
