import { atom } from "recoil";

export interface IUserState {
  userData?: { firstName: string; lastName: string; email: string; id: number };
}

export const userState = atom<IUserState>({
  key: "user-state",
  default: { userData: undefined },
});
