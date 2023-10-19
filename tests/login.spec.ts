import { test, expect } from "@playwright/test";
import { logger } from '@Utilities/logger';
import { LoginPage } from "@Pages/login.page";
import { DashboardsPage } from "@Pages//dashboards.page"
import data from "@Resources/loginData.json";

test.describe('Login application', () => {

    let loginPage: LoginPage;
    let dashboardPage: DashboardsPage;

    test.beforeEach( async ({page, baseURL}) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardsPage(page);
        await loginPage.navigate(baseURL!);
    });

    test.afterEach( async ({page}) => {
        logger.info('closing Page');
        await page.close();
    });

    test('should Login with valid credentials', async () => {
        await loginPage.login(data.valid.username, data.valid.password);
        expect(await dashboardPage.getPageTitle()).toBe('All Dashboards');
    });

    test('should not Login with valid credentials', async () => {
        const expected_error_message = 'An error occurred while connecting to server: You do not have enough permissions. Bad credentials';
        await loginPage.login(data.invalid.username, data.invalid.password);
        expect(await loginPage.getErrorMessage()).toBe(expected_error_message);
    });
});
