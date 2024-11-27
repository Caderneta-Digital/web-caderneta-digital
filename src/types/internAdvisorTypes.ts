import { InternType } from "./internTypes";

export type InternAdvisorType = {
  id: string;
  hostEntityId: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt: string;
  interns?: InternType[]
};
