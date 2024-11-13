export enum UserTypeEnum {
  INTERN = "intern",
  SUPERVISOR = "supervisor"
}

export interface UserType {
  id: string
  email: string
  name: string
  type: UserTypeEnum
}