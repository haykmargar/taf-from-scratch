import { test, expect } from '@playwright/test';
import { logger } from '@Utilities/logger';
import { LoginPage } from '@Pages/login.page';
import { DashboardsPage } from '@Pages/dashboards.page';
import { expectedErrorMessage, expectedDashboardsPageTitle } from '@Resources/constants';
import { CREDENTIALS, ENV } from '@Config/config-data';

test.describe(`Login application on ${ENV} environment`, () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardsPage;

    test.beforeEach(async ({page, baseURL}) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardsPage(page);
        await loginPage.navigate(baseURL);
    });

    test.afterEach(async ({page}) => {
        logger.info('closing Page');
        await page.close();
    });

    test('should Login with valid credentials', async () => {
        await loginPage.login(CREDENTIALS.VALID.USERNAME, CREDENTIALS.VALID.PASSWORD);
        const actualDashboardsPageTitle = await dashboardPage.getPageTitle();
        expect(actualDashboardsPageTitle).toBe(expectedDashboardsPageTitle);
    });

    test('should not Login with valid credentials', async () => {
        await loginPage.login(CREDENTIALS.INVALID.USERNAME, CREDENTIALS.INVALID.PASSWORD);
        const actualErrorMessage = await loginPage.getErrorMessage();
        expect(actualErrorMessage).toBe(expectedErrorMessage);
    });
});
