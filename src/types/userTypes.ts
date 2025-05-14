import { InternAdvisorType } from "./internAdvisorTypes";
import { CourseType, InternType } from "./internTypes";
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
  course?: CourseType;
}

export type UsersType = InternType | InternAdvisorType | SupervisorType;
