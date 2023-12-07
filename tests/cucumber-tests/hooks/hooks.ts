import {BeforeAll, BeforeStep, AfterAll, AfterStep, After, Before} from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { logger } from '@Utilities/logger';
import { fixture } from './fixture';

BeforeAll(async function () {
    fixture.browser = await chromium.launch({ headless: false });
});

BeforeStep(async function () {
    logger.info('Starting Step');
});

AfterStep( async function () {
    logger.info('Finishing Step');
});

Before(async ()=> {
    fixture.context = await fixture.browser.newContext();
    fixture.page = await fixture.context.newPage();
});

After(async () => {
    await fixture.context.close();
    await fixture.page.close();
});

AfterAll(async function () {
    await fixture.browser.close();
});
