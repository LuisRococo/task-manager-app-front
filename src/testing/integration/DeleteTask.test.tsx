import { MockedProvider } from "@apollo/react-testing";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { createRef, useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { TaskListContainer } from "../../components/boardPage/TaskListContainer/TaskListContainer";
import { taskListState } from "../../appState/taskListState";
import { TaskModal } from "../../components/boardPage/TaskModal/TaskModal";

afterEach(cleanup);

jest.mock("react-dnd", () => ({
  useDrop: () => [0, createRef()],
  useDrag: () => [{ opacity: 1 }, createRef()],
}));

jest.mock("../../components/wrappers/ApolloConfig", () => ({
  client: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutate: (param: any) => ({}),
  },
}));

const StateInitializer: React.FC = () => {
  const [lists, setLists] = useRecoilState(taskListState);

  function addDefaultTaskList() {
    setLists([
      ...lists,
      {
        id: 1,
        color: "#fff",
        name: "Test Task List 1",
        priority: 1,
        tasks: [
          {
            id: 1,
            title: "Test Task 1",
            assignedQuantity: 1,
            completed: false,
            creatorName: "",
            description: "",
            order: 1,
            points: 1,
            taskList: { id: 1, name: "" },
          },
        ],
      },
    ]);
  }

  useEffect(() => {
    addDefaultTaskList();
  }, []);

  return null;
};

function setup() {
  const taskListsOptionModalPortal = document.createElement("div");
  taskListsOptionModalPortal.id = "task-list-option-modal";
  document.body.appendChild(taskListsOptionModalPortal);

  const taskModalPortal = document.createElement("div");
  taskModalPortal.id = "task-option-modal";
  document.body.appendChild(taskModalPortal);

  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <RecoilRoot>
        <TaskModal />
        <StateInitializer />
        <TaskListContainer />
      </RecoilRoot>
    </MockedProvider>
  );
}

it("TaskModal should be opened on task click", async () => {
  setup();

  expect(screen.queryByTestId("task-modal-cont")).toBeNull();

  fireEvent.click(screen.getByTestId("task-card-container-1"));

  await waitFor(() => {
    expect(screen.queryByTestId("task-modal-cont")).not.toBeNull();
  });
});

it("TaskModal should be able to delete a Task", async () => {
  setup();

  fireEvent.click(screen.getByTestId("task-card-container-1"));

  await waitFor(() => {
    expect(screen.queryByTestId("task-modal-cont")).not.toBeNull();
  });

  fireEvent.click(screen.getByTestId("task-modal-delete-btn"));

  await waitFor(() => {
    expect(screen.queryByTestId("task-card-container-1")).toBeNull();
  });
});
