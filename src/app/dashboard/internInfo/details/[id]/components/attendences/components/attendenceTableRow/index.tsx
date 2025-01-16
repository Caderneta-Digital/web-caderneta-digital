import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useUpdateInternAttendence } from "@/hooks/useUpdateInternAttendence";
import { InternAttendenceType } from "@/types/internTypes";
import { format } from "date-fns";
import { useQueryClient } from "react-query";

type PropsType = {
  attendence: InternAttendenceType;
};

export const AttendenceTableRow: React.FC<PropsType> = ({ attendence }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateInternAttendence, isLoading } =
    useUpdateInternAttendence({
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          "findInternById",
          attendence.internId,
        ]);
      },
    });

  const handleApproveAttendence = async () => {
    await updateInternAttendence({
      ...attendence,
      isConfirmedByInternAdvisor: true,
    });
  };

  return (
    <TableRow>
      <TableCell>{format(attendence.date, "dd/MM/yyyy")}</TableCell>
      <TableCell>{attendence.morningHours}</TableCell>
      <TableCell>{attendence.afternoonHours}</TableCell>
      <TableCell>
        {attendence.isConfirmedByInternAdvisor ? (
          <h1>Aprovado</h1>
        ) : (
          <Button
            variant="outline"
            onClick={handleApproveAttendence}
            isLoading={isLoading}
          >
            Aprovar
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};
