import { ITask } from "../../../interfaces/task";

export const taskCardParamsMock: ITask = {
  id: 1,
  assignedQuantity: 10,
  completed: true,
  creatorName: "Admin",
  description: "",
  order: 1,
  points: 1,
  taskList: { id: 1, name: "test" },
  title: "task test title",
};
