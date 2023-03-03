import { taskListState } from "../appState/taskListState";
import { useRecoilState } from "recoil";
import { ITaskListState } from "../interfaces/taskList";
import { ITask } from "../interfaces/task";
import { useTaskListState } from "./useTaskListState";
import {
  createTaskQuery,
  deleteTaskQuery,
  patchTaskQuery,
} from "../queries/taskQueries";
import { client } from "../components/wrappers/ApolloConfig";

export const useTaskState = () => {
  const [, setTaskLists] = useRecoilState(taskListState);
  const { taskLists, findTaskList, setSingleTaskList, getTasksOrdered } =
    useTaskListState();

  function findTask(idTask: number): ITask | null {
    let foundTask: ITask | null = null;
    taskLists.forEach((list) => {
      list.tasks.forEach((task) => {
        if (task.id === idTask) {
          foundTask = task;
        }
      });
    });
    return foundTask;
  }

  async function deleteTask(idTask: number) {
    await client.mutate({
      mutation: deleteTaskQuery,
      variables: {
        id: idTask,
      },
    });
    const taskListsEdited: ITaskListState[] = JSON.parse(
      JSON.stringify(taskLists)
    );

    for (let i = 0; i < taskListsEdited.length; i++) {
      const taskList = taskListsEdited[i];
      const taskToDeleteIndex = taskList.tasks.findIndex(
        (task) => task.id === idTask
      );
      if (taskToDeleteIndex !== -1) {
        taskList.tasks.splice(taskToDeleteIndex, 1);
      }
    }

    setTaskLists(taskListsEdited);
  }

  async function createTask(
    idTaskList: number,
    description: string,
    points: number,
    title: string
  ) {
    const taskListObjective = findTaskList(idTaskList);
    if (!taskListObjective) return;

    const querieResult = await client.mutate({
      mutation: createTaskQuery,
      variables: {
        title,
        taskListId: idTaskList,
        points,
        description,
      },
    });

    const newTask: ITask = {
      ...querieResult.data.createTask,
    };

    const taskListsEdited: ITaskListState[] = JSON.parse(
      JSON.stringify(taskLists)
    );

    for (let index = 0; index < taskListsEdited.length; index++) {
      const taskListToEdit = taskListsEdited[index];
      if (taskListToEdit.id === idTaskList) {
        taskListToEdit.tasks.push(newTask);
      }
    }

    setTaskLists(taskListsEdited);
  }

  async function moveTaskToOtherList(taskId: number, targetListId: number) {
    const queryResult = await client.mutate({
      mutation: patchTaskQuery,
      variables: {
        id: taskId,
        taskListId: targetListId,
        title: null,
        description: null,
        points: null,
        order: null,
        completed: null,
      },
    });

    let taskListsEdited: ITaskListState[] = JSON.parse(
      JSON.stringify(taskLists)
    );

    const targetTaskList = findTaskList(targetListId);
    if (!targetTaskList) return;

    for (let index = 0; index < taskListsEdited.length; index++) {
      const taskList = taskListsEdited[index];
      taskList.tasks = taskList.tasks.filter((task) => {
        return task.id !== taskId;
      });
    }

    const taskToEdit: ITask | null = JSON.parse(
      JSON.stringify(findTask(taskId))
    );

    if (!taskToEdit) return;
    taskToEdit.order = queryResult.data.order;
    taskToEdit.taskList = {
      id: targetTaskList.id,
      name: targetTaskList.name,
    };

    for (let index = 0; index < taskListsEdited.length; index++) {
      const taskListToEdit = taskListsEdited[index];
      if (taskListToEdit.id === targetListId) {
        taskListToEdit.tasks.push(taskToEdit);
      }
    }

    taskListsEdited = getTasksOrdered(taskListsEdited);
    setTaskLists(taskListsEdited);
  }

  async function changeTaskOrder(idMovedTask: number, idTargetTask: number) {
    const movedTask: ITask = JSON.parse(JSON.stringify(findTask(idMovedTask)));
    const targetTask: ITask = JSON.parse(
      JSON.stringify(findTask(idTargetTask))
    );

    if (!movedTask || !targetTask) return;
    if (movedTask.taskList.id !== targetTask.taskList.id) return;

    await client.mutate({
      mutation: patchTaskQuery,
      variables: {
        id: movedTask.id,
        order: targetTask.order,
        taskListId: null,
        title: null,
        description: null,
        points: null,
        completed: null,
      },
    });
    await client.mutate({
      mutation: patchTaskQuery,
      variables: {
        id: targetTask.id,
        order: movedTask.order,
        taskListId: null,
        title: null,
        description: null,
        points: null,
        completed: null,
      },
    });

    const targetTaskOrder = targetTask.order;
    targetTask.order = movedTask.order;
    movedTask.order = targetTaskOrder;

    const taskListEdited: ITaskListState = JSON.parse(
      JSON.stringify(findTaskList(targetTask.taskList.id))
    );

    for (let index = 0; index < taskListEdited.tasks.length; index++) {
      const task = taskListEdited.tasks[index];

      if (task.id === targetTask.id) {
        taskListEdited.tasks.splice(index, 1, targetTask);
      }
      if (task.id === movedTask.id) {
        taskListEdited.tasks.splice(index, 1, movedTask);
      }
    }

    setSingleTaskList(taskListEdited);
  }

  async function editTaskData(newTask: ITask) {
    await client.mutate({
      mutation: patchTaskQuery,
      variables: {
        id: newTask.id,
        title: newTask.title,
        description: newTask.description,
        points: newTask.points,
        taskListId: newTask.taskList.id,
        order: newTask.order,
        completed: newTask.completed,
      },
    });

    const editedTaskList: ITaskListState = JSON.parse(
      JSON.stringify(findTaskList(newTask.taskList.id))
    );
    if (!editedTaskList) return;

    const indexOfTask = editedTaskList.tasks.findIndex(
      (task) => task.id === newTask.id
    );
    if (indexOfTask === -1) return;

    editedTaskList.tasks[indexOfTask] = newTask;

    setSingleTaskList(editedTaskList);
  }

  return {
    findTask,
    deleteTask,
    createTask,
    moveTaskToOtherList,
    changeTaskOrder,
    editTaskData,
  };
};
