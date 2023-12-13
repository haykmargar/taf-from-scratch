import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const ENV = process.env.ENV;
export const URL = process.env.URL;
export const PROJECT_NAME = 'hayk_margaryan1_personal';
export const PROJECT_NAME_INVALID = 'personal';
export const CREDENTIALS = {
    VALID: {
        USERNAME: process.env.REPORT_USERNAME,
        PASSWORD: process.env.REPORT_PASSWORD,
    },
    INVALID: {
        USERNAME: 'invalidUsername',
        PASSWORD: 'invalidPassword'
    }
};
export const apiEndpoint = process.env.API_ENDPOINT;
const token = process.env.API_TOKEN;

export const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};
