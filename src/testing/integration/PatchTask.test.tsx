import { createRef, useEffect } from "react";
import { ITask } from "../../interfaces/task";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { taskListState } from "../../appState/taskListState";
import { TaskListStatesWithTasks } from "../__mocks__/mockData/taskListStateMock";
import { MockedProvider } from "@apollo/react-testing";
import { TaskListContainer } from "../../components/boardPage/TaskListContainer/TaskListContainer";
import { TaskModal } from "../../components/boardPage/TaskModal/TaskModal";
import { taskAfterPatchMock } from "../__mocks__/mockData/taskStateMockData";

afterEach(cleanup);

jest.mock("react-dnd", () => ({
  useDrop: () => [0, createRef()],
  useDrag: () => [{ opacity: 1 }, createRef()],
}));

jest.mock("../../components/wrappers/ApolloConfig", () => ({
  client: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutate: (mutation: any, variables: { task: ITask }) => ({}),
  },
}));

const StateInitializer: React.FC = () => {
  const setLists = useSetRecoilState(taskListState);

  function addDefaultTaskLists() {
    setLists(TaskListStatesWithTasks);
  }

  useEffect(() => {
    addDefaultTaskLists();
  }, []);

  return null;
};

function setup() {
  const taskListsOptionModalPortal = document.createElement("div");
  taskListsOptionModalPortal.id = "task-list-option-modal";
  document.body.appendChild(taskListsOptionModalPortal);

  const taskOptionModalPortal = document.createElement("div");
  taskOptionModalPortal.id = "task-option-modal";
  document.body.appendChild(taskOptionModalPortal);

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

it("Modal should be able to patch task data", async () => {
  setup();

  await waitFor(() => {
    expect(screen.queryByTestId("task-card-container-1")).not.toBeNull();
  });

  fireEvent.click(screen.getByTestId("task-card-container-1"));

  await waitFor(() => {
    expect(screen.queryByTestId("task-modal-cont")).not.toBeNull();
  });

  fireEvent.change(screen.getByTestId("task-modal-title-input"), {
    target: { value: taskAfterPatchMock.title },
  });

  fireEvent.change(screen.getByTestId("task-modal-points-input"), {
    target: { value: taskAfterPatchMock.points },
  });

  fireEvent.change(screen.getByTestId("task-modal-description-input"), {
    target: { value: taskAfterPatchMock.description },
  });

  fireEvent.click(screen.getByTestId("task-modal-update-btn"));

  await waitFor(() => {
    expect(screen.queryByTestId("task-modal-cont")).toBeNull();
  });

  fireEvent.click(screen.getByTestId("task-card-container-1"));

  await waitFor(() => {
    expect(screen.queryByTestId("task-modal-cont")).not.toBeNull();
  });

  expect(screen.getByTestId("task-modal-title").textContent).toBe(
    taskAfterPatchMock.title
  );
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  expect(parseInt(screen.getByTestId("task-modal-points").textContent!)).toBe(
    taskAfterPatchMock.points
  );
  expect(screen.getByTestId("task-modal-description").textContent).toBe(
    taskAfterPatchMock.description
  );
});
