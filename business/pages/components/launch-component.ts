import { Page, Locator } from '@playwright/test';
import BaseComponent from '@Pages/components/base-component';

export class LaunchComponent extends BaseComponent {
    launch: Locator;
    readonly name: Locator;
    readonly ownerName: Locator;
    readonly totalTests: Locator;

    constructor(page: Page, launch: Locator) {
        super(page);
        this.launch = launch;
        this.name = this.launch.locator('div[class*="itemInfo__main"]').first();
        this.ownerName = this.launch.locator('span[class*="owner"]').first();
        this.totalTests = this.launch.locator('div[class*="launchSuiteGrid__total"] div a');
    }
}
