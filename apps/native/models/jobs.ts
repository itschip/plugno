import { createModel } from "@rematch/core";
import { TActiveJob, TPlugJobResponse } from "@typings/jobs";
import { RootModel } from ".";

export const jobs = createModel<RootModel>()({
  state: {
    plugs: null as TPlugJobResponse[] | null,
    activeJob: {} as TActiveJob,
  },
  reducers: {
    populatePlugJobs: (state, payload: TPlugJobResponse[] | null) => {
      return {
        ...state,
        plugs: payload,
      };
    },
    populateActiveJob: (state, payload: TActiveJob) => {
      return {
        ...state,
        activeJob: {
          ...payload,
          tracking_status: JSON.parse(
            payload.requestStatus
          ) as TActiveJob["tracking_status"],
        },
      };
    },
    updateTrackingStatus: (state, payload: string) => {
      console.log("current payload:", payload);

      return {
        ...state,
        activeJob: {
          ...state.activeJob,
          status: payload,
          tracking_status: {
            ...state.activeJob.tracking_status,
          },
        },
      };
    },
  },
});
