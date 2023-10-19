import { Page, Locator } from '@playwright/test';
import BasePage from '@Pages/base.page';

export class DashboardsPage extends BasePage {

    readonly titleTextLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.titleTextLocator = page.locator('span[title="All Dashboards"]');
    }

    async getPageTitle() {
        await this.titleTextLocator.waitFor({ state: 'visible'});
        const titleText = await this.titleTextLocator.textContent();
        return  titleText;
    }
}
