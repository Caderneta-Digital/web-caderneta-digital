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
