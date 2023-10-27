import * as dotenv from 'dotenv';

dotenv.config();

export const env = process.env.ENV;
export const URL = process.env.URL;
export const CREDENTIALS = {
    VALID: {
        USERNAME: process.env.USERNAME,
        PASSWORD: process.env.PASSWORD,
    },
    INVALID: {
        USERNAME: 'invalidUsername',
        PASSWORD: 'invalidPassord'
    }
};

export const expectedErrorMessage = 'An error occurred while connecting to server: You do not have enough permissions. Bad credentials';
export const expectedDashboardsPageTitle = 'All Dashboards';
