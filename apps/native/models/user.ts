import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { AuthState, User } from "../typings/user";

export const auth = createModel<RootModel>()({
  state: {
    role: "user",
    user: null,
  } as AuthState,
  reducers: {
    populate: (state, payload: User | null) => {
      return {
        ...state,
        user: payload,
      };
    },
    changeRole: (state, isPlugEnabled: boolean) => {
      return {
        ...state,
        role: isPlugEnabled ? "plug" : "user",
      };
    },
  },
});
