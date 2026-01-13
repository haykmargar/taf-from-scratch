import { BeforeAll, BeforeStep, AfterAll, AfterStep, After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { BrowserContext, chromium } from '@playwright/test';
import { ICustomWorld } from './custom-world';
import { logger } from '@Utilities/logger';
import { fixture } from './fixture';
import { LoginPage } from '@Pages/login.page';
import { DashboardsPage } from '@Pages/dashboards.page';
import { SideBar } from '@Pages/components/sidebar-component';
import { LaunchPage } from '@Pages/launch.page';

setDefaultTimeout( 10 * 1000 * 5);

let context: BrowserContext;

BeforeAll(async function (this: ICustomWorld) {
    fixture.browser = await chromium.launch({ headless: false });
});

BeforeStep(async function (this: ICustomWorld) {
    logger.info('Starting Step');
});

AfterStep( async function (this: ICustomWorld) {
    logger.info('Finishing Step');
});

Before(async function (this: ICustomWorld) {
    context = await fixture.browser.newContext();
    fixture.page = await context.newPage();
    this.loginPage = new LoginPage(fixture.page);
    this.dashboardPage = new DashboardsPage(fixture.page);
    this.launchPage = new LaunchPage(fixture.page);
    this.sideBar = new SideBar(fixture.page);
});

After(async function (this: ICustomWorld) {
    await context.close();
    await fixture.page.close();
});

AfterAll(async function (this: ICustomWorld) {
    await fixture.browser.close();
});
