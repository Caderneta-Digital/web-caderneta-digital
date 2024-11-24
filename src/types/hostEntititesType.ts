import { InternType } from "./internTypes";

export type HostEntityType = {
  id: string;
  name: string;
  address: string;
  activityField: string;
  email: string;
  nif: string;
  password: string;
  phone: string;
  responsibleName: string;
  createdAt: string;
  interns: InternType[];
};
