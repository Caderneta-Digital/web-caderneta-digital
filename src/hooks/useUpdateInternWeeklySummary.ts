import { Api } from "@/services/api";
import { InternWeeklySummaryType } from "@/types/internTypes";
import { useMutation, UseMutationOptions } from "react-query";

type UseUpdateInternWeeklySummaryOptions = Omit<
  UseMutationOptions<unknown, unknown, InternWeeklySummaryType>,
  "mutationFn" | "mutationKey"
>;

export const useUpdateInternWeeklySummary = (
  options?: UseUpdateInternWeeklySummaryOptions,
) => {
  return useMutation({
    mutationKey: ["updateInternWeeklySummary"],
    mutationFn: async (data: InternWeeklySummaryType) => {
      const response = await Api.updateInternWeeklySummary(data);
      return response;
    },
    ...options,
  });
};
