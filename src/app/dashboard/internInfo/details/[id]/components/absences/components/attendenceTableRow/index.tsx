import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import { useUpdateInternAbsences } from "@/hooks/useUpdateInternAbsence";
import { InternAbsencesType } from "@/types/internTypes";
import { UserTypeEnum } from "@/types/userTypes";
import { format } from "date-fns";
import { useQueryClient } from "react-query";

type PropsType = {
  absence: InternAbsencesType;
};

export const AbsenceTableRow: React.FC<PropsType> = ({ absence }) => {
  const queryClient = useQueryClient();
  const { user } = useAuth()
  console.log(user)

  const { mutateAsync: updateInternAbsence, isLoading } =
  useUpdateInternAbsences({
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          "findInternById",
          absence.internId,
        ]);
      },
    });

  const handleApproveAbsence = async () => {
    if (user?.type === UserTypeEnum.INTERN_ADVISOR ) {  
      await updateInternAbsence({
        ...absence,
        isConfirmedByHostEntity: true,
      });
    }
    else {
      await updateInternAbsence({
        ...absence,
        isConfirmedBySupervisor: true,
      });
    }  
  };

  return (
    <TableRow>
      <TableCell>{format(absence.date, "dd/MM/yyyy")}</TableCell>
      <TableCell>{absence.reason}</TableCell>
      <TableCell>
        {absence.isConfirmedByHostEntity ? (
          <h1>Aprovado</h1>
        ) : (
          <Button
            variant="outline"
            onClick={handleApproveAbsence}
            isLoading={isLoading && user?.type === UserTypeEnum.INTERN_ADVISOR}
            disabled={user?.type !== UserTypeEnum.INTERN_ADVISOR}
          >
            Aprovar
          </Button>
        )}
      </TableCell>
      <TableCell>
        {absence.isConfirmedBySupervisor ? (
          <h1>Aprovado</h1>
        ) : (
          <Button
            variant="outline"
            onClick={handleApproveAbsence}
            isLoading={isLoading && user?.type === UserTypeEnum.SUPERVISOR}
            disabled={user?.type !== UserTypeEnum.SUPERVISOR}
          >
            Aprovar
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};
