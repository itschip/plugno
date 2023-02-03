import { createModel } from "@rematch/core";
import { TConversation } from "@typings/conversations";
import { RootModel } from ".";

export const conversations = createModel<RootModel>()({
  state: {
    conversations: [] as TConversation[],
  },
  reducers: {
    populateConversations(state, payload: TConversation[]) {
      console.log("populateConversations", payload);
      return {
        ...state,
        conversations: payload,
      };
    },
  },
});
