export enum UserTypeEnum {
  INTERN = "intern",
  SUPERVISOR = "supervisor",
  INTERN_ADVISOR = "internAdvisor",
}

export interface UserType {
  id: string;
  email: string;
  name: string;
  type: UserTypeEnum;
}

