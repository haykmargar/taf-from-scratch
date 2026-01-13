import { Page, Locator } from '@playwright/test';
import BasePage from '@Pages/base.page';

export class LaunchPage extends BasePage {
    readonly launches: Locator;
    readonly launchesGrid: Locator;

    constructor(page: Page) {
        super(page);
        this.launches = this.page.locator('div[class*="gridRow__grid-row-wrapper--"]');
        this.launchesGrid = this.page.locator('div[class*="grid__grid"]');
    }
}
