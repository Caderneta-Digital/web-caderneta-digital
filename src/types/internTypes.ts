import { HostEntityType } from "./hostEntititesType";

export type InternType = {
  id: string;
  name: string;
  password: string;
  email: string;
  phone: string;
  cc: string | null;
  nif: string;
  address: string;
  postalCode: string;
  dadName: string;
  motherName: string;
  obs: string;
  totalHours: number;
  createdAt: string;
  hostEntity?: HostEntityType;
  attendences?: InternAttendenceType[];
  weeklySummaries?: InternWeeklySummaryType[];
};

export type InternAttendenceType = {
  id: string;
  internId: string;
  afternoonHours: number;
  morningHours: number;
  date: string;
  period: "11" | "12";
  isConfirmedByInternAdvisor: boolean;
  createdAt: string;
};

export type InternWeeklySummaryType = {
  id: string;
  internId: string;
  text: string;
  weekEnd: string;
  weekStart: string;
  isConfirmedByInternAdvisor: boolean;
  createdAt: string;
};
