import { atom } from "recoil";
import { ITaskListState } from "../interfaces/taskList";

export const taskListState = atom<ITaskListState[]>({
  key: "board-task-list-state",
  default: [],
});
