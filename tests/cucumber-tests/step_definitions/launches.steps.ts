import { When, Then } from '@cucumber/cucumber';
import { expect, Locator } from '@playwright/test';
import { LaunchPage } from '@Pages/launch.page';
import { PROJECT_NAME } from '@Config/config-data';
import { logger } from '@Utilities/logger';
import {SideBar} from '@Pages/components/sidebar-component';
import {fixture} from '../hooks/fixture';

let launchPage: LaunchPage;
let sidebar: SideBar;
let launches: Locator[];

When('I click Launches Button in the sidebar', async function () {
    launchPage = new LaunchPage(fixture.page);
    await sidebar.launchesButton.click();
    logger.info('navigating to launches page');
    await launchPage.launches.first().waitFor({state: 'visible'});
    launches = await launchPage.launches.all();
    console.log(launches);
});

When('I choose the project from sidebar', async function () {
    sidebar = new SideBar(fixture.page);
    logger.info(`selecting project ${PROJECT_NAME}`);
    await sidebar.projectsButton.click();
    await fixture.page.getByTitle(PROJECT_NAME).first().click();
});

Then('I can see launches grid', async function () {
    const isLaunchesGridVisible = await launchPage.launchesGrid.isVisible();
    expect(isLaunchesGridVisible).toBe(true);
});
