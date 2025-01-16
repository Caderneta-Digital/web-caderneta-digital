"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InternWeeklySummaryType } from "@/types/internTypes";
import { WeeklySummaryTableRow } from "./components/weeklySummaryTableRow";

type PropsType = {
  weeklySummaries: InternWeeklySummaryType[];
};

export const InternAdvisorDashboardWeeklySummaries: React.FC<PropsType> = ({
  weeklySummaries,
}) => {
  return (
    <div>
      <Card>
        <div className="flex justify-between p-3">
          <h1 className="text-xl">Registos Semanais</h1>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Registo</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weeklySummaries.map((weeklySummary) => (
              <WeeklySummaryTableRow
                key={weeklySummary.id}
                weeklySummary={weeklySummary}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
