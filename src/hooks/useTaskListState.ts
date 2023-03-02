import { taskListState } from "../appState/taskListState";
import { useRecoilState } from "recoil";
import { ICreateTaskList, ITaskListState } from "../interfaces/taskList";
import { randomInteger } from "../utils/utils";
import { ITask } from "../interfaces/task";
import { client } from "../components/wrappers/ApolloConfig";
import { useBoardState } from "./useBoardState";
import {
  createTaskListQuerie,
  deleteTaskListQuery,
  getTaskListsByBoardQuery,
} from "../queries/taskListsQueries";

export const useTaskListState = () => {
  const [taskLists, setTaskLists] = useRecoilState(taskListState);
  const { board } = useBoardState();

  /* eslint-disable */
  async function fetchTaskLists(boardId: number) {
    const queryResult = await client.query({
      query: getTaskListsByBoardQuery,
      variables: { id: boardId },
    });

    setTaskLists(queryResult.data.boardTaskLists);
    orderTaskListsByPriority();
  }
  /* eslint-enable */

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

  function setSingleTaskList(taskList: ITaskListState) {
    const elementIndex = taskLists.findIndex((item) => item.id === taskList.id);

    if (elementIndex === -1) return;

    const updatedTaskLists = [...taskLists];
    updatedTaskLists[elementIndex] = taskList;

    setTaskLists(updatedTaskLists);
    orderTaskListsByPriority();
  }

  async function deleteTaskList(taskListId: number) {
    await client.mutate({
      mutation: deleteTaskListQuery,
      variables: { id: taskListId },
    });

    const updatedTaskLists: ITaskListState[] = taskLists.filter((taskList) => {
      return taskList.id !== taskListId;
    });
    setTaskLists(updatedTaskLists);
  }

  function findTaskList(taskListId: number) {
    for (let index = 0; index < taskLists.length; index++) {
      const taskList = taskLists[index];
      if (taskList.id === taskListId) {
        return taskList;
      }
    }
    return null;
  }

  async function createTaskLists(taskListData: ICreateTaskList) {
    const mutationResult = await client.mutate({
      mutation: createTaskListQuerie,
      variables: {
        name: taskListData.name,
        color: taskListData.color,
        boardId: board?.id,
        priority: taskListData.priority,
      },
    });

    const newTaskListsState: ITaskListState[] = [
      ...taskLists,
      mutationResult.data.createTaskList,
    ];
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
      order: taskListObjective.tasks.length + 1,
      assignedQuantity: 0,
      description,
      points,
      completed: false,
      title,
      id: randomInteger(0, 1000),
      taskList: {
        id: taskListObjective.id,
        name: taskListObjective.name,
      },
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

  function exchangeListPosition(listId1: number, listId2: number) {
    const taskListsEdited: ITaskListState[] = JSON.parse(
      JSON.stringify(taskLists)
    );

    const list1 = findTaskList(listId1);
    const list2 = findTaskList(listId2);

    if (!list1 || !list2) return;

    for (let index = 0; index < taskListsEdited.length; index++) {
      const taskList = taskListsEdited[index];
      if (taskList.id === listId1) {
        taskList.priority = list2.priority;
      }
      if (taskList.id === listId2) {
        taskList.priority = list1.priority;
      }
    }

    setTaskLists(taskListsEdited);
    orderTaskListsByPriority();
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
    changeTaskOrder,
  };
};
