import { Models } from "@rematch/core";
import { jobs } from "./jobs";
import { auth } from "./user";

export interface RootModel extends Models<RootModel> {
  auth: typeof auth;
  jobs: typeof jobs;
}

export const models: RootModel = { auth, jobs };
