import { InternAdvisorType } from "./internAdvisorTypes";
import { InternType } from "./internTypes";
import { SupervisorType } from "./supervisorTypes";

export enum UserTypeEnum {
  INTERN = "intern",
  SUPERVISOR = "supervisor",
  INTERN_ADVISOR = "internAdvisor",
}

export enum SupervisorTypeEnum {
  NORMAL = "normal",
  COURSE_DIRECTOR = "course_director",
}

export interface UserType {
  id: string;
  email: string;
  name: string;
  type: UserTypeEnum;
  supervisorType?: SupervisorTypeEnum;
}

export type UsersType = InternType | InternAdvisorType | SupervisorType;
