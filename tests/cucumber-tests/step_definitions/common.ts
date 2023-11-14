import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '@Pages/login.page';
import { DashboardsPage } from '@Pages/dashboards.page';
import { expectedErrorMessage, expectedDashboardsPageTitle, CREDENTIALS, URL } from '@Resources/constants';
import { logger } from '@Utilities/logger';

let loginPage: LoginPage;
let dashboardPage: DashboardsPage;
let page: Page;
let browser: Browser;
let context: BrowserContext;

Before(async ()=> {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardsPage(page);
});

After(async () => {
    await page.close();
    await context.close();
    await browser.close();
});

Given('I navigate to the login page', async function () {
    await loginPage.navigateToURL(URL);
});

When(/^I fill the Username field with (.*) username$/, async function (usernameValidnessStatus) {
    const username = usernameValidnessStatus === 'valid' ? CREDENTIALS.VALID.USERNAME : CREDENTIALS.INVALID.USERNAME;
    await loginPage.fillUsername(username);
});

When(/^I fill the Password field with (.*) password$/, async function (passwordValidnessStatus) {
    const password = passwordValidnessStatus === 'valid' ? CREDENTIALS.VALID.PASSWORD : CREDENTIALS.INVALID.PASSWORD;
    await loginPage.fillPassword(password);
});

When(/^I click the Login Button$/, async function () {
    logger.info('clicking on login button');
    await loginPage.btnSubmit.click();
});

Then(/^I should see "ALL DASHBOARDS" page$/, async function () {
    logger.info('clicking on login button');
    const actualDashboardsPageTitle = await dashboardPage.getPageTitle();
    expect(actualDashboardsPageTitle).toBe(expectedDashboardsPageTitle);
});

Then(/^I should see bad Credentials Error$/, async function () {
    logger.info('clicking on login button');
    const actualErrorMessage = await loginPage.getErrorMessage();
    expect(actualErrorMessage).toBe(expectedErrorMessage);
});
