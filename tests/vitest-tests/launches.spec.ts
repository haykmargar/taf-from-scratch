import { Browser, Page, chromium, BrowserContext, Locator } from '@playwright/test';
import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { logger } from '@Utilities/logger';
import { LoginPage } from '@Pages/login.page';
import { LaunchPage } from '@Pages/launch.page';
import { CREDENTIALS, PROJECT_NAME, URL } from '@Resources/constants';
import { getExpectedLaunchesData } from '@Utilities/json-reader';
import { LaunchComponent } from '@Pages/components/launch-component';
import { SideBar } from '@Pages/components/sidebar-component';

describe('Launch page', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let loginPage: LoginPage;
    let launchPage: LaunchPage;
    let sidebar: SideBar;
    let launches: Locator[];

    const launchesExpectedData = getExpectedLaunchesData();
    const numberOfLaunches = launchesExpectedData.length;

beforeAll( async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    launchPage = new LaunchPage(page);
    sidebar = new SideBar(page);
    await loginPage.navigateToURL(URL);
    await loginPage.login(CREDENTIALS.VALID.USERNAME, CREDENTIALS.VALID.PASSWORD);
    logger.info(`selecting project ${PROJECT_NAME}`);
    await sidebar.projectsButton.click();
    await page.getByTitle(PROJECT_NAME).first().click();
    await sidebar.launchesButton.click();
    logger.info('navigating to launches page');
    await launchPage.launches.first().waitFor({state: 'visible'});
    launches = await launchPage.launches.all();
    });

    afterAll( async () => {
        logger.info('closing Page');
        await page.close();
        await context.close();
        await browser.close();
    });

    for (let i = 0; i < numberOfLaunches; i++) {
        test(`should have corresponding Launch Name: ${i} out of ${numberOfLaunches}`, async () => {
          const currentExpectedLaunchName = `${launchesExpectedData[i].name}#${launchesExpectedData[i].number}`;
          const currentActualLaunchComponent= new LaunchComponent(page, launches[i]);
          const currentActualLaunchName = await currentActualLaunchComponent.name.textContent();
          logger.info(`validating launch ${currentActualLaunchName}`);

          expect(currentActualLaunchName).toBe(currentExpectedLaunchName);
        });

        test(`should have corresponding Launch owner name: ${i} out of ${numberOfLaunches}`, async () => {
            const currentExpectedLaunchOwnerName = `${launchesExpectedData[i]['owner']}`;
            const currentActualLaunchComponent= new LaunchComponent(page, launches[i]);
            const currentActualLaunchOwnerName = await currentActualLaunchComponent.ownerName.textContent();
            logger.info(`validating launch owner name ${currentActualLaunchOwnerName}`);

            expect(currentActualLaunchOwnerName).toBe(currentExpectedLaunchOwnerName);
        });

        test(`should have corresponding Launch results: ${i} out of ${numberOfLaunches}`, async () => {
            const currentExpectedLaunchResults = `${launchesExpectedData[i]['statistics']['executions']['total'].toString()}`;
            const currentActualLaunchComponent= new LaunchComponent(page, launches[i]);
            const currentActualLaunchResults = await currentActualLaunchComponent.totalTests.textContent();
            logger.info(`validating launch results ${currentActualLaunchResults}`);

            expect(currentActualLaunchResults).toBe(currentExpectedLaunchResults);
        });
    }
});
