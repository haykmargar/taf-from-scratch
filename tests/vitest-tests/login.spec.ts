import { Browser, Page, chromium, BrowserContext } from '@playwright/test';
import { describe, test, expect, beforeEach, beforeAll, afterEach, afterAll} from 'vitest';
import { logger } from '@Utilities/logger';
import { LoginPage } from '@Pages/login.page';
import { DashboardsPage } from '@Pages/dashboards.page';
import { expectedErrorMessage, expectedDashboardsPageTitle } from '@Resources/constants';
import { CREDENTIALS, URL, ENV } from'@Config/config-data';

describe(`Login application on ${ENV} environment via vitest`, () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let loginPage: LoginPage;
    let dashboardPage: DashboardsPage;

    beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
    });

    beforeEach(async () => {
        page = await context.newPage();
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardsPage(page);
        await loginPage.navigateToURL(URL);
    });

    afterEach(async () => {
        logger.info('closing Page');
        await page.close();
    });

    afterAll(async () => {
        await context.close();
        await browser.close();
    });

    test('should not Login with valid credentials', async () => {
        await loginPage.login(CREDENTIALS.INVALID.USERNAME, CREDENTIALS.INVALID.PASSWORD);
        const actualErrorMessage = await loginPage.getErrorMessage();
        expect(actualErrorMessage).toBe(expectedErrorMessage);
    });

    test('should Login with valid credentials', async () => {
        await loginPage.login(CREDENTIALS.VALID.USERNAME, CREDENTIALS.VALID.PASSWORD);
        const actualDashboardsPageTitle = await dashboardPage.getPageTitle();
        expect(actualDashboardsPageTitle).toBe(expectedDashboardsPageTitle);
    });
});
