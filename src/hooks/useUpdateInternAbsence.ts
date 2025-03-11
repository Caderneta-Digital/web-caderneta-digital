import { Api } from "@/services/api";
import { InternAbsencesType } from "@/types/internTypes";
import { useMutation, UseMutationOptions } from "react-query";

type UseUpdateInternAbsencesOptions = Omit<
  UseMutationOptions<unknown, unknown, InternAbsencesType>,
  "mutationFn" | "mutationKey"
>;

export const useUpdateInternAbsences = (
  options?: UseUpdateInternAbsencesOptions,
) => {
  return useMutation({
    mutationKey: ["updateInternAbsences"],
    mutationFn: async (data: InternAbsencesType) => {
      const response = await Api.updateInternAbsences(data);
      return response;
    },
    ...options,
  });
};
