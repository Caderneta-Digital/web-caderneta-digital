import { Api } from "@/services/api";
import { InternAttendenceType } from "@/types/internTypes";
import { useMutation, UseMutationOptions } from "react-query";

type UseUpdateInternAttendenceOptions = Omit<
  UseMutationOptions<unknown, unknown, InternAttendenceType>,
  "mutationFn" | "mutationKey"
>;

export const useUpdateInternAttendence = (
  options?: UseUpdateInternAttendenceOptions,
) => {
  return useMutation({
    mutationKey: ["updateInternAttendence"],
    mutationFn: async (data: InternAttendenceType) => {
      const response = await Api.updateInternAttendence(data);
      return response;
    },
    ...options,
  });
};
