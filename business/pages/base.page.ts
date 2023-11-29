import { Page } from '@playwright/test';
import { logger } from '@Utilities/logger';

export default class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(baseURL: string) {
        logger.info(`navigating to ${baseURL}`);
        await this.page.goto('/');
        logger.info('waiting for page to be loaded');
        await this.page.waitForLoadState();
    }

    async navigateToURL(url: string) {
        logger.info(`navigating to ${url}`);
        await this.page.goto(url);
        await this.page.waitForLoadState();
    }
}
