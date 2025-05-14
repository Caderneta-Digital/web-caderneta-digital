import { TableCell, TableRow } from "@/components/ui/table";
import { InternStatusEnum, InternType } from "@/types/internTypes";
import { AssignHostEntityToInternModal } from "../assignHostEntityToInternModal";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type PropsType = {
  intern: InternType;
};

export const InternTableRow: React.FC<PropsType> = ({ intern }) => {
  const router = useRouter();
  const goInternDetails = (internId: string) => {
    router.push(`/dashboard/internInfo/details/${internId}`);
  };
  return (
    <TableRow key={intern.id}>
      <TableCell>{intern.name}</TableCell>
      <TableCell>{intern.email}</TableCell>
      <TableCell>{intern.course.name}</TableCell>
      <TableCell>{intern.remainingHours}</TableCell>
      <TableCell>
        {intern.hostEntity ? (
          <h1>{intern.hostEntity.name}</h1>
        ) : (
          <AssignHostEntityToInternModal intern={intern} />
        )}
      </TableCell>
      <TableCell>
        {intern.status === InternStatusEnum.ACTIVE ? "Ativo" : "Não Ativo"}
      </TableCell>
      <TableCell>
        <Button
          variant="outline"
          onClick={() => goInternDetails(intern.id)}
          >
          Mais Informações
        </Button>      
      </TableCell>
    </TableRow>
  );
};
