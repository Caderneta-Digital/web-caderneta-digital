import { InternType } from "@/types/internTypes";

export class InternBusinessLogic {
  public static shouldConcludeProfile(intern: InternType): boolean {
    return !intern.nif || !intern.address || !intern.postalCode || !intern.phone || !intern.dadName || !intern.motherName
  }
}