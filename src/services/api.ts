import { InternType } from '@/types/internTypes';
import axios from 'axios';

class API {
    axios;

    constructor() {
        this.axios = axios.create({
            baseURL: 'http://100.28.23.135:8888'
            // baseURL: "http://localhost:8888"
        })
    }

    public setBearerToken(token: string): void {
        this.axios.defaults.headers.Authorization = `Bearer ${token}`;
    }

    public async loginIntern(data: { email: string, password: string }) {
        const response = await this.axios.post<{ token: string; intern: InternType }>('/interns/login', data)
        return response.data
    }

    public async updateIntern(data: Partial<InternType>) {
        const response = await this.axios.patch<InternType>(`/interns/${data.id}`, data)
        return response.data;
    }

    public async loginSupervisors(data: { email: string, password: string }) {
        const response = await this.axios.post('/supervisors/login', data)
        return response.data
    }

    public async dashboardIntern() {
        const response = await this.axios.get('/interns/dashboard')
        return response
    }
}

export const Api = new API();