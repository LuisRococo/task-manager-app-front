import { ITaskListState } from "../../../interfaces/taskList";
import {
  taskBeforePatchMock,
  taskStateMockData2,
  taskStateMockData3,
} from "./taskStateMockData";

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

export const TaskListStatesWithTasks: ITaskListState[] = [
  {
    id: 1,
    color: "#ffffff",
    name: "Task List 1",
    priority: 1,
    tasks: [taskBeforePatchMock],
  },
  {
    id: 2,
    color: "#ffffff",
    name: "Task List 2",
    priority: 2,
    tasks: [taskStateMockData2, taskStateMockData3],
  },
];
