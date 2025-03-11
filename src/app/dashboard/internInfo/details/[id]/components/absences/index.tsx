"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InternAbsencesType } from "@/types/internTypes";
import { AbsenceTableRow } from "./components/attendenceTableRow";

type PropsType = {
  absences: InternAbsencesType[];
};

export const InternAdvisorDashboardAbsences: React.FC<PropsType> = ({
  absences,
}) => {
  return (
    <div>
      <Card>
        <div className="flex justify-between p-3">
          <h1 className="text-xl">Registos de Presenças</h1>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Motivo</TableHead>
              <TableHead>Aprovado Tutor</TableHead>
              <TableHead>Aprovado Orientador</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {absences.map((absence) => (
              <AbsenceTableRow key={absence.id} absence={absence} />
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
