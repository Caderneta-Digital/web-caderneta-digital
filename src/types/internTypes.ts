import { HostEntity } from "./hostEntititesType";

export interface InternType {
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
  hostEntity?: HostEntity;
}
