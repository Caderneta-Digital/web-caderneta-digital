import { SupervisorTypeEnum } from "./userTypes";

export type SupervisorType = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  type: SupervisorTypeEnum;
  createdAt: string;
};
