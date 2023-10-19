import { test, expect } from '@playwright/test';
import { logger } from '@Utilities/logger';
import { LoginPage } from '@Pages/login.page';
import { DashboardsPage } from '@Pages//dashboards.page';
import { expectedErrorMessage, dashboardsPageTitle } from '@Resources/constants';
import loginData from '@Resources/loginData.json';

test.describe('Login application', () => {

    let loginPage: LoginPage;
    let dashboardPage: DashboardsPage;

    test.beforeEach( async ({ page, baseURL}) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardsPage(page);
        await loginPage.navigate(baseURL!);
    });

    test.afterEach( async ({ page}) => {
        logger.info('closing Page');
        await page.close();
    });

    test('should Login with valid credentials', async () => {
        await loginPage.login(loginData.valid.username, loginData.valid.password);
        expect(await dashboardPage.getPageTitle()).toBe(dashboardsPageTitle);
    });

    test('should not Login with valid credentials', async () => {
        await loginPage.login(loginData.invalid.username, loginData.invalid.password);
        expect(await loginPage.getErrorMessage()).toBe(expectedErrorMessage);
    });
});
