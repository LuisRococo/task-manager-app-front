import { taskListState } from "../appState/taskListState";
import { useRecoilState } from "recoil";
import { ICreateTaskList, ITaskListState } from "../interfaces/taskList";
import { taskLists as taskListsPlaceholder } from "../placeholders/taskListsPlaceholders";
import { randomInteger } from "../utils/utils";
import { ITask, TaskStatusEnum } from "../interfaces/task";

export const useTaskListState = () => {
  const [taskLists, setTaskLists] = useRecoilState(taskListState);

  /* eslint-disable */
  async function fetchTaskLists(boardId: number) {
    const newTaskLists: ITaskListState[] = taskListsPlaceholder;
    setTaskLists(newTaskLists);
    orderTaskListsByPriority();
  }
  /* eslint-enable */

  function setSingleTaskList(taskList: ITaskListState) {
    const elementIndex = taskLists.findIndex(
      (item) => item.listId === taskList.listId
    );

    if (elementIndex === -1) return;

    const updatedTaskLists = [...taskLists];
    updatedTaskLists[elementIndex] = taskList;

    setTaskLists(updatedTaskLists);
    orderTaskListsByPriority();
  }

  function deleteTaskList(taskListId: number) {
    const updatedTaskLists: ITaskListState[] = taskLists.filter((taskList) => {
      return taskList.listId !== taskListId;
    });
    setTaskLists(updatedTaskLists);
  }

  function findTaskList(taskListId: number) {
    for (let index = 0; index < taskLists.length; index++) {
      const taskList = taskLists[index];
      if (taskList.listId === taskListId) {
        return taskList;
      }
    }
    return null;
  }

  function createTaskLists(taskListData: ICreateTaskList) {
    const newTaskList: ITaskListState = {
      ...taskListData,
      listId: randomInteger(1, 1000),
      tasks: [],
    };

    const newTaskListsState: ITaskListState[] = [...taskLists, newTaskList];
    setTaskLists(newTaskListsState);
    orderTaskListsByPriority();
  }

  function orderTaskListsByPriority() {
    setTaskLists((prev) => {
      const newList = [...prev];
      return newList.sort((a, b) => {
        return a.priority - b.priority;
      });
    });
  }

  function findTask(idTask: number): ITask | null {
    let foundTask: ITask | null = null;
    taskLists.forEach((list) => {
      list.tasks.forEach((task) => {
        if (task.taskId === idTask) {
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
        (task) => task.taskId === idTask
      );
      if (taskToDeleteIndex !== -1) {
        taskList.tasks.splice(taskToDeleteIndex, 1);
      }
    }

    setTaskLists(taskListsEdited);
  }

  function createTask(
    idTaskList: number,
    description: string,
    points: number,
    title: string
  ) {
    const taskListObjective = findTaskList(idTaskList);
    if (!taskListObjective) return;

    const newTask: ITask = {
      creatorName: "Root Root",
      assignedQuantity: 0,
      description,
      points,
      status: TaskStatusEnum.incomplete,
      title,
      taskId: randomInteger(0, 1000),
      taskList: {
        listId: taskListObjective.listId,
        title: taskListObjective.name,
      },
    };

    const taskListsEdited: ITaskListState[] = JSON.parse(
      JSON.stringify(taskLists)
    );

    for (let index = 0; index < taskListsEdited.length; index++) {
      const taskListToEdit = taskListsEdited[index];
      if (taskListToEdit.listId === idTaskList) {
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
        return task.taskId !== taskId;
      });
    }

    const taskToEdit: ITask | null = JSON.parse(
      JSON.stringify(findTask(taskId))
    );

    if (!taskToEdit) return;
    taskToEdit.taskList = {
      listId: targetTaskList.listId,
      title: targetTaskList.name,
    };

    for (let index = 0; index < taskListsEdited.length; index++) {
      const taskListToEdit = taskListsEdited[index];
      if (taskListToEdit.listId === targetListId) {
        taskListToEdit.tasks.push(taskToEdit);
      }
    }

    setTaskLists(taskListsEdited);
  }

  function exchangeListPosition(listId1: number, listId2: number) {
    const taskListsEdited: ITaskListState[] = JSON.parse(
      JSON.stringify(taskLists)
    );

    const list1 = findTaskList(listId1);
    const list2 = findTaskList(listId2);

    if (!list1 || !list2) return;

    for (let index = 0; index < taskListsEdited.length; index++) {
      const taskList = taskListsEdited[index];
      if (taskList.listId === listId1) {
        taskList.priority = list2.priority;
      }
      if (taskList.listId === listId2) {
        taskList.priority = list1.priority;
      }
    }

    setTaskLists(taskListsEdited);
    orderTaskListsByPriority();
  }

  return {
    taskLists,
    fetchTaskLists,
    setTaskLists,
    setSingleTaskList,
    findTaskList,
    deleteTaskList,
    createTaskLists,
    deleteTask,
    findTask,
    createTask,
    moveTaskToOtherList,
    exchangeListPosition,
  };
};
