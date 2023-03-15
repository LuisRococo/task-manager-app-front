import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { createRef, useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { taskListState } from "../../appState/taskListState";
import { MockedProvider } from "@apollo/react-testing";
import { TaskListContainer } from "../../components/boardPage/TaskListContainer/TaskListContainer";
import { ITaskListState } from "../../interfaces/taskList";
import {
  taskListAfterPatchMock,
  taskListBeforePatchMock,
} from "../__mocks__/mockData/taskListStateMock";

afterEach(cleanup);

jest.mock("react-dnd", () => ({
  useDrop: () => [0, createRef()],
  useDrag: () => [{ opacity: 1 }, createRef()],
}));

jest.mock("../../components/wrappers/ApolloConfig", () => ({
  client: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutate: (mutation: any, variables: { taskList: ITaskListState }) => ({}),
  },
}));

const StateInitializer: React.FC = () => {
  const [lists, setLists] = useRecoilState(taskListState);

  function addDefaultTaskList() {
    setLists([...lists, taskListBeforePatchMock]);
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

  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <RecoilRoot>
        <StateInitializer />
        <TaskListContainer />
      </RecoilRoot>
    </MockedProvider>
  );
}

it("Modal should patch a task list", async () => {
  setup();

  await waitFor(() => {
    expect(
      screen.queryByTestId(`task-list-header-${taskListBeforePatchMock.id}`)
    );
  });

  fireEvent.click(
    screen.getByTestId(`task-list-header-${taskListBeforePatchMock.id}`)
  );

  await waitFor(() => {
    expect(screen.queryByTestId("task-list-modal-container")).not.toBeNull();
  });

  fireEvent.change(screen.getByTestId("task-list-modal-name-input"), {
    target: { value: taskListAfterPatchMock.name },
  });

  fireEvent.change(screen.getByTestId("task-list-modal-priority-input"), {
    target: { value: taskListAfterPatchMock.priority },
  });

  fireEvent.change(screen.getByTestId("task-list-modal-color-input"), {
    target: { value: taskListAfterPatchMock.color },
  });

  fireEvent.click(screen.getByTestId("task-list-modal-update-btn"));

  await waitFor(() => {
    expect(screen.queryByTestId("task-list-modal-container")).toBeNull();
  });

  fireEvent.click(
    screen.getByTestId(`task-list-header-${taskListBeforePatchMock.id}`)
  );

  await waitFor(() => {
    expect(screen.queryByTestId("task-list-modal-container")).not.toBeNull();
  });

  expect(screen.getByTestId("list-modal-list-name").textContent).toBe(
    taskListAfterPatchMock.name
  );

  expect(screen.getByTestId("list-modal-list-color").textContent).toBe(
    taskListAfterPatchMock.color
  );

  expect(screen.getByTestId("list-modal-list-priority").textContent).toBe(
    taskListAfterPatchMock.priority.toString()
  );
});
