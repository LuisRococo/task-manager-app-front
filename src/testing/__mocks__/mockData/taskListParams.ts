import { ITaskList } from "../../../components/boardPage/TaskList/TaskList";

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
