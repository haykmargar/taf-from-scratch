import axios, { AxiosInstance } from 'axios';
import { config, apiEndpoint } from '@Config/config-data';
import { LaunchResponse, LaunchCreateResponse } from '@Models/launch.model';

const reqInstance: AxiosInstance = axios.create({
    headers: config.headers
});

class ApiLaunchService {
    public async getAllLaunches(projectName: string) {
        const endpoint = `${apiEndpoint}/${projectName}/launch`;
        try {
            return await reqInstance.get<LaunchResponse>(endpoint);

        } catch (error) {
            return error.response;
        }
    }

    public async createLaunch(projectName: string, launchData: object) {
        const endpoint = `${apiEndpoint}/${projectName}/launch`;
        try {
            return await reqInstance.post<LaunchCreateResponse>(endpoint, launchData);
        } catch (error) {
            return error.response;
        }
    }

    public async deleteLaunchById(projectName: string, launchId: number) {
        const endpoint = `${apiEndpoint}/${projectName}/launch/${launchId}`;
        try {
            return await reqInstance.delete(endpoint);
        } catch (error) {
            return error.response;
        }
    }

    public async getAllRunningLaunches(projectName: string) {
        const endpoint = `${apiEndpoint}/${projectName}/launch?filter.eq.status=IN_PROGRESS`;
        try {
            return await reqInstance.get(endpoint);
        } catch (error) {
            return error.response;
        }
    }

    public async finishRunningLaunchById(projectName: string, launchId: string, launchData: object) {
        const endpoint = `${apiEndpoint}/${projectName}/launch/${launchId}/finish`;
        try {
            return await reqInstance.put(endpoint, launchData);
        } catch (error) {
            return error.response;
        }
    }
}

export default new ApiLaunchService();
