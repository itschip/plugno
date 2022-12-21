import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { AuthState, User } from "../typings/user";

export const auth = createModel<RootModel>()({
  state: {
    user: null,
  } as AuthState,
  reducers: {
    populate: (state, payload: User) => {
      return {
        ...state,
        user: payload,
      };
    },
  },
});
