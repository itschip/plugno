import { Models } from "@rematch/core";
import { conversations } from "./conversations";
import { jobs } from "./jobs";
import { auth } from "./user";

export interface RootModel extends Models<RootModel> {
  auth: typeof auth;
  jobs: typeof jobs;
  conversations: typeof conversations;
}

export const models: RootModel = { auth, jobs, conversations };
