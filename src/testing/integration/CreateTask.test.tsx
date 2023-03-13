import { cleanup, render } from "@testing-library/react";
import { RecoilRoot, useRecoilState } from "recoil";
import { taskListState } from "../../appState/taskListState";
import { useEffect } from "react";
import { randomInteger } from "../../utils/utils";
import { ITask } from "../../interfaces/task";
import { ITaskListState } from "../../interfaces/taskList";
import { CreateTaskModal } from "../../components/boardPage/CreateTaskModal/CreateTaskModal";
import { useModalState } from "../../hooks/useModalState";

const root = document.createElement("div");
root.id = "create-task-modal";
document.body.appendChild(root);

afterEach(cleanup);

jest.mock("../../hooks/useTaskState", () => ({
  useTaskState: () => {
    const [taskLists, setTaskLists] = useRecoilState(taskListState);

    const createTask = (
      idTaskList: number,
      description: string,
      points: number,
      title: string
    ) => {
      const newTask: ITask = {
        id: randomInteger(1, 10000),
        assignedQuantity: 1,
        completed: false,
        creatorName: "Test name creator",
        description,
        order: 1,
        points,
        taskList: { id: idTaskList, name: "test task list 1" },
        title,
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
    };

    return { createTask };
  },
}));

jest.mock("../../hooks/useTaskListState", () => ({
  useTaskListState: () => {
    const [taskLists, setTaskLists] = useRecoilState(taskListState);
    const { changeCreateTaskModalVisibility } = useModalState();

    const addInitialTaskList = () => {
      setTaskLists([
        ...taskLists,
        {
          id: randomInteger(1, 10000),
          color: "#fff",
          name: "test task list 1",
          priority: 1,
          tasks: [],
        },
      ]);
    };

    const openCreateTaskModal = () => {
      changeCreateTaskModalVisibility(true);
    };

    useEffect(() => {
      addInitialTaskList();
      openCreateTaskModal();
    }, []);

    return { taskLists };
  },
}));

it("Create task modal should be visible", () => {
  const { getByTestId } = render(
    <>
      <RecoilRoot>
        <CreateTaskModal />
      </RecoilRoot>
    </>
  );

  const modalContainer = getByTestId("create-task-modal-cont");

  expect(modalContainer).toBeDefined();
});
