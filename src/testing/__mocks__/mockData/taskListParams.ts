import { ITaskList } from "../../../components/boardPage/TaskList/TaskList";
import {
  taskStateMockData1,
  taskStateMockData2,
  taskStateMockData3,
} from "./taskStateMockData";

export const taskListParamsMockNoTasks: ITaskList = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onClick(taskList) {},
  taskList: {
    id: 1,
    color: "#fff",
    name: "Task List Test",
    priority: 1,
    tasks: [],
  },
};

export const taskListParamsMockWithTasks: ITaskList = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onClick(taskList) {},
  taskList: {
    id: 1,
    color: "#fff",
    name: "Task List Test",
    priority: 1,
    tasks: [taskStateMockData1, taskStateMockData2, taskStateMockData3],
  },
};
