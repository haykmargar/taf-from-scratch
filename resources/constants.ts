export const expectedErrorMessage = 'An error occurred while connecting to server: You do not have enough permissions. Bad credentials';
export const expectedDashboardsPageTitle = 'All Dashboards';
export const testStatusNotApplicable = '0';
export const validProject = 'hayk_margaryan1_personal';
export const invalidProject = 'admin_personal';
export const invalidLaunchId = 99;
export const EXPECTED_API_RESPONSES = {
    NUMBER_OF_LAUNCHES: 5,
    VALID_RESPONSES: {
        GET: {
            CODE: 200
        },
        POST: {
            CODE: 201
        },
        PUT: {
            CODE: 200
        },
        DELETE: {
            CODE: 200
        }
    },
    ERRORS: {
        GET: {
            CODE: 403,
            MESSAGE: 'You do not have enough permissions. Please check the list of your available projects.'
        },
        POST: {
            CODE: 403,
            MESSAGE: 'You do not have enough permissions.'
        },
        PUT: {
            CODE: 404,
        },
        DELETE: {
            CODE: 404,
            MESSAGE: `Launch '${invalidLaunchId}' not found. Did you use correct Launch ID?`
        },
    },
};
export const CREATE_NEW_LAUNCH_DATA = {
    'attributes': [
        {
            'key': 'name',
            'system': true,
            'value': 'test'
        }
    ],
    'description': 'New test launch',
    'mode': 'DEFAULT',
    'name': 'HaykTestLaunch',
    'rerun': false,
    'rerunOf': 'off',
    'startTime': Date.now()
};
export const FINISH_LAUNCH_DATA = {
    'endTime': Date.now(),
    'status': 'STOPPED'
};
