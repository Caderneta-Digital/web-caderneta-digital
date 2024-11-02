import axios from 'axios';

class API {
    axios;

    constructor () {
        this.axios = axios.create({
            baseURL: 'http://100.28.23.135:8888'
        })
    }

    public async loginIntern(data: {email: string, password: string}) {
        const response = await this.axios.post('/interns/login', data)
        return response.data
    }

    public async loginSupervisors(data: {email: string, password: string}) {
        const response = await this.axios.post('/supervisors/login', data)
        return response.data
    }

}

export const Api = new API();

