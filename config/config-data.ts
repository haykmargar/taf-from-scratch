import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = process.env.ENV;
export const URL = process.env.URL;
export const PROJECT_NAME = 'hayk_margaryan1_personal';
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
