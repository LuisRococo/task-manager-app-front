import { taskListState } from "../appState/taskListState";
import { useRecoilState } from "recoil";
import { ICreateTaskList, ITaskListState } from "../interfaces/taskList";
import { taskLists as taskListsPlaceholder } from "../placeholders/taskListsPlaceholders";
import { randomInteger } from "../utils/utils";

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

  function findTask(idTask: number) {
    taskLists.forEach((list) => {
      list.tasks.forEach((task) => {
        if (task.taskId === idTask) {
          return task;
        }
      });
    });
    return null;
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
  };
};
