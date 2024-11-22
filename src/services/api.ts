import { HostEntity } from "@/types/hostEntititesType";
import { InternType } from "@/types/internTypes";
import axios from "axios";

type SupervisorDashboardResponse = {
  interns: InternType[];
  hostEntities: HostEntity[];
};

class API {
  axios;

  constructor() {
    this.axios = axios.create({
      baseURL: "https://100.28.23.135:8888",
      // baseURL: "https://localhost:8888"
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

  public async loginSupervisors(data: { email: string; password: string }) {
    const response = await this.axios.post("/supervisors/login", data);
    return response.data;
  }

  public async dashboardIntern() {
    const response = await this.axios.get("/interns/dashboard");
    return response.data;
  }

  public async supervisorDashboard() {
    const response = await this.axios.get<SupervisorDashboardResponse>(
      "/supervisors/dashboard",
    );
    return response.data;
  }
}

export const Api = new API();
