import { HostEntityType } from "@/types/hostEntititesType";
import { InternAdvisorType } from "@/types/internAdvisorTypes";
import {
  InternAttendenceType,
  InternType,
  InternWeeklySummaryType,
} from "@/types/internTypes";
import axios from "axios";

type SupervisorDashboardResponseType = {
  // Vem mais coisa porem nao é util para a rota em questão
  interns: InternType[];
  hostEntities: HostEntityType[];
};

type InternAdvisorDashboardResponseType = {
  // Vem mais coisa porem nao é util para a rota em questão
  interns: InternType[];
};

export type CreateInternRequestType = {
  name: string;
  email: string;
};

export type CreateInternAdvisorRequestType = {
  name: string;
  email: string;
  phone: string | null;
  hostEntityId: string;
};

export type CreateHostEntityRequestType = {
  name: string;
  email: string;
  phone: string;
  nif: string;
  responsibleName: string;
  activityField: string;
  address: string;
};

class API {
  axios;

  constructor() {
    this.axios = axios.create({
      baseURL: "/api",
      // baseURL: "http://localhost:8888"
    });

    this.axios.interceptors.request.use(
      (config) => {
        const token = this.axios.defaults.headers.Authorization;
        if (token) {
          config.headers.Authorization = token;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  public setBearerToken(token: string): void {
    this.axios.defaults.headers.Authorization = `Bearer ${token}`;
  }

  public async loginIntern(data: { email: string; password: string }) {
    const response = await this.axios.post<{
      token: string;
      intern: InternType;
    }>("/interns/login", data);
    return response.data;
  }

  public async updateIntern(data: Partial<InternType>) {
    const response = await this.axios.patch<InternType>(
      `/interns/${data.id}`,
      data,
    );
    return response.data;
  }

  public async createIntern(data: CreateInternRequestType) {
    const response = await this.axios.post("/interns", data);
    return response.data;
  }

  public async createInternAdvisor(data: CreateInternAdvisorRequestType) {
    const response = await this.axios.post("/internAdvisors", data);
    return response.data;
  }

  public async createHostEntity(data: CreateInternRequestType) {
    const response = await this.axios.post("/hostEntities", data);
    return response.data;
  }

  public async loginInternAdvisor(data: { email: string; password: string }) {
    const response = await this.axios.post<{
      token: string;
      internAdvisor: InternAdvisorType;
    }>("/internAdvisors/login", data);
    return response.data;
  }

  public async loginSupervisors(data: { email: string; password: string }) {
    const response = await this.axios.post("/supervisors/login", data);
    return response.data;
  }

  public async dashboardIntern() {
    const response = await this.axios.get<InternType>("/interns/dashboard");
    return response.data;
  }

  public async supervisorDashboard() {
    const response = await this.axios.get<SupervisorDashboardResponseType>(
      "/supervisors/dashboard",
    );
    return response.data;
  }

  public async internAdvisorDashboard() {
    const response = await this.axios.get<InternAdvisorDashboardResponseType>(
      "/internAdvisors/dashboard",
    );
    return response.data;
  }

  public async findInternById(internId: string) {
    const response = await this.axios.get<InternType>(`/interns/${internId}`);
    return response.data;
  }

  public async findAllHostEntities() {
    const response = await this.axios.get<HostEntityType[]>(`/hostEntities`);
    return response.data;
  }

  public async findHostEntityById(hostEntityId: string) {
    const response = await this.axios.get<HostEntityType>(
      `/hostEntities/${hostEntityId}`,
    );
    return response.data;
  }

  public async updateInternAttendence(data: InternAttendenceType) {
    const response = await this.axios.patch<InternAttendenceType>(
      `/interns/${data.internId}/attendences/${data.id}`,
      data,
    );
    return response.data;
  }

  public async updateInternWeeklySummary(data: InternWeeklySummaryType) {
    const response = await this.axios.patch<InternWeeklySummaryType>(
      `/interns/${data.internId}/weeklySummaries/${data.id}`,
      data,
    );
    return response.data;
  }

  public async requestPasswordReset() {
    const response = await this.axios.post(
      `/users/requestPasswordReset`,
    );
    return response.data;
  }
}

export const Api = new API();
