import { taskListState } from "../appState/taskListState";
import { useRecoilState } from "recoil";
import { ITaskListState } from "../interfaces/taskList";
import { ITask } from "../interfaces/task";
import { useTaskListState } from "./useTaskListState";
import { createTaskQuery } from "../queries/taskQueries";
import { client } from "../components/wrappers/ApolloConfig";

export const useTaskState = () => {
  const [, setTaskLists] = useRecoilState(taskListState);
  const { taskLists, findTaskList, setSingleTaskList } = useTaskListState();

  function orderTasks() {
    setTaskLists((prev) => {
      let editedLists: ITaskListState[] = JSON.parse(JSON.stringify(prev));
      editedLists = editedLists.map((list) => {
        list.tasks.sort((a, b) => {
          return a.order - b.order;
        });
        return list;
      });

      return editedLists;
    });
  }

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

  function deleteTask(idTask: number) {
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

  function moveTaskToOtherList(taskId: number, targetListId: number) {
    const taskListsEdited: ITaskListState[] = JSON.parse(
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

    setTaskLists(taskListsEdited);
  }

  function changeTaskOrder(idMovedTask: number, idTargetTask: number) {
    const movedTask: ITask = JSON.parse(JSON.stringify(findTask(idMovedTask)));
    const targetTask: ITask = JSON.parse(
      JSON.stringify(findTask(idTargetTask))
    );

    if (!movedTask || !targetTask) return;
    if (movedTask.taskList.id !== targetTask.taskList.id) return;

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
    orderTasks();
  }

  return {
    orderTasks,
    findTask,
    deleteTask,
    createTask,
    moveTaskToOtherList,
    changeTaskOrder,
  };
};
