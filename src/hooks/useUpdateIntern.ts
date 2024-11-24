import { Api } from "@/services/api";
import { InternType } from "@/types/internTypes";
import { useMutation, UseMutationOptions } from "react-query";

type UseUpdateInternOptions = Omit<
  UseMutationOptions<unknown, unknown, InternType>,
  "mutationFn" | "mutationKey"
>;

export const useUpdateIntern = (options?: UseUpdateInternOptions) => {
  return useMutation({
    mutationKey: ["updateIntern"],
    mutationFn: async (data: InternType) => {
      const response = await Api.updateIntern(data);
      return response;
    },
    ...options,
  });
};
