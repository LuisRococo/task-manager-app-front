import { ITaskListState } from "../../../interfaces/taskList";

export const taskListStateMockArray: ITaskListState[] = [
  { id: 1, color: "#fff", name: "task list test", priority: 1, tasks: [] },
  { id: 2, color: "#fff", name: "task list test", priority: 1, tasks: [] },
  { id: 3, color: "#fff", name: "task list test", priority: 1, tasks: [] },
];

export const taskListBeforePatchMock: ITaskListState = {
  id: 1,
  color: "#ffffff",
  name: "Test task list 1",
  priority: 1,
  tasks: [],
};

export const taskListAfterPatchMock: ITaskListState = {
  id: 1,
  color: "#000000",
  name: "Test task list 1 Patched",
  priority: 2,
  tasks: [],
};
