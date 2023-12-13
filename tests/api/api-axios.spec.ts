import { test, expect } from '@playwright/test';
import { getExpectedLaunchesData}  from '@Utilities/json-reader';
import apiAxiosLaunchService from '@Services/api-axios-launch.service';
import {
    validProject,
    invalidProject,
    EXPECTED_API_RESPONSES,
    CREATE_NEW_LAUNCH_DATA,
    invalidLaunchId,
    FINISH_LAUNCH_DATA
} from '@Resources/constants';
import { LaunchResponse, LaunchResource } from '@Models/launch.model';
import { AxiosResponse } from 'axios';

let newLaunchDataResponse: AxiosResponse;
let allActualLaunchesResponse: AxiosResponse<LaunchResponse>;
let allActualLaunchesData: LaunchResponse;
let actualLaunchesArray: LaunchResource[];

test.describe('API Validations', async () => {
    test('should list all launches with details by project name', async () => {
        allActualLaunchesResponse = await apiAxiosLaunchService.getAllLaunches(validProject);
        allActualLaunchesData = allActualLaunchesResponse.data;
        actualLaunchesArray = allActualLaunchesData.content
            .sort((a: LaunchResource, b: LaunchResource) => { return b.number - a.number; });
        const expectedLaunchesArray = getExpectedLaunchesData();

        expect(allActualLaunchesResponse.status).toBe(EXPECTED_API_RESPONSES.VALID_RESPONSES.GET.CODE);
        expect(actualLaunchesArray.length).toBe(EXPECTED_API_RESPONSES.NUMBER_OF_LAUNCHES);
        for (let i = 0; i < actualLaunchesArray.length; i++) {
            expect(actualLaunchesArray[i].name).toBe(expectedLaunchesArray[i].name);
            expect(actualLaunchesArray[i].description).toBe(expectedLaunchesArray[i].description);
            expect(actualLaunchesArray[i].hasRetries).toBe(expectedLaunchesArray[i].hasRetries);
            expect(actualLaunchesArray[i].lastModified).toBe(expectedLaunchesArray[i].lastModified);
            expect(actualLaunchesArray[i].uuid).toBe(expectedLaunchesArray[i].uuid);
            expect(actualLaunchesArray[i].owner).toBe(expectedLaunchesArray[i].owner);
            expect(actualLaunchesArray[i].status).toBe(expectedLaunchesArray[i].status);
        }
    });

    test('should not list any launch by invalid project name', async () => {
        const allActualLaunchesResponse = await apiAxiosLaunchService.getAllLaunches(invalidProject);

        expect(allActualLaunchesResponse.status).toBe(EXPECTED_API_RESPONSES.ERRORS.GET.CODE);
        expect(allActualLaunchesResponse.data.message).toBe(EXPECTED_API_RESPONSES.ERRORS.GET.MESSAGE);
    });

    test('should create new launch by valid project name and launch data', async () => {
        newLaunchDataResponse = await apiAxiosLaunchService.createLaunch(validProject, CREATE_NEW_LAUNCH_DATA);

        expect(newLaunchDataResponse.status).toBe(EXPECTED_API_RESPONSES.VALID_RESPONSES.POST.CODE);
    });

    test('should not create new launch by invalid project name and launch data', async () => {
        const newLaunchData = await apiAxiosLaunchService.createLaunch(invalidProject, CREATE_NEW_LAUNCH_DATA);

        expect(newLaunchData.status).toBe(EXPECTED_API_RESPONSES.ERRORS.POST.CODE);
        expect(newLaunchData.data.message).toBe(EXPECTED_API_RESPONSES.ERRORS.POST.MESSAGE);
    });

    test('should finish launch by valid launch id', async () => {
        const response = await apiAxiosLaunchService.finishRunningLaunchById(validProject, newLaunchDataResponse.data.id, FINISH_LAUNCH_DATA);

        expect(response.status).toBe(EXPECTED_API_RESPONSES.VALID_RESPONSES.PUT.CODE);
    });

    test('should not finish launch by invalid launch id', async () => {
        const response = await apiAxiosLaunchService.finishRunningLaunchById(validProject, invalidLaunchId.toString(), FINISH_LAUNCH_DATA);

        expect(response.status).toBe(EXPECTED_API_RESPONSES.ERRORS.PUT.CODE);
        expect(response.data.message).toBe(`Launch '${invalidLaunchId}' not found. Did you use correct Launch ID?`);
    });

    test('should delete a launch by valid launch id', async () => {
        allActualLaunchesResponse = await apiAxiosLaunchService.getAllLaunches(validProject);
        actualLaunchesArray = allActualLaunchesResponse.data.content;
        const launchIdThatShouldBeDeleted = actualLaunchesArray
            .find(launch => launch.uuid === newLaunchDataResponse.data.id);
        const deleteResponse = await apiAxiosLaunchService.deleteLaunchById(validProject, launchIdThatShouldBeDeleted.id);

        expect(deleteResponse.status).toBe(EXPECTED_API_RESPONSES.VALID_RESPONSES.DELETE.CODE);
    });

    test('should not delete a launch by valid launch id', async () => {
        const deleteResponse = await apiAxiosLaunchService.deleteLaunchById(validProject, invalidLaunchId);

        expect(deleteResponse.status).toBe(EXPECTED_API_RESPONSES.ERRORS.DELETE.CODE);
        expect(deleteResponse.data.message).toBe(EXPECTED_API_RESPONSES.ERRORS.DELETE.MESSAGE);
    });
});
