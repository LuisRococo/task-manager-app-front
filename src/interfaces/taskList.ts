import { ITask } from "./task";

export interface ITaskListState {
  listId: number;
  name: string;
  color: string;
  priority: number;
  tasks: ITask[];
}

export interface ICreateTaskList {
  name: string;
  color: string;
  priority: number;
}
