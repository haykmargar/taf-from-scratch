import { Page } from '@playwright/test';
import { logger } from '../../utilities/logger';

export default class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(baseURL: string) {
        logger.info(`navigating to ${baseURL}`);
        await this.page.goto('/');
        logger.info(`waiting for page to be loaded`);
        await this.page.waitForLoadState();
    }
}
