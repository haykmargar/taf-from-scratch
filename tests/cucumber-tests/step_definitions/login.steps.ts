import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { expectedErrorMessage, expectedDashboardsPageTitle } from '@Resources/constants';
import { CREDENTIALS, URL } from '@Config/config-data';
import { logger } from '@Utilities/logger';

Given('I navigate to the login page', async function () {
    await this.loginPage.navigateToURL(URL);
});

Given('I login to the application', async function () {
    await this.loginPage.login(CREDENTIALS.VALID.USERNAME, CREDENTIALS.VALID.PASSWORD);
});

When(/^I fill the Username field with (.*) username$/, async function (usernameValidnessStatus) {
    const username = usernameValidnessStatus === 'valid' ? CREDENTIALS.VALID.USERNAME : CREDENTIALS.INVALID.USERNAME;
    await this.loginPage.fillUsername(username);
});

When(/^I fill the Password field with (.*) password$/, async function (passwordValidnessStatus) {
    const password = passwordValidnessStatus === 'valid' ? CREDENTIALS.VALID.PASSWORD : CREDENTIALS.INVALID.PASSWORD;
    await this.loginPage.fillPassword(password);
});

When(/^I click the Login Button$/, async function () {
    logger.info('clicking on login button');
    await this.loginPage.btnSubmit.click();
});

Then(/^I should see "ALL DASHBOARDS" page$/, async function () {
    logger.info('clicking on login button');
    const actualDashboardsPageTitle = await this.dashboardPage.getPageTitle();
    expect(actualDashboardsPageTitle).toBe(expectedDashboardsPageTitle);
});

Then(/^I should see bad Credentials Error$/, async function () {
    logger.info('clicking on login button');
    const actualErrorMessage = await this.loginPage.getErrorMessage();
    expect(actualErrorMessage).toBe(expectedErrorMessage);
});
