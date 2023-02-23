import { atom } from "recoil";
import { IBoardState } from "../interfaces/board";

export const boardState = atom<IBoardState | undefined>({
  key: "board-page-state",
  default: undefined,
});
