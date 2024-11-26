import { TableCell, TableRow } from "@/components/ui/table";
import { InternStatusEnum, InternType } from "@/types/internTypes";
import { InfoInternsModal } from "../infoInternsModal";
import { AssignHostEntityToInternModal } from "../assignHostEntityToInternModal";

type PropsType = {
  intern: InternType;
};

export const InternTableRow: React.FC<PropsType> = ({ intern }) => {
  return (
    <TableRow key={intern.id}>
      <TableCell>{intern.name}</TableCell>
      <TableCell>{intern.email}</TableCell>
      <TableCell>{intern.course}</TableCell>
      <TableCell>?</TableCell>
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
        <InfoInternsModal intern={intern}></InfoInternsModal>
      </TableCell>
    </TableRow>
  );
};
