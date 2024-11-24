"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InternAttendenceType } from "@/types/internTypes";
import { AttendenceTableRow } from "./components/attendenceTableRow";

type PropsType = {
  attendences: InternAttendenceType[];
};

export const InternAdvisorDashboardAttendences: React.FC<PropsType> = ({
  attendences,
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
              <TableHead>Manhã</TableHead>
              <TableHead>Tarde</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendences.map((attendence) => (
              <AttendenceTableRow key={attendence.id} attendence={attendence} />
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
