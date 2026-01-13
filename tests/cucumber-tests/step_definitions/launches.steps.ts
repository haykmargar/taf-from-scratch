import { When, Then } from '@cucumber/cucumber';
import { expect, Locator } from '@playwright/test';
import { PROJECT_NAME } from '@Config/config-data';
import { logger } from '@Utilities/logger';
import { fixture } from '../hooks/fixture';

let launches: Locator[];

When('I click Launches Button in the sidebar', async function () {
    await this.sideBar.launchesButton.click();
    logger.info('navigating to launches page');
    await this.launchPage.launches.first().waitFor({state: 'visible'});
    launches = await this.launchPage.launches.all();
    console.log(launches);
});

When('I choose the project from sidebar', async function () {
    logger.info(`selecting project ${PROJECT_NAME}`);
    await this.sideBar.projectsButton.click();
    await fixture.page.getByTitle(PROJECT_NAME).first().click();
});

Then('I can see launches grid', async function () {
    const isLaunchesGridVisible = await this.launchPage.launchesGrid.isVisible();
    expect(isLaunchesGridVisible).toBe(true);
});
