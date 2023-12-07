import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '@Pages/login.page';
import { DashboardsPage } from '@Pages/dashboards.page';
import { expectedErrorMessage, expectedDashboardsPageTitle } from '@Resources/constants';
import { CREDENTIALS, URL } from '@Config/config-data';
import { logger } from '@Utilities/logger';
import { fixture } from '../hooks/fixture';

let loginPage: LoginPage;
let dashboardPage: DashboardsPage;

Given('I navigate to the login page', async () => {
    loginPage = new LoginPage(fixture.page);
    dashboardPage = new DashboardsPage(fixture.page);
    await loginPage.navigateToURL(URL);
});

Given('I login to the application', async () => {
    await loginPage.login(CREDENTIALS.VALID.USERNAME, CREDENTIALS.VALID.PASSWORD);
});

When(/^I fill the Username field with (.*) username$/, async (usernameValidnessStatus) => {
    const username = usernameValidnessStatus === 'valid' ? CREDENTIALS.VALID.USERNAME : CREDENTIALS.INVALID.USERNAME;
    await loginPage.fillUsername(username);
});

When(/^I fill the Password field with (.*) password$/, async (passwordValidnessStatus) => {
    const password = passwordValidnessStatus === 'valid' ? CREDENTIALS.VALID.PASSWORD : CREDENTIALS.INVALID.PASSWORD;
    await loginPage.fillPassword(password);
});

When(/^I click the Login Button$/, async () => {
    logger.info('clicking on login button');
    await loginPage.btnSubmit.click();
});

Then(/^I should see "ALL DASHBOARDS" page$/, async () => {
    logger.info('clicking on login button');
    const actualDashboardsPageTitle = await dashboardPage.getPageTitle();
    expect(actualDashboardsPageTitle).toBe(expectedDashboardsPageTitle);
});

Then(/^I should see bad Credentials Error$/, async () => {
    logger.info('clicking on login button');
    const actualErrorMessage = await loginPage.getErrorMessage();
    expect(actualErrorMessage).toBe(expectedErrorMessage);
});
