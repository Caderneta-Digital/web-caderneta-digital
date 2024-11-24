import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useUpdateInternWeeklySummary } from "@/hooks/useUpdateInternWeeklySummary";
import { InternWeeklySummaryType } from "@/types/internTypes";
import { format } from "date-fns";
import { useQueryClient } from "react-query";

type PropsType = {
  weeklySummary: InternWeeklySummaryType;
};

export const WeeklySummaryTableRow: React.FC<PropsType> = ({
  weeklySummary,
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateInternWeeklySummary, isLoading } =
    useUpdateInternWeeklySummary({
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          "findInternById",
          weeklySummary.internId,
        ]);
      },
    });

  const handleApproveWeeklySummary = async () => {
    await updateInternWeeklySummary({
      ...weeklySummary,
      isConfirmedByInternAdvisor: true,
    });
  };
  return (
    <TableRow>
      <TableCell>
        {format(weeklySummary.weekStart, "dd/MM/yyyy")} -{" "}
        {format(weeklySummary.weekStart, "dd/MM/yyyy")}
      </TableCell>
      <TableCell>
        <h1>{weeklySummary.text}</h1>
      </TableCell>
      <TableCell>
        {weeklySummary.isConfirmedByInternAdvisor ? (
          <h1>Aprovado</h1>
        ) : (
          <Button
            variant="outline"
            onClick={handleApproveWeeklySummary}
            isLoading={isLoading}
          >
            Aprovar
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};
