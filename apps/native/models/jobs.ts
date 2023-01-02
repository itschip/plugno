import { createModel } from "@rematch/core";
import { TPlugJobResponse } from "@typings/jobs";
import { RootModel } from ".";

export const jobs = createModel<RootModel>()({
  state: {
    plugs: null as TPlugJobResponse[] | null,
    activeJob: null,
  },
  reducers: {
    populatePlugJobs: (state, payload: TPlugJobResponse[] | null) => {
      return {
        ...state,
        plugs: payload,
      };
    },
  },
});
